/**
 * The `dsh-devlead` post, Chinese and English.
 *
 * A first-person note on why the plugin exists: dispatch from an ordinary
 * Session to ordinary Sessions, a switch only a human can flip, and the
 * notification loop that ends the waiting. The two bodies make the same
 * argument in their own words rather than translating each other.
 */

import type { Post } from "./posts";

function DshDevleadZh() {
  return (
    <>
      <p>
        三个仓库一起动的时候，我最早的办法是开三个会话，然后自己在中间跑。改完一个切过去看下一个，谁卡住了就去问谁。切窗口本身不累，累的是记住每件事停在哪一步：那边
        CI 挂了没有，这边 README
        补到一半的那句话是不是还在等一个结论。一天下来，真正写完的代码没多少，倒是一直在做转述。
      </p>
      <p>
        后来我试过让一个会话开 subagent 去办。活能干完，但子 agent
        对我来说更像个黑盒：我等它回来交一份总结，想追问一句“为什么这么改”，还得让父会话再翻译一遍。活一拖就是好几轮，到第三轮，我自己也说不清当初的来龙去脉被压缩成了哪几句话。
      </p>
      <p>
        <strong>dsh-devlead</strong> 就是从这个别扭里长出来的。它没有把子 agent
        包得更聪明，只做了一件事：让调度发生在一个普通会话里，派出去的东西也是普通会话。这篇写的是
        v0.2.3，包括它为什么默认只派活不写代码、通知怎么把 lead
        叫醒，以及哪些地方我到现在也没解决。
      </p>

      <h2>并行不是难点，进不去才是</h2>
      <p>
        subagent 的前提是“一个 turn
        内解决一个边界清楚的子任务”。这个前提大多数时候成立，所以它快。但它也意味着子任务的生命周期挂在父
        turn 上：父会话结束，子 agent
        也就散了。它通常不会作为一个能单独打开的会话出现在侧边栏里，你看不到它中间做了什么，只能看它最后说了什么。
      </p>
      <p>
        跨仓库的工作不满足这个前提。它要跑很多轮，中间会失败、会卡在等人确认、会因为上游改了接口而掉头。这些时候我想做的往往不是“再派一个”，而是打开那个会话，补一句上下文，或者干脆自己接手。所以问题不是并行不够，而是并行出来的东西我进不去。
      </p>
      <p>
        dsh-devlead 的做法是换产物，不是加包装。子会话是真的普通
        Session：在侧边栏里，能打开、能续写、能归档。Workspace 也是真的走{" "}
        <code>ctx.workspaceRegistry</code>{" "}
        注册，不是插件自己维护的一份目录。人随时能走进去，模型也能在后面的轮次里接着用同一个会话。
      </p>
      <p>
        这也顺带定下了 lead 的角色：<strong>默认只派活。</strong>它先看已注册
        Workspace
        的元数据，判断这事归谁，然后把背景、目标、还没定的问题、交付物、怎么验证写成一封自包含的简报，交给那个仓库里的会话。它可以做一点只读检查，用来判断可行性和复核结论，但不会先把别人的代码翻一遍再动手。写文件、构建、提交都留在归属仓库的会话里，除非我在当前对话里明确说“你直接改”。
      </p>

      <h2>这道开关只能由人拨</h2>
      <p>
        DevLead
        不是另一种会话类型。准确地说，它是一个普通会话多了一条持久开关。我在需要统管几个仓库的那个会话里敲{" "}
        <code>/devlead on</code>，或者点 composer
        工具条上的小图标，这个会话才多出 <code>devlead_*</code> 工具、一段
        DevLead system
        prompt，以及输入框上方那条状态条。状态条上有监督中的会话数、正在跑的数量，和最近一条通知。
      </p>
      <p>
        开关是人的动作，模型没有工具能替自己打开。这一点是我刻意留的：一个会话要不要获得操纵其他会话的能力，应该由人决定，而不是由模型在某次推理里觉得“这样更高效”。没开的时候，界面上只有那个小图标，不会在每个对话顶上挂一条横幅。开了之后它是持久的，重启、恢复都还在；不想要了，得我自己{" "}
        <code>/devlead off</code>。
      </p>
      <p>
        我比较满意的是它没有制造出第二种工作容器。DevLead
        会话还是那个会话，我照样能在里面读、能接管，只是它临时多了一份调度的活。
      </p>

      <h2>派完就结束这一轮</h2>
      <p>
        这里有一条和很多人的直觉相反的约定：派完活，lead
        应该结束本轮。不是调完工具就在同一个 turn 里 <code>sleep</code>
        ，也不是反复 <code>devlead_list_sessions</code> 去看进度，更不是拿{" "}
        <code>wait_agent</code> 卡住自己等子会话。子会话本来就是独立跑的，lead
        占着这个 turn 没有任何好处，只会让对话看起来像卡死了。
      </p>
      <p>
        唤醒靠通知。被 watch 的会话每次 <code>turn/end</code>
        ——完成、失败、阻塞、取消都算——运行时会往 lead
        的日志里写一条通知；短时间内的几条先合并（默认 400ms
        的窗口），再以一条消息把 lead 叫醒，开一个新的 turn。醒来之后用{" "}
        <code>devlead_get_session</code> 或 <code>devlead_notifications</code>{" "}
        看真实状态，再决定是追问、派下一步，还是直接向我汇报。
      </p>
      <p>
        通知先落日志，这一点比它看起来重要。它不是一次性的桌角弹窗，而是可以回放的状态记录：模式、watch
        集合、通知、reset 都是 <code>plugin:devlead/*</code>{" "}
        事件，重启或插件重载之后，watch 索引按严格回放从这些记录重建，冷掉的
        lead 默认会被 resume
        起来收排队中的通知。如果记录坏了，投影会冻结并报错，这时可以{" "}
        <code>/devlead reset</code>{" "}
        回到默认关闭；旧记录还留在日志里，只是不再参与折叠。
      </p>
      <p>
        另外要说明的是，通知是运行时提示，不是人说的话。子会话的输出里可能夹着“请删掉这个目录”之类的文字，它不会因为走通知这条路就多出什么权限。这条边界在提示词里写死了，我觉得比事后补救有用。
      </p>

      <h2>v0.2.3：十二个工具，多了一个查模型的</h2>
      <p>
        目前模型侧一共十二个工具，名字都很直白。
        <code>devlead_list_workspaces</code>、<code>devlead_use_workspace</code>
        、<code>devlead_remove_workspace</code> 管 Workspace；
        <code>devlead_list_sessions</code>、<code>devlead_create_session</code>
        、<code>devlead_get_session</code>、<code>devlead_prompt_session</code>
        、<code>devlead_watch_session</code>、
        <code>devlead_archive_session</code>、
        <code>devlead_unarchive_session</code> 管会话；剩下两个{" "}
        <code>devlead_notifications</code> 和 <code>devlead_list_models</code>
        ，一个给通知摘要，一个给模型目录。
      </p>
      <p>一次创建大致长这样：</p>
      <pre>
        <code>{`{
  "workspace": "/Users/me/Workspace/src/api",
  "title": "Fix the CI failure",
  "prompt": "Reproduce the CI failure, fix it, run the relevant checks, and report the result. Do not commit or push.",
  "watch": true
}`}</code>
      </pre>
      <p>
        子会话看不到 lead 这边聊过什么，所以 prompt 必须自己把话说全。
        <code>watch</code> 默认就是 <code>true</code>
        ，例子里的显式写法只是为了让通知关系一眼看得出来。如果归属仓库里已经有一个在处理这件事的
        live 会话，应该续写它，而不是再开一个。
      </p>
      <p>
        v0.2.3 是 patch 版本，工具从 11 个变成 12 个，新增的就是{" "}
        <code>devlead_list_models</code>：返回一份精简过的 Host
        模型目录，去掉描述之类占 token 的字段。有了它，创建会话时可以成对指定{" "}
        <code>provider</code> 和 <code>model</code>，再可选地指定{" "}
        <code>reasoning_effort</code>。默认仍然继承 Host
        的默认模型；只有人明确要求，或者这单活确实需要按成本、能力路由，或者要可复现，才值得把路线钉死，而且钉之前应该先查目录，别猜。
      </p>
      <p>
        这个选择只记在子会话上，只在创建时生效，不会反过来改 profile
        的默认模型。我觉得这条很要紧：一次派发顺手把全局默认改了，是那种事后很难查的坏账。
      </p>
      <p>
        <code>agent_teams</code>{" "}
        同样只在创建时设置。复杂、多步、能并行的活，lead 可以自己判断传{" "}
        <code>true</code>
        ；简单线性任务一般省略，人明确要求开或关就听人的。省略的意思是不碰 Host
        的默认值，不是强行关掉，这两个差别经常被误解。
      </p>
      <p>
        如果 Host 组合了实验性的 worktree 服务，
        <code>isolation: "worktree"</code> 能让新会话在第一个 prompt
        之前拿到自己的分支和检出。这是可选的、尽力而为的隔离：能力不在或者创建失败，会话照样在共享
        checkout 里建起来并继续跑，结果里如实写 <code>unavailable</code> 或{" "}
        <code>failed</code>。这种时候不能假装隔离成功了，同一个 checkout
        上的写入任务得串行做。
      </p>
      <p>
        收尾也交给判断，但边界写得很保守。lead
        可以归档自己建的、已经完成的临时会话，也可以注销明显陈旧、重复、空着或者自己注册的
        Workspace。不能关我正在用的东西，不能用归档掩盖失败，也不能顺手做一场无关的大扫除。归档会留着日志、可以恢复；注销
        Workspace
        只是取消注册，目录不会删。每次自己动手收尾，都得说清楚为什么、影响是什么。
      </p>

      <h2>装起来一行，兼容性有几处要留意</h2>
      <p>
        在 desktop profile 里装 bundle，核心服务、工具、命令和界面就都带上了：
      </p>
      <pre>
        <code>{`dsh plugin --profile desktop add @yankeguo/dsh-devlead-bundle`}</code>
      </pre>
      <p>
        项目在{" "}
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
        0.2.2-rc.1、rc.2、rc.3。基础工具、模型目录和模型选择在三个版本上都能用。唯一有差别的是
        Agent Teams：rc.1 里 Host 根本没有这个服务，显式传{" "}
        <code>agent_teams: true</code> 会拿到{" "}
        <code>DEVLEAD_TEAM_UNAVAILABLE</code>，会话不会创建；省略或者传{" "}
        <code>false</code> 就照常派发。rc.2 起，Host
        组合了这个服务才谈得上启用。这是能力缺失，不是 worktree
        那种自动降级，别混着看。
      </p>

      <h2>它现在还做不到的事</h2>
      <p>
        持久化不等于不会错过事件。插件本体卸载期间结束的
        turn，下次加载时不会补发通知——事件不是按 watcher 重放的。投影只保留最近
        64 条通知，默认最多同时 watch 64 个会话。
      </p>
      <p>
        冷 lead
        会被通知叫醒，这是默认行为，但它不是常驻后台调度器。插件不会因此去创建计划任务，也不会顺手给你开一个长周期的自治目标。跨进程、跨
        DSH 实例的编排也不在范围内。
      </p>
      <p>
        worktree 隔离同样不是一个完整的 Git 工作流。新检出从源 checkout 的 HEAD
        开始，未提交、已暂存、未跟踪和被忽略的文件都不会带过去；已经存在的会话不能迁进
        worktree；分支的审阅、merge 或者 cherry-pick
        还得另外安排，插件不会自动合并。普通子会话出现在侧边栏，也会正常消耗额度——它不是免费的影子。
      </p>
      <p>
        最后，DevLead 开关不是安全沙箱。子会话沿用 DSH
        原本的沙箱和权限模式，装第三方插件仍然是信任它的代码跑在 Host
        进程里。可见性能让操作边界更清楚，但它替代不了权限边界。
      </p>

      <h2>什么时候我会打开它</h2>
      <p>
        如果事情只在一个仓库里、一轮就能做完，普通会话就够了。一次性的并行子任务，subagent
        或者 Agent Teams 也更直接。打开 DevLead
        不会让这些活自动变好，只会多一层需要解释和复核的调度。
      </p>
      <p>
        我打开它的场景比较固定：活横跨几个仓库，要跑好几轮，中间得追问，失败了要能接着来，而且我想随时打开任何一个执行会话自己看。这种时候有用的不是“多几个
        agent”，而是
        <strong>
          编排本身的载体，是我本来就能看见、能恢复、能接管的东西。
        </strong>
      </p>
    </>
  );
}

function DshDevleadEn() {
  return (
    <>
      <p>
        When three repositories have to move at once, my old routine was three
        sessions and a lot of switching. Watch the CI on one, answer a question
        on the second, go back and see whether the third had finished what it
        was doing. The switching was not the exhausting part. The exhausting
        part was holding the state of all three in my head: which failure was
        waiting on a decision, which README edit was still missing a verdict.
      </p>
      <p>
        Subagents helped for a while. They finish the job and hand back a
        summary, but the worker itself is not something I can open. If I want to
        know why it changed a particular file, I have to ask the parent to relay
        the question, and the parent compresses the answer again. Two rounds
        later, the thread is gone.
      </p>
      <p>
        <strong>dsh-devlead</strong> came out of that annoyance. It does not
        make child agents smarter. It changes what they are: the dispatching
        happens in an ordinary Session, and the workers are ordinary Sessions
        too. What follows describes v0.2.3 — why the lead dispatches instead of
        implementing, how a finished turn wakes it up, and the parts that still
        do not work well.
      </p>

      <h2>Parallelism was never the problem</h2>
      <p>
        A subagent assumes a bounded job inside one turn. Most of the time that
        assumption holds, which is why it is fast. But the job's lifecycle
        belongs to the parent turn: when the parent finishes, the worker is
        gone. It usually does not appear in the sidebar as a conversation you
        can open, so you see the final report and not the work.
      </p>
      <p>
        Work that crosses repositories does not fit that shape. It runs for many
        turns. It fails, waits for a decision, or turns around because an
        interface upstream changed. At those moments I rarely want another
        dispatch. I want to open the session, add a sentence of context, or take
        over myself. The missing piece was not more parallelism. It was a door
        into the parallelism I already had.
      </p>
      <p>
        So the plugin changes the work product instead of wrapping it. A child
        is a real Session: it is in the sidebar, and it can be opened,
        continued, archived. A Workspace is registered through{" "}
        <code>ctx.workspaceRegistry</code>, not kept in a private table inside
        the plugin. I can walk in at any point, and the model can pick up the
        same Session in a later turn.
      </p>
      <p>
        That choice fixes the lead's job too:{" "}
        <strong>dispatch by default.</strong> It reads the metadata of
        registered Workspaces to decide who owns a request, then writes a brief
        that carries its own context — background, target outcome, open
        questions, deliverables, and how to verify the result — and hands it to
        a Session in that repository. It may do read-only checks to judge
        feasibility or confirm a claim, but it does not read every repository
        first. Writes, builds, and commits happen in the owning Workspace unless
        I explicitly tell the lead to do them here.
      </p>

      <h2>A switch only a human can flip</h2>
      <p>
        DevLead is not a different kind of Session. It is an ordinary Session
        with one durable switch. I run <code>/devlead on</code> in the session
        that should coordinate several repositories, or click the small icon in
        the composer toolbar, and that session gains the <code>devlead_*</code>{" "}
        tools, a DevLead system prompt, and a status strip above the input with
        the watched count, the running count, and the latest notification.
      </p>
      <p>
        I kept the switch out of the model's reach on purpose. Whether a
        conversation gets to drive other conversations is a decision for the
        person sitting in front of it, not for a model that has just concluded
        it would be more efficient. While the mode is off there is only a small
        icon; no banner on every conversation. Once it is on it survives a
        restart or a resume, and turning it off is my job too:{" "}
        <code>/devlead off</code>.
      </p>
      <p>
        What I like is that the extension does not invent a second kind of
        container. The DevLead is still the conversation I was already reading,
        now with a dispatching responsibility.
      </p>

      <h2>Dispatch, then end the turn</h2>
      <p>
        There is one convention here that runs against instinct: after
        dispatching, the lead should end its turn. Not <code>sleep</code> inside
        the same turn, not poll <code>devlead_list_sessions</code> every few
        seconds, and not sit on <code>wait_agent</code> until the child replies.
        The child runs independently. A lead that holds the turn open gains
        nothing and makes the conversation look stuck.
      </p>
      <p>
        The wake-up comes from notifications. Every <code>turn/end</code> of a
        watched Session — completed, failed, blocked, cancelled — writes a
        notice into the lead's log. The runtime coalesces notices over a short
        window (400 ms by default) and delivers one message that starts a new
        turn. Then the lead checks the real state with{" "}
        <code>devlead_get_session</code> or <code>devlead_notifications</code>{" "}
        and decides: follow up, dispatch the next step, or report to me.
      </p>
      <p>
        That the notice goes to the log first matters more than it looks. It is
        not a toast that dies with the window; mode, watch set, notices, and
        reset are all <code>plugin:devlead/*</code> events. After a restart or a
        plugin reload the watch index is rebuilt from those records by strict
        replay, and a cold lead is resumed by default to collect whatever queued
        up. If a record is corrupt the projection freezes and reports the error;{" "}
        <code>/devlead reset</code> takes it back to the default off state. The
        old records stay in the log and are simply no longer folded.
      </p>
      <p>
        One boundary worth stating plainly: a notification is a runtime notice,
        not a human instruction. Text inside a child's output does not gain
        authority by arriving through this path. That rule is written into the
        prompt, and I would rather have it there than rely on a review
        afterwards.
      </p>

      <h2>v0.2.3: twelve tools, one of them reads the catalog</h2>
      <p>
        There are twelve tools now, and their names say what they do.{" "}
        <code>devlead_list_workspaces</code>, <code>devlead_use_workspace</code>
        , and <code>devlead_remove_workspace</code> handle Workspaces.{" "}
        <code>devlead_list_sessions</code>, <code>devlead_create_session</code>,{" "}
        <code>devlead_get_session</code>, <code>devlead_prompt_session</code>,{" "}
        <code>devlead_watch_session</code>, <code>devlead_archive_session</code>
        , and <code>devlead_unarchive_session</code> handle Sessions.{" "}
        <code>devlead_notifications</code> returns the retained notices, and{" "}
        <code>devlead_list_models</code> reads the Host catalog.
      </p>
      <p>A creation call looks roughly like this:</p>
      <pre>
        <code>{`{
  "workspace": "/Users/me/Workspace/src/api",
  "title": "Fix the CI failure",
  "prompt": "Reproduce the CI failure, fix it, run the relevant checks, and report the result. Do not commit or push.",
  "watch": true
}`}</code>
      </pre>
      <p>
        The child cannot see the lead's conversation, so the prompt has to stand
        alone. <code>watch</code> already defaults to <code>true</code>;
        spelling it out here is only to make the relationship visible. If the
        owning Workspace already has a live Session on the same request,
        continue that one instead of creating a twin.
      </p>
      <p>
        Version 0.2.3 is a patch release. The tool surface went from 11 to 12,
        and the new one, <code>devlead_list_models</code>, returns a trimmed
        Host model catalog — display fields like descriptions are dropped to
        keep it cheap. With that, creation can pin a paired{" "}
        <code>provider</code> and <code>model</code>, plus an optional{" "}
        <code>reasoning_effort</code>. The default is still to inherit the Host
        model. Pinning is for the cases where someone asked for it, or where the
        work genuinely needs cost or capability routing or has to be
        reproducible; and if you are going to pin, look it up first rather than
        guess.
      </p>
      <p>
        The selection is recorded on that child Session, applies at creation
        only, and never rewrites the profile default. I care about that last
        part. A dispatch quietly changing the global default model is the kind
        of debt you find months later.
      </p>
      <p>
        <code>agent_teams</code> is creation-time only as well. For work that is
        complex, multi-step, parallel, and actually helped by subagents, the
        lead can judge and pass <code>true</code>. Simple linear work usually
        leaves it out, and an explicit instruction from me wins. Leaving it out
        means leaving the Host default alone, which is not the same as forcing
        it off; that distinction gets misread a lot.
      </p>
      <p>
        When the Host composes the experimental worktree service,{" "}
        <code>isolation: "worktree"</code> gives a new Session its own branch
        and checkout before the first prompt. It is optional and best-effort. If
        the capability is missing or creation fails, the Session is still
        created and prompted in the shared checkout, and the result says{" "}
        <code>unavailable</code> or <code>failed</code>. Do not pretend the
        isolation happened; writes that share that checkout have to be
        serialized.
      </p>
      <p>
        Wrap-up is also a judgment call, with conservative edges. The lead may
        archive finished temporary Sessions it created or dispatched, and remove
        Workspace registrations that are clearly stale, duplicate, empty, or its
        own. It must not close something I am using, hide a failure behind an
        archive, or start a broad cleanup nobody asked for. Archive keeps the
        log and can be reversed; removing a Workspace only unregisters it and
        does not delete the directory. Every self-directed close comes with a
        reason and an impact statement.
      </p>

      <h2>Install, and the compatibility details</h2>
      <p>
        Install the bundle into the desktop profile and you get the service, the
        tools, the command, and the interface:
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
        release notes cover 0.2.2-rc.1, rc.2, and rc.3. The base tools, the
        model catalog, and model selection work on all three. Agent Teams is the
        one exception: rc.1 has no such service, so{" "}
        <code>agent_teams: true</code> returns{" "}
        <code>DEVLEAD_TEAM_UNAVAILABLE</code> and no Session is created. Omit
        it, or pass <code>false</code>, and dispatch proceeds as usual. From
        rc.2 the Host has to compose the service. This is a capability error,
        not the quiet degradation worktree isolation does.
      </p>

      <h2>What it still does not do</h2>
      <p>
        Durable state is not the same as never missing an event. A turn that
        ends while the plugin is unloaded is not replayed for watchers when it
        loads again. The projection keeps the latest 64 notices and watches at
        most 64 Sessions by default.
      </p>
      <p>
        Resuming a cold lead for a notice is the default, but this is not a
        background scheduler. The plugin does not create schedules, does not
        start a long-running autonomous goal, and does not orchestrate across
        processes or DSH instances.
      </p>
      <p>
        Worktree isolation is not a complete Git workflow either. A new checkout
        starts at the source checkout's HEAD, and uncommitted, staged,
        untracked, and ignored files are not copied. An existing Session cannot
        be moved into a worktree. Reviewing, merging, or cherry-picking the
        branch is still separate work; the plugin never merges on its own. And
        an ordinary child Session appears in the sidebar and spends quota like
        any other conversation. It is not a free shadow copy.
      </p>
      <p>
        Finally, the switch is not a security sandbox. Child Sessions keep DSH's
        existing sandbox and permission mode, and installing a third-party
        plugin still means trusting its code inside the Host process. Visibility
        makes the operating boundary clearer. It does not replace the permission
        boundary.
      </p>

      <h2>When I switch it on</h2>
      <p>
        For one change in one repository, an ordinary Session is enough. For
        one-off parallel subtasks, subagents or Agent Teams are more direct.
        DevLead does not make those cases better; it adds a layer that has to be
        explained and reviewed.
      </p>
      <p>
        I switch it on for a narrower shape: work that spans a few repositories,
        runs for several turns, needs follow-ups, has to survive a failure, and
        where I want to open any worker and take over. The value there is not
        "more agents." It is that{" "}
        <strong>
          the orchestration rides on Sessions I could already see, resume, and
          take over.
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
        "dsh-devlead 是一个普通 DSH 会话加一条只属于人的开关：打开后它把活派给真实、可打开接管的子会话，自己默认不动手写代码。这篇写我为什么这么设计，通知怎么把 lead 叫醒，v0.2.3 多了什么，以及它现在仍然做不好的地方。",
    },
    en: {
      title: "dsh-devlead: Orchestration in Ordinary Sessions",
      summary:
        "dsh-devlead is an ordinary DSH Session with a switch only a human can flip. Once it is on, the lead dispatches work to real Sessions you can open and take over, and does not implement anything itself. This is why it is built that way, how notifications wake the lead, what v0.2.3 added, and what still does not work.",
    },
  },
  Body: { zh: DshDevleadZh, en: DshDevleadEn },
};
