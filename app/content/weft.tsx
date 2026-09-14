/**
 * The `weft` post, Chinese and English.
 *
 * The body components are plain React so the article builds into real HTML at
 * prerender time, and so a typo in the prose fails `tsc` rather than a page
 * load. Prose styling lives in `app/app.css` under `.post`.
 */

import type { Post } from "./posts";

function WeftZh() {
  return (
    <>
      <p>
        2025 年我写了一个叫 weft 的 Go
        模块,探索一种企业级智能体的开发范式。模块能跑,链路是通的,但我最终没有继续做下去。这篇文章把当初的设想完整讲一遍,然后讲我为什么停在这里。
      </p>

      <h2>问题:平台把复杂度留在了运行期</h2>
      <p>
        主流做法是造一个智能体平台:一套通用运行时,加一层可视化配置界面,靠开关、插件、租户配置去适配不同场景。它在规模化之前很舒服,规模化之后会撞上同一类问题。
      </p>
      <ul>
        <li>
          <strong>配置面无限膨胀。</strong>
          平台的配置项是所有功能的并集,而且只增不减。没有人能说清,某个场景下到底哪些配置项真正生效。
        </li>
        <li>
          <strong>运行期充满分支。</strong>
          每个功能都要处理「没启用」的情况,组合出来的行为无法穷举,也无法测试。
        </li>
        <li>
          <strong>平台团队成为瓶颈。</strong>
          每个业务场景的需求都要回到平台上排队,平台为了通用性不断叠加抽象层。
        </li>
        <li>
          <strong>每个场景都在为别人的复杂度买单。</strong>
          镜像更大、依赖更多、启动更慢、攻击面更宽。
        </li>
      </ul>
      <p>
        我想把根因写得更直白一点:
        <strong>组合发生在运行期,复杂度就只能推迟到运行期解决。</strong>
        既然如此,把组合前移到构建期,是不是就能让复杂度在构建期就消失?
      </p>

      <h2>设想:组件在编译期组合,场景在构建期固化</h2>
      <p>weft 换一个方向,把一件事拆成四步:</p>
      <ol>
        <li>
          <strong>组件。</strong>
          把智能体需要的能力拆成一个个独立组件——模型接入、工具调用、记忆、检索、渠道、护栏、审计。它们可以预先开发,也可以等真实场景需要时再开发。
        </li>
        <li>
          <strong>配方。</strong>
          针对一个具体场景写一份配方,声明「这个场景需要哪些组件、各自什么版本」。不需要的组件不出现在配方里。
        </li>
        <li>
          <strong>编译。</strong>
          按配方把组件织进一个二进制,没有用到的代码不在二进制里。
        </li>
        <li>
          <strong>运行。</strong>
          这个二进制连同它需要的配置,在容器里跑起来。
        </li>
      </ol>
      <p>
        于是传统平台是<strong>一个二进制,N 种配置</strong>;weft 是
        <strong>N 个二进制,一个场景一份配置</strong>。
      </p>
      <p>
        weft
        的意思是「纬线」。经线预先张好,纬线按纹样穿过去,织成布。组件是线,配方是纹样,二进制是布。名字本身就说明了我当时想要的东西:布是织出来的,不是裁出来的。
      </p>

      <h2>组件只向织机交代四件事</h2>
      <p>
        整个范式落在组件契约上,契约只有四件事:身份、配置面、提供的服务、要跑的入口。少一件都织不起来,多一件都会让每个组件都背上不属于自己的负担。一个组件就是一个
        Go 包,导出唯一一个实现了契约的值:
      </p>
      <pre>
        <code>{`var Component = &component{}

func (c *component) Name() string { return "llm.dummy" }   // 身份,也是配置命名空间
func (c *component) Config() any  { return &c.cfg }        // 配置面
func (c *component) Package() func(do.Injector) { /* 提供的服务 */ }
func (c *component) Entries() []weft.Entry { return []weft.Entry{weft.Use[*Client]()} }`}</code>
      </pre>
      <p>
        配置就地声明在结构体上,字段名推导键名。身份加键名推导出环境变量名,所以
        <code>llm.dummy</code> 这个身份加 <code>api_key</code> 这个键,得到的是
        <code>WEFT_LLM_DUMMY_API_KEY</code>。没有谁来分配前缀,也不会撞车。
      </p>
      <pre>
        <code>{`type Config struct {
    APIKey  string        \`weft:"api_key" required:"true" secret:"true"\`
    BaseURL string        \`weft:"base_url" default:"https://example.invalid/v1"\`
    Timeout time.Duration \`weft:"timeout" default:"5s"\`
}`}</code>
      </pre>
      <p>配方则是全文最短的一个文件:</p>
      <pre>
        <code>{`func main() {
    boot.Main(dummyllm.Component)
}`}</code>
      </pre>
      <p>
        配方是 Go
        代码而不是配置文件,所以「引用了不存在的组件」根本编译不过——组合在编译期就被编译器兜住了。
      </p>

      <h2>我期望得到什么</h2>
      <ul>
        <li>
          <strong>配置面是封闭的。</strong>
          一个二进制需要哪些配置项,由它链接了哪些组件唯一决定。二进制能准确说出自己要什么,部署前就能核对,不存在「这个开关到底有没有生效」的疑问。
        </li>
        <li>
          <strong>缺配置就拒绝启动。</strong>
          启动时先做配置自检,一次性列出全部缺失或非法的配置项再退出。运维拿到的是完整待办清单,而不是一项一项试错。
        </li>
        <li>
          <strong>二进制即契约。</strong>
          产物不可变、可复现、可审计。同一个配方、同一份配置,行为一致;要改行为,就出一个新二进制。
        </li>
        <li>
          <strong>没有运行期插件机制。</strong>
          插件沙箱、动态加载、ABI
          兼容层,以及它们带来的一整类故障与攻击面,在这个范式里不存在。
        </li>
        <li>
          <strong>部署无依赖。</strong>
          静态二进制加环境变量就能跑,容器编排、systemd、边缘节点一视同仁。
        </li>
      </ul>
      <p>
        还有一条我当时写下来、现在依然认同的理由:智能体的能力天然是拼装式的。一个客服智能体和一个代码审查智能体,差别主要在接了哪些模型、哪些工具、哪些知识库、哪些渠道。用平台去覆盖这种差异,平台会被迫长成一个「什么都能配」的怪物;用配方去覆盖,每个智能体只带走自己真正用到的那几根线。
      </p>

      <h2>做出来了什么</h2>
      <p>
        落地的是三块:<strong>组件契约</strong>、组装根 <code>boot</code>
        ,以及大模型调用的唯一一份说法
        <code>llm</code>。
      </p>
      <p>
        <code>boot.Main</code> 是配方唯一的调用点,顺序是固定的:自检配置面 →
        注册服务 → 启动入口 → 等信号 →
        优雅关停。任何一步失败都以非零退出码结束,容器编排据此判断该不该重启。配置自检失败时,进程打印的是这一份二进制完整的配置待办清单,而不是第一个错误。
      </p>
      <p>
        <code>llm</code>{" "}
        不是组件,是一组类型加一个方法,是「怎么把消息、工具交给大模型,又怎么把回应流拿回来」的唯一一份说法:
      </p>
      <pre>
        <code>{`type Provider interface {
    Do(ctx context.Context, req llm.Request) iter.Seq2[llm.Event, error]
}`}</code>
      </pre>
      <p>
        一次调用产出一条事件流——文本增量、工具调用、结束。消息里的内容块是并列的:文字、工具调用、工具结果、图片。图片带着自己的媒体类型和来源(一段字节,或者一个链接),所以以后加音频、视频不用再动接口。
      </p>
      <p>
        唯一一个假 Provider 是 <code>llm/dummy</code>:配置只剩一个
        Prefix,不管你说什么,它挑出最后一条 user 消息,把前缀加在原文前面,一个
        rune 一个 rune
        地流式吐回来。它读不懂消息里的媒体,但会明说收到了几块,而不是装作没看见。它存在的意义,是让整条链路在没有模型、没有密钥的情况下也能端到端跑通。
      </p>
      <p>
        这是当时最让我满意的一个决定:抽象包不依赖任何厂商,真实的 Provider
        只负责把自己那份协议翻译成这里面的消息与事件。跨厂商真正成立的参数只有
        TopP 和 MaxOutputTokens 两个,那就只留这两个;各家自己的花样,留给各自的
        Provider。
      </p>

      <h2>为什么放弃</h2>
      <p>
        代价我在 README
        里已经列全了:构建次数增加、改动需要重新构建、组件契约必须少而稳、需要版本治理。当时我把它们写成「代价」,以为是可以接受的成本。真正让我停下来的,是我发现代价清单里少了一行,而那一行恰好是决定性的。
      </p>
      <p>
        缺的那一行是:<strong>这个范式没有探索成本模型。</strong>
        它优化的是稳定态的运维成本,而探索期的瓶颈是「改一次要多久才能看到结果」。在
        weft
        里,任何一个新想法——换一个模型、加一个工具、调一次提示词的组织方式——都至少要经过:改配方或写组件
        → 编译 → 构建镜像 → 重新部署 →
        再试。每一步都不贵,加起来足以让「试试看」这件事变得不划算。
      </p>
      <p>
        更让我迟疑的是织机始终没有落地。理想中「配方锁定组件版本」应该是织机的事,而现实中配方是一份手写的
        <code>main.go</code>,组件版本由 <code>go.mod</code>
        统一约束。这句声明当时还只是目标。也就是说,这个范式最核心的收益——同一个场景可复现地织出同一个二进制——还只是一句话,而它的成本却已经全部到账了。
      </p>
      <p>
        还有一个我当初低估的点:我对场景的判断本身是错的。编译期组合成立的前提是场景集合相对稳定,而我当时并不知道要做的到底是哪几个场景。需求还在长,配方却已经写死了。范式的正确性依赖于一个我还没有的答案。
      </p>

      <h2>这不是错的,是早的</h2>
      <p>
        我现在依然认为这个方向是对的,只是不适合我当时的位置。它适合的是这样一支平台团队:
      </p>
      <ul>
        <li>场景集合已经稳定,数量到了几十上百个;</li>
        <li>确实需要每个场景独立可复现、可审计、可回滚;</li>
        <li>镜像体积、启动时间、攻击面是真的约束,而不是纸面上的好处;</li>
        <li>
          构建链路足够快,快到「重新出个二进制」和「改个配置」的体感差别可以忽略。
        </li>
      </ul>
      <p>
        四条同时成立的时候,「一个二进制,N 种配置」的那些问题会重新变得刺眼,而
        weft
        会重新变得划算。在这之前,运行期的可配置性依然是更便宜的选择——它把复杂度留在了运行期,但也把「试一下」的成本压到了最低。这不是妥协,这是阶段不同。
      </p>
      <p>
        所以我不再维护
        weft,它躺在仓库里,作为一份为未来保留的灵感。等到场景定下来、数量涨起来的那一天,我会重新读一遍这个模块,然后大概率发现需要改的地方比想象中多——但那一天的前提是,我已经知道自己在织什么布。
      </p>
    </>
  );
}

function WeftEn() {
  return (
    <>
      <p>
        In 2025 I wrote a Go module called weft, exploring a way to build
        enterprise agents. It ran, the pipeline worked end to end, and I still
        stopped. This post lays out the whole idea, then explains why I put it
        down.
      </p>

      <h2>The problem: platforms leave complexity in the runtime</h2>
      <p>
        The usual move is to build an agent platform: one general runtime, a
        visual configuration layer on top, and switches, plugins, and tenant
        config to bend it toward each scenario. It is comfortable until it
        scales, and then it hits the same class of problems.
      </p>
      <ul>
        <li>
          <strong>The configuration surface grows without bound.</strong> A
          platform's config keys are the union of every feature, and that union
          only grows. Nobody can say which keys actually take effect in a given
          scenario.
        </li>
        <li>
          <strong>The runtime fills with branches.</strong> Every feature has to
          handle its own "not enabled" case, so the composed behaviour can
          neither be enumerated nor tested.
        </li>
        <li>
          <strong>The platform team becomes the bottleneck.</strong> Every
          scenario queues up behind the platform, and generality keeps adding
          layers of abstraction.
        </li>
        <li>
          <strong>Every scenario pays for someone else's complexity.</strong>{" "}
          Bigger images, more dependencies, slower starts, a wider attack
          surface.
        </li>
      </ul>
      <p>
        I wanted the root cause stated plainly:{" "}
        <strong>
          when composition happens at runtime, complexity can only be deferred
          to runtime.
        </strong>{" "}
        If that is true, moving composition to build time should make the
        complexity disappear at build time instead.
      </p>

      <h2>The idea: compose at compile time, fix the scenario at build time</h2>
      <p>weft goes the other way and splits the work into four steps:</p>
      <ol>
        <li>
          <strong>Components.</strong> Break the capabilities an agent needs
          into independent components — model access, tool calling, memory,
          retrieval, channels, guardrails, audit. They can be written ahead of
          time, or only when a real scenario asks for them.
        </li>
        <li>
          <strong>A recipe.</strong> Write one recipe per scenario, declaring
          which components it needs and at which versions. Components it does
          not need never appear in the recipe.
        </li>
        <li>
          <strong>A build.</strong> weft weaves the recipe's components into a
          single binary. Code nobody asked for is not in the binary.
        </li>
        <li>
          <strong>A run.</strong> That binary, plus the configuration it needs,
          runs in a container.
        </li>
      </ol>
      <p>
        So a traditional platform is{" "}
        <strong>one binary and N configurations</strong>; weft is{" "}
        <strong>N binaries and one configuration each</strong>.
      </p>
      <p>
        weft means the crosswise thread. The warp is strung in advance, the weft
        follows the pattern, and cloth comes out. Components are threads, a
        recipe is a pattern, a binary is cloth. The name says what I wanted:
        cloth is woven, not cut.
      </p>

      <h2>A component tells the loom four things</h2>
      <p>
        The whole paradigm rests on the component contract, and the contract has
        four items: identity, configuration surface, the services it provides,
        and the entries it wants running. Take one away and nothing weaves; add
        one and every component carries weight that is not its own. A component
        is a Go package exporting one value that satisfies it:
      </p>
      <pre>
        <code>{`var Component = &component{}

func (c *component) Name() string { return "llm.dummy" }   // identity, and the config namespace
func (c *component) Config() any  { return &c.cfg }        // configuration surface
func (c *component) Package() func(do.Injector) { /* the services it provides */ }
func (c *component) Entries() []weft.Entry { return []weft.Entry{weft.Use[*Client]()} }`}</code>
      </pre>
      <p>
        Configuration is declared in place, as fields on a struct, and the field
        name derives the key. Identity plus key derives the environment
        variable, so the identity <code>llm.dummy</code> and the key{" "}
        <code>api_key</code> give <code>WEFT_LLM_DUMMY_API_KEY</code>. Nobody
        hands out prefixes and nothing collides.
      </p>
      <pre>
        <code>{`type Config struct {
    APIKey  string        \`weft:"api_key" required:"true" secret:"true"\`
    BaseURL string        \`weft:"base_url" default:"https://example.invalid/v1"\`
    Timeout time.Duration \`weft:"timeout" default:"5s"\`
}`}</code>
      </pre>
      <p>A recipe is the shortest file in the repository:</p>
      <pre>
        <code>{`func main() {
    boot.Main(dummyllm.Component)
}`}</code>
      </pre>
      <p>
        A recipe is Go code rather than a config file, so referring to a
        component that does not exist does not compile. The compiler catches the
        composition, not a deployment.
      </p>

      <h2>What I expected to get</h2>
      <ul>
        <li>
          <strong>A closed configuration surface.</strong> Which keys a binary
          needs is decided entirely by the components linked into it. The binary
          can state exactly what it wants, a deployer can check that before
          rollout, and no one has to wonder whether a switch took effect.
        </li>
        <li>
          <strong>A refusal to start when configuration is missing.</strong> The
          startup self-check lists every missing or malformed key at once and
          then exits. Operations gets a complete checklist instead of a
          trial-and-error loop.
        </li>
        <li>
          <strong>The binary as a contract.</strong> Immutable, reproducible,
          auditable. One recipe plus one configuration behaves the same every
          time; changing behaviour means producing a new binary.
        </li>
        <li>
          <strong>No runtime plugin mechanism.</strong> Plugin sandboxes,
          dynamic loading, ABI compatibility shims, and the whole class of
          failures and attack surface they bring simply do not exist in this
          paradigm.
        </li>
        <li>
          <strong>Dependency-free deployment.</strong> A static binary plus
          environment variables. Kubernetes, systemd, and an edge node are all
          the same target.
        </li>
      </ul>
      <p>
        One more reason I wrote down then and still hold: agent capabilities are
        naturally assembled. A support agent and a code-review agent differ
        mainly in which models, tools, knowledge bases, and channels they use.
        Covering that range with a platform forces the platform into a
        configure-anything monster; covering it with recipes lets each agent
        carry only the threads it actually uses.
      </p>

      <h2>What actually got built</h2>
      <p>
        Three things landed: the <strong>component contract</strong>, the
        composition root <code>boot</code>, and <code>llm</code>, the single
        account of how a model gets called.
      </p>
      <p>
        <code>boot.Main</code> is the only call a recipe makes, and its order is
        fixed: check the configuration surface, register services, start
        entries, wait for a signal, shut down gracefully. Any failing step exits
        non-zero so the orchestrator knows whether to restart. When the
        self-check fails, the process prints the binary's complete configuration
        checklist rather than the first error it found.
      </p>
      <p>
        <code>llm</code> is not a component; it is a set of types and one
        method, the single account of how messages and tools reach a model and
        how the response stream comes back:
      </p>
      <pre>
        <code>{`type Provider interface {
    Do(ctx context.Context, req llm.Request) iter.Seq2[llm.Event, error]
}`}</code>
      </pre>
      <p>
        One call produces one stream of events: text deltas, tool calls, done.
        The parts of a message are peers — text, tool call, tool result, image.
        An image carries its own media type and its source, either bytes or a
        URL, so adding audio or video later does not touch the interface.
      </p>
      <p>
        The one fake provider is <code>llm/dummy</code>: its configuration is a
        single prefix, and whatever you say, it takes the last user message,
        prepends the prefix, and streams it back one rune at a time. It cannot
        read media in a message, but it says how many parts it received instead
        of pretending not to see them. Its reason to exist is that the whole
        pipeline runs end to end with no model and no API key.
      </p>
      <p>
        That was the decision I was happiest with: the abstraction package
        depends on no vendor, and a real provider only translates its own
        protocol into these messages and events. Only TopP and MaxOutputTokens
        genuinely hold across vendors, so only those two are parameters;
        everything vendor-specific stays in the vendor's provider.
      </p>

      <h2>Why I gave it up</h2>
      <p>
        I had listed the costs in the README: more builds, a rebuild for every
        change, a contract that must stay small and stable, and version
        governance. I wrote them as costs I thought I could accept. What
        actually stopped me was noticing that the list was missing one line, and
        that the missing line was the decisive one.
      </p>
      <p>
        The missing line:{" "}
        <strong>this paradigm has no cost model for exploration.</strong> It
        optimizes the operational cost of a steady state, while the bottleneck
        during exploration is how long it takes to see the result of a change.
        In weft, any new idea — swap a model, add a tool, rearrange how a prompt
        is assembled — has to go through the recipe or a component, then a
        compile, then an image build, then a redeploy, then a look. Each step is
        cheap. Together they make "let me just try it" not worth doing.
      </p>
      <p>
        What made me hesitate more was that the loom never landed. Locking
        component versions in a recipe was supposed to be the loom's job, and in
        practice a recipe was a hand-written <code>main.go</code> with versions
        constrained by <code>go.mod</code> as a whole. That claim was still a
        goal. The paradigm's central benefit — the same scenario reproducibly
        weaving the same binary — was still a sentence, while its costs were
        already real.
      </p>
      <p>
        And I had underestimated something else: my read on the scenarios
        themselves was wrong. Compile-time composition assumes the set of
        scenarios is relatively stable, and at that point I did not know which
        scenarios I was building. The requirements were still growing while the
        recipes had already been frozen. The paradigm's correctness rested on an
        answer I did not have yet.
      </p>

      <h2>Not wrong, just early</h2>
      <p>
        I still think the direction is right. It just did not fit where I was
        standing. It fits a platform team that looks like this:
      </p>
      <ul>
        <li>
          the set of scenarios has settled, at dozens or hundreds of them;
        </li>
        <li>
          each scenario genuinely needs to be reproducible, auditable, and
          rollback-able on its own;
        </li>
        <li>
          image size, startup time, and attack surface are real constraints
          rather than bullet points;
        </li>
        <li>
          the build pipeline is fast enough that rebuilding a binary and editing
          a config feel about the same.
        </li>
      </ul>
      <p>
        When all four hold, the problems of "one binary, N configurations"
        become glaring again, and weft becomes worth its price again. Until
        then, runtime configurability stays the cheaper choice. It leaves
        complexity in the runtime, but it also drives the cost of trying
        something to nearly zero. That is not a compromise; it is a different
        stage.
      </p>
      <p>
        So I no longer maintain weft. It sits in the repository as an idea held
        for later. On the day the scenarios have settled and multiplied, I will
        read the module again and probably find more to change than I expect —
        but that day only arrives once I know what cloth I am weaving.
      </p>
    </>
  );
}

export const weft: Post = {
  slug: "weft",
  date: "2025-09-14",
  locales: {
    zh: {
      title: "纬线:一次把组合前移到构建期的尝试",
      summary:
        "我试着用编译期组合替掉运行期配置,让一个场景等于一个二进制。范式讲得通,代码也跑得起来,但我最终停在这里——不是因为它错了,而是因为它太早。",
    },
    en: {
      title: "Weft: an attempt to move composition to build time",
      summary:
        "I tried to replace runtime configuration with compile-time composition, one binary per scenario. The paradigm held and the code ran, but I stopped — not because it was wrong, because it was early.",
    },
  },
  Body: { zh: WeftZh, en: WeftEn },
};
