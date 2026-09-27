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
        我最近常把两件事放在一起想。一件是中国的工业化把普通工业品的价格压到了成本附近；另一件是
        AI
        正在对普通的智能做同样的事。两次背后是同一个机制：一种能力一旦可以大量供给，价格就向成本靠拢。此后仍然稀缺的，不是更多的供给，而是在已经足够多、也足够好的东西里做选择。我想把这种选择叫作品味——这个词在这里的意思，比平时要宽。
      </p>
      <h2>贬值的是可替代的那一单位</h2>
      <p>
        「贬值」这个词得用得很窄，否则整件事会变成一句抱怨。贬值的不是制造，也不是思考，而是其中可以互相替代的那一单位：第一百万根一模一样的数据线，第一百万段写得还过得去的说明。它们依然有用，但有用不等于值钱。一样东西可以很有用，同时又便宜到没人愿意为它多付一分钱，因为下一个供给者能以几乎相同的成本再给你一份。
      </p>
      <p>
        所以说「工业品贬值」，并不是说工厂变差了。工厂完全可以比以前更好：良率更高、交期更稳、公差更紧。只是买家拿走了产品，溢价却没有落在这根线上。它落在别处：落在「这根线应该是什么样」的那个决定上。
      </p>
      <h2>工业化把瓶颈挪走了</h2>
      <p>
        施振荣在九十年代画过一条「微笑曲线」。它是一张示意图，不是定律：价值在两端高、中间低，一端是规格与设计，另一端是品牌与渠道，底部是制造。中国在
        2001 年加入
        WTO、进入全球分工之后，把这条曲线的底部做成了世界价格。此后一代人里，一种体验变得再普通不过：东西都还在，只是贵不起来了。衣服、充电器、塑料件、整机里那些看不见的零件，凡是谁都能做的那一层，价格都贴着成本走。
      </p>
      <p>
        这套机制并非中国独有。英国的纺织业、后来的日本，都曾把某一种生产从稀缺变成背景。中国只是规模大到让今天活着的人都无法视而不见。道理本身很老：生产一旦不再是瓶颈，瓶颈就挪到了「生产什么」。
      </p>
      <p>
        钱并没有离开，只是不再为产量买单，转而为规格买单。同一家注塑厂，拿到一份含糊的图纸，和拿到一份把倒角、手感、公差都写死的图纸，做的是两门生意：前者卖产能，后者执行别人的判断。产能的价格，由下一家同样做得出来的工厂决定；判断的价格，由这个判断值不值得被复制决定。难和稀缺也不是一回事：一件事再难，只要会做的人够多，价格就会离开它。
      </p>
      <h2>智能正在变成同一种东西</h2>
      <p>
        AI
        在智能上算的是同一笔账，只是快得多。模型已经能稳定交付的那些东西——一段能用的文字、一个能跑的函数、一份过得去的方案、一次真正读懂报错的调试——正在变成工业品。单位能力的价格一路下跌，跌到不再是做决定时需要考虑的变量。上一篇里那些
        API 价格已经让我停下来过一次；现在再看，这件事更不像一个比喻了。
      </p>
      <p>
        于是出现了和当年工厂一样的错觉：既然做出来变容易了，会做的人就该更值钱。并不是。变容易的那一部分，价格会跟着容易一起走。一个人如果把模型的产出原样交出去，他卖的就是产能，而这条线上的竞争者是所有用同一个模型的人，外加模型本身。这里没有溢价。
      </p>
      <p>
        溢价留在模型给不了、也不该替你给的那一层：在许多都够用的结果里，决定哪一个应该存在。
      </p>
      <h2>品味不是审美</h2>
      <p>
        「品味」这个词很容易滑向装饰：配色、字体、一句更漂亮的文案。这些是品味的表面，偏偏也是模型最擅长模仿的部分。如果品味只是表面，它会和智能一起贬值，这篇文章也就不必写了。
      </p>
      <p>
        我想要一个更朴素的定义：品味是在充裕中做选择的能力。充裕是前提。选项不够的时候，选择不叫品味，叫将就；只有选项很多、而且大多都够用的时候，选择才变得昂贵。具体来说，它至少做五件事。
      </p>
      <ul>
        <li>
          <strong>取舍。</strong>
          决定什么不出现。生成的成本趋近于零之后，冗余就成了默认状态：多一段解释、多一个设置项、多一个没人用的功能，每一样都有留下的理由。品味就是那个说「不」的标准，而且要说得早，赶在它们变成维护负担之前。
        </li>
        <li>
          <strong>默认值。</strong>
          替使用者把决定先做掉，让他们不必再做一遍。做得好，之后每一次使用都省下一次选择；做得坏，之后每一次使用都在还债。无论好坏，默认值都是一份被反复使用的判断，所以它比任何一次性的产出都贵。
        </li>
        <li>
          <strong>一致性。</strong>
          让许多小决定指向同一个判断。单看每一处都「还行」，放在一起却可能互相拆台，也可能互相成全。一致性没法靠多生成几次碰出来，它要求同一个标准记得自己之前答应过什么。
        </li>
        <li>
          <strong>完成。</strong>
          知道什么时候停。模型停在「看起来像那么回事」的地方，因为它的停止条件是概率，而不是标准。标准只能从外部施加：这一版可以署名了，上一版还不行。这点差别在产量上几乎看不出来，在价格上却是全部。
        </li>
        <li>
          <strong>署名。</strong>
          选择得有人认。没人认领的偏好只是噪音，市场不会为噪音付溢价。署名不等于个人品牌，它的意思是：错了有人可找，对了有处可学。一份没有作者的默认值没人敢依赖，因为它明天就可能变成别的样子。
        </li>
      </ul>
      <p>
        这五件事都沾一点审美，却没有一件靠审美成立。一个 API
        的形状、安装流程里不再追问你的那些问题、一篇文章里删掉的三段，都是品味。它们的共同点不是好看，而是在选项已经够用之后，仍然有人拒绝把它们全部留下。
      </p>
      <h2>一笔为决定买单的钱</h2>
      <p>
        2026 年 8 月，David Heinemeier Hansson（DHH）为他的 Linux 发行版 Omarchy
        成立了 Omacom Foundation。截至 9 月 22
        日阿里云加入，基金会官网列出的承诺与捐赠合计约 2170
        万美元。其中既有多年期的企业承诺，也有模型额度，并不是一笔已经到账的股权融资。不过我在意的不是这个数字，而是这笔钱买的是什么。
      </p>
      <p>
        Omarchy 基于 Arch，桌面用的是 Hyprland 和 Quickshell。它给自己的说法是
        omakase：日语里的「交给你了」，在料理里指由主厨替你点菜。它的解释很直白：大多数人一开始并不知道自己想要什么，与其在一堆选项里受苦，不如先接受一套由可信的人整理好、彼此协调的默认配置。主题、终端、编辑器、快捷键是一个整体，而不是一袋散装软件。
      </p>
      <p>
        批评也同样直白。有人说它算不上传统意义上的发行版，不过是 Arch
        加上一个人的配置文件。我觉得这句话把产品说对了，只是早停了一步。内核不是新的，窗口管理器也不是他写的；新的是那一层决定：哪些默认值得别人用上一整天，哪些选择应该在安装结束前就消失。在这里，配置文件不是附件，配置文件就是产品。
      </p>
      <p>
        钱流向这一层，不是因为 Linux
        突然缺一个内核。缺的是有人愿意为一种用法签字，并把它维护到别人可以放心依赖。基金会在
        9 月 3 日的说明里称自己是 Hyprland 的独家赞助方、Quickshell 和 mise
        的主要赞助方，同时出钱支持驻场的视觉设计、内核开发，以及一个发行版所需的基础设施。被资助的是「这一整套如何成立」，而不是又一个通用运行时。
      </p>
      <p>
        人们为一套已经做好的决定付钱，这件事并不新鲜。Rails
        当年也是在一门语言上铺了一层意见，出自同一个人之手。新鲜的是，决定下面的那层活——把环境装到能用、把问题查到能修、把外观收拾到一致——刚刚变得非常便宜。这层活便宜之后，意见几乎就是产品的全部。一笔捐赠当然算不上证明，名气在其中起了多大作用，我放到后面再谈。
      </p>
      <h2>品味不消耗效率</h2>
      <p>
        一提到品味，很多人想到的是慢：反复推敲、不断返工、不肯交出第一版够用的结果。如果效率只按「产量除以时间」来算，这些确实都会拖慢你。但这个算法只在产量昂贵时成立；产量几乎免费之后，它衡量的是一样正在失去价格的东西。
      </p>
      <p>
        把分子从产量换成价值，账就反过来了。同样一小时，没有标准的产出，标价接近生成它的成本；有标准的产出，标价取决于这个标准值不值得别人依赖。品味并没有从效率里扣掉什么，它是把效率的分子从一种廉价品换成了一样仍有价格的东西。没有这次替换，更快只意味着更早抵达一个市场只肯按成本计价的结果。那不是效率提高了，只是浪费得更快了。
      </p>
      <p>具体体现在三个地方。</p>
      <p>
        <strong>决定做在上游，下游就不必重复。</strong>
        omakase
        本身就是一种效率：客人不用研究四十道菜，账单里有一部分买的正是「今晚不用选」。Omarchy
        的安装也是一回事。Linux
        过去之所以慢，是因为每一步都在问你；如今这些问题已经有人回答过，而且答成了一套彼此协调的方案。一个人的品味用一次，换来的是之后所有人的速度。把品味理解成个人的磨蹭，是只看见了那一次，没看见它被复用了多少次。
      </p>
      <p>
        <strong>浪费换了位置。</strong>
        生产稀缺的时候，浪费是「没做出来」；生产充裕、生成几乎不要钱的时候，浪费变成了交出一个本不该存在的东西，或者生成了十个版本，却没有标准决定留下哪一个。十个版本本身不贵，贵的是读完它们并做出决定的那一下。省掉这一下，吞吐量是上去了，可市场给吞吐量的价格正向生成成本靠拢，而生成成本正在趋近于零。丢掉九个看起来很慢；把十个的平均值交出去，才是真正把时间花在一件价格正在消失的事上。
      </p>
      <p>
        <strong>没有规格的吞吐，省下的是买家的钱。</strong>
        一家把无差别产品做到极快的工厂，效率很高，利润很薄。薄不是因为它慢，而是因为它生产的东西随时可以被替换。中国的工业化并没有惩罚认真的工厂，它惩罚的是没有规格的产出：你跑得越快，就越是在替购买你产能的人省钱。AI
        把同一句话搬到了认知劳动上：吞吐量翻十倍，标准却没有跟上，你只是把一件商品乘以了十。品味就是那个标准。它不和效率争位置，它决定同样的效率最终落在一件商品上，还是落在一样仍有价格的东西上。
      </p>
      <h2>我可能看错的地方</h2>
      <p>这个判断有几处可能出错。我把它们写下来，免得它只是一句好听的话。</p>
      <p>
        <strong>名气。</strong>
        Omarchy 拿到的钱，可能主要来自 DHH
        的受众，而不是什么关于品味的规律。如果下一次，一个没有受众的人做出了同样质量的默认配置，却没人付钱，那我举的例子就只是名人效应。我目前的回答是：名气解释的是速度和规模，不解释类别。受众决定了这一笔钱有多大，但「意见可以卖钱」这个类别早就存在，里面有苹果，有
        Rails，有不设菜单的餐馆。Omarchy
        只是这个类别在智能变便宜之后最容易被看见的一例。
      </p>
      <p>
        <strong>坏品味。</strong>
        一份错误的默认比灵活更慢，因为所有人都得绕开它。这是真的。品味是一次可能输的下注，不是保证。我并不是说每个意见都会赢，而是说：通用的那一单位变得免费之后，拒绝下注的人手里就没有任何可以标价的东西。错误的意见至少还有形状，别人可以离开它，也可以修正它；平均值没有形状，只剩下一个价格，而且这个价格还在往下走。
      </p>
      <p>
        <strong>地位。</strong>
        有时人们为品味付钱，付的是一种信号：我用得起这份判断。这是最弱的一种，在价格战里最先死掉。能活下来的那种不是信号，而是替别人省掉工作：你采纳了这些决定，拿回了时间，得到的结果还比自己在时间压力下拼凑出来的更一致。这是生产力，不是奢侈品。
      </p>
      <p>
        最后，制造和思考里也有没贬值的部分。工艺、材料、良率依然值钱；新的问题、责任，以及只有你在场才拥有的上下文，也依然值钱。如果「品味最贵」被听成了「手艺和思考不再重要」，那是我没说清楚。手艺和思考里最贵的那部分，本来就是品味：知道做到哪里，又在哪里停手。便宜下去的，只是其中下一个模型能重做一遍的部分。
      </p>
      <h2>留下来的那一步</h2>
      <p>
        我不打算少用这些模型。它们让产能几乎免费，而免费的产能就该被用掉。但用掉它的方式，不是把产出直接交出去。产出在交出去之前，还要经过一个依然昂贵的步骤：选择。
      </p>
      <p>
        我给自己定的标准很窄：一件东西在署上我的名字之前，我得说得出它删掉了什么，以及它的默认为什么是现在这样。说不出来，它就仍然只是产能，不管看起来多完整。这一步比生成慢，而慢下来的那一点，正是价格还在的地方。省掉它，换来的不是更高的效率，而是一件市场很快就会按成本标价的东西。
      </p>
    </>
  );
}

function TasteEn() {
  return (
    <>
      <p>
        Lately I keep setting two facts side by side. China's industrialization
        pushed the price of ordinary industrial goods down to roughly what they
        cost to make. AI is now doing the same to ordinary intelligence. The
        mechanism is identical: once a capability can be supplied in volume, its
        price falls toward its cost. What stays scarce afterward is not more
        supply. It is the choice among things that are already plentiful and
        already good enough. I want to call that choice taste, and to stretch
        the word further than it usually goes.
      </p>
      <h2>The unit that loses its price</h2>
      <p>
        "Devalue" has to be used narrowly, or the whole claim turns into a
        complaint. Making things has not lost its worth, and neither has
        thinking. What loses its price is the interchangeable unit: the
        millionth identical cable, the millionth paragraph that is good enough.
        Both are still useful, but useful is not the same as valuable. A thing
        can be useful and still too cheap for anyone to pay a premium, because
        the next supplier can hand you another at nearly the same cost.
      </p>
      <p>
        So "industrial goods got cheap" does not mean the factories got worse.
        They can be better than ever — higher yield, steadier delivery, tighter
        tolerances — and the buyer still takes the product without the premium
        attaching to it. The premium attaches somewhere else: to the decision
        about what the thing should be.
      </p>
      <h2>Industrialization moved the bottleneck</h2>
      <p>
        In the 1990s Stan Shih drew the smile curve. It is a sketch, not a law:
        value is high at the two ends and low in the middle, with specification
        and design at one end, brand and distribution at the other, and
        manufacturing in the trough. After China joined the WTO in 2001 and
        entered the global division of labor, that trough became the world
        price. Within a generation one experience became ordinary: the goods
        were all still there, they just would not stay expensive. Clothing,
        chargers, plastic parts, the invisible pieces inside a finished device —
        whatever anyone could make was priced at cost.
      </p>
      <p>
        The mechanism is not unique to China. British textiles, and later Japan,
        each turned some kind of production from a scarcity into a background
        condition. China simply did it at a scale no one alive today can ignore.
        The principle is old: when production stops being the bottleneck, the
        bottleneck moves to what gets produced.
      </p>
      <p>
        The money does not leave. It stops paying for volume and starts paying
        for specification. Give the same molding shop a vague drawing, or one
        that has already settled the chamfer, the feel in the hand, and the
        tolerance, and it is in two different businesses. In the first it sells
        capacity; in the second it carries out someone else's judgement.
        Capacity is priced by the next shop that can do the same work. Judgement
        is priced by whether it is worth copying. Hard and scarce are also
        different things: however hard a task is, once enough people can do it,
        the price leaves it.
      </p>
      <h2>Intelligence is becoming the same kind of thing</h2>
      <p>
        AI is running the same accounting on intelligence, only faster. What a
        model can now deliver reliably — a usable paragraph, a function that
        runs, a plan that is good enough, a debugging session that actually
        reads the error — is turning into an industrial good. The price of a
        unit of capability keeps falling, past the point where it counts as a
        variable in any decision. The API prices in the last essay already made
        me stop once. Looking again, they read even less like a metaphor.
      </p>
      <p>
        So people make the same mistake they made about factories: if making the
        thing got easier, whoever makes it must be worth more. Not so. The part
        that got easier is the part whose price follows the ease down. Someone
        who passes a model's output straight through is selling capacity, and
        the competition on that line is everyone with the same model, plus the
        model itself. There is no premium there.
      </p>
      <p>
        The premium stays in the layer the model cannot supply, and should not
        be asked to: among many adequate results, deciding which one should
        exist.
      </p>
      <h2>Taste is not an aesthetic</h2>
      <p>
        The word drifts easily toward decoration: color, type, a prettier
        sentence. Those are the surface of taste, and the surface happens to be
        what a model imitates best. If taste were only surface, it would cheapen
        along with intelligence, and this essay would have nothing to say.
      </p>
      <p>
        The definition I want is plainer. Taste is the ability to choose under
        abundance. Abundance is the precondition. When options are scarce,
        choosing is not taste; it is making do. Choosing gets expensive only
        when the options are many and most of them are good enough. In practice,
        taste does at least five things.
      </p>
      <ul>
        <li>
          <strong>Omission.</strong> Deciding what does not appear. Once
          generation is nearly free, excess is the default: one more
          explanation, one more setting, one more feature nobody uses, each with
          a reason to stay. Taste is the standard that says no, and says it
          early, before those things turn into maintenance.
        </li>
        <li>
          <strong>Defaults.</strong> Making a decision once so the people who
          use the thing do not have to make it again. A good default saves a
          choice on every later use; a bad one is repaid on every later use.
          Either way, a default is a judgement that gets reused, which makes it
          worth more than any single output.
        </li>
        <li>
          <strong>Coherence.</strong> Getting many small decisions to point at
          one judgement. Each may be fine on its own; together they either
          undercut or reinforce one another. Coherence cannot be stumbled into
          by generating more candidates. It needs a single standard that
          remembers what it has already promised.
        </li>
        <li>
          <strong>Done.</strong> Knowing when to stop. A model stops where the
          result looks plausible, because its stopping rule is probability, not
          a standard. The standard has to come from outside: this version can be
          signed, the last one could not. In volume the difference is almost
          invisible. In price it is everything.
        </li>
        <li>
          <strong>A name.</strong> Someone has to own the choice. A preference
          nobody claims is noise, and nobody pays a premium for noise. A name is
          not a personal brand. It means a mistake has an address and a success
          can be learned from. A default with no author cannot be relied on,
          because tomorrow it may be something else.
        </li>
      </ul>
      <p>
        All five touch aesthetics, and none of them rests on it. The shape of an
        API, the questions an installer no longer asks, the three paragraphs cut
        from an essay — all of that is taste. What these share is not that they
        look good. It is that someone, after the options were already adequate,
        refused to keep all of them.
      </p>
      <h2>Money that bought decisions</h2>
      <p>
        In August 2026 David Heinemeier Hansson (DHH) set up the Omacom
        Foundation for Omarchy, his Linux distribution. By 22 September, when
        Alibaba Cloud joined, the foundation's own page listed pledges and
        donations of about $21.7 million. That total includes multi-year
        corporate commitments and model credits; it is not an equity round
        sitting in a bank account. The number is not what interests me, though.
        What interests me is what the money bought.
      </p>
      <p>
        Omarchy is Arch, with Hyprland and Quickshell for the desktop. Its own
        word for the approach is omakase — Japanese for "I'll leave it to you,"
        the chef ordering for the table. Its reasoning is plain: most people do
        not know what they want at the start, and they are better off accepting
        a coherent set of defaults from someone they trust than suffering
        through the menu. Theme, terminal, editor, and keybindings form one
        system, not a bag of software.
      </p>
      <p>
        The criticism is just as plain: this is not a distribution in the
        traditional sense, only Arch plus one person's config files. I think
        that describes the product correctly and then stops one step short. The
        kernel is not new, and he did not write the window manager. What is new
        is the layer of decisions: which defaults deserve someone else's entire
        workday, and which choices should be gone before the installer finishes.
        Here the config is not an accessory. The config is the product.
      </p>
      <p>
        The money went to that layer, and not because Linux suddenly lacked a
        kernel. What was missing is someone willing to put their name to a way
        of using the machine, and to maintain it until other people can depend
        on it. In its 3 September note the foundation described itself as the
        exclusive sponsor of Hyprland and a premier sponsor of Quickshell and
        mise, and it also funds resident visual design, kernel work, and the
        infrastructure a distribution needs. What got funded is how this
        particular whole holds together, not yet another general-purpose
        runtime.
      </p>
      <p>
        Paying for a set of decisions someone has already made is nothing new.
        Rails, by the same person, was also a layer of opinion laid over a
        language. What is new is that the work beneath the decisions — getting
        an environment to where it is usable, debugging it until it works,
        making the surface consistent — has just become cheap. Once that work is
        cheap, the opinion is nearly the whole product. A pile of donations is
        not proof, of course; how much of it is fame, I come back to below.
      </p>
      <h2>Taste does not spend efficiency</h2>
      <p>
        When people hear taste, they hear slowness: reworking, second-guessing,
        refusing the first adequate result. If efficiency means output divided
        by time, all of that does slow you down. But that arithmetic only holds
        while output is expensive. Once output is nearly free, it is measuring
        something that is losing its price.
      </p>
      <p>
        Swap output for value in the numerator and the arithmetic flips. In the
        same hour, output with no standard is priced near the cost of generating
        it; output with a standard is priced by whether other people can rely on
        that standard. Taste does not subtract anything from efficiency. It
        replaces the numerator, trading a cheap good for something that still
        has a price. Without that swap, going faster just means arriving sooner
        at a result the market will price at cost. That is not efficiency going
        up. It is waste, arriving faster.
      </p>
      <p>This shows up in three places.</p>
      <p>
        <strong>
          Decide upstream, and downstream never has to decide again.
        </strong>{" "}
        Omakase is itself a kind of efficiency: the guest does not have to study
        forty dishes, and part of the bill pays for not choosing tonight.
        Omarchy's installer makes the same offer. Linux used to be slow because
        every step asked you a question; those questions have now been answered,
        and the answers fit together. One person's taste, exercised once,
        becomes everyone else's speed. Calling taste private fussiness sees the
        one exercise and misses how many times it gets reused.
      </p>
      <p>
        <strong>The waste moved.</strong> When production is scarce, waste is
        what you failed to make. When production is abundant and generation is
        nearly free, waste is shipping something that should not exist, or
        generating ten versions with no standard for which one stays. The ten
        versions are not the expensive part; reading them and deciding is. Skip
        that step and throughput rises, but the price the market puts on
        throughput is sliding toward the cost of generation, and that cost is
        sliding toward zero. Throwing nine away looks slow. Shipping the average
        of the ten is what actually spends your time on something whose price is
        vanishing.
      </p>
      <p>
        <strong>
          Throughput without a specification saves the buyer money.
        </strong>{" "}
        A factory that pushes undifferentiated goods out at astonishing speed is
        efficient and thinly profitable. The margin is thin not because it is
        slow, but because anything it makes can be swapped for the next unit.
        China's industrialization did not punish careful factories. It punished
        output with no specification: the faster you ran, the more money you
        saved whoever bought your capacity. AI carries that sentence over to
        cognitive work. Multiply throughput by ten without the standard keeping
        up, and all you have done is multiply a commodity by ten. Taste is that
        standard. It does not compete with efficiency for a place. It decides
        whether the same efficiency lands on a commodity or on something that
        still has a price.
      </p>
      <h2>Where this could be wrong</h2>
      <p>
        There are a few places where this argument could fail. I want them
        written down, or the claim is only a nice-sounding sentence.
      </p>
      <p>
        <strong>Fame.</strong> Omarchy's money may mostly be DHH's audience
        rather than any law about taste. If someone without an audience ships
        defaults of the same quality and nobody pays, my example was just
        celebrity. My answer for now: fame explains speed and size, not the
        category. An audience sets how large this particular sum is, but the
        category "opinions can be sold" existed long before it. It already holds
        Apple, Rails, and restaurants with no menu. Omarchy is simply the case
        in that category that became easiest to see once intelligence got cheap.
      </p>
      <p>
        <strong>Bad taste.</strong> A wrong default is slower than flexibility,
        because everyone has to route around it. That is true. Taste is a bet
        that can lose, not a guarantee. I am not saying every opinion wins. I am
        saying that once the generic unit is free, whoever refuses to bet is
        holding nothing that can carry a price. A wrong opinion at least has a
        shape: people can leave it, and they can fix it. An average has no
        shape. It has only a price, and the price keeps falling.
      </p>
      <p>
        <strong>Status.</strong> Sometimes people pay for taste as a signal: I
        can afford this judgement. That is the weakest form, and the first to
        die in a price war. The form that survives is not a signal but work
        taken off someone else's plate. You adopt the decisions, you get your
        time back, and the result is more coherent than anything you would have
        pieced together under deadline. That is productivity, not luxury.
      </p>
      <p>
        Finally, parts of making and thinking have not cheapened at all.
        Process, materials, and yield still pay. So do new problems,
        responsibility, and the context that exists only because you were in the
        room. If "taste is what is expensive" is heard as "craft and thought no
        longer matter," I have said it badly. The expensive part of craft and
        thought was always taste: knowing how far to go, and where to stop. What
        got cheap is only the part the next model can redo.
      </p>
      <h2>The step I am keeping</h2>
      <p>
        I am not going to use these models less. They have made capacity nearly
        free, and free capacity should be spent. But spending it does not mean
        handing the output straight over. Before it goes out, it has to pass
        through one step that is still expensive: the choice.
      </p>
      <p>
        The standard I hold myself to is narrow. Before something carries my
        name, I have to be able to say what it left out, and why its defaults
        are what they are. If I cannot, it is still capacity, however finished
        it looks. That step is slower than generating, and the slowness is
        exactly where the price still lives. Skip it, and what you get back is
        not higher efficiency. It is something the market will soon price at
        cost.
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
        "工业化把普通工业品的价格压到了成本附近，AI 正在对普通的智能做同样的事。仍然标得上价的是选择：做什么、不做什么、什么算完成。这种选择就是品味。它并不消耗效率，而是决定效率生产出来的东西还有没有价格。",
    },
    en: {
      title: "Taste",
      summary:
        "Industrialization pushed ordinary goods down to cost, and AI is doing the same to ordinary intelligence. What still carries a price is the choosing: what to make, what to leave out, what counts as done. That choosing is taste. It does not spend efficiency; it decides whether what efficiency produces still has a price.",
    },
  },
  Body: { zh: TasteZh, en: TasteEn },
};
