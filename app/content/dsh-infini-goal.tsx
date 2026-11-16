/**
 * The `dsh-infini-goal` post, Chinese and English.
 *
 * An introduction to endless DSH goals with durable continuation, minimum
 * trigger intervals, quiet windows, and explicit authority boundaries. It also
 * covers the bundle's relationship with the official goal and the costs of
 * letting a session continue indefinitely. The two bodies carry the same
 * argument, not the same sentences.
 */

import type { Post } from "./posts";

function DshInfiniGoalZh() {
  return (
    <>
      <p>
        当我把一项长期工作交给
        Agent，我想要的往往不是让它在一个回答里做更多事，而是让它在之后的轮次里继续：检查结果，处理失败，等待条件变化，再做下一步。DSH
        官方的 <code>dsh-goal</code>{" "}
        已经提供了这种自动续跑的入口，但“能续跑”与“适合长期运行”之间，还隔着轮次、节奏和恢复方式这几个问题。
      </p>
      <p>
        一个目标如果每次空闲就立刻开始下一轮，即使没有新进展，也可能形成密集的空循环；如果运行时间跨过夜晚或专注时段，我还希望它暂时不要打扰。另一方面，仅仅设置一个更大的轮次上限，也不能解决重启和分叉之后到底谁来继续的问题。
      </p>
      <p>
        <strong>dsh-infini-goal</strong>{" "}
        就是在这些地方改动官方目标模型：取消最大轮次，把续跑状态持久化，再加入最小触发间隔和静默时段。本文以
        <strong>v0.2.1</strong>{" "}
        为准，介绍它的设计、权限边界和实际使用成本。这里的“无限”只指没有预设轮次上限，并不意味着目标应该永远运行。
      </p>

      <h2>无限之前，先解决节奏</h2>
      <p>
        官方 <code>dsh-goal</code> 用 <code>maxGoalRounds</code>{" "}
        限制自动轮次，默认是
        256。上限能防止任务无限消耗，但长期目标到达上限后就不能继续
        resume。它的驱动方式也没有节流：Agent
        一旦空闲，就立即进入下一轮。如果模型只是重复一句“继续检查”，系统可能很快地把这个动作执行许多次。
      </p>
      <p>
        另一个差异在恢复语义。官方 goal 的 <code>armed</code>／
        <code>disarmed</code>
        是进程内状态，Session 恢复或 fork
        后会解除武装，需要人工恢复。dsh-infini-goal
        则把目标是否继续直接写成持久状态：重启应用、恢复 Session，甚至 fork
        出包含目标历史的子会话后，<code>active</code> 目标默认都会继续。
      </p>
      <p>
        所以，这个项目并不是简单地把 256
        改成无穷大。它要同时回答三个问题：目标为什么还存在，下一次什么时候可以运行，以及哪些时间不应该自动运行。
      </p>

      <h2>把续跑状态写进 Session</h2>
      <p>
        dsh-infini-goal 不再设置 <code>maxGoalRounds</code>，
        <code>roundsStarted</code>
        只记录已经启动的轮次并持续增长。目标保持 <code>active</code>
        ，直到被完成、暂停、阻塞或清除。正式的
        <code>phase</code> 有四种：<code>active</code>、<code>paused</code>、
        <code>blocked</code> 和 <code>complete</code>。严格地说，
        <code>cleared</code>
        并不是第五种 phase：<code>clear</code>{" "}
        是一个写入墓碑记录的操作，清除后当前
        <code>goal</code> 为 <code>null</code>，轮次计数也随之清空。
      </p>
      <p>
        每次目标变更都写成可忽略的 <code>plugin:infini-goal/change</code>{" "}
        Session 插件记录。回放会校验版本、字段、状态迁移、目标 id 与
        revision、轮次序号和时间戳，而不是把任意 JSON
        当作当前状态。自动轮次本身也有明确来源，必须与当前目标和 revision 匹配，
        <code>roundsStarted</code> 才向前推进。这些记录会随 Session resume、fork
        和 transport 保留并重放，浏览器则读取同一份 <code>infiniGoal</code>{" "}
        projection。
      </p>
      <p>
        持久化的 <code>active</code>{" "}
        让“恢复后继续”成为默认行为，也带来一个需要记住的副作用：fork
        出来的子会话也会续跑。如果不希望如此，应该先暂停再 fork。部署时可以把
        <code>autoContinueOnStart</code> 设为 <code>false</code>；这时已有
        active 目标会在启动或 Agent 创建时被持久化为
        paused，等待人类显式恢复，而不是只在内存里暂时停一下。
      </p>

      <h2>最小间隔与静默时段</h2>
      <p>
        第一道节奏控制是 <code>minIntervalMs</code>
        ：两次自动轮次的开始时间至少相隔这么久。默认是一分钟，可配置范围是一秒到三十天。首轮不需要先等一分钟，只要
        Agent
        空闲且不在静默时段，就可以开始；之后则按上一轮的开始时间计算下一次触发。它专门防止“秒回—秒触发”的空循环，并不判断这一轮是否真的有进展。
      </p>
      <p>
        第二道控制是 <code>quietWindows</code>。窗口按本地墙钟时间表达，支持
        IANA 时区、ISO
        星期和跨午夜；星期过滤的是窗口的开始日，开始时刻包含在内，结束时刻不包含。多个窗口取并集，覆盖全天、会让自动轮次永远无法触发的配置会被拒绝。
      </p>
      <p>
        下面是一份部署默认值示例：自动轮次至少间隔一分钟，每天 22:00 到次日
        06:00 不触发，时区固定为 Asia/Shanghai。
      </p>
      <pre>
        <code>{`- id: infini-goal
  name: '@yankeguo/dsh-infini-goal'
  config:
    defaultMinIntervalMs: 60000
    defaultQuietWindows:
      - days: [1, 2, 3, 4, 5, 6, 7]
        start: "22:00"
        end: "06:00"
    timezone: Asia/Shanghai`}</code>
      </pre>
      <p>
        静默时段只限制自动触发，不会暂停整个
        Session。人类仍然可以发消息、调用工具、查看状态，正在进行的普通对话也不被这个窗口禁止。命中窗口时，目标仍是
        <code>active</code>，只是下一次触发被推迟到窗口结束；这和
        paused、blocked 是不同的状态。窗口结束后，自动推进再按调度恢复。
      </p>

      <h2>三个工具，但目标不能由模型自改</h2>
      <p>
        模型侧只有三个工具：<code>get_infini_goal</code>{" "}
        读取目标与下一次触发计划，
        <code>create_infini_goal</code> 创建目标，
        <code>update_infini_goal</code>
        执行编辑、配置、暂停、恢复、完成或阻塞。人类则可以直接使用
        <code>/infini-goal</code>，不必为这些管理动作消耗一次模型轮次：
      </p>
      <pre>
        <code>{`/infini-goal 修完所有文档检查，并保持 CI 绿色
/infini-goal interval 10m
/infini-goal quiet "Mo-Fr 22:00-06:00"
/infini-goal timezone Asia/Shanghai
/infini-goal status
/infini-goal pause
/infini-goal resume`}</code>
      </pre>
      <p>
        composer 上方的 InfiniGoalBar
        显示阶段、目标、轮次、最小间隔或静默等待，并提供暂停、恢复和清除按钮。按钮也只是发送对应的
        <code>/infini-goal</code> 命令；界面读取 Session
        projection，没有另开一套高权限 Remote
        API。目标完成或不存在时，状态条不渲染。
      </p>
      <p>
        更重要的是授权边界。创建目标，以及编辑、修改节奏、暂停和恢复，都需要当前
        turn 中存在直接的人类消息；判定依据是 Session 事件和 root agent
        身份，不是模型自称获得了授权。只有
        <code>complete</code> 和 <code>blocked</code>{" "}
        额外允许由“当前目标的自动轮次”授权，让模型在长跑后收尾。自动报告 blocked
        还有默认至少三轮的门槛，人类直接标记 blocked
        不受这个阈值限制。模型因此不能凭自己的想法创建或改写目标，却可以在被授权的持续推进中报告完成或阻塞。
      </p>

      <h2>与官方 dsh-goal 的关系</h2>
      <p>
        两套系统在命名上并不冲突：官方使用 <code>get_goal</code>、
        <code>/goal</code>
        和 GoalBar，新插件使用 <code>*_infini_goal</code>、
        <code>/infini-goal</code>
        和 InfiniGoalBar。技术上它们可以共存，但主 bundle 默认只保留 infini-goal
        这一套目标入口。
      </p>
      <p>
        安装主 bundle 时，除了五个 infini-goal 行，还会加入一个普通 bundle
        关闭层，停用官方的自动轮次和状态条，并从 shipped agent presets
        中过滤官方命令与工具。它不是复制一份 preset 快照，也不是在 profile
        里另写一段全局补丁。每一行仍能在 Plugins 页面单独开关；关闭整个
        bundle，官方 goal 模式就会恢复。独立的{" "}
        <code>@yankeguo/dsh-disable-goal-bundle</code>
        仍留给只想关闭官方 goal 的 profile，但不应与主 bundle 同时启用。
      </p>

      <h2>安装与兼容性</h2>
      <p>在 desktop profile 中安装主 bundle：</p>
      <pre>
        <code>{`dsh plugin --profile desktop add @yankeguo/dsh-infini-goal-bundle`}</code>
      </pre>
      <p>
        项目地址是{" "}
        <a
          href="https://github.com/yankeguo/dsh-infini-goal"
          target="_blank"
          rel="noreferrer"
        >
          GitHub 上的 yankeguo/dsh-infini-goal
        </a>
        ，npm 包是{" "}
        <a
          href="https://www.npmjs.com/package/@yankeguo/dsh-infini-goal-bundle"
          target="_blank"
          rel="noreferrer"
        >
          @yankeguo/dsh-infini-goal-bundle
        </a>
        。本文对应{" "}
        <a
          href="https://github.com/yankeguo/dsh-infini-goal/releases/tag/v0.2.1"
          target="_blank"
          rel="noreferrer"
        >
          v0.2.1
        </a>
        ，代码采用 MIT license。插件声明支持
        <code>DSH &gt;=0.2.2-rc.1 &lt;0.3.0</code>，状态条在桌面应用或
        <code>dsh web</code> 的 Web UI 中渲染。
      </p>
      <p>
        v0.2.1 的主要变化是 staged publish
        发布流程和八个包的中英文展示元数据，功能行为与 0.2.0
        一致。因此，文章讨论的是当前版本下的整体能力，而不是把这些能力都写成
        0.2.1 新增。
      </p>

      <h2>限制与取舍</h2>
      <p>
        最直观的成本是：每个自动轮次都是正常的模型 turn，会消耗真实 token
        和额度。最小间隔只能降低触发频率，不能限制总花费，也不能保证每轮都有新进展。去掉轮次上限后，人更需要一个可以验证的目标、明确的完成条件，以及合适的暂停或静默策略。
      </p>
      <p>
        每个 Session 同时只有一个 infini-goal，目标和轮次都隶属于当前
        Session；插件不提供跨 Session 的共享或汇总。恢复与 fork
        默认继续也需要主动管理，不希望复制执行时应先
        pause。状态条的秒级倒计时在本地计算，可能有显示偏差，实际触发仍由驱动器决定。
      </p>
      <p>
        静默时段基于配置的本地时区，而不是“服务器现在几点”的隐含假设。跨夏令时按墙钟推进；重复墙钟时间的保守包络可能让窗口多覆盖约一小时。最后，0.1.0
        写过的旧日志不会自动迁移到当前的插件记录表示，需要按文档用修复脚本一次性处理；这不是升级时可以忽略的细节。
      </p>

      <h2>什么时候值得让它继续</h2>
      <p>
        如果任务可以在一轮里完成，普通对话就够了；如果只需要固定次数的自动跟进，官方
        goal 的轮次上限反而是一种简单预算。dsh-infini-goal
        更适合目标本身需要持续推进、完成条件清楚，同时我希望保留暂停、恢复和免打扰安排的场景。
      </p>
      <p>
        我理解的“无限目标”不是把人的决定权拿掉，而是取消一个任意的轮次数字，把
        <strong>为什么继续、何时继续、什么时候停止</strong>
        变成显式状态。能一直跑只是能力；能等待、能恢复，也能被停下来，才让它适合长期使用。
      </p>
    </>
  );
}

function DshInfiniGoalEn() {
  return (
    <>
      <p>
        When I give an agent a long-running piece of work, I often do not want
        it to do more inside a single answer. I want it to continue in later
        turns: inspect the result, handle a failure, wait for a condition to
        change, and then take the next step. DSH's official{" "}
        <code>dsh-goal</code> already provides automatic continuation, but there
        are still questions of round limits, pacing, and recovery between “can
        continue” and “is suitable for long-running work.”
      </p>
      <p>
        If a goal starts another round whenever the agent becomes idle, it can
        form a dense empty loop even when nothing has changed. If it runs
        through the night or a focus period, I may also want it not to interrupt
        me. Raising a round cap does not answer who should resume the goal after
        an application restart or a session fork.
      </p>
      <p>
        <strong>dsh-infini-goal</strong> changes those parts of the official
        goal model. It removes the maximum round count, makes continuation
        durable, and adds a minimum trigger interval and quiet windows. This
        article describes its design, authority boundaries, and operating costs
        as of <strong>v0.2.1</strong>. “Endless” means there is no preset round
        cap; it does not mean a goal should run forever.
      </p>

      <h2>Before endless continuation, fix the pacing</h2>
      <p>
        The official <code>dsh-goal</code> limits automatic continuation with{" "}
        <code>maxGoalRounds</code>, which defaults to 256. A cap can bound
        consumption, but a long-running goal cannot be resumed after exhausting
        it. Its driver has no throttling either: as soon as the agent is idle,
        it starts another round. If the model merely says “check again,” the
        system can repeat that action many times in quick succession.
      </p>
      <p>
        Recovery differs too. The official goal's <code>armed</code> and{" "}
        <code>disarmed</code> states live in the process. Restoring or forking a
        Session disarms it, requiring a manual resume. dsh-infini-goal instead
        persists whether the goal should continue. After an application restart,
        a Session restore, or a fork that carries the goal history, an{" "}
        <code>active</code> goal continues by default.
      </p>
      <p>
        The project therefore does more than replace 256 with infinity. It has
        to answer three questions together: why the goal still exists, when its
        next round may run, and when automatic rounds should not run at all.
      </p>

      <h2>Put continuation state in the Session</h2>
      <p>
        dsh-infini-goal has no <code>maxGoalRounds</code>. Its{" "}
        <code>roundsStarted</code> counter simply records the rounds that have
        started and keeps growing. A goal remains <code>active</code> until it
        is completed, paused, blocked, or cleared. The formal <code>phase</code>{" "}
        has four values: <code>active</code>, <code>paused</code>,{" "}
        <code>blocked</code>, and <code>complete</code>. Strictly speaking,{" "}
        <code>cleared</code> is not a fifth phase. <code>clear</code> is an
        operation that appends a tombstone; afterwards the current{" "}
        <code>goal</code> is <code>null</code> and the round counters are reset.
      </p>
      <p>
        Every goal change is stored as an ignorable{" "}
        <code>plugin:infini-goal/change</code> Session plugin record. Replay
        validates the version, fields, transitions, goal id and revision, round
        sequence, and timestamps rather than accepting arbitrary JSON as current
        state. Automatic rounds also carry an explicit source. They must match
        the current goal and revision before <code>roundsStarted</code>{" "}
        advances. The records survive Session resume, fork, and transport, while
        the browser reads the same <code>infiniGoal</code> projection.
      </p>
      <p>
        Durable <code>active</code> state makes continuation after recovery the
        default, with a side effect worth remembering: a forked child continues
        too. Pause first if that is not what you want. A deployment can set{" "}
        <code>autoContinueOnStart</code> to <code>false</code>. Existing active
        goals are then durably paused at startup or Agent creation and wait for
        an explicit human resume, rather than being stopped only in memory.
      </p>

      <h2>A minimum interval and quiet windows</h2>
      <p>
        The first pacing control is <code>minIntervalMs</code>: two automatic
        rounds must start at least this far apart. The default is one minute,
        and the accepted range is one second to thirty days. The first round
        does not have to wait for a minute; it can start when the agent is idle
        and no quiet window applies. Later triggers are calculated from the
        previous round's start. This specifically prevents a “reply, immediately
        trigger again” empty loop. It does not determine whether a round made
        progress.
      </p>
      <p>
        The second control is <code>quietWindows</code>. Windows use local wall
        time, with IANA time zones, ISO weekdays, and midnight crossing.
        Weekdays filter the day on which a window starts. The start is inclusive
        and the end exclusive. Multiple windows form a union, and a
        configuration that covers all local time and would prevent every
        automatic round is rejected.
      </p>
      <p>
        Here is an example of deployment defaults: automatic rounds start at
        least one minute apart, none start between 22:00 and 06:00, and the
        quiet windows use Asia/Shanghai.
      </p>
      <pre>
        <code>{`- id: infini-goal
  name: '@yankeguo/dsh-infini-goal'
  config:
    defaultMinIntervalMs: 60000
    defaultQuietWindows:
      - days: [1, 2, 3, 4, 5, 6, 7]
        start: "22:00"
        end: "06:00"
    timezone: Asia/Shanghai`}</code>
      </pre>
      <p>
        Quiet windows gate only automatic triggers; they do not suspend the
        whole Session. A person can still send messages, call tools, and inspect
        status, and ordinary conversations are not forbidden by the window. When
        a window applies, the goal remains <code>active</code>, but its next
        trigger moves to the end of the window. That is different from paused or
        blocked. Automatic progress resumes according to the schedule once the
        window ends.
      </p>

      <h2>Three tools without model-owned goals</h2>
      <p>
        The model has only three tools. <code>get_infini_goal</code> reads the
        goal and its next trigger plan, <code>create_infini_goal</code> creates
        a goal, and <code>update_infini_goal</code> edits, configures, pauses,
        resumes, completes, or blocks it. A person can use{" "}
        <code>/infini-goal</code> directly without spending a model round on
        these management actions:
      </p>
      <pre>
        <code>{`/infini-goal Fix every failing documentation check and keep CI green
/infini-goal interval 10m
/infini-goal quiet "Mo-Fr 22:00-06:00"
/infini-goal timezone Asia/Shanghai
/infini-goal status
/infini-goal pause
/infini-goal resume`}</code>
      </pre>
      <p>
        The InfiniGoalBar above the composer shows the phase, objective, round
        count, and interval or quiet-window wait, with pause, resume, and clear
        controls. Those buttons only send the corresponding{" "}
        <code>/infini-goal</code> command. The interface reads a Session
        projection rather than introducing a separate, more privileged Remote
        API. A completed or absent goal renders no bar.
      </p>
      <p>
        The authority boundary matters more. Creating a goal, editing it,
        changing its pacing, pausing it, and resuming it all require a direct
        human message in the current turn. The decision comes from Session
        events and root-agent identity, not from the model claiming permission.
        Only <code>complete</code> and <code>blocked</code> additionally accept
        authorization from the current goal's automatic round, allowing the
        model to finish a long-running objective. Automatic blocked reports also
        have a default threshold of at least three rounds; a direct human block
        is not limited by that threshold. The model cannot create or rewrite a
        goal on its own initiative, but it can report completion or blockage
        within the continuation already authorized for it.
      </p>

      <h2>The relationship with official dsh-goal</h2>
      <p>
        The two systems do not collide by name. The official one uses{" "}
        <code>get_goal</code>, <code>/goal</code>, and GoalBar; this plugin uses{" "}
        <code>*_infini_goal</code>, <code>/infini-goal</code>, and
        InfiniGoalBar. They can technically coexist, although the main bundle
        leaves only infini-goal as the active goal interface by default.
      </p>
      <p>
        Installing the main bundle adds five infini-goal rows and an ordinary
        bundle disable layer. That layer turns off the official round driver and
        status bar, and filters the official command and tools from shipped
        agent presets. It neither copies a preset snapshot nor writes another
        global patch into the profile. Every row remains individually switchable
        on the Plugins page; disabling the whole bundle restores the official
        goal mode. The standalone <code>@yankeguo/dsh-disable-goal-bundle</code>{" "}
        is still available for profiles that only want to disable the official
        goal, but it should not be enabled alongside the main bundle.
      </p>

      <h2>Installation and compatibility</h2>
      <p>Install the main bundle into the desktop profile:</p>
      <pre>
        <code>{`dsh plugin --profile desktop add @yankeguo/dsh-infini-goal-bundle`}</code>
      </pre>
      <p>
        The project is{" "}
        <a
          href="https://github.com/yankeguo/dsh-infini-goal"
          target="_blank"
          rel="noreferrer"
        >
          yankeguo/dsh-infini-goal on GitHub
        </a>
        , and the npm package is{" "}
        <a
          href="https://www.npmjs.com/package/@yankeguo/dsh-infini-goal-bundle"
          target="_blank"
          rel="noreferrer"
        >
          @yankeguo/dsh-infini-goal-bundle
        </a>
        . This article covers{" "}
        <a
          href="https://github.com/yankeguo/dsh-infini-goal/releases/tag/v0.2.1"
          target="_blank"
          rel="noreferrer"
        >
          v0.2.1
        </a>
        , released under the MIT license. The plugins declare{" "}
        <code>DSH &gt;=0.2.2-rc.1 &lt;0.3.0</code>, and the status bar renders
        in the Web UI provided by the desktop app or <code>dsh web</code>.
      </p>
      <p>
        Version 0.2.1 primarily introduces the staged-publish pipeline and
        Chinese and English display metadata for all eight packages. Its
        functional behavior is the same as 0.2.0. This article therefore
        describes the whole capability surface in the current release rather
        than presenting every feature as new in 0.2.1.
      </p>

      <h2>Limitations and trade-offs</h2>
      <p>
        The most immediate cost is that every automatic round is a normal model
        turn and consumes real tokens and quota. A minimum interval reduces the
        trigger rate; it does not impose a total budget or guarantee that a
        round makes progress. Without a round cap, a verifiable objective, a
        clear completion condition, and a deliberate pause or quiet-window
        policy become more important.
      </p>
      <p>
        Each Session has exactly one infini-goal at a time, and both the goal
        and its rounds belong to that Session. The plugin does not share or
        aggregate goals across Sessions. Continuation after restore and fork
        also needs deliberate management: pause before forking if duplicate
        execution is undesirable. The status bar computes its second-level
        countdown locally and may drift visually; the driver still decides the
        actual trigger.
      </p>
      <p>
        Quiet windows use their configured local time zone rather than an
        implicit assumption about the server's clock. They follow wall-clock
        time across daylight-saving changes. The conservative envelope around
        repeated wall times may cover about an extra hour. Finally, logs written
        by 0.1.0 are not migrated automatically to the current plugin-record
        representation. They need a one-time repair with the documented script;
        that is not an upgrade detail to overlook.
      </p>

      <h2>When is continuation worthwhile?</h2>
      <p>
        If a task fits in one turn, an ordinary conversation is enough. If it
        needs a fixed number of automatic follow-ups, the official goal's round
        cap can be a useful, simple budget. dsh-infini-goal fits objectives that
        genuinely need continued progress, have a clear completion condition,
        and still need human-controlled pause, resume, and quiet periods.
      </p>
      <p>
        I do not read “endless goal” as removing human decisions. It removes an
        arbitrary round number and makes{" "}
        <strong>
          why to continue, when to continue, and when to stop explicit state.
        </strong>{" "}
        Running indefinitely is the capability. Waiting, recovering, and being
        stopped deliberately are what make it suitable for long-running work.
      </p>
    </>
  );
}

export const dshInfiniGoal: Post = {
  slug: "dsh-infini-goal",
  date: "2026-11-16",
  locales: {
    zh: {
      title: "dsh-infini-goal：无限目标，也需要节奏",
      summary:
        "dsh-infini-goal 把 DSH 官方 dsh-goal 的自动续跑改成无轮次上限、带最小触发间隔和静默时段的长期目标。本文介绍它的事件溯源与恢复语义、三个模型工具和人类命令、权限边界、默认关闭官方 goal 的 bundle 层，以及 v0.2.1 下的限制与取舍。",
    },
    en: {
      title: "dsh-infini-goal: Endless Goals Need Pacing",
      summary:
        "dsh-infini-goal reworks the official DSH goal into an endless objective with no round cap, a minimum trigger interval, and quiet windows. This introduction covers its event-sourced recovery semantics, three model tools and human command, authority boundaries, the bundle layer that disables the official goal by default, and the trade-offs in v0.2.1.",
    },
  },
  Body: { zh: DshInfiniGoalZh, en: DshInfiniGoalEn },
};
