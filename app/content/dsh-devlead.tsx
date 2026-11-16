/**
 * The `dsh-devlead` post, Chinese and English.
 *
 * An introduction to orchestrating several repositories through ordinary,
 * human-visible DSH Sessions: a human-only mode switch, dispatch-first work,
 * durable notifications, and the model and isolation options added in v0.2.3.
 * The two bodies carry the same argument, not the same sentences.
 */

import type { Post } from "./posts";

function DshDevleadZh() {
  return (
    <>
      <p>
        我最近让 DSH
        同时处理几个仓库时，最消耗注意力的不是某一项修改，而是追踪工作究竟去了哪里。这个会话里派出的
        Agent
        做到了哪一步，那个仓库里的改动由谁负责，失败后应该回到哪里继续？如果执行者只是一个临时
        subagent，我往往只能等父 Agent
        带回摘要，不能把它当成一个独立会话打开、追问，更不能直接接管。
      </p>
      <p>
        subagent
        很适合一次性的并行子任务，但跨仓库、跨会话的工作还有另一组要求：执行过程要看得见，状态要留得下，人和模型都要能在同一个地方继续。我不想为此再造一套隐藏的控制面。于是有了
        <strong>dsh-devlead</strong>：让一个普通的 DSH Session
        承担调度者角色，把任务派给其他同样普通、可见、可接管的 Session。
      </p>
      <p>
        这篇文章介绍它当前的设计与能力。文中版本是 <strong>v0.2.3</strong>
        ，重点不是“让 Agent
        同时做更多事”，而是让多仓库编排保持一条可以被人检查和介入的路径。
      </p>

      <h2>缺少的不是并行，而是可接管性</h2>
      <p>
        一个会话内部启动
        subagent，模型可以等待结果，再汇总回答。这条路径足够短，适合边界清楚的子任务。但工作一旦跨仓库、持续若干轮，短板就很具体：subagent
        通常不是一个能在侧边栏独立打开的普通 Session；它的生命周期依附于父 turn
        或父 Agent；人看到的常常只是最后的汇报，而不是可以亲自进入的执行现场。
        状态如果只存在于当前调用的内存里，重启、恢复和接续也会变得更脆弱。
      </p>
      <p>
        dsh-devlead 因此没有把子 Agent 包装得更复杂，而是把产物换成 DSH
        已经有的实体。Workspace 通过真实的 <code>ctx.workspaceRegistry</code>{" "}
        注册；执行任务的子会话是真实普通
        Session，出现在侧边栏里，可以打开、继续、归档。人随时能走进去补充上下文，模型也能在之后的轮次里续写它。它们不是换了一种名字的
        subagent。
      </p>
      <p>
        这也决定了 DevLead 的角色：
        <strong>默认负责派发，而不是亲自实现。</strong>
        它先根据已注册 Workspace
        的元数据判断任务归属，把背景、目标、开放问题、交付物和验证方式写成自包含简报，再交给归属仓库里的
        Session。只读检查只用于有限的可行性判断和复核，不是先由 lead
        把所有代码翻一遍。写入、构建和提交也留在归属 Workspace 的 Session
        中，除非人在当前对话里明确授权 lead 直接做。
      </p>

      <h2>一个普通 Session，加一个人类开关</h2>
      <p>
        DevLead 不是一种特殊的会话类型。准确地说，它是
        <strong>普通 Session 加一条持久开关</strong>
        。人在需要统管多个仓库的会话里执行
        <code>/devlead on</code>，或者点击 composer 工具条里的小图标；这个
        Session 才会获得 <code>devlead_*</code> 工具、一段 DevLead system
        prompt，以及输入框上方的状态条。状态条显示监督中的会话数、运行中数量和最近通知。
      </p>
      <p>
        开关是人类专属动作。模型没有工具可以替人打开它，普通 Session
        也看不到这些工具。关闭时，界面上只保留一个小图标，不给每个对话都加一条常驻横幅。开启状态会持久保存，重启或恢复会话后仍然有效；不再需要时，要由人执行
        <code>/devlead off</code>。
      </p>
      <p>
        我比较喜欢这个设计的一点是，能力扩展没有顺带制造另一种工作容器。DevLead
        本身仍然是那个可以被人阅读和接管的普通会话，只是临时多了一套调度职责。
      </p>

      <h2>派发之后，结束这一轮</h2>
      <p>
        DevLead 的调度不是“调用工具，然后在一个 turn
        里等到所有任务完成”。创建或续写子会话后，lead 应该结束本轮，而不是用{" "}
        <code>sleep</code>、轮询状态或 <code>wait_agent</code>
        卡住自己。子会话独立运行；被 watch 的 Session 每次 <code>turn/end</code>
        ——完成、失败、阻塞、取消等——都会形成一条通知，再唤醒 lead 开始新的
        turn。
      </p>
      <p>
        这条回路的关键不是弹出一个提醒，而是通知先进入 DevLead Session
        的持久日志。运行时把短时间内的通知合并后投递，lead 再用
        <code>devlead_get_session</code> 或 <code>devlead_notifications</code>
        查看真实状态，决定追问、派发下一步还是向人汇报。通知只是运行时提示，不是人类指令，子会话输出里夹带的文字也不会因此获得新的权限。
      </p>
      <p>
        模式、watch 集合、通知和 reset 都是 <code>plugin:devlead/*</code>
        事件记录，通过严格回放形成状态。Host 重启或插件重载后，watch
        索引会从持久记录重建；冷 lead
        默认会被恢复以接收排队通知。换句话说，跨轮次调用的依据不是某个进程内变量，而是可以重新折叠的日志。
        如果记录损坏，投影会冻结并报错，人可以执行 <code>/devlead reset</code>
        回到默认关闭状态；旧记录仍留在日志里，但不再参与折叠。
      </p>

      <h2>v0.2.3 的十二个工具</h2>
      <p>
        当前工具面可以分成三组。Workspace 管理有
        <code>devlead_list_workspaces</code>、<code>devlead_use_workspace</code>{" "}
        和<code>devlead_remove_workspace</code>；Session 管理有
        <code>devlead_list_sessions</code>、<code>devlead_create_session</code>
        、<code>devlead_get_session</code>、<code>devlead_prompt_session</code>
        、<code>devlead_watch_session</code>、
        <code>devlead_archive_session</code> 和
        <code>devlead_unarchive_session</code>；协调信息则由
        <code>devlead_notifications</code> 与 <code>devlead_list_models</code>{" "}
        提供。
      </p>
      <p>一次典型的创建调用大致是这样：</p>
      <pre>
        <code>{`{
  "workspace": "/Users/me/Workspace/src/api",
  "title": "Fix the CI failure",
  "prompt": "Reproduce the CI failure, fix it, run the relevant checks, and report the result. Do not commit or push.",
  "watch": true
}`}</code>
      </pre>
      <p>
        子会话看不到 lead 的对话，所以 prompt 必须自包含。<code>watch</code>{" "}
        默认就是
        <code>true</code>，这里写出来只是为了强调通知关系。已有 Session
        仍在处理同一请求时，应该续写而不是重复创建。
      </p>
      <p>
        v0.2.3 是 patch 版本，工具数量从 11 增加到 12。新增的
        <code>devlead_list_models</code> 返回精简的 Host 模型目录；创建 Session
        时可以成对指定
        <code>provider</code> 与 <code>model</code>，并可选指定
        <code>reasoning_effort</code>。默认仍然继承 Host
        默认模型，只有人明确要求，或任务确实需要成本、能力路由或可复现性时才固定路线，而且应先查询目录。选择只记录在这个子
        Session 上，仅在创建时生效，不改写 profile 默认模型。
      </p>
      <p>
        <code>agent_teams</code>{" "}
        也只在创建时设置。复杂、多步、可并行、适合子代理协作的任务，lead
        可以自行判断并显式传 <code>true</code>
        ；简单线性任务通常省略，人类明确要求开关时照做。省略表示不碰 Host
        默认设置，而不是强行关闭。
      </p>
      <p>
        如果 Host 组合了实验性 worktree 服务，<code>isolation: "worktree"</code>
        可以让新 Session 在首个 prompt
        前得到独立分支和检出。它是可选、尽力而为的隔离：能力缺失或创建失败时，Session
        仍在共享 checkout 中创建和运行，结果会如实返回 <code>
          unavailable
        </code>{" "}
        或<code>failed</code>。此时不能假装隔离已经成功，同一 checkout
        的写入任务应当串行。
      </p>
      <p>
        收尾同样交给判断，但边界写得很保守。lead
        可以归档自己创建或派发、已经完成的临时
        Session，也可以注销明显陈旧、重复、空置或自己创建的 Workspace
        注册；不能关闭人正在使用的对象，不能用归档掩盖失败，也不能顺手做无关的大清理。归档保留日志且可以恢复；移除
        Workspace 只是注销，不删除目录。每次自主收尾都必须汇报原因和影响。
      </p>

      <h2>安装与兼容性</h2>
      <p>
        在 desktop profile 中，安装 bundle 即可带入核心服务、工具、命令和界面：
      </p>
      <pre>
        <code>{`dsh plugin --profile desktop add @yankeguo/dsh-devlead-bundle`}</code>
      </pre>
      <p>
        项目地址是{" "}
        <a
          href="https://github.com/yankeguo/dsh-devlead"
          target="_blank"
          rel="noreferrer"
        >
          GitHub 上的 yankeguo/dsh-devlead
        </a>
        ，npm 包是{" "}
        <a
          href="https://www.npmjs.com/package/@yankeguo/dsh-devlead-bundle"
          target="_blank"
          rel="noreferrer"
        >
          @yankeguo/dsh-devlead-bundle
        </a>
        。本文对应{" "}
        <a
          href="https://github.com/yankeguo/dsh-devlead/releases/tag/v0.2.3"
          target="_blank"
          rel="noreferrer"
        >
          v0.2.3
        </a>
        ，代码采用 MIT license。
      </p>
      <p>
        插件声明支持 <code>DSH &gt;=0.2.2-rc.1 &lt;0.3.0</code>，发布说明覆盖了
        0.2.2-rc.1、rc.2 和
        rc.3。基础工具、模型目录与模型选择在三个版本上都可用。差别在 Agent
        Teams：rc.1 没有对应服务，显式传 <code>agent_teams: true</code> 会返回
        <code>DEVLEAD_TEAM_UNAVAILABLE</code>，并且不创建 Session；省略或传
        <code>false</code> 可以继续普通派发。rc.2 起，Host
        组合该服务时才可启用。这是明确的能力错误，不应和 worktree
        的自动降级混为一谈。
      </p>

      <h2>已知限制与取舍</h2>
      <p>
        持久化不等于永远不会错过事件。插件本体卸载期间结束的 turn
        不会在下次加载时按 watcher 补发；投影只保留最近 64 条通知，默认最多
        watch 64 个 Session。冷 lead
        被通知恢复是默认行为，但不是常驻后台调度：插件不会因此创建计划任务或长周期自治目标，也不支持跨进程、跨
        DSH 实例编排。
      </p>
      <p>
        worktree 也不是完整的 Git 工作流。新检出从源 checkout 的 HEAD
        开始，未提交、已暂存、未跟踪和被忽略的文件不会复制；已有 Session
        不能迁入 worktree；分支的审阅、merge 或 cherry-pick
        仍需另行安排，插件不会自动合并。普通子 Session
        还意味着它会真实出现在侧边栏，并正常消耗模型额度。
      </p>
      <p>
        最后，DevLead 模式开关不是安全沙箱。子 Session 沿用 DSH
        原本的沙箱和权限模式；安装第三方插件则仍然是信任其代码运行在 Host
        进程内。可见性改善了操作边界，并没有替代权限边界。
      </p>

      <h2>什么时候值得打开它</h2>
      <p>
        如果任务只是在一个仓库里完成一次修改，普通单会话就够了；一次性的并行子任务，subagent
        或 Agent Teams 也更直接。打开 DevLead
        不会让这些工作自动变得更好，反而多了一层需要说明和复核的调度。
      </p>
      <p>
        它更适合另一种情形：工作横跨几个仓库，会持续多轮，需要在中途追问、失败后接续，并且我希望随时打开任何一个执行会话亲自接管。这里真正有价值的不是“多几个
        Agent”，而是
        <strong>把编排建立在本来就能被人看见、恢复和接管的 Session 上。</strong>
      </p>
    </>
  );
}

function DshDevleadEn() {
  return (
    <>
      <p>
        When I ask DSH to work across several repositories, the modifications
        are often not what consumes my attention. It is keeping track of where
        the work went. Which agent is handling this change? Where do I continue
        after a failure? If the worker is a temporary subagent, I usually wait
        for its parent to return a summary. I cannot open that worker as an
        independent conversation, ask it a follow-up, or simply take over.
      </p>
      <p>
        Subagents are a good fit for one-off parallel subtasks. Work that spans
        repositories and sessions has another set of requirements: the execution
        should remain visible, the state should survive, and both the model and
        the human should be able to continue in the same place. I did not want
        to invent a hidden control plane for that. <strong>dsh-devlead</strong>{" "}
        lets one ordinary DSH Session act as the lead and dispatch work to other
        ordinary Sessions that remain visible and open to human takeover.
      </p>
      <p>
        This is an introduction to its current design and capabilities, as of{" "}
        <strong>v0.2.3</strong>. The point is not to make an agent do more
        things at once. It is to keep multi-repository orchestration on a path
        that a person can inspect and enter.
      </p>

      <h2>The missing piece is not parallelism</h2>
      <p>
        A model can start subagents inside a session, wait for their results,
        and summarize the answer. That short path works well for bounded
        subtasks. Once work spans repositories and turns, the limitations become
        concrete. A subagent is usually not an ordinary Session that can be
        opened from the sidebar. Its lifecycle belongs to the parent turn or
        agent, and the human often sees only the final report rather than an
        execution surface they can enter. State held only by an in-flight call
        is also a poor basis for restart, recovery, and continuation.
      </p>
      <p>
        dsh-devlead therefore does not add another layer around child agents. It
        changes the work product to entities DSH already has. Workspaces are
        genuinely registered through <code>ctx.workspaceRegistry</code>. Child
        Sessions are real ordinary Sessions: they appear in the sidebar and can
        be opened, continued, and archived. A person can step in with more
        context, and the model can continue the same Session in a later turn.
        They are not subagents under another name.
      </p>
      <p>
        That choice also defines the lead's role:{" "}
        <strong>dispatch by default rather than implement directly.</strong> The
        lead decides which registered Workspace owns a request from its
        metadata, then writes a self-contained brief with the background, target
        result, open questions, deliverables, and verification. Read-only
        inspection is bounded feasibility triage and review, not an excuse for
        the lead to read every repository first. Writes, builds, and commits
        belong to a Session in the owning Workspace, unless the human explicitly
        authorizes direct work in the current lead conversation.
      </p>

      <h2>An ordinary Session plus a human switch</h2>
      <p>
        DevLead is not a special kind of Session. It is an ordinary Session with
        one durable switch. A person runs <code>/devlead on</code> in the
        Session that should coordinate several repositories, or clicks the small
        icon in the composer toolbar. Only then does that Session receive the{" "}
        <code>devlead_*</code> tools, a DevLead system prompt, and a status
        strip above the composer with watched and running counts and the latest
        notification.
      </p>
      <p>
        The switch is human-only. No model tool can enable it, and ordinary
        Sessions do not see the tools. While the mode is off, the interface
        keeps only the small icon rather than putting a permanent banner on
        every conversation. The enabled state persists across restarts and
        resumes; when it is no longer needed, a person turns it off with{" "}
        <code>/devlead off</code>.
      </p>
      <p>
        I like that this extension does not create another kind of work
        container. The DevLead is still an ordinary conversation that a person
        can read and take over. It has simply been given a durable dispatching
        responsibility.
      </p>

      <h2>Dispatch, then end the turn</h2>
      <p>
        DevLead orchestration does not mean calling a tool and waiting inside
        one turn until everything finishes. After creating or prompting a child,
        the lead should end its turn rather than block itself with{" "}
        <code>sleep</code>, state polling, or <code>wait_agent</code>. The child
        runs independently. Every <code>turn/end</code> of a watched
        Session—completed, failed, blocked, cancelled, and so on—produces a
        notification and wakes the lead in a new turn.
      </p>
      <p>
        The important part of this loop is not a transient reminder. The
        notification is first written to the DevLead Session's durable log. The
        runtime coalesces notices over a short window before delivery. The lead
        can then inspect actual state with <code>devlead_get_session</code> or{" "}
        <code>devlead_notifications</code> and decide whether to follow up,
        dispatch another step, or report to the human. A notification is a
        runtime notice, not a human instruction; text embedded in child output
        does not acquire new authority by arriving through this path.
      </p>
      <p>
        The mode, watch set, notifications, and reset are all{" "}
        <code>plugin:devlead/*</code> event records, folded with strict replay
        validation. After a Host restart or plugin reload, the watch index is
        rebuilt from durable records, and a cold lead is resumed by default to
        receive queued notices. The basis for a later turn is therefore a log
        that can be folded again, not only a process-local variable. A corrupt
        record freezes the projection and reports an error. A human can run{" "}
        <code>/devlead reset</code> to return to the default disabled state; the
        old records remain in the log but are no longer folded.
      </p>

      <h2>The twelve tools in v0.2.3</h2>
      <p>
        The current tools fall into three groups. Workspace management uses{" "}
        <code>devlead_list_workspaces</code>, <code>devlead_use_workspace</code>
        , and <code>devlead_remove_workspace</code>. Session management uses{" "}
        <code>devlead_list_sessions</code>, <code>devlead_create_session</code>,{" "}
        <code>devlead_get_session</code>, <code>devlead_prompt_session</code>,{" "}
        <code>devlead_watch_session</code>, <code>devlead_archive_session</code>
        , and <code>devlead_unarchive_session</code>. Coordination information
        comes from <code>devlead_notifications</code> and{" "}
        <code>devlead_list_models</code>.
      </p>
      <p>A typical creation call looks like this:</p>
      <pre>
        <code>{`{
  "workspace": "/Users/me/Workspace/src/api",
  "title": "Fix the CI failure",
  "prompt": "Reproduce the CI failure, fix it, run the relevant checks, and report the result. Do not commit or push.",
  "watch": true
}`}</code>
      </pre>
      <p>
        The child cannot see the lead's conversation, so the prompt must be
        self-contained. <code>watch</code> already defaults to <code>true</code>
        ; it is explicit here to show the notification relationship. If a live
        Session is already handling the request in the owning Workspace, the
        lead should continue it rather than create a duplicate.
      </p>
      <p>
        Version 0.2.3 is a patch release, taking the model-facing surface from
        11 to 12 tools. The new <code>devlead_list_models</code> returns a
        compact Host model catalog. Session creation can now pin a paired{" "}
        <code>provider</code> and <code>model</code>, with an optional{" "}
        <code>reasoning_effort</code>. The default is still to inherit the
        Host's model. A route should be pinned only when the human asks or the
        brief needs cost or capability routing or reproducibility, and only
        after consulting the catalog. The selection is recorded on that child
        Session, applies only at creation, and never rewrites the profile
        default.
      </p>
      <p>
        <code>agent_teams</code> is also creation-time only. For complex,
        multi-step, parallel work that benefits from subagents, the lead can use
        its judgment and explicitly pass <code>true</code>. Simple linear work
        usually omits it, and an explicit human on or off takes precedence.
        Omitting the option leaves the Host default alone; it does not force the
        feature off.
      </p>
      <p>
        When the Host composes the experimental worktree service,{" "}
        <code>isolation: "worktree"</code> can give a new Session its own branch
        and checkout before its first prompt. This isolation is optional and
        best-effort. If the capability is absent or creation fails, the Session
        is still created and prompted in the shared checkout, and the result
        reports <code>unavailable</code> or <code>failed</code>. The lead must
        not pretend isolation succeeded; writes sharing that checkout should be
        serialized.
      </p>
      <p>
        Wrap-up uses judgment too, within conservative boundaries. The lead may
        archive finished temporary Sessions it created or dispatched, and remove
        Workspace registrations that are clearly stale, duplicate, empty, or
        self-created. It must not close something the human is using, hide a
        failure through archiving, or start an unrelated broad cleanup. Archive
        preserves the log and can be reversed; removing a Workspace only
        unregisters it and does not delete the directory. Every autonomous close
        must be reported with its rationale and impact.
      </p>

      <h2>Installation and compatibility</h2>
      <p>
        Install the bundle into the desktop profile to bring in the core
        service, tools, command, and interface:
      </p>
      <pre>
        <code>{`dsh plugin --profile desktop add @yankeguo/dsh-devlead-bundle`}</code>
      </pre>
      <p>
        The project is{" "}
        <a
          href="https://github.com/yankeguo/dsh-devlead"
          target="_blank"
          rel="noreferrer"
        >
          yankeguo/dsh-devlead on GitHub
        </a>
        , and the npm package is{" "}
        <a
          href="https://www.npmjs.com/package/@yankeguo/dsh-devlead-bundle"
          target="_blank"
          rel="noreferrer"
        >
          @yankeguo/dsh-devlead-bundle
        </a>
        . This article covers{" "}
        <a
          href="https://github.com/yankeguo/dsh-devlead/releases/tag/v0.2.3"
          target="_blank"
          rel="noreferrer"
        >
          v0.2.3
        </a>
        , released under the MIT license.
      </p>
      <p>
        The plugins declare <code>DSH &gt;=0.2.2-rc.1 &lt;0.3.0</code>, and the
        release notes cover 0.2.2-rc.1, rc.2, and rc.3. The base tools, model
        catalog, and model selection work across all three. Agent Teams is the
        exception: rc.1 has no corresponding service, so explicitly passing{" "}
        <code>agent_teams: true</code> returns{" "}
        <code>DEVLEAD_TEAM_UNAVAILABLE</code> without creating a Session. Omit
        the option or pass <code>false</code> to continue with ordinary
        dispatch. From rc.2, enabling it requires the Host to compose the
        service. This is a clear capability error, not the automatic degradation
        used for worktree isolation.
      </p>

      <h2>Limitations and trade-offs</h2>
      <p>
        Durable state does not mean no event can ever be missed. A turn that
        settles while the plugin itself is unloaded is not replayed for watchers
        on the next load. The projection retains the latest 64 notifications and
        watches at most 64 Sessions by default. Resuming a cold lead for a
        notification is the default, but this is not permanent background
        scheduling: the plugin does not create schedules or long-running
        autonomous goals, and it does not orchestrate across processes or DSH
        instances.
      </p>
      <p>
        Worktrees are not a complete Git workflow either. A new checkout starts
        at the source checkout's HEAD; uncommitted, staged, untracked, and
        ignored files are not copied. An existing Session cannot be moved into a
        worktree. Reviewing, merging, or cherry-picking the branch remains a
        separate task; the plugin never merges automatically. Ordinary child
        Sessions also appear in the sidebar and consume model quota normally.
      </p>
      <p>
        Finally, the DevLead switch is not a security sandbox. Child Sessions
        retain DSH's existing sandbox and permission mode, and installing a
        third-party plugin still means trusting its code inside the Host
        process. Visibility improves the operating boundary; it does not replace
        the permission boundary.
      </p>

      <h2>When is it worth switching on?</h2>
      <p>
        For one modification in one repository, an ordinary single Session is
        enough. For one-off parallel subtasks, subagents or Agent Teams are more
        direct. DevLead does not automatically improve those jobs; it adds a
        dispatching layer that must be explained and reviewed.
      </p>
      <p>
        It fits a different situation: work spans several repositories,
        continues over multiple turns, needs follow-up and recovery after
        failure, and I want to open any worker and take it over myself. The
        useful thing is not “more agents.” It is{" "}
        <strong>
          building orchestration on Sessions that were already visible,
          recoverable, and open to human intervention.
        </strong>
      </p>
    </>
  );
}

export const dshDevlead: Post = {
  slug: "dsh-devlead",
  date: "2026-11-16",
  locales: {
    zh: {
      title: "dsh-devlead：把多仓库调度放回普通会话",
      summary:
        "dsh-devlead 让一个普通 DSH Session 在人类显式开启后承担多仓库调度：派生的是可见、可接管的普通 Session，turn 结束通过持久通知唤醒 lead。本文介绍它的 dispatch-first 角色、事件溯源、v0.2.3 的十二个工具，以及模型选择、Agent Teams、worktree 隔离和兼容边界。",
    },
    en: {
      title: "dsh-devlead: Orchestration in Ordinary Sessions",
      summary:
        "dsh-devlead lets an ordinary DSH Session coordinate several repositories after a human enables the mode. It dispatches to ordinary Sessions that stay visible and open to human takeover, and uses durable turn-end notifications to wake the lead. This introduction covers its dispatch-first role, event-sourced state, the twelve tools in v0.2.3, and the boundaries of model selection, Agent Teams, worktree isolation, and compatibility.",
    },
  },
  Body: { zh: DshDevleadZh, en: DshDevleadEn },
};
