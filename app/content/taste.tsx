/**
 * The `taste` post, Chinese and English.
 *
 * An argument: industrialization priced the generic industrial good near its
 * cost, and AI is doing the same to generic intelligence. What still carries a
 * price is taste — choosing under abundance — and that choice does not spend
 * efficiency. It is what keeps efficiency from producing something the market
 * will only price at cost. The two bodies carry the same argument, not the
 * same sentences.
 */

import type { Post } from "./posts";

function TasteZh() {
  return (
    <>
      <p>
        我把两件事放在一起看。一件是中国的工业化把普通工业品的价格压到了成本附近。另一件是
        AI
        正在对普通的智能做同样的事。两次的机制一样：一种能力一旦能够大量供给，它的价格就往成本靠。这之后还稀缺的，不是再多供给一点，而是在已经足够多的东西里做选择。我想把这个选择叫做品味，并且把这个词用得比它平时的意思宽。
      </p>
      <h2>贬值的是可替代的那一单位</h2>
      <p>
        「贬值」要说窄，不然这句话会变成抱怨。贬值的不是制造，也不是思考。贬值的是其中可以互相替代的那一单位：第一百万根一样的数据线，第一百万段写得过去的说明。它们仍然有用。有用和值钱不是同一件事。有用的东西可以便宜到不值得再为它付溢价，因为下一个供给者能以几乎相同的成本再给你一个。
      </p>
      <p>
        所以「工业产品贬值」说的不是工厂变差了。工厂可以比以前更好：良率更高、交期更稳、公差更紧。买家拿走产品，溢价却不在这根线上停留。它停在另一处：决定这根线该是什么样。
      </p>
      <h2>工业化移走的是生产</h2>
      <p>
        施振荣在九十年代画过一条微笑曲线。那是一张示意图，不是定律：价值在两端高，在中间低。一端是规格和设计，一端是品牌和渠道，中间是制造。中国进入全球分工之后，把曲线的底部做成了世界价格。加入
        WTO 是 2001
        年。此后的一代人里，一种经验变得普遍：东西还在，贵不起来了。衣服、充电器、塑料件、整机里那些看不见的部分，谁都能做出来的那一层，价格贴着成本走。
      </p>
      <p>
        这不是中国独有的机制。英国的纺织、后来的日本，都曾把某一种生产从稀缺变成背景。中国的规模只是让现在还活着的人没法假装没看见。机制本身很老。生产不再是瓶颈的时候，瓶颈就挪到「生产什么」。
      </p>
      <p>
        钱没有离开，它只是不再付给产量，改付给规格。同一个注塑厂，拿着一份含糊的图纸，和拿着一份把倒角、手感、公差写死的图纸，做的是两门生意。一门卖产能，一门执行别人的判断。产能的价格由下一家也能做的工厂决定。判断的价格，由这个判断值不值得被复制来决定。难和稀缺不是一回事：一件难事一旦有足够多的人会做，价格就离开它。
      </p>
      <h2>智能正在变成同一种东西</h2>
      <p>
        AI
        对智能做的是同一笔记账，只是快得多。模型已经能稳定交出来的那些东西——一段能用的文字、一个能跑的函数、一份过得去的方案、一次把报错看懂的调试——正在变成工业品。单位能力的价格往下掉，掉到它不再是做决定时要算的那一项。上一篇里那些
        API 价格已经让我停过一次。现在这件事更不像一个比喻。
      </p>
      <p>
        于是会出现和工厂一样的错觉：做出来变容易了，做的人就更值钱了。不是。变容易的那一部分，价格跟着容易走。一个人如果把模型的产出直接交出去，他卖的是产能。这条线上的同行包括每一个拥有同样模型的人，以及模型自己。这里没有溢价。
      </p>
      <p>
        溢价留在模型交不出、也不该替你交的那一层：许多够用的结果里，哪一个该存在。
      </p>
      <h2>品味不是审美</h2>
      <p>
        品味这个词太容易滑向装饰。配色、字体、一句更漂亮的文案。那些是品味的表面，而且是模型最会模仿的表面。如果品味只是表面，它会和智能一起贬值，这篇文章就不用写了。
      </p>
      <p>
        我想要的定义更干。品味是在充裕里做选择的能力。充裕是前提：选项不够的时候，选择不叫品味，叫将就。选项很多、而且大多够用的时候，选择才变得贵。它至少做五件事。
      </p>
      <ul>
        <li>
          <strong>取舍。</strong>
          决定什么不出现。生成的成本接近零以后，多余是默认状态。多一段解释、多一个设置、多一个谁也不用的功能，每一样都有理由留下。品味是那个说「不」的标准，而且说得早，赶在这些东西变成维护负担之前。
        </li>
        <li>
          <strong>默认值。</strong>
          替使用的人把决定做掉，让他们不用再做一遍。决定做得好，后面每一次使用都省下一次选择。决定做得坏，后面每一次都在还债。无论好坏，默认值都是一份被重复使用的判断，所以它比单次产出更贵。
        </li>
        <li>
          <strong>一致性。</strong>
          许多小决定指向同一个判断。单独看，每处都「还行」；放在一起，它们互相拆台，或者互相加强。一致性不能靠多生成几次碰出来。它要求同一个标准记得前面已经答应过什么。
        </li>
        <li>
          <strong>完成。</strong>
          知道什么时候停。模型停在像那么回事的地方，因为它的停止条件是概率，不是标准。标准是外加的：这一版可以署名，上一版还不行。这个差别在产量上几乎看不见，在价格上就是全部。
        </li>
        <li>
          <strong>署名。</strong>
          选择要有人认。没有人认的偏好只是噪音，市场不会为噪音付溢价。署名不是个人品牌。署名的意思是错了有地方找，对了有地方学。一份没有作者的默认值没人敢依赖，因为它明天可以变成别的样子。
        </li>
      </ul>
      <p>
        这五件事都沾一点审美，但都不靠审美成立。一份 API
        的形状、安装流程里不再追问你的那些问题、一篇文章删掉的三段，都是品味。它们的共同点不是好看。共同点是：有人在选项已经够用之后，仍然拒绝把它们全都留下。
      </p>
      <h2>一笔买决定的钱</h2>
      <p>
        2026 年 8 月，David Heinemeier Hansson 为他的 Linux 发行版 Omarchy
        设立了 Omacom Foundation。到 9 月 22
        日阿里云加入为止，基金会自己的页面把承诺和捐赠加总到大约 2170
        万美元。这里面有多年期的公司承诺，也有模型额度，不是一笔已经进账的股权融资。数字不是我想用的部分。我想用的是这笔钱买的是什么。
      </p>
      <p>
        Omarchy 基于 Arch，桌面是 Hyprland 和 Quickshell。它自己的词是
        omakase：日语里的「交给你」，料理上是主厨替你点。它的说明写得很直。大多数人一开始并不知道自己要什么，与其在一堆选项里受苦，不如先接受一份由可信的人收拾好的、彼此一致的默认。主题、终端、编辑器、快捷键是一套，不是一袋软件。
      </p>
      <p>
        批评也同样直。有人说这算不上传统意义上的发行版，不过是 Arch
        加上一个人的配置文件。我觉得这句话把产品说对了，然后停早了一步。内核不是新品。窗口管理器不是他写的。新的是那一层决定：哪些默认值得被别人用上一整天，哪些选择该在安装结束之前消失。配置文件在这里不是附件。配置文件就是产品。
      </p>
      <p>
        钱流向这一层，不是因为 Linux
        突然缺一个内核。缺的是有人愿意为一种用法签字，并且把这种用法维持到别人可以依赖。基金会在
        9 月 3 日的说明里称自己是 Hyprland 的独家赞助方，也是 Quickshell 和 mise
        的主要赞助方，同时也在出钱养驻场的视觉作者、内核开发，以及一个发行版要的基础设施。被资助的是「这一套如何成立」，不是又一个通用运行时。
      </p>
      <p>
        我不会把一笔捐赠说成证明。名人在场，钱会来得又快又多，这一点别装看不见。Rails
        当年也是把意见放在一种语言上面，也是同一个人。名气解释速度，不解释类别。类别是旧的：人们为一套已经做好的决定付钱。新的是，决定下面的那层活——把环境装到能用、把问题查到能修、把外观收到一致——刚刚变得很便宜。便宜之后，意见几乎就是整个产品。Omarchy
        只是这件事眼下最容易看见的一个例子。
      </p>
      <h2>品味不消耗效率</h2>
      <p>
        听到品味，很多人听到的是慢。推敲、返工、不肯交第一版够用的结果。如果效率只看产量除以时间，这些确实都让你变慢。这个算法在产量昂贵的时候成立。产量几乎免费之后，它衡量的是一种正在失去价格的东西。
      </p>
      <p>
        把分子换成价值，账就反过来。同样一小时，没有标准的产出，标价接近生成它的成本；有标准的产出，标价取决于这个标准值不值得被别人依赖。品味没有从效率里扣掉一项。它把效率的分子从一种廉价品换成一件还有价格的东西。没有这次替换，更快只是更早到达一个市场只肯按成本计价的结果。那不叫效率变高。那叫浪费的速度变高。
      </p>
      <p>具体是三个地方。</p>
      <p>
        <strong>决定做在上游，下游就不用重复做。</strong>
        omakase
        是一种效率，因为客人不必研究四十道菜。账单里有一部分买的是「今晚不用选」。Omarchy
        的安装是同一件事：Linux
        曾经慢，是因为每一步都在问你；那些问题已经有人答过，而且答成了一套。一个人的品味用一次，换成后面所有人的速度。把品味理解成个人的磨蹭，是只看见了那一次，没看见它被复用的次数。
      </p>
      <p>
        <strong>浪费换了位置。</strong>
        生产稀缺的时候，浪费是没做出来。生产充裕的时候，生成几乎不要钱，浪费变成交出一个不该存在的东西，或者生成了十个、却没有标准决定留下哪一个。十个版本本身不贵。贵的是读完它们并决定的那一下。省掉这一下，吞吐上去了，市场给吞吐的价格却往生成成本靠，而生成成本正在变成零。丢掉九个看起来慢。把十个的平均数交出去，才是把时间花在一件价格正在消失的事情上。
      </p>
      <p>
        <strong>没有规格的吞吐，省下的是买家的钱。</strong>
        一家把无差别产品做到极高速度的工厂，效率很好，利润很薄。薄不是因为它慢，是因为它生产的东西可以被替换。中国的工业化没有惩罚认真的工厂，它惩罚的是没有规格的产出：你越快，越是在帮买你产能的人省钱。AI
        把这句话搬到了认知劳动上。吞吐乘以十，标准没有跟着来，你只是把一种商品乘以十。品味是那个标准。它不跟效率交换位置。它决定同样的效率落在商品上，还是落在一件有价格的东西上。
      </p>
      <h2>我可能看错的地方</h2>
      <p>这个判断有几个入口可以是错的。写下来，免得它只是一句好听的话。</p>
      <p>
        <strong>名气。</strong>
        Omarchy 的钱可以主要是 DHH
        的受众，不是一条关于品味的规律。如果下一次一个没有受众的人做出同样质量的默认，没有人付钱，那我的例子就只是名人效应。我暂时的回答是：受众决定这一笔的大小，不决定「意见可以卖钱」这个类别。类别里已经有苹果，有
        Rails，有没有菜单的餐馆。Omarchy
        只是这个类别在智能变便宜之后特别容易被看见的一个。
      </p>
      <p>
        <strong>坏品味。</strong>
        一份错误的默认比灵活更慢，因为所有人都在绕开它。这是真的。品味是一次可能输的下注，不是保证。我不是说每个意见都会赢。我是说，通用的那一单位免费之后，拒绝下注重的人手里没有东西可以标价。错的意见还有形状，别人能离开它，也能改它。平均数没有形状，只剩一个价格，而且那个价格往下走。
      </p>
      <p>
        <strong>地位。</strong>
        有时候人们为品味付钱，付的是信号：我用得起这个判断。这是最弱的一种，价格战里最先死。活下来的那种不是信号，是替别人省掉工作。你采纳了这些决定，拿回了时间，结果比你在时间压力下自己拼出来的更一致。这是生产率，不是奢侈品。
      </p>
      <p>
        还有制造和思考里那些没有贬值的部分。工艺、材料、良率仍然值钱。新问题、责任、只有你在场才有的上下文，也仍然值钱。「品味最贵」如果被听成「手艺和思考没用了」，那是我没说清。手艺和思考里贵的那一部分，本来就是品味：知道做到哪，不做到哪。便宜掉的是其中可以被下一个模型重做一遍的部分。
      </p>
      <h2>留下来的那一步</h2>
      <p>
        我不打算少用这些模型。它们把产能变得几乎免费，免费的产能应该被花掉。花掉的方式不是把产出交出去。产出在交出去之前，要经过一个仍然贵的步骤：选择。
      </p>
      <p>
        我给自己留的标准很窄。一件东西可以署名之前，我得能说出它删掉了什么，以及它的默认为什么是现在这样。说不出来，就还是产能，不管它看起来多完整。这个步骤比生成慢。慢的那一点就是价格还在的地方。把它省掉，换来的不是更高的效率，是一件市场很快会标成成本价的东西。
      </p>
    </>
  );
}

function TasteEn() {
  return (
    <>
      <p>
        I have been setting two facts next to each other. One is that China's
        industrialization pushed the price of ordinary industrial goods down
        toward their cost. The other is that AI is doing the same to ordinary
        intelligence. The mechanism is the same both times: once a capability
        can be supplied in volume, its price moves toward its cost. What remains
        scarce is not one more unit of supply. It is the choice among things
        that are already good enough. I want to call that choice taste, and I
        want the word to cover more than it usually does.
      </p>
      <h2>The unit that loses its price</h2>
      <p>
        "Devalue" has to stay narrow, or the sentence turns into a complaint.
        Making things did not lose its worth, and neither did thinking. What
        loses its price is the interchangeable unit: the millionth identical
        cable, the millionth paragraph that is good enough. Both are still
        useful. Useful and valuable are not the same. A useful thing can get
        cheap enough that nobody pays a premium for it, because the next
        supplier can hand you another at nearly the same cost.
      </p>
      <p>
        So "industrial goods got cheaper" does not mean the factories got worse.
        Factories can be better than before — higher yield, steadier delivery,
        tighter tolerances — and the buyer still walks away with the product
        while the premium fails to stick to that line. It sticks somewhere else:
        to the decision about what the thing should be.
      </p>
      <h2>Industrialization took production off the scarce step</h2>
      <p>
        In the 1990s Stan Shih drew the smile curve. It is a picture, not a law:
        value sits high at the two ends and low in the middle. Specification and
        design at one end, brand and distribution at the other, manufacturing in
        the trough. After China entered the global division of labor, that
        trough became the world price. Accession to the WTO was in 2001. Within
        a generation an experience became ordinary: the goods were still there,
        and they would not stay expensive. Clothing, chargers, plastic parts,
        the invisible pieces inside a finished device — the layer anyone could
        make — priced itself against cost.
      </p>
      <p>
        The mechanism is older than China. British textiles, and Japan after
        them, each turned some kind of production from a scarcity into a
        background condition. China's scale is what made it impossible for
        anyone alive now to pretend not to see it. The mechanism itself is old.
        When production stops being the bottleneck, the bottleneck moves to what
        gets produced.
      </p>
      <p>
        The money does not leave. It stops paying for volume and starts paying
        for specification. The same molding shop, given a vague drawing or a
        drawing that has already decided the chamfer, how it feels in the hand,
        and the tolerance, is in two different businesses. One sells capacity. The other
        carries out someone else's judgement. Capacity is priced by the next
        shop that can do it. The judgement is priced by whether it is worth
        copying. Hard and scarce are different. Once enough people can do a hard
        thing, the price leaves it.
      </p>
      <h2>Intelligence is turning into the same kind of thing</h2>
      <p>
        AI is running the same accounting on intelligence, only faster. The
        things a model can now hand over reliably — a usable paragraph, a
        function that runs, a plan that is good enough, a debugging session that
        actually reads the error — are turning into industrial goods. The price
        of a unit of capability is falling past the point where it is a variable
        in the decision. The API prices in the last essay already made me stop.
        They look even less like a metaphor now.
      </p>
      <p>
        The natural mistake is the one people made about factories: if making
        the thing got easier, the person making it must be worth more. No. The
        part that got easier is the part whose price follows the ease. Someone
        who passes a model's output straight through is selling capacity. The
        competitors on that line are everyone else with the same model, and the
        model itself. There is no premium there.
      </p>
      <p>
        The premium stays in the layer the model cannot supply, and should not
        be asked to: among many adequate results, which one should exist.
      </p>
      <h2>Taste is not an aesthetic</h2>
      <p>
        The word slides toward decoration. Color, type, a prettier sentence.
        Those are a surface of taste, and the surface is the part a model
        imitates best. If taste were only the surface, it would cheapen along
        with intelligence, and there would be nothing to write.
      </p>
      <p>
        The definition I want is drier. Taste is the ability to choose under
        abundance. Abundance is the condition. When the options are scarce,
        choosing is not taste; it is making do. Choosing becomes expensive when
        the options are many and most of them are good enough. It does at least
        five things.
      </p>
      <ul>
        <li>
          <strong>Omission.</strong> Deciding what does not appear. Once
          generation is nearly free, excess is the default. One more
          explanation, one more setting, one more feature nobody uses — each has
          a reason to stay. Taste is the standard that says no, early enough
          that these things never become maintenance.
        </li>
        <li>
          <strong>Defaults.</strong> Making the decision once for the person who
          will use the thing, so they do not make it again. A good default saves
          a choice on every later use. A bad default is repaid on every later
          use. Either way a default is a judgement that gets reused, which makes
          it more expensive than any single output.
        </li>
        <li>
          <strong>Coherence.</strong> Many small decisions pointing at one
          judgement. Taken alone, each one is fine. Together they either cancel
          or reinforce. Coherence is not something you hit by generating more
          candidates. It requires that one standard remember what was already
          promised.
        </li>
        <li>
          <strong>Done.</strong> Knowing when to stop. A model stops where the
          result looks plausible, because its stopping rule is probability, not
          a standard. The standard is applied from outside: this version can be
          signed, the last one could not. The difference is almost invisible in
          volume. In price it is the whole difference.
        </li>
        <li>
          <strong>A name.</strong> Someone has to own the choice. A preference
          nobody claims is noise, and nobody pays a premium for noise. A name is
          not a personal brand. It means a mistake has an address, and a success
          can be learned from. A default with no author cannot be relied on,
          because it may be a different thing tomorrow.
        </li>
      </ul>
      <p>
        All five touch aesthetics and none of them depend on it. The shape of an
        API, the questions an installer has stopped asking, the three paragraphs
        cut from an essay — those are taste. What they share is not that they
        look good. What they share is that someone, after the options were
        already adequate, refused to keep all of them.
      </p>
      <h2>Money that bought decisions</h2>
      <p>
        In August 2026 David Heinemeier Hansson set up the Omacom Foundation for
        Omarchy, his Linux distribution. By 22 September, when Alibaba Cloud
        joined, the foundation's own page put pledges and donations at about
        $21.7 million. The sum includes multi-year corporate commitments and
        model credits. It is not an equity round that has cleared into a bank
        account. The number is not the part I want. I want what the money
        bought.
      </p>
      <p>
        Omarchy is Arch, with Hyprland and Quickshell for the desktop. Its own
        word for the approach is omakase: "I'll leave it to you," the chef
        ordering for the table. The account it gives is plain. Most people do
        not know what they want at the start, and they are better off accepting
        a coherent set of defaults from someone they trust than suffering the
        menu. Theme, terminal, editor, and keybindings are one system, not a bag
        of software.
      </p>
      <p>
        The criticism is just as plain. It has been said that this is not a
        distribution in the traditional sense — Arch plus one person's config
        files. I think that sentence describes the product accurately and then
        stops one step short. The kernel is not new. He did not write the window
        manager. What is new is the layer of decisions: which defaults are worth
        someone else's whole day, and which choices should already be gone by
        the time the installer finishes. The config is not an accessory. The
        config is the product.
      </p>
      <p>
        The money arrived at that layer not because Linux suddenly lacked a
        kernel. What is scarce is someone willing to sign a way of using the
        machine and maintain that way until other people can depend on it. In
        its 3 September note the foundation called itself the exclusive sponsor
        of Hyprland and a premier sponsor of Quickshell and mise, and it funds
        the people who make the system visually coherent, the kernel work, and
        the infrastructure. What got funded is how this particular whole holds
        together, not another general runtime.
      </p>
      <p>
        I am not going to call a pile of donations a proof. A famous author was
        in the room, and money arrives faster and larger when that is true.
        Rails was also opinions laid on top of a language, by the same person.
        Fame explains the speed. It does not explain the category. The category
        is old: people pay for a set of decisions that have already been made.
        What is new is that the work underneath the decisions — getting an
        environment to the point of being usable, debugging it, making the
        surface consistent — just became cheap. Once that work is cheap, the
        opinion is nearly the entire product. Omarchy is only the example that
        is easiest to see right now.
      </p>
      <h2>Taste does not spend efficiency</h2>
      <p>
        When people hear taste they hear slowness. Reworking, refusing the first
        adequate result. If efficiency is output divided by time, all of that
        does make you slower. That arithmetic holds while output is expensive.
        Once output is nearly free, it measures something that is losing its
        price.
      </p>
      <p>
        Change the numerator to value and the arithmetic reverses. In the same
        hour, output with no standard is priced near the cost of generating it;
        output with a standard is priced by whether other people can rely on
        that standard. Taste does not deduct a term from efficiency. It replaces
        the numerator, from a cheap good to a thing that still has a price.
        Without that replacement, faster only means arriving sooner at a result
        the market will price at cost. That is not efficiency going up. That is
        waste, at a higher speed.
      </p>
      <p>Three places, in particular.</p>
      <p>
        <strong>
          Make the decision upstream, and downstream does not make it again.
        </strong>{" "}
        Omakase is a kind of efficiency because the guest does not study forty
        dishes. Part of the bill is for not choosing tonight. Omarchy's
        installer is the same offer: Linux was slow because every step asked a
        question, and those questions already have answers, and the answers
        agree. One person's taste, exercised once, becomes everyone else's
        speed. Reading taste as private fussing is seeing the one exercise and
        missing the number of times it is reused.
      </p>
      <p>
        <strong>The waste moved.</strong> When production is scarce, waste is
        the thing you failed to make. When production is abundant, generation is
        nearly free, and waste becomes shipping a thing that should not exist,
        or generating ten versions with no standard for which one stays. The ten
        versions are not the expensive part. Reading them and deciding is. Skip
        that, and throughput goes up, while the price the market puts on
        throughput falls toward the cost of generation — which is falling toward
        zero. Throwing nine away looks slow. Shipping the average of the ten is
        spending time on something whose price is disappearing.
      </p>
      <p>
        <strong>
          Throughput without a specification saves the buyer's money.
        </strong>{" "}
        A factory that pushes undifferentiated goods through at astonishing
        speed is efficient and thinly profitable. The thin margin is not because
        it is slow. It is because what it makes can be swapped for the next
        unit. China's industrialization did not punish careful factories. It
        punished output that had no specification: the faster you went, the more
        you saved money for the buyer of your capacity. AI moves that sentence
        onto cognitive work. Multiply throughput by ten, and if the standard
        does not come with it, you have multiplied a commodity by ten. Taste is
        that standard. It does not trade places with efficiency. It decides
        whether the same efficiency lands on a commodity or on something that
        still has a price.
      </p>
      <h2>Where this can be wrong</h2>
      <p>
        There are ways into this that fail. I want them written down, or the
        claim is only a good-sounding sentence.
      </p>
      <p>
        <strong>Fame.</strong> Omarchy's money may be DHH's audience rather than
        a law about taste. If the next person produces defaults of the same
        quality and nobody pays, then my example was celebrity. My answer for
        now: an audience sets the size of this particular sum. It does not
        create the category "opinions can be sold." The category already holds
        Apple, Rails, and restaurants with no menu. Omarchy is just the case
        that became easy to see once intelligence got cheap.
      </p>
      <p>
        <strong>Bad taste.</strong> A wrong default is slower than flexibility,
        because everyone routes around it. True. Taste is a bet that can lose,
        not a guarantee. I am not saying every opinion wins. I am saying that
        once the generic unit is free, the person who refuses to bet is holding
        nothing that can carry a price. A wrong opinion still has a shape.
        People can leave it, and they can improve it. An average has no shape.
        It has a price, and the price goes down.
      </p>
      <p>
        <strong>Status.</strong> Sometimes people pay for taste as a signal: I
        can afford this judgement. That is the weakest form, and the first to
        die in a price war. The form that survives is not a signal. It is work
        taken off someone else's plate. You adopted the decisions, you got the
        time back, and the result is more coherent than what you would have
        assembled under time pressure. That is productivity, not luxury.
      </p>
      <p>
        And there is the part of making and of thinking that did not cheapen.
        Process, materials, and yield still pay. So do new problems,
        responsibility, and the context that exists only because you were there.
        If "taste is what is expensive" gets heard as "craft and thought no
        longer matter," I have said it badly. The expensive part of craft and of
        thought was taste already: knowing how far to go, and where not to. What
        got cheap is the part the next model can do over.
      </p>
      <h2>The step I am keeping</h2>
      <p>
        I am not going to use these models less. They made capacity nearly free,
        and free capacity should be spent. The way to spend it is not to hand
        the output over. Before it is handed over it has to pass through a step
        that is still expensive: the choice.
      </p>
      <p>
        The standard I am keeping is narrow. Before a thing can carry my name, I
        have to be able to say what it left out, and why its defaults are what
        they are. If I cannot say that, it is still capacity, however complete
        it looks. That step is slower than generating. The slowness is where the
        price still is. Skip it, and what you get in return is not higher
        efficiency. It is something the market will shortly price at cost.
      </p>
    </>
  );
}

export const taste: Post = {
  slug: "taste",
  date: "2026-09-27",
  locales: {
    zh: {
      title: "品味",
      summary:
        "工业化把普通工业品的价格压到了成本附近，AI 正在对普通的智能做同样的事。还标得上价的是选择：做什么、不做什么、什么算完成。这个选择就是品味。它不消耗效率。它决定效率生产出来的东西还有没有价格。",
    },
    en: {
      title: "Taste",
      summary:
        "Industrialization pushed ordinary goods toward cost, and AI is doing the same to ordinary intelligence. What still carries a price is the choosing: what to make, what to leave out, what counts as done. That choosing is taste. It does not spend efficiency. It decides whether efficiency still produces something with a price.",
    },
  },
  Body: { zh: TasteZh, en: TasteEn },
};
