/**
 * The `policy-rehearsal` post, Chinese and English.
 *
 * Well-meant policies keep backfiring because the people they land on adapt:
 * they read a new rule as a problem to solve for their own advantage, and the
 * best-resourced adapt first, so costs drift back onto the people the rule was
 * meant to protect. The essay proposes rehearsing a policy before it ships, on
 * a population of language-model agents playing the people it touches,
 * including enforcers, intermediaries, and a red team hunting for loopholes,
 * then revising the text and running it again. It closes on where such a
 * simulation is most likely to mislead. The two bodies carry the same
 * argument, not the same sentences.
 */

import type { Post } from "./posts";

function PolicyRehearsalZh() {
  return (
    <>
      <p>
        每隔一段时间，就会看到这样的新闻：一项本意良好的政策推出之后，结果和初衷南辕北辙。想保护的人没有被保护，反而被进一步挤压；想遏制的行为没有减少，反而换了一种更隐蔽的形式蔓延开来。事后复盘，人们常说：制定政策的人太不了解人性了。
      </p>
      <p>
        这句话我只同意一半。不了解人性是真的，但很难全部归咎于某个人的能力。一项政策要落到成千上万种处境各异的人身上，每个人都会按自己的利益重新算一遍，没有哪个大脑能事先把这些账都算完。我最近一直在想：这笔账，能不能先交给
        AI 算一遍？
      </p>
      <p>
        设想是这样的：用 AI
        搭一个政策模拟平台，让模型扮演政策会触及的各种身份，企业主、打工者、房东、租客、中介、基层执行者，让他们在新规则下各自追求自己的利益，看看会发生什么。在政策真正落地之前，先在模拟世界里彩排一次，把那些钻漏洞、适得其反的路径提前找出来，再回头修改条文。
      </p>
      <p>
        这篇文章想把这个想法理清楚：问题到底出在哪里，现有的办法为什么不够，AI
        能补上哪一块，这样一个平台大致长什么样，以及它最容易在哪里出错。
      </p>
      <h2>好心办坏事的老故事</h2>
      <p>
        经济学课上常讲一个「眼镜蛇效应」的故事。据说英国殖民印度时期，德里蛇患严重，政府悬赏收购死眼镜蛇。起初确实有效，后来有人开始专门养蛇换赏金。政府发现后取消悬赏，养蛇的人把没用了的蛇放掉，蛇反而比以前更多。这个故事的细节未必可考，但它流传这么广，是因为类似的事一再发生。
      </p>
      <p>
        1989
        年，墨西哥城为治理空气污染推出「今日不开车」：按车牌尾号，每辆车每周停驶一天，设想是路上的车少五分之一。后来的研究发现，空气质量并没有明显改善。不少家庭买了第二辆车来绕开限行，而为了省钱，买的往往是更老、更脏的二手车。
      </p>
      <p>
        美国许多地方推行过「Ban the
        Box」，禁止雇主在招聘初期询问求职者有没有犯罪记录，本意是给有前科的人一个公平面试的机会。可研究发现，雇主拿不到这条信息后，顾虑并没有消失，而是转而凭种族去猜。年轻黑人男性整体收到面试邀请的机会反而下降了，其中包括大量本来就没有任何记录的人。
      </p>
      <p>
        旧金山扩大租金管制的范围后，研究者追踪发现，受管制的房东通过改建、出售、转为自住等方式，让这批房子的出租供给减少了约
        15%，推高了全市的房租。已经住在里面的租客受益了，后来的租客替他们付了账。
      </p>
      <p>
        身边的例子也不少。一些城市的限购政策催生了「假离婚」，夫妻为了多一个购房名额先离后复。劳动合同法规定连续工作满十年可以签无固定期限合同，消息一出，就有企业在新法实施前让大批老员工先「主动辞职」再重新签约，把工龄清零。还有更常见的：延长产假本来是为了保护女性，有些雇主的应对方式，却是在招聘时悄悄避开育龄女性。
      </p>
      <h2>问题不在坏心，在模型</h2>
      <p>
        这些故事的共同点，不是制定者心怀恶意，而是他们脑子里的那个模型太简单了。
      </p>
      <p>
        写条文的时候，人们心里通常有一个「典型的人」：他读懂规则，然后照着规则的本意去做。现实里的人不是这样。他们处境各异，资源和信息差别巨大，而且会对规则做出反应，把新规则当成一道题，去解自己利益最大化的那个解。条文写的是「不许做
        A」，人们读到的是「A 之外还能做什么」。
      </p>
      <p>
        经济学里对此有几个熟悉的说法。古德哈特定律说，一个指标一旦成为目标，就不再是好指标。卢卡斯批判说，人的行为会随政策改变，所以拿旧规则下的历史数据去预测新规则的效果，本身就靠不住。说的都是同一件事：
        <strong>
          政策不是作用在静止物体上的一个力，而是投进一个会回应的系统里的一步棋。
        </strong>
      </p>
      <p>
        还有一条更让人难受的规律：规则一变，最先调整、调整得最好的，往往是信息最多、资源最多、组织得最好的那一方。大企业有法务，房东有中介，有钱人有顾问。而政策想保护的人，常常恰好是最没有能力博弈的那一方。于是一项保护性的政策，经过各方一轮轮调整，成本被层层转嫁，最后又落回被保护者身上。这几乎是政策适得其反时最典型的形状。
      </p>
      <h2>现有的办法为什么不够</h2>
      <p>并不是没人想过要提前检验政策。常见的做法有几种，各有短处。</p>
      <p>
        <strong>试点。</strong>
        先小范围试行，效果好再推广。这是最接近真实的检验，但它慢，代价是真实的，而且试点里的人知道自己在试点，执行者也格外上心，推广之后的行为未必一样。更要紧的是，很多漏洞要等规则稳定下来、「攻略」流传开以后才会出现，试点期太短根本看不到。
      </p>
      <p>
        <strong>征求意见。</strong>
        公开草案，收集反馈。问题在于谁会来提意见：写得出有分量意见的，多半是组织化的利益方；真正会被影响的普通人，要么不知道，要么说不清。而且很少有人会在意见里写「我打算这样钻空子」。
      </p>
      <p>
        <strong>计量模型。</strong>
        用历史数据估计政策效果。它擅长回答「平均会怎样」，不擅长回答「有人会怎样绕开」，而且逃不开卢卡斯批判：一条从没出现过的规则，历史数据里没有它的答案。
      </p>
      <p>
        <strong>传统的多主体仿真。</strong>
        用程序模拟大量个体的互动，这个思路已经很接近我想要的。但传统做法里，每个个体的行为规则都要人事先写好，比如「房租超过收入三成就搬家」。它能模拟人写进去的行为，却想不出人没想到的行为，而钻漏洞恰恰就是那种没人想到的行为。
      </p>
      <h2>AI 能补上的那一块</h2>
      <p>
        大语言模型带来的变化在于：它可以被要求扮演一个具体的人，带着这个人的处境、目标和常识去理解一段规则，再推理出他可能怎么做。它不需要事先被写好行为规则，它会自己「想」。
      </p>
      <p>
        这一点对模拟政策尤其要紧。告诉一个扮演小餐馆老板的模型：「下个月起，雇满十人的企业要额外缴纳一笔费用」，不用任何人提醒，它就可能想到把员工控制在九个，把一部分人转成外包，或者拆成两家店分别登记。这正是起草者最容易漏掉的东西：不是有人违法，而是有人在规则允许的范围内，找到了一条起草者没想到的路。
      </p>
      <p>
        学术界已经有人在往这个方向走。斯坦福的研究者 2023
        年做过一个「小镇」实验，让二十多个由模型驱动的角色在虚拟小镇里生活，它们会自发地组织聚会、传播消息。之后又有研究根据一千多名真实受访者的访谈，为每个人生成一个模拟角色，这些角色回答社会调查的表现，已经接近真人两周后重答自己问卷的一致程度。经济学家也开始讨论把模型当作「硅基受试者」，在模拟中复现经典的行为经济学实验。更早还有用强化学习寻找最优税制的「AI
        经济学家」。
      </p>
      <p>
        这些研究离一个能检验真实政策的平台还很远，但它们说明了一件事：
        <strong>
          让模型扮演不同的人，并在互动中产生没有被预先写好的行为，已经不是空想。
        </strong>
      </p>
      <h2>政策彩排平台大概的样子</h2>
      <p>把这个想法再具体一点。我设想的平台大致由这样几部分组成。</p>
      <p>
        <strong>政策解析。</strong>
        先把政策文本拆成可以执行的规则：适用于谁，要求什么，奖惩是什么，怎么认定，由谁执行。拆的过程本身就有价值：那些含糊的、可以有多种理解的地方，往往就是日后被钻的空子，应该先被标出来。
      </p>
      <p>
        <strong>身份库。</strong>
        依据人口普查、抽样调查和行业数据，构建一个尽量贴近真实分布的人群。每个身份不只是一个标签，而是一组具体的处境：收入和资产，家庭负担，信息渠道，风险偏好，手里有什么资源，受什么约束。除了政策直接针对的人，还应该放进三类常被忽略的角色：
        <strong>执行者</strong>
        ，基层工作人员也会为了完成考核指标而变形执行；
        <strong>中介</strong>
        ，专门研究规则、出售「攻略」的人，往往是漏洞最早的发现者和传播者；以及
        <strong>旁观的第三方</strong>
        ，政策没有提到他们，成本却可能被转嫁到他们头上。
      </p>
      <p>
        <strong>环境与互动。</strong>
        人不是孤立地做决定的。房东的选择会改变租客面对的市场，一个人想出的办法会顺着社交网络传给更多人，执行者看到大家都在绕路，会调整自己的松紧。所以模拟应该是多轮的，让行为在互动中演化，这样才看得到二阶、三阶效应，而不只是每个人第一反应的简单加总。
      </p>
      <p>
        <strong>红队。</strong>
        除了模拟「普通人会怎么做」，还应该专门放进一批角色，它们唯一的任务就是在规则之内把自己的利益做到最大，想尽办法找漏洞。这借用的是网络安全的做法：系统上线之前，先请人来攻击它。政策同样值得一次渗透测试。
      </p>
      <p>
        <strong>评估。</strong>
        输出不该只是一个总分。它至少要回答几个问题：政策的目标指标有没有达到；收益和成本分别落在谁身上，尤其是政策原本想保护的那群人，处境变好了还是变坏了；出现了哪些意料之外的行为，按可能性和危害排序；执行成本有多高，执行者有没有变形的动机。
      </p>
      <p>
        <strong>迭代。</strong>
        根据结果修改条文，再跑一遍，比较不同版本。平台真正的价值不在于给一份政策打分，而在于让「改一条、试一次」变得足够便宜，便宜到可以在发布之前试上几十次。
      </p>
      <h2>用一个例子走一遍</h2>
      <p>
        拿延长产假试一试。假设草案是：女性产假从 98 天延长到 180
        天，期间工资由用人单位照常发放。
      </p>
      <p>
        模拟里放进几类身份：不同规模的企业主和人事主管，未婚和已婚未育的年轻女性，已经生育的女性，同岗位的男性求职者，招聘平台，劳动监察部门。让它们跑上几个招聘季。
      </p>
      <p>
        大企业的人事角色大概会说，成本扛得住，但同等条件下会更倾向于招已育女性或男性。小企业主的反应会激烈得多：一个十几人的公司，一名员工休半年假，意味着要多雇一个人顶岗，工资发两份。他不会在招聘启事里写明性别，但面试时会多问一句婚育计划，或者干脆在筛简历时就把人刷掉。招聘平台上可能冒出隐晦的筛选标签。年轻女性角色会察觉到面试中的变化，一部分人开始隐瞒婚育计划。劳动监察角色则会发现，这类歧视几乎无法取证。
      </p>
      <p>
        评估的结论可能是：已经在岗、能顺利休满产假的女性受益了；还没进入职场、正在求职的年轻女性，境况反而变差了。这正是「想保护的人被进一步蚕食」的样子。
      </p>
      <p>
        接下来改条文，再试。比如把延长部分的工资改由生育保险统一支付，企业不再直接承担；再比如给男性设立不可转让的育儿假，让雇用男性也带上相近的「风险」，雇主就失去了专门避开女性的理由。重新跑一遍，看小企业主的筛选动机有没有下降，已育和未育女性的结果是否更均衡。这些修改方向本身并不新鲜，不少国家早就这样做了。平台的意义在于：
        <strong>
          让起草者在落笔之前，就亲眼看到第一个版本会怎样伤到它想保护的人。
        </strong>
      </p>
      <h2>它最可能在哪里出错</h2>
      <p>
        说到这里，必须把这个想法的软肋也讲清楚。一个模拟平台如果被过度相信，危害可能比没有它还大。
      </p>
      <p>
        <strong>模型不是人。</strong>
        语言模型的「人性」来自它读过的文字，而这些文字过度代表了上网多、会写字、说主流语言的人。它扮演农民工、老人、少数群体时，给出的很可能是刻板印象，而不是真实的处境。它还常常比真人更讲道理、更守规矩；或者反过来，把每个人都演成精于算计的理性人。真实的人会拖延，会怕麻烦，会因为根本不知道有这项政策而什么都不做，这些「不作为」同样决定政策效果。
      </p>
      <p>
        <strong>必须校准。</strong>
        平台需要拿结局已知的旧政策来回测：在不提示的情况下，它能不能复现墨西哥城的第二辆车，复现限购下的假离婚？这里有个陷阱：模型很可能在训练数据里读过这些结局，复现出来不等于真有预见力。更可靠的检验，是用模型训练之后才出台、结果才揭晓的政策。
      </p>
      <p>
        <strong>它是压力测试，不是预言。</strong>
        我认为这个平台最合适的定位，不是预测「失业率会上升 0.3
        个百分点」，而是列出一份「可能出现的行为清单」，告诉起草者哪些地方值得担心。它更像风洞、兵棋推演和安全红队，而不是天气预报。它的价值在于找到问题，而不在于证明没有问题。
      </p>
      <p>
        <strong>不能变成背书工具。</strong>
        最危险的用法，是拿「模拟显示没有问题」为一项政策辩护，堵住批评的声音。模拟没找到漏洞，只说明模拟没找到。为了防止这一点，模拟的设定、身份库、提示词和结果都应该公开，让任何人都能质疑、复跑，补上自己知道而平台没想到的情形。
      </p>
      <p>
        <strong>不能代替真实的人。</strong>
        模拟应该告诉我们该去问谁、问什么，而不是让我们不必再问。模拟显示小企业主会筛掉育龄女性，下一步就该真的去找小企业主和求职的女性聊一聊。尤其是政策想保护的那些人，他们的声音最容易被统计和模型抹平。
      </p>
      <p>
        <strong>同一套工具，谁都能用。</strong>
        能帮制定者找漏洞的平台，也能帮利益方更早找到漏洞。但我不太担心这一点：专业地钻空子，本来就是利益方一直在做、而且做得很好的事。今天缺的，恰恰是站在规则制定这一边的同等能力。平台做的，是让制定者和最会博弈的那些人，至少站上同一条起跑线。
      </p>
      <h2>先彩排，再上演</h2>
      <p>
        写条文的人想象的是规则之下的人，而真实的人会反过来想象规则。这中间的落差，过去只能靠经验、试点和事后补救去填，代价常常由最没有能力博弈的人来付。
      </p>
      <p>
        AI
        不会让政策变得完美，也不该替任何人做决定。但它第一次让我们有机会在一项政策落地之前，先让它在成千上万个各怀心思的模拟者身上走一遍：看谁会绕路，看成本最后落到谁身上，看原本想保护的人，是不是又被挤到了更边缘的地方。
      </p>
      <p>舞台剧上演之前都要彩排。影响千万人生活的规则，更值得先彩排一次。</p>
    </>
  );
}

function PolicyRehearsalEn() {
  return (
    <>
      <p>
        Every so often there is another story like it. A policy launched with
        good intentions ends up somewhere near the opposite of where it was
        aimed. The people it meant to protect are squeezed harder; the behavior
        it meant to curb carries on in a quieter form. Afterwards, the verdict
        tends to be the same: the people who wrote it did not understand human
        nature.
      </p>
      <p>
        I only half agree. The misunderstanding is real, but it is hard to pin
        on any one person's ability. A policy lands on thousands of kinds of
        people in thousands of situations, and each of them redoes the
        arithmetic for their own interest. No single mind can do all of that
        arithmetic in advance. Lately I keep wondering whether an AI could do a
        first pass of it.
      </p>
      <p>
        The idea is this: build a policy simulation platform in which models
        play the people a policy touches — employers, workers, landlords,
        tenants, brokers, front-line officials — each pursuing their own
        interest under the new rule, and watch what happens. Before a policy
        reaches the real world, rehearse it in a simulated one, find the
        loopholes and the backfires early, and go back and revise the text.
      </p>
      <p>
        This essay tries to set the idea out properly: where the problem really
        lies, why the existing tools fall short, which piece AI can supply, what
        such a platform might look like, and where it is most likely to go
        wrong.
      </p>
      <h2>An old story about good intentions</h2>
      <p>
        Economics classes like to tell the story of the cobra effect. Under
        British rule, the story goes, Delhi had too many cobras, so the
        government paid a bounty for dead ones. It worked at first, until people
        began breeding cobras for the bounty. When the government found out and
        cancelled it, the breeders released their now-worthless snakes, and
        there were more cobras than before. The details may not survive
        scrutiny, but the story travels because things like it keep happening.
      </p>
      <p>
        In 1989 Mexico City tried to cut air pollution with Hoy No Circula:
        depending on the last digit of its plate, each car stayed off the road
        one weekday a week. The plan assumed a fifth fewer cars. Later research
        found no clear improvement in air quality. Many households bought a
        second car to get around the ban, and to save money it was often an
        older, dirtier one.
      </p>
      <p>
        Many American jurisdictions adopted Ban the Box, which stops employers
        from asking about criminal records early in hiring, so that people with
        a record get a fair shot at an interview. Studies found that employers
        did not drop their worry once the question was gone; they guessed from
        race instead. Callbacks for young Black men as a whole fell, including
        the many who had no record at all.
      </p>
      <p>
        After San Francisco extended rent control to more buildings, researchers
        found that affected landlords converted, sold, or moved into their units
        until the rental supply of those buildings fell by about 15 percent,
        pushing up rents across the city. The tenants already inside gained. The
        tenants who came later paid for it.
      </p>
      <p>
        China has its own examples. Purchase limits on housing in some cities
        produced fake divorces, couples splitting on paper to gain a second
        buyer's quota and remarrying afterwards. When the labor contract law
        promised an open-ended contract after ten years of continuous service,
        some employers had long-serving staff "voluntarily resign" and re-sign
        before the law took effect, resetting their tenure to zero. And more
        commonly still: longer maternity leave was meant to protect women, and
        some employers responded by quietly avoiding hiring women of
        childbearing age.
      </p>
      <h2>The problem is not malice but the model</h2>
      <p>
        What these stories share is not ill will on the part of the people who
        wrote the rules. It is that the model in their heads was too simple.
      </p>
      <p>
        Drafting a rule, people usually picture a typical person who reads the
        rule and does what it intends. Real people are not like that. Their
        circumstances vary, their resources and information vary enormously, and
        they respond to rules: they treat a new rule as a problem to solve, and
        solve it for their own advantage. The text says "do not do A." What
        people read is "what else is there besides A?"
      </p>
      <p>
        Economics has familiar names for this. Goodhart's law: when a measure
        becomes a target, it stops being a good measure. The Lucas critique:
        behavior shifts with policy, so data gathered under the old rules is a
        poor guide to the effects of new ones. They say the same thing.{" "}
        <strong>
          A policy is not a force applied to a still object. It is a move played
          into a system that answers back.
        </strong>
      </p>
      <p>
        There is a harder pattern too. When the rules change, the first to
        adjust, and the best at it, are usually those with the most information,
        the most resources, and the most organization. Large firms have lawyers,
        landlords have agents, the wealthy have advisers. The people a policy
        means to protect are often exactly the ones least able to play the game.
        So a protective rule, after every side has adjusted, sees its costs
        passed along layer by layer until they land back on the people it was
        protecting. That is close to the typical shape of a policy that
        backfires.
      </p>
      <h2>Why the existing tools fall short</h2>
      <p>
        It is not as if no one has tried to test policy in advance. The usual
        approaches each have a weakness.
      </p>
      <p>
        <strong>Pilots.</strong> Try it small, scale it if it works. This is the
        closest thing to a real test, but it is slow, its costs are real, and
        people in a pilot know they are in one; officials try harder, and
        behavior after rollout may differ. Worse, many loopholes only appear
        once a rule has settled and the workarounds have spread, which a short
        pilot never sees.
      </p>
      <p>
        <strong>Public consultation.</strong> Publish a draft, collect comments.
        The trouble is who comments. Those who can write a weighty submission
        are mostly organized interests; the ordinary people most affected either
        never hear of it or cannot put their case. And almost no one writes
        "here is how I plan to get around this."
      </p>
      <p>
        <strong>Econometric models.</strong> Estimate effects from historical
        data. They are good at "what happens on average" and poor at "how will
        someone route around it," and they run straight into the Lucas critique:
        for a rule that has never existed, history holds no answer.
      </p>
      <p>
        <strong>Traditional agent-based simulation.</strong> Simulating many
        interacting individuals in software is already close to what I want. But
        traditionally each agent's behavior has to be written by hand: "move out
        if rent exceeds a third of income." Such a model can reproduce the
        behavior someone wrote into it. It cannot come up with behavior no one
        thought of, and a loophole is precisely the behavior no one thought of.
      </p>
      <h2>The piece AI can supply</h2>
      <p>
        What a large language model changes is that it can be asked to play a
        particular person, read a rule with that person's circumstances, goals,
        and common sense, and reason out what they might do. Its behavior does
        not have to be scripted in advance. It works things out.
      </p>
      <p>
        That matters a great deal for policy. Tell a model playing the owner of
        a small restaurant that "from next month, firms with ten or more staff
        pay an extra levy," and with no prompting it may think of keeping
        headcount at nine, moving some people to contractors, or splitting into
        two separately registered shops. That is exactly what drafters miss most
        easily: not someone breaking the law, but someone finding, inside the
        law, a path the drafters never pictured.
      </p>
      <p>
        Researchers have started down this road. In 2023 a Stanford team built a
        small town of two dozen or so model-driven characters, who organized a
        party and passed news along on their own. A later study built an agent
        for each of more than a thousand real people from interviews with them,
        and those agents answered a social survey nearly as consistently as the
        people themselves did when retaking it two weeks later. Economists have
        begun discussing models as simulated subjects that reproduce classic
        behavioral experiments. Earlier still, an "AI Economist" used
        reinforcement learning to search for tax policies.
      </p>
      <p>
        All of this is a long way from a platform that can test real policy. But
        it shows one thing:{" "}
        <strong>
          having models play different people, and produce behavior in
          interaction that no one scripted, is no longer fantasy.
        </strong>
      </p>
      <h2>What a rehearsal platform might look like</h2>
      <p>To make the idea more concrete, here are the parts I have in mind.</p>
      <p>
        <strong>Parsing the policy.</strong> First, break the text into rules
        that can be executed: who is covered, what is required, what the rewards
        and penalties are, how eligibility is judged, who enforces it. The
        breaking-down is valuable in itself. The vague places, the ones that
        admit more than one reading, are usually where the loopholes will be,
        and should be flagged first.
      </p>
      <p>
        <strong>A population of identities.</strong> From census, survey, and
        industry data, build a population as close to the real distribution as
        possible. Each identity is not a label but a situation: income and
        assets, dependants, sources of information, appetite for risk, the
        resources at hand and the constraints in force. Beyond the people a
        policy targets directly, include three kinds of actor that are often
        left out. <strong>Enforcers</strong>, because front-line officials bend
        a rule to hit their own targets. <strong>Intermediaries</strong>, the
        people who study rules for a living and sell the workarounds, usually
        the first to find a loophole and the ones who spread it. And{" "}
        <strong>bystanders</strong>, whom the policy never mentions but onto
        whom its costs may be shifted.
      </p>
      <p>
        <strong>Environment and interaction.</strong> No one decides alone. A
        landlord's choices change the market a tenant faces; a trick one person
        finds travels through a social network to many more; officials who see
        everyone taking the detour loosen or tighten. So the simulation should
        run for many rounds and let behavior evolve through interaction. Only
        then do second- and third-order effects show up, instead of a simple sum
        of everyone's first reaction.
      </p>
      <p>
        <strong>A red team.</strong> Besides simulating what ordinary people
        would do, add a set of agents whose only job is to maximize their own
        advantage within the rules and hunt for every loophole. This borrows
        from security: before a system goes live, you pay people to attack it. A
        policy deserves a penetration test too.
      </p>
      <p>
        <strong>Evaluation.</strong> The output should not be a single score. At
        minimum it should answer: were the policy's goals met; on whom did the
        gains and costs fall, and in particular did the people it meant to
        protect end up better or worse off; what unexpected behaviors appeared,
        ranked by likelihood and harm; how costly is enforcement, and do
        enforcers have reasons to bend it.
      </p>
      <p>
        <strong>Iteration.</strong> Revise the text, run it again, compare
        versions. The real value of the platform is not scoring a policy. It is
        making "change one clause, try again" cheap enough to do dozens of times
        before anything is published.
      </p>
      <h2>Walking through an example</h2>
      <p>
        Take longer maternity leave. Suppose the draft extends it from 98 days
        to 180, with employers continuing to pay full wages throughout.
      </p>
      <p>
        Put several identities into the simulation: owners and HR managers at
        firms of different sizes, young women who are single or married without
        children, women who already have children, men applying for the same
        jobs, a recruiting platform, and the labor inspectorate. Let them run
        through a few hiring seasons.
      </p>
      <p>
        The HR agent at a large firm might say the cost is bearable, but that
        all else equal it will lean toward women who already have children, or
        toward men. The small-business owner reacts far more sharply: in a firm
        of a dozen people, half a year of leave means hiring a stand-in and
        paying two salaries for one job. He will never put a gender requirement
        in the job ad, but he will ask about marriage and children in the
        interview, or screen the résumés out before anyone gets that far. Coded
        filters may appear on the recruiting platform. Young women notice the
        shift in interviews, and some start hiding their plans. The inspectorate
        finds this kind of discrimination almost impossible to prove.
      </p>
      <p>
        The evaluation might conclude: women already in work who can take the
        full leave are better off; young women not yet hired, or looking for
        work, are worse off. That is exactly what it looks like when the people
        a policy meant to protect are eaten into further.
      </p>
      <p>
        Then revise and run it again. Have social maternity insurance pay for
        the extended leave, so employers no longer bear it directly. Or give
        fathers leave that cannot be transferred, so that hiring a man carries a
        similar "risk" and employers lose their reason to avoid women. Rerun,
        and check whether the small-business owner's urge to screen has weakened
        and whether outcomes for mothers and for women without children have
        evened out. None of these fixes is new; many countries adopted them long
        ago. The point of the platform is{" "}
        <strong>
          to let drafters see, before they commit, how the first version would
          hurt the very people it was written for.
        </strong>
      </p>
      <h2>Where it is most likely to go wrong</h2>
      <p>
        Having come this far, I should be just as clear about the weak points. A
        simulation that is trusted too much can do more harm than having none.
      </p>
      <p>
        <strong>A model is not a person.</strong> A language model's "human
        nature" comes from the text it has read, which over-represents people
        who are online a lot, who write, and who speak dominant languages.
        Playing a migrant worker, an elderly person, or a minority, it may well
        produce a stereotype rather than a situation. It is also often more
        reasonable and more rule-abiding than real people, or else, the
        opposite, it plays everyone as a calculating rational actor. Real people
        procrastinate, avoid hassle, and do nothing because they never heard of
        the policy, and that inaction shapes outcomes too.
      </p>
      <p>
        <strong>It has to be calibrated.</strong> The platform should be tested
        against old policies whose outcomes are known. Unprompted, can it
        reproduce Mexico City's second car, or the fake divorces under purchase
        limits? There is a trap here: the model has probably read about those
        outcomes in training, so reproducing them proves no foresight. The more
        honest test uses policies introduced, and resolved, after the model was
        trained.
      </p>
      <p>
        <strong>It is a stress test, not a prophecy.</strong> I think the right
        role for such a platform is not to predict that "unemployment will rise
        0.3 points," but to produce a list of behaviors that could plausibly
        appear and tell drafters where to worry. It is closer to a wind tunnel,
        a war game, or a security red team than to a weather forecast. Its value
        is in finding problems, not in proving there are none.
      </p>
      <p>
        <strong>It must not become a rubber stamp.</strong> The most dangerous
        use is citing "the simulation found no problems" to defend a policy and
        shut down criticism. A simulation that found no loophole only shows that
        the simulation found none. To guard against this, the setup, the
        population, the prompts, and the results should all be public, so anyone
        can challenge them, rerun them, and add cases they know of that the
        platform missed.
      </p>
      <p>
        <strong>It cannot replace real people.</strong> A simulation should tell
        us whom to ask and what to ask, not let us skip asking. If it shows
        small employers screening out women of childbearing age, the next step
        is to go and talk with small employers and with women looking for work.
        Above all the people a policy means to protect, whose voices are the
        easiest for statistics and models to flatten.
      </p>
      <p>
        <strong>Anyone can use the same tool.</strong> A platform that helps
        drafters find loopholes can help interested parties find them sooner.
        That worries me less than it might. Professional loophole-hunting is
        something interested parties have always done, and done well. What is
        missing today is the same capability on the side of the people writing
        the rules. The platform puts drafters on at least the same starting line
        as the people best at playing the game.
      </p>
      <h2>Rehearse before the show</h2>
      <p>
        Whoever writes a rule imagines people living under it, while the real
        people turn around and imagine the rule. That gap used to be filled with
        experience, pilots, and repairs after the fact, and the bill was usually
        paid by those least able to play the game.
      </p>
      <p>
        AI will not make policy perfect, and it should not decide for anyone.
        But for the first time it lets us walk a policy, before it lands,
        through thousands of simulated people each with their own designs: to
        see who takes the detour, where the costs finally settle, and whether
        the people it meant to protect have been pushed further to the edge
        again.
      </p>
      <p>
        Every play is rehearsed before opening night. Rules that shape millions
        of lives deserve a rehearsal too.
      </p>
    </>
  );
}

export const policyRehearsal: Post = {
  slug: "policy-rehearsal",
  date: "2026-10-02",
  locales: {
    zh: {
      title: "给政策一次彩排",
      summary:
        "好心的政策常常适得其反：人们会把新规则当成一道题，按自己的利益去解，而最先调整好的总是资源最多的一方，成本最后又落回想保护的人身上。我设想用 AI 搭一个政策彩排平台，让模型扮演政策触及的各种身份，包括执行者、中介和专门找漏洞的红队，在落地之前先跑一遍，看谁会绕路、成本落在谁身上，再修改条文。它是压力测试，不是预言。",
    },
    en: {
      title: "A Rehearsal for Policy",
      summary:
        "Well-meant policies keep backfiring: people treat a new rule as a problem to solve for their own advantage, the best-resourced adjust first, and the costs drift back onto the people the rule meant to protect. I propose rehearsing policy with AI: models play the people it touches, including enforcers, intermediaries, and a red team hunting for loopholes, so drafters can see who takes the detour and where the costs land before revising the text. It is a stress test, not a prophecy.",
    },
  },
  Body: { zh: PolicyRehearsalZh, en: PolicyRehearsalEn },
};
