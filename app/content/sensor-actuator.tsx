/**
 * The `sensor-actuator` post, Chinese and English.
 *
 * An argument rather than a build log: the claim is that the interesting risk
 * of cheap, fast, always-present intelligence is not that it takes the work but
 * that it takes the judging, and leaves the human holding perception and
 * execution. The two bodies carry the same argument, not the same sentences —
 * the English is written as English, not as a gloss.
 */

import type { Post } from "./posts";

function SensorActuatorZh() {
  return (
    <>
      <p>
        我一直是技术乐观主义者。这不是一个姿态，是我的实际判断：工具变强，人的边界就往外推一格，回头看多半是赚的。这个判断我用了很多年，几乎没有动摇过。
      </p>
      <p>
        但最近几个月，我发现自己开始害怕。不是因为工作——那种恐惧太浅了，浅到可以被补偿、再培训、转岗这几个词轻易接住。我怕的是另一件事，说得尽量准确一点：我怕人从主体降格为
        AI 的传感器和执行器。
      </p>
      <h2>恐惧的具体形状</h2>
      <p>它不是凭空来的。可以算一笔账。</p>
      <p>
        2026 年 9 月 10 日，DeepSeek 发布 V4.1-Flash：一个 552B
        参数的混合专家模型，输入侧只激活 8B、输出侧 16B，1M
        上下文，原生多模态。它身上的加速度写在 API 名上：模型名是
        <code>deepseek-flash</code>。在它之前旗舰是 V4-Pro；DeepSeek
        自己的说法是外部多方的测试显示 V4.1-Flash
        在性能、成本、速度和总运行时间上都超过了 V4-Pro，于是宣布从 9 月 14
        日起把 <code>deepseek-v4-pro</code> 的请求直接路由到 V4.1-Flash，按
        Flash 的价格计费。几天后这个决定被撤回：应使用方的要求，V4-Pro
        继续按原价提供服务。也就是说，同一家前沿实验室在六周里走了三步——V4-Flash
        是 7 月 31 日，V4-Pro 是 8 月 13 日，V4.1-Flash 是 9 月 10
        日——每一步都更小、更快、更便宜，而更大的那个已经要靠用户呼吁才留得下来了。
      </p>
      <p>
        价格是这段曲线里最刺眼的部分。每百万 token，缓存命中的输入谷时 0.003
        美元、峰时 0.006 美元；缓存未命中的输入谷时 0.15 美元、峰时 0.30
        美元；输出谷时 0.60 美元、峰时 1.20
        美元。谷时价一律是峰时价的一半。这些数字每次念出来我都要停一下：单位能力的价格已经低到不再是决策变量了，而单位能力本身还在涨。
      </p>
      <p>
        我想让这件事慢下来，看清楚它到底在许诺什么。能力在涨、价格在跌、延迟在降，三条曲线指向同一个产品：{" "}
        一个二十四小时在线、随时响应、比我自己想得更快也更好的东西。
        <strong>
          问题不在于它做不到，问题在于它做得到之后，我会变成什么。
        </strong>
      </p>
      <h2>它做得到之后</h2>
      <p>
        让我用一个教材里的定义把这件事说死。在 Russell 和 Norvig
        的标准教科书《人工智能：一种现代的方法》里，「智能体」被定义为通过
        <strong>传感器</strong>感知环境、通过<strong>执行器</strong>
        作用于环境的实体。传感器和执行器是它的外围，决策是它的内核。
      </p>
      <p>现在把这句话里的「它」换成 AI，再问一句：那我在这个系统里是什么？</p>
      <p>
        我开始留意自己一天的动作。我读书、看文档、开会、听人说话、观察数据和日志——然后我把这些感知交出去，由模型整理成结论。它回来的不是信息，是判断，以及下一步做什么。然后我去点、去发、去确认、去提交。
      </p>
      <p>我在回路里，但我不在决策点上。看起来像被服务，实际上是被使用。</p>
      <h2>降格不需要恶意</h2>
      <p>
        工作被替代是经济问题，所以有经济学的答案：补偿、再分配、新岗位。降格不是经济问题，它不减收入，减的是别的东西，而且没有任何一个机制会自动把它补回来。
      </p>
      <p>
        要看清它，得先放弃一个念头：别以为必须有人想把我们变成外设。没有任何一个环节需要恶意。只要三条曲线继续走，只要我在每一个具体场合都做出那个当场更优的选择——它更快、更准、更省事——回路就会自己收拢，不需要谁来设计。
      </p>
      <p>
        真正让我不安的是这个：如果决策由它做、感知和执行由我做，那我是什么？传感器和执行器不是被压迫的，是被
        <em>绕过</em>
        的——它们没有内心生活，不是因为它们简单，而是因为回路里没有留给它们的位置。
      </p>
      <p>
        还有一层更难受的。要否决它，我得先能判断它。而能判断它的那个能力，正是长期不判断会失去的那个东西。判断力的退化是渐进的，每一步都像减负：先是判断不了它对不对，然后是不知道什么值得判断，最后是不知道自己要什么。第一步最舒服，舒服到你不会注意到自己已经走到了第三步。
      </p>
      <h2>诚实地反驳自己</h2>
      <p>
        这个恐惧太容易被写成网上的那种腔调，所以我得自己反驳一遍，不然它不值钱。
      </p>
      <p>
        第一，人类一直在用外部的认知工具。写作、印刷、索引、计算器，每一次都有人喊退化，每一次都有一部分能力真的外包了出去。这次凭什么不一样？我的回答是：之前的工具交出的是「记得住」和「算得出」，这一次交出的是「该做什么」。从工具跨到权威，这一步是新的。
      </p>
      <p>
        第二，人还在回路里，否决权还在我手上。这个反驳是对的，但否决权很脆——你不会去否决一个你评估不了的东西。名义上的最终决定权，在能力退化之后会变成仪式。
      </p>
      <p>
        第三，也可能是我想多了。便利赢过自主，这件事在历史上发生过很多次，人类也活下来了。
      </p>
      <p>
        我留着这个反驳，因为它可能是对的。但它是「可能」，不是「所以可以不管」。
      </p>
      <h2>那我打算怎么办</h2>
      <p>
        我不打算拒绝工具。写这段文字的时候我就在用一套 agent
        harness，它帮我把论据和措辞推敲得更紧。这条线的位置不是「用不用」，而是「谁在判断」：它是在扩充我的判断，还是在替我判断。
      </p>
      <p>
        具体地，我给自己划一个要求：保留一个领域，在那里判断权完全属于我，AI
        不在回路里。
      </p>
      <ul>
        <li>
          它不必大，也不必赚钱，甚至不必做得好——做得差是允许的，前提是那是我的判断。
        </li>
        <li>它必须是我在乎的，否则退化了我也不会察觉。</li>
        <li>它必须有足够长的时间尺度，长到我可以犯错、被纠正、再犯错。</li>
      </ul>
      <p>
        保留它不是为了提高效率。恰恰相反，它一定比交给模型更慢、更差。保留它是因为那是「我」的原材料：一个从来不需要判断的人，不会在某一天突然发现自己失去了判断，因为那一天不会有「他」在提问。
      </p>
      <h2>我错在哪里</h2>
      <p>
        我的乐观没有错，只是不完整。我一直以为变量是技术，人是那个使用技术的人——「人」的那部分是不变量。所有关于效率的账都是这么算的。
      </p>
      <p>
        但「人」的那部分也是变量。它会被我们交给它的东西重新塑造，塑造成什么样取决于我们把什么交出去、交出去多久。
      </p>
      <p>
        把这一项加进去，账要重算。重算的结果我写在这里：我既不乐观也不悲观，我只是不想成为某个东西的传感器。
      </p>
    </>
  );
}

function SensorActuatorEn() {
  return (
    <>
      <p>
        I have been a technology optimist for as long as I have been able to
        hold an opinion. Not as a posture — as a working judgement: the tools
        get better, the boundary of what a person can do moves outward, and the
        ledger comes out ahead. I have run that judgement for years without much
        doubt.
      </p>
      <p>
        In the last few months I have started to be afraid. Not about work. That
        fear is too shallow to be interesting — it gets absorbed by
        compensation, retraining, and new job titles. What frightens me is
        something else, and I want to state it as precisely as I can: that
        people are being demoted from subjects to the AI's sensors and
        actuators.
      </p>
      <h2>The shape of the fear</h2>
      <p>It did not arrive out of nowhere. There is arithmetic behind it.</p>
      <p>
        On 10 September 2026, DeepSeek released V4.1-Flash: a 552B-parameter
        mixture-of-experts model activating only 8B parameters for input and 16B
        for output, with a 1M context window, native multimodal understanding,
        and the API name <code>deepseek-flash</code>. It is the latest point on
        a steep curve. The flagship before it was V4-Pro; DeepSeek's own claim
        is that tests by multiple parties put V4.1-Flash ahead of V4-Pro on
        performance, cost, speed, and total runtime — so it announced that from
        14 September, <code>deepseek-v4-pro</code> requests would route to
        V4.1-Flash and bill at Flash rates. Days later it took that back: at
        users' request, V4-Pro keeps serving at its old prices. So one frontier
        lab took three steps in six weeks — V4-Flash on 31 July, V4-Pro on 13
        August, V4.1-Flash on 10 September — each one smaller, faster, and
        cheaper than the last, and the larger model now survives only because
        its users asked for it.
      </p>
      <p>
        The prices are the part that stings. Cached input is $0.003 per million
        tokens off-peak and $0.006 at peak; uncached input is $0.15 and $0.30;
        output is $0.60 and $1.20. Off-peak is half of peak. I have to pause
        every time I read those numbers out. The price of a unit of capability
        has fallen below the point where it is a decision variable at all, and
        the unit of capability keeps getting larger.
      </p>
      <p>
        I want to slow this down and see what it is actually promising.
        Capability rising, price falling, latency dropping — all three curves
        point at one product: something that is present twenty-four hours a day,
        answers immediately, and thinks faster and better than I do.{" "}
        <strong>
          The problem is not that it can. The problem is what I become once it
          can.
        </strong>
      </p>
      <h2>Once it can</h2>
      <p>
        A textbook definition pins this down. In Russell and Norvig's{" "}
        <em>Artificial Intelligence: A Modern Approach</em>, an agent is defined
        as something that perceives its environment through{" "}
        <strong>sensors</strong> and acts on that environment through{" "}
        <strong>actuators</strong>. Sensors and actuators are its periphery. The
        deciding is its core.
      </p>
      <p>
        Now put the AI in the place of that "it" and ask the obvious question:
        what am I in that system?
      </p>
      <p>
        I started watching my own days. I read, I skim documents, I sit in
        meetings, I listen to people, I watch logs and dashboards — and then I
        hand the perceiving over, and a model turns it into a conclusion. What
        comes back is not information. It is a judgement, and a next action.
        Then I click, send, confirm, submit.
      </p>
      <p>
        I am in the loop. I am not at the decision point. It looks like being
        served. It is being used.
      </p>
      <h2>No malice required</h2>
      <p>
        Losing work is an economic problem, and economics has answers for it:
        compensation, redistribution, new roles. Demotion is not an economic
        problem. It does not lower your income. It lowers something else, and
        nothing in the system is arranged to give that thing back.
      </p>
      <p>
        To see it clearly you have to give up one comforting idea — that someone
        has to intend this. Nobody has to. No step in the chain requires malice.
        All it takes is the three curves continuing, and me making the locally
        better choice in each particular case, because it is faster and more
        accurate and less trouble. The loop closes itself. Nobody has to design
        it.
      </p>
      <p>
        What unsettles me is this: if the deciding is done there, and the
        perceiving and the executing are done here, what am I? Sensors and
        actuators are not oppressed. They are <em>bypassed</em>. They have no
        inner life not because they are simple but because the loop has no place
        to put one.
      </p>
      <p>
        There is a worse layer under that. To overrule it, I first have to be
        able to judge it — and the ability to judge it is exactly what I lose by
        not judging. The loss is gradual, and every step of it feels like
        relief. First I cannot tell whether it is right. Then I cannot tell what
        is worth asking. Then I cannot tell what I want. The first step is so
        comfortable that nothing announces the third.
      </p>
      <h2>Arguing with myself</h2>
      <p>
        A fear like this is easy to write badly, in the register of a man
        shouting at a cloud. So let me make the opposing case properly.
      </p>
      <p>
        <strong>One: people have always used external cognitive tools.</strong>{" "}
        Writing, print, indexes, calculators. Every one of them produced claims
        of atrophy, and every one of them did genuinely externalize some
        capacity. Why is this different? My answer: earlier tools took over
        remembering and computing. This one takes over deciding what to do. That
        is the step from tool to authority, and that step is new.
      </p>
      <p>
        <strong>Two: the human is still in the loop.</strong> The veto is still
        mine. That is true, and it is also fragile. You do not veto what you
        cannot evaluate. A final say that survives only on paper becomes a
        ceremony once the capacity behind it has gone.
      </p>
      <p>
        <strong>Three: I may simply be overreacting.</strong> Convenience has
        beaten autonomy many times before, and people have lived through it.
      </p>
      <p>
        I am keeping that third one, because it might be right. But it is a
        possibility, not a permission.
      </p>
      <h2>What I am going to do about it</h2>
      <p>
        I am not going to refuse the tools. I am writing this inside an agent
        harness, and it is making the argument tighter than I would have made it
        alone. The line is not use versus no use. The line is who judges: is
        this enlarging my judgement, or replacing it?
      </p>
      <p>
        Concretely, I have given myself one rule. Keep at least one domain where
        the judgement is entirely mine, and the AI is not in the loop.
      </p>
      <ul>
        <li>
          It does not have to be large, or lucrative, or even good. Being bad at
          it is allowed, as long as the badness is mine.
        </li>
        <li>
          It does have to be something I care about, or I will not notice the
          atrophy.
        </li>
        <li>
          It does have to run on a long enough timescale that I can be wrong, be
          corrected, and be wrong again.
        </li>
      </ul>
      <p>
        The point of keeping it is not efficiency. It will be slower and worse
        than handing it over; that is the price and it is the whole point. The
        point is that this is the raw material of a self. Someone who never has
        to judge does not one day discover that he has lost the ability to. On
        that day there is no one left to ask the question.
      </p>
      <h2>Where I was wrong</h2>
      <p>
        My optimism was not mistaken. It was incomplete. I had assumed that the
        variable was the technology and that the person using it was the
        constant. Every efficiency calculation I ever made quietly held that
        term fixed.
      </p>
      <p>
        The person is a variable too. That part gets reshaped by whatever we
        hand it, and the shape depends on what we hand over and for how long.
      </p>
      <p>
        Add that term back and the arithmetic changes. Here is my answer after
        doing it: I am neither optimistic nor pessimistic now. I just do not
        want to be something's sensor.
      </p>
    </>
  );
}

export const sensorActuator: Post = {
  slug: "sensor-actuator",
  date: "2026-09-15",
  locales: {
    zh: {
      title: "传感器与执行器",
      summary:
        "我做了很多年的技术乐观主义者。让我开始害怕的不是工作被替代，而是另一件事：当智能变得足够便宜、足够快、随时在场，人会不会从主体降格为 AI 的传感器与执行器。",
    },
    en: {
      title: "Sensor and Actuator",
      summary:
        "I was a technology optimist for years. What frightens me is not that AI takes the work. It is that cheap, fast, always-present intelligence demotes the person from subject to the AI's sensors and actuators.",
    },
  },
  Body: { zh: SensorActuatorZh, en: SensorActuatorEn },
};
