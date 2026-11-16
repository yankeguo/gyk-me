/**
 * The `dsh-infini-goal` post, Chinese and English.
 *
 * A first-person note on endless goals: the empty loop that started it, the
 * durable continuation state, the interval and quiet windows that pace it, and
 * the authority boundary that keeps the model from owning the objective. The
 * two bodies make the same argument in their own words.
 */

import type { Post } from "./posts";

function DshInfiniGoalZh() {
  return (
    <>
      <p>
        有一次我把一个目标放在那儿过夜，第二天早上看到十几轮几乎一样的输出：模型每轮都去看一眼，说一句“还没有变化，继续等”，然后系统立刻开下一轮。它没做错，指令就是这么写的；但一个晚上过去，我付了钱，什么也没前进。
      </p>
      <p>
        DSH 官方的 <code>dsh-goal</code>{" "}
        已经解决了“让它自己接着跑”这件事。可跑起来之后，节奏的问题马上浮出来：agent
        一空闲就立刻开下一轮，中间没有任何东西挡一下；轮次有上限（默认
        256），真到了上限，一个还在推进的长期目标反而没法
        resume。恢复是另一道坎：官方的 <code>armed</code>／<code>disarmed</code>{" "}
        是进程内状态，会话恢复或者 fork 之后就解除了，得我手动再叫醒它。
      </p>
      <p>
        <strong>dsh-infini-goal</strong>{" "}
        改的就是这几处。它去掉轮次上限，把续跑状态写进会话，再加最小触发间隔和静默时段。这篇按
        v0.2.1 写，也包括它带来的成本和目前还没做好的地方。
      </p>

      <h2>无限之前，先解决节奏</h2>
      <p>
        官方 goal
        的弱点不是“有上限”，而是上限之外没有别的东西。驱动它的只有“agent
        空闲”这一个条件：最后一轮结束，立刻进下一轮。如果那一轮只是重复上一轮的结论，调度器看不出来，也不会等。256
        在这里更像一个计数器：数到就停，至于这一路上有多少轮是白跑的，它不管，而且顺带把一个真正需要长跑的活也截断了。
      </p>
      <p>
        所以这个项目没有把 256
        改成无穷大就完事。它得同时回答三件事：目标为什么还在，下一轮什么时候可以开始，以及哪些时段根本不该自动开始。
      </p>

      <h2>把续跑状态写进会话</h2>
      <p>
        现在没有 <code>maxGoalRounds</code> 了，<code>roundsStarted</code>{" "}
        只负责记已经开了多少轮，一直往上走。目标会保持 <code>active</code>
        ，直到被完成、暂停、阻塞或者清除。正式的 <code>phase</code> 只有四种：
        <code>active</code>、<code>paused</code>、<code>blocked</code>、
        <code>complete</code>。严格说 <code>cleared</code> 不算第五种：
        <code>clear</code> 是一个写入墓碑记录的动作，清完之后当前{" "}
        <code>goal</code> 是 <code>null</code>，轮次计数一起归零。
      </p>
      <p>
        每次变更都写成一条可忽略的 <code>plugin:infini-goal/change</code>{" "}
        会话插件记录。回放时会校验版本、字段、状态迁移、目标 id 和
        revision、轮次序号、时间戳，而不是把日志里的任意一段 JSON
        当成当前状态。自动轮次也带来源，必须跟当前目标和 revision 对得上，
        <code>roundsStarted</code> 才会往前走。这些记录会跟着 Session 的
        resume、fork 和 transport 一起走，浏览器读的是同一份{" "}
        <code>infiniGoal</code> projection。
      </p>
      <p>
        持久化的 <code>active</code>{" "}
        让“恢复之后继续”变成默认行为。这很方便，也有一个要记住的副作用：fork
        出来的子会话带着目标历史，也会继续跑。不想要这个效果，就先 pause 再
        fork。部署时可以把 <code>autoContinueOnStart</code> 设成{" "}
        <code>false</code>，这时已有的 active 目标会在启动或者 Agent
        创建时被持久化成 paused，等我去
        resume；注意它是真的写进日志，不是只在内存里按一下。
      </p>

      <h2>最小间隔与静默时段</h2>
      <p>
        第一道闸是 <code>minIntervalMs</code>
        ：两次自动轮次的开始时间至少隔这么久。默认一分钟，可以配一秒到三十天。首轮不用等，agent
        空闲、又不在静默时段就可以开始；之后从上一轮的开始时间往后算。它治的是“秒回秒触发”那种空循环，不负责判断这一轮到底有没有进展。
      </p>
      <p>
        第二道闸是 <code>quietWindows</code>。窗口按本地墙钟时间写，支持 IANA
        时区、ISO
        星期、跨午夜。星期过滤的是窗口开始那天；开始时刻包含，结束时刻不包含；多个窗口取并集；如果并集覆盖了全天、导致自动轮次永远触发不了，配置会被拒绝。
      </p>
      <p>
        一份部署默认值大概是这样：自动轮次至少隔一分钟，每天 22:00 到次日 06:00
        不触发，时区是 Asia/Shanghai。
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
        静默时段只挡自动触发，不暂停整个会话。人照样能发消息、调工具、看状态，普通对话不受影响。命中窗口时目标仍然是{" "}
        <code>active</code>，只是下一次触发推到窗口结束；这跟 paused、blocked
        不是一回事。窗口一过，调度自己接上。
      </p>

      <h2>三个工具，但目标不归模型管</h2>
      <p>
        模型侧只有三个工具：<code>get_infini_goal</code>{" "}
        读目标和下一次触发的计划，<code>create_infini_goal</code> 建目标，
        <code>update_infini_goal</code>{" "}
        做编辑、改配置、暂停、恢复、完成和阻塞。人这边可以直接用{" "}
        <code>/infini-goal</code>，省掉一次模型轮次：
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
        显示阶段、目标、轮次，以及最小间隔或者静默等待，旁边是暂停、恢复、清除。按钮其实只是发对应的{" "}
        <code>/infini-goal</code> 命令；界面读 Session
        projection，没有另开一套权限更高的 Remote
        API。目标完成或者不存在的时候，状态条不渲染。
      </p>
      <p>
        权限这块是我花时间最多的地方。创建目标，以及编辑、改节奏、暂停、恢复，都要求当前
        turn 里有一条直接来自人的消息；判断依据是 Session 事件和 root agent
        身份，不是模型说自己拿到了授权。只有 <code>complete</code> 和{" "}
        <code>blocked</code>{" "}
        多一种来源：当前目标的自动轮次本身可以授权，让模型在长跑里收尾。自动轮次里报
        blocked 还有一道默认至少三轮的门槛，人直接标记 blocked
        不受它限制。所以模型不能凭自己的念头创建或者改写目标，但可以在已经授权的持续推进里报告完成或者阻塞。
      </p>

      <h2>和官方 dsh-goal 的关系</h2>
      <p>
        两套东西在名字上不打架：官方是 <code>get_goal</code>、<code>/goal</code>
        、GoalBar；这边是 <code>*_infini_goal</code>、<code>/infini-goal</code>
        、InfiniGoalBar。技术上可以同时装，但主 bundle 默认只留 infini-goal
        这一套目标入口。
      </p>
      <p>
        装主 bundle 的时候，除了五个 infini-goal 行，还会加进一层普通的 bundle
        关闭层：停掉官方的轮次驱动和状态条，并从 shipped agent presets
        里过滤掉官方命令和工具。它没有复制 preset 快照，也没有往 profile
        里塞一段全局补丁；每一行在 Plugins 页面都能单独开关，整个 bundle
        关掉，官方 goal 模式就回来了。独立的{" "}
        <code>@yankeguo/dsh-disable-goal-bundle</code> 仍然留给那种“只想关官方
        goal、不装这套东西”的 profile，但两个 bundle 不要同时启用。
      </p>

      <h2>安装与兼容性</h2>
      <p>在 desktop profile 里装主 bundle：</p>
      <pre>
        <code>{`dsh plugin --profile desktop add @yankeguo/dsh-infini-goal-bundle`}</code>
      </pre>
      <p>
        项目在{" "}
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
        ，代码采用 MIT license。插件声明支持{" "}
        <code>DSH &gt;=0.2.2-rc.1 &lt;0.3.0</code>，状态条在桌面应用或{" "}
        <code>dsh web</code> 的 Web UI 里渲染。
      </p>
      <p>
        v0.2.1 本身改的是发布流程和展示元数据：staged
        publish，加上八个包的中英文插件简介。功能行为和 0.2.0
        一样，所以下面说的能力不是 0.2.1 新增的，而是当前版本的全貌。
      </p>

      <h2>代价和几个坑</h2>
      <p>
        最直接的成本是钱：每个自动轮次都是一次正常的模型 turn，消耗真实 token
        和额度。最小间隔只能压低频率，管不了总花费，也保证不了每轮都有进展。轮次上限拿掉之后，一个能验证的目标、清楚的完成条件，以及什么时候该暂停的打算，比参数本身更重要。
      </p>
      <p>
        每个 Session 同时只有一个 infini-goal，目标和轮次都归当前
        Session，插件不做跨 Session 的共享或汇总。恢复和 fork
        默认继续，这件事要主动管：不想复制执行就先
        pause。状态条上那个秒级倒计时是本地算的，可能有显示偏差，真正什么时候触发还是驱动器说了算。
      </p>
      <p>
        静默时段用的是配置里的本地时区，不是“服务器现在几点”的隐含假设。跨夏令时按墙钟推进；墙钟重复的那一段，保守包络可能让窗口多覆盖一个小时左右。最后，0.1.0
        写过的旧日志不会自动迁移到现在的插件记录格式，需要按文档用修复脚本一次性处理。这不是可以留到下次升级的细节：那些会话会直接拒绝被解释。
      </p>

      <h2>什么时候值得让它继续</h2>
      <p>
        如果任务一轮就能做完，普通对话就够了。如果只需要固定次数的自动跟进，官方
        goal 的轮次上限反而是一份更简单的预算。
      </p>
      <p>
        dsh-infini-goal
        适合另一种：目标本身要持续推进，完成条件说得清，同时我希望保留暂停、恢复和免打扰的安排。我理解的“无限目标”不是把人的决定权拿走，而是取消一个任意的轮次数字，把
        <strong>为什么继续、什么时候继续、什么时候停</strong>
        变成显式状态。能一直跑只是能力；能等、能恢复、也能被停下来，才让它适合长期用。
      </p>
    </>
  );
}

function DshInfiniGoalEn() {
  return (
    <>
      <p>
        I once left a goal running overnight and came back to a stack of nearly
        identical turns. Each one looked, reported that nothing had changed, and
        immediately started another. Nothing was broken; the instruction was
        simply being followed at the speed of an idle agent. I had paid for a
        night of activity and made no progress.
      </p>
      <p>
        DSH's official <code>dsh-goal</code> already handles the "keep going"
        part. What it does not handle is tempo. The driver starts another round
        the moment the agent goes idle, with nothing in between. Rounds are
        capped (<code>maxGoalRounds</code>, 256 by default), and a long goal
        that reaches the cap cannot resume. Recovery is the other rough edge:
        the official <code>armed</code>/<code>disarmed</code> state lives in the
        process, so restoring or forking a Session disarms it and a human has to
        wake it up again.
      </p>
      <p>
        <strong>dsh-infini-goal</strong> changes those parts. It removes the
        round cap, writes continuation into the Session, and adds a minimum
        interval and quiet windows. This is written against v0.2.1. "Endless"
        here means no preset round count, not that a goal should run forever,
        and the article includes what it costs.
      </p>

      <h2>Fix the pacing before going endless</h2>
      <p>
        The official goal's weakness is not that it has a cap. It is that the
        cap is the only brake. Idle triggers the next round, and a round that
        repeats the previous conclusion looks exactly like progress to the
        scheduler. A limit of 256 does not slow the loop down; it decides how
        long the waste may last before everything stops, and it stops a
        genuinely long piece of work at the same moment.
      </p>
      <p>
        So this project is not 256 replaced with infinity. It has to answer
        three questions at once: why the goal is still there, when the next
        round may start, and when it must not start at all.
      </p>

      <h2>Continuation lives in the Session</h2>
      <p>
        There is no <code>maxGoalRounds</code> now. <code>roundsStarted</code>{" "}
        counts the rounds that have begun and keeps counting. A goal stays{" "}
        <code>active</code> until it is completed, paused, blocked, or cleared.
        The formal <code>phase</code> has four values: <code>active</code>,{" "}
        <code>paused</code>, <code>blocked</code>, <code>complete</code>.{" "}
        <code>cleared</code> is not a fifth one. Clearing appends a tombstone,
        the current <code>goal</code> becomes <code>null</code>, and the round
        counters go back to zero.
      </p>
      <p>
        Every change is an ignorable <code>plugin:infini-goal/change</code>{" "}
        Session plugin record. Replay checks the version, the fields, the
        allowed transitions, the goal id and revision, the round sequence, and
        the timestamps; it does not accept whatever JSON happens to be in the
        log as the current state. Automatic rounds carry a source, and{" "}
        <code>roundsStarted</code> only advances when that source matches the
        current goal and revision. The records travel with the Session through
        resume, fork, and transport. The browser reads the same{" "}
        <code>infiniGoal</code> projection, so the status bar and the driver
        cannot quietly disagree.
      </p>
      <p>
        Durable <code>active</code> makes "continue after recovery" the default.
        It has a side effect: a forked child carries the goal history and keeps
        going too. Pause before forking if that is not what you want. A
        deployment can set <code>autoContinueOnStart</code> to{" "}
        <code>false</code>; existing active goals are then durably paused at
        startup or Agent creation and wait for a human resume. Durable is the
        important word — it is written to the log, not just held in memory.
      </p>

      <h2>A minimum interval and quiet windows</h2>
      <p>
        The first brake is <code>minIntervalMs</code>: two automatic rounds must
        start at least that far apart. One minute by default; the accepted range
        is a second to thirty days. The first round does not wait. It starts
        when the agent is idle and no quiet window is in the way; later triggers
        count from the previous start. This is aimed squarely at the
        reply-then-trigger-again loop. It does not know whether a round made
        progress.
      </p>
      <p>
        The second brake is <code>quietWindows</code>, written in local wall
        time, with IANA time zones, ISO weekdays, and midnight crossing. The
        weekday filter applies to the day the window starts. Start is inclusive,
        end is exclusive. Windows form a union. A configuration that covers
        every local hour and would therefore never allow an automatic round is
        rejected.
      </p>
      <p>
        Deployment defaults along these lines give a one-minute floor, no
        automatic rounds between 22:00 and 06:00, and Asia/Shanghai as the zone:
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
        A quiet window gates automatic triggers only. It does not suspend the
        Session: messages, tools, and status all work, and ordinary conversation
        is not blocked. During the window the goal is still <code>active</code>;
        the next trigger is pushed to the end of the window, which is a
        different state from paused or blocked. When the window ends, the
        schedule picks up again.
      </p>

      <h2>Three tools, and none of them owns the goal</h2>
      <p>
        The model sees three tools. <code>get_infini_goal</code> reads the goal
        and the next trigger plan, <code>create_infini_goal</code> creates one,
        and <code>update_infini_goal</code> edits, configures, pauses, resumes,
        completes, or blocks. A person can skip the model entirely with{" "}
        <code>/infini-goal</code>:
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
        The InfiniGoalBar above the composer shows phase, objective, round
        count, and either the interval or the quiet-wait, with pause, resume,
        and clear beside it. The buttons only submit the matching command. The
        interface reads a Session projection and there is no separate privileged
        Remote API. A completed or missing goal renders no bar at all.
      </p>
      <p>
        Authority took the most thought. Creating a goal, editing it, changing
        its pacing, pausing, and resuming all require a direct human message in
        the current turn. The check reads Session events and root-agent
        identity, not the model's claim that it was allowed.{" "}
        <code>complete</code> and <code>blocked</code> have one extra source: an
        automatic round of the current goal can authorize them, so a long run
        can end itself. An automatic blocked report also has a default threshold
        of at least three rounds; a human block is not limited by it. The model
        cannot start or rewrite a goal on its own. Within the continuation it
        has already been given, it can report that the goal is done or stuck.
      </p>

      <h2>How it sits next to dsh-goal</h2>
      <p>
        The names do not collide. The official system uses <code>get_goal</code>
        , <code>/goal</code>, and GoalBar; this one uses{" "}
        <code>*_infini_goal</code>, <code>/infini-goal</code>, and
        InfiniGoalBar. Technically they can be installed together. The main
        bundle, by default, leaves only infini-goal as the goal interface.
      </p>
      <p>
        Installing it adds five infini-goal rows and an ordinary bundle disable
        layer. The layer stops the official round driver and status bar, and
        filters the official command and tools out of the shipped agent presets.
        It does not copy a preset snapshot and it does not write a global patch
        into the profile. Every row can be toggled individually on the Plugins
        page; disable the whole bundle and the official goal comes back. The
        standalone <code>@yankeguo/dsh-disable-goal-bundle</code> is still there
        for profiles that only want the official goal off, without the rest. Do
        not run both bundles at once.
      </p>

      <h2>Install and compatibility</h2>
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
        v0.2.1 itself changed the release pipeline and the display metadata:
        staged publishing, plus Chinese and English descriptions for all eight
        packages. Functional behaviour is the same as 0.2.0, so what follows
        describes the current surface rather than a list of 0.2.1 features.
      </p>

      <h2>The bill, and the sharp edges</h2>
      <p>
        Every automatic round is a normal model turn, and it spends real tokens
        and quota. The minimum interval lowers the rate; it does not cap the
        total and it does not promise that a round is worth running. Once the
        round limit is gone, a verifiable objective, a clear completion
        condition, and a decision about when to pause matter more than any
        parameter.
      </p>
      <p>
        Each Session has exactly one infini-goal, and the goal and its rounds
        belong to that Session. There is no sharing or aggregation across
        Sessions. Restore and fork continue by default, which is a thing to
        manage rather than enjoy: pause first if a fork would duplicate
        execution. The countdown in the status bar is computed locally each
        second and may drift visibly; the driver decides the actual trigger.
      </p>
      <p>
        Quiet windows use the configured local time zone rather than an implicit
        server clock. They follow wall time across daylight saving, and the
        conservative envelope around a repeated wall time can extend a window by
        about an hour. Last, logs written by 0.1.0 are not migrated to the
        current plugin-record format. They need the documented one-time repair;
        it is not a detail to defer, because those Sessions will refuse to be
        interpreted.
      </p>

      <h2>When it is worth letting a goal continue</h2>
      <p>
        If a task fits in one turn, ordinary conversation is enough. If it needs
        a fixed number of follow-ups, the official goal's round cap is a simpler
        budget.
      </p>
      <p>
        dsh-infini-goal fits the other case: the objective genuinely needs
        continued work, the completion condition is clear, and I still want
        pause, resume, and quiet hours. I do not read "endless goal" as removing
        the human. It removes an arbitrary round number and makes{" "}
        <strong>why to continue, when to continue, and when to stop</strong>{" "}
        explicit state. Running forever is the capability. Waiting, recovering,
        and being stoppable are what make it usable for long work.
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
        "dsh-infini-goal 把官方 dsh-goal 的自动续跑改成没有轮次上限、有最小触发间隔和静默时段的长期目标。这篇写它为什么先解决节奏再谈无限，续跑状态怎么落进会话，模型能做什么、不能做什么，以及一直跑下去的代价。",
    },
    en: {
      title: "dsh-infini-goal: Endless Goals Need Pacing",
      summary:
        "dsh-infini-goal reworks the official DSH goal into a long-running objective with no round cap, a minimum interval, and quiet windows. This is why pacing comes before endlessness, how continuation state lives in the Session, what the model may and may not do, and what running indefinitely actually costs.",
    },
  },
  Body: { zh: DshInfiniGoalZh, en: DshInfiniGoalEn },
};
