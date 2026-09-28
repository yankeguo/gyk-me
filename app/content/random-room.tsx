/**
 * The `random-room` post, Chinese and English.
 *
 * A dream written down the night after `taste`, read as that essay's other
 * side. Choosing among many close candidates, the step `taste` prices, is also
 * the shape of preference labeling; a choice that is recorded becomes the next
 * default, so taste starts being harvested the moment it is used. What a model
 * can learn is a distribution of preferences; what it cannot take is a
 * commitment someone answers for, or the line between options and what is not
 * an option at all. The two bodies carry the same argument, not the same
 * sentences.
 */

import type { Post } from "./posts";

function RandomRoomZh() {
  return (
    <>
      <p>
        写完《品味》的那天夜里，我做了一个梦。深夜惊醒，趁它还没散，匆匆记了下来。第二天重读，我才发现它几乎是那篇文章的反面：那篇文章说，选项变得廉价之后，选择就成了价值所在；这个梦问的是，如果连选择也被收走，我还剩下什么。
      </p>
      <p>先把梦讲一遍。我尽量不替它加工，只补上半夜来不及写的那些连接词。</p>
      <h2>每次打开都不一样的房间</h2>
      <p>
        梦里，家里有一个神奇的房间。每次推开门，里面的场景都不一样：有时是学校的宿舍，有时是一间办公室，像是在不同的维度之间切换。更奇怪的是，东西放进去会留下，也能从里面把东西拿出来。
      </p>
      <p>我开始怀疑自己的脑子出了问题：我还活在现实世界里吗？</p>
      <p>
        开得多了，我发现这个房间有规律。场景几个一组地出现，同一组之内只有很小的差别。我忽然意识到，这是某种推荐机制：每一组给我看几个相近的版本，看我和哪一个互动得最好。
      </p>
      <p>
        直到同伴提醒，我才发现自己身上背着一套背包，和神经连在一起。房间是这套设备模拟出来的，放进去的、拿出来的，都是虚拟的。只是设备处在激活状态时，我摸不到它，也感觉不到它的存在。
      </p>
      <p>
        房间里偶尔会出现一个人。那个人其实是我的爱人，而只有在这种时候，所谓的场景才是真实世界。一遍遍刷新这个随机房间，在每一组里选出自己最喜欢的那次互动，正是我谋生的手段：我在给某个推荐系统评分。只是我刷得太久了，大脑已经不再正常。
      </p>
      <p>然后我就醒了。</p>
      <h2>我认得那个「一组」</h2>
      <p>
        梦里最先让我警觉的，不是背包，而是「几个一组、组内只差一点」这个规律。我认得它。
      </p>
      <p>
        这正是我在《品味》里推荐的工作方式：让模型一次给出十个版本，读完、比较，留下一个，丢掉九个。我把这一步叫作选择，说它是选项廉价之后仍然标得上价的东西。
      </p>
      <p>
        可同一个动作换个角度看，是另一门生意。给一组相近的候选排序、标出最好的那个，训练模型的人管这叫偏好数据；在推荐系统里，每一次点击、停留、划走，也都是在给一组候选投票。动作一模一样，区别只在于这次选择最后落在哪里：落在一件署了我名字的东西上，还是落进一张表里，成为下一轮训练的一行。
      </p>
      <p>梦把这个区别拿掉了。我以为自己在挑房间，其实是在生产标签。</p>
      <h2>水位线是谁抬高的</h2>
      <p>
        《品味》里有一段我写得很轻松。我承认模型也会选择，而且越选越好，但我说那只是水位线在上涨，价值会移到更高的一层：替模型定标准、决定它的建议哪一条不采纳、为结果署名。「水位线会一直上涨，但水位线始终存在。」
      </p>
      <p>梦替那句话补上了被省略的主语：水位线是谁抬高的？</p>
      <p>
        是那些在一组组候选里做选择的人。模型学会的每一次挑选，都曾经是某个人的挑选。我说品味值钱，是因为它高出默认；可一次被记录下来的「高出默认」，恰恰是下一版默认最好的训练材料。于是品味有一个古怪的性质：
        <strong>它在被使用的那一刻，就开始被收割。</strong>
        你选得越认真，你的选择就越快变成所有人的起点，你所站的那一层也就越快被淹没。
      </p>
      <p>
        这就是我惊醒时的恐惧，说得直白一些：我害怕自己的品味也不过是一份可以拿去训练的素材。如果我的选择可以被学走，而我又把自己理解为我所做的选择，那么被学走的就不只是一门手艺，而是我。
      </p>
      <h2>激活时摸不到的背包</h2>
      <p>
        回头看，梦里最让我不安的细节不是房间是假的，而是那套背包在激活时摸不到。
      </p>
      <p>
        一个做得好的界面，本来就该让人感觉不到它。但这也意味着，在界面里做选择的人会真心觉得自己在自由地选。他看不见的是：这一组候选是谁挑出来给他看的，组内的差别沿着哪个方向变化，而那些真正大的问题，比如这个房间该不该存在、这扇门要不要开，从来不在选项里。梦里发现背包的不是我自己，是同伴的一句提醒。人在界面里面，很难看见界面本身，得有一个站在外面的人。
      </p>
      <p>
        《品味》里我说过，选择需要标准，而标准来自目的。房间里的我有偏好，却没有目的；目的在系统那一边。我能提供的，只是在别人事先划好的细微差别里，指出哪一个更顺眼。
        <strong>这不是品味，这是评分。</strong>
      </p>
      <p>
        拿那篇文章列过的几种形态来对照，差别就更清楚了。取舍：我没法决定某个场景不该出现，只能在已经出现的里面挑。完成：房间永远不会停，下一组总会来。署名：标签没有作者，也不需要作者。剩下的只有最薄的一层，比较。品味被削到只剩比较的时候，它确实可以被学走，因为那已经不再是一个人的判断，只是一个人的反应。
      </p>
      <h2>她不是一个选项</h2>
      <p>梦里最可怕的一段，是爱人出现在房间里。</p>
      <p>
        可怕之处不在于她出现在虚拟里，而在于真实世界出现在了一组候选当中，和宿舍、办公室排在一起，等着我评分。我刷得太久，已经分不清哪一扇门后面是真的。
      </p>
      <p>
        《品味》里我给「选项」下过一个定义：一份随时可以被下一份替代的供给。这个定义反过来也划出了一条边界：有些东西之所以要紧，正是因为它不能被下一份替代。一个人、一段关系、一个只因为你在场才存在的时刻，都不是选项。把它们放进一组里比较，这件事本身就是一种损坏。
      </p>
      <p>
        我想梦里说的「大脑已经不再正常」，指的大概就是这个：一个人在候选之间选得太久，会慢慢失去「非选项」这个类别。所有东西都开始像是一组里的一个，包括那些本来就不该被比较的。
      </p>
      <h2>那么，自我还剩什么</h2>
      <p>醒来之后我想了很久：如果品味可以被学走，自我还在哪里？</p>
      <p>
        我不想用安慰自己的方式回答。偏好当然可以被学走，而且会越学越像。一个模型读够了我的选择，可以比我自己更稳定地选出「我会选的那个」。如果自我只是一个偏好函数，那它确实守不住。
      </p>
      <p>
        但我越想越觉得，偏好不是自我最硬的那一部分。能被学走的，是我在一组候选里会挑哪一个；学不走的，是我愿意为哪一个承担后果，以及我拒绝把什么放进候选里。
        <strong>前者是一个分布，后者是一串承诺。</strong>
        分布可以复制，承诺不能，因为承诺的全部意义就在于它由一个具体的人承担，并且跟着他走过时间。模型可以选出我会爱的那一类人，却没法替我去爱一个具体的人；它可以写出我会署名的那一类文章，署名的后果却只落在我身上。
      </p>
      <p>
        这也是为什么署名是那几种形态里最无法替代的一种。它本身不是一次选择，而是给选择找一个错了会疼的人。
      </p>
      <p>
        当然，被学习这件事并不新。学徒学师傅的手，读者学作者的句子，品味从来都是在被模仿中流传下来的。我怕的不是被学，而是被学的方式：没有名字，对面没有人，只有一张不停变长的表，而我在里面，不知道自己在做什么。
      </p>
      <h2>醒来以后</h2>
      <p>
        我不会因为一个梦就不再用模型。多生成、多比较，依然是好的工作方式。但我想给自己留几条界线。
      </p>
      <p>
        <strong>知道自己背着背包。</strong>
        在一组候选面前做选择时，至少问一句：这组候选是谁给的，差别沿着什么变化，有没有一个更大的选项根本不在这里。
      </p>
      <p>
        <strong>让一部分选择留在房间外面。</strong>
        不是所有判断都要经过候选、比较和打分。有些东西我宁愿从头自己决定，哪怕更慢，哪怕结果不如模型给的平均值漂亮。
      </p>
      <p>
        <strong>分清哪些是选项，哪些不是。</strong>
        这一条最要紧。房间里出现的那个人，不在任何一组里。
      </p>
    </>
  );
}

function RandomRoomEn() {
  return (
    <>
      <p>
        The night I finished <em>Taste</em>, I had a dream. I woke in the dark
        and wrote it down in a hurry, before it could fade. Reading it back the
        next day, I saw that it was nearly the other side of that essay. The
        essay said that once options are cheap, the value is in the choosing.
        The dream asked what I would have left if the choosing were taken too.
      </p>
      <p>
        Here is the dream first. I have tried not to improve it, only to supply
        the connecting words I had no time for in the middle of the night.
      </p>
      <h2>A room that is different every time</h2>
      <p>
        In the dream there is a strange room in our home. Every time I open the
        door, a different scene is inside: sometimes a school dormitory,
        sometimes an office, as if the room were switching between dimensions.
        Stranger still, whatever I put in stays there, and I can take things
        out.
      </p>
      <p>
        I start to wonder whether something is wrong with my mind. Am I still
        living in the real world?
      </p>
      <p>
        After opening it enough times, I notice a pattern. The scenes come in
        groups of a few, and within a group they differ only slightly. Then I
        see it: this is some kind of recommendation mechanism. Each group shows
        me a handful of near-identical versions and watches which one I interact
        with best.
      </p>
      <p>
        Only when a companion points it out do I notice that I am wearing a
        pack, wired into my nerves. The room is something the device simulates.
        What I put in and what I take out are both virtual. It is just that
        while the device is active, I cannot touch it or feel that it is there.
      </p>
      <p>
        Now and then there is a person in the room. That person is my partner,
        and only in those moments is the so-called scene the real world.
        Refreshing this random room over and over, picking the interaction I
        like best from each group, is how I make a living: I am rating for some
        kind of recommender. I have just been doing it too long, and my brain no
        longer works the way it should.
      </p>
      <p>Then I woke up.</p>
      <h2>I recognized the group</h2>
      <p>
        What first put me on guard in the dream was not the pack. It was the
        pattern: a few at a time, barely different within each group. I knew it.
      </p>
      <p>
        It is exactly the way of working I recommended in <em>Taste</em>: have
        the model produce ten versions, read and compare them, keep one and
        throw nine away. I called that step the choice, and said it was what
        still carries a price once options are cheap.
      </p>
      <p>
        Seen from another side, the same motion is a different business. Ranking
        a set of close candidates and marking the best one is what people who
        train models call preference data. In a recommender, every click, every
        pause, every swipe away is a vote over a set of candidates. The motion
        is identical. The only difference is where the choice ends up: in
        something that carries my name, or as one more row in a table for the
        next training run.
      </p>
      <p>
        The dream took that difference away. I thought I was choosing rooms. I
        was producing labels.
      </p>
      <h2>Who raises the waterline</h2>
      <p>
        There is a passage in <em>Taste</em> I wrote lightly. I granted that
        models choose too, and better every year, but said that only meant the
        waterline was rising, and the value would move up a layer: setting the
        model's standard, deciding which of its suggestions to reject, putting a
        name on the result. "The waterline keeps rising, but there is always a
        waterline."
      </p>
      <p>
        The dream supplied the subject that sentence left out. Who raises the
        waterline?
      </p>
      <p>
        The people choosing, group after group. Every pick a model learns was
        once someone's pick. I said taste is valuable because it rises above the
        default. But a recorded instance of rising above the default is the best
        possible material for training the next default. So taste has an odd
        property:{" "}
        <strong>it starts being harvested the moment it is used.</strong> The
        more carefully you choose, the sooner your choices become everyone's
        starting point, and the sooner the layer you stand on goes under.
      </p>
      <p>
        That is the fear I woke up with, put plainly: that my taste is just more
        material to train on. If my choices can be learned, and I understand
        myself as the choices I make, then what gets learned is not a craft. It
        is me.
      </p>
      <h2>You cannot feel the pack while it is on</h2>
      <p>
        Looking back, the detail that unsettles me most is not that the room was
        fake. It is that I could not feel the pack while it was active.
      </p>
      <p>
        A well-made interface is supposed to disappear. But that also means
        someone choosing inside one sincerely feels free. What they cannot see
        is who picked this group of candidates, along which dimension the
        differences run, and that the genuinely large questions — should this
        room exist at all, should I open this door — are never among the
        options. In the dream I did not find the pack myself; a companion had to
        tell me. From inside an interface it is hard to see the interface.
        Someone has to be standing outside.
      </p>
      <p>
        In <em>Taste</em> I wrote that a choice needs a standard, and a standard
        comes from a purpose. In the room I had preferences but no purpose; the
        purpose sat on the system's side. All I supplied was which of a few
        small, pre-drawn differences looked better.{" "}
        <strong>That is not taste. That is rating.</strong>
      </p>
      <p>
        Set it against the forms that essay listed and the gap is plain.
        Omission: I cannot decide that a scene should not appear, only pick
        among those that do. Done: the room never stops; there is always another
        group. A name: labels have no author, and need none. What is left is the
        thinnest layer, comparison. Shave taste down to comparison and it really
        can be learned, because it is no longer a person's judgement, only a
        person's reaction.
      </p>
      <h2>She is not an option</h2>
      <p>The worst part of the dream is my partner appearing in the room.</p>
      <p>
        Not because she appears inside the simulation, but because the real
        world turns up as one candidate in a group, lined up beside the
        dormitory and the office, waiting for my score. I had been at it too
        long to tell which door had something real behind it.
      </p>
      <p>
        In <em>Taste</em> I defined an option as a unit of supply the next unit
        can replace. Read backwards, that definition draws a boundary: some
        things matter precisely because nothing can replace them. A person, a
        relationship, a moment that exists only because you were there — none of
        these is an option. Putting them in a group to be compared is already a
        kind of damage.
      </p>
      <p>
        I think that is what the dream meant by a brain that no longer works the
        way it should. Choose among candidates long enough and you slowly lose
        the category of the non-option. Everything starts to look like one of a
        set, including the things that were never meant to be compared.
      </p>
      <h2>What is left of the self</h2>
      <p>
        After waking I thought about it for a long time. If taste can be
        learned, where is the self?
      </p>
      <p>
        I don't want to answer by consoling myself. Preferences can be learned,
        and the copy will keep getting closer. A model that has read enough of
        my choices could pick "the one I would pick" more consistently than I
        do. If a self is only a preference function, there is no defending it.
      </p>
      <p>
        But the longer I thought, the less preference looked like the hard part
        of a self. What can be learned is which candidate I would pick from a
        set. What cannot is which one I am willing to answer for, and what I
        refuse to put among the candidates at all.{" "}
        <strong>
          The first is a distribution; the second is a string of commitments.
        </strong>{" "}
        A distribution can be copied. A commitment cannot, because its whole
        meaning is that a particular person carries it, and carries it through
        time. A model can pick the kind of person I would love; it cannot love a
        particular person for me. It can write the kind of essay I would sign;
        the consequences of signing land only on me.
      </p>
      <p>
        That is also why, of those forms, a name is the one nothing replaces. It
        is not itself a choice. It is finding someone who will hurt if the
        choice is wrong.
      </p>
      <p>
        Being learned from is nothing new, of course. Apprentices learn a
        master's hand, readers learn a writer's sentences; taste has always
        travelled by being imitated. What I fear is not being learned. It is the
        manner of it: no name, no one on the other side, only a table that keeps
        growing, and me inside it, not knowing what I am doing.
      </p>
      <h2>After waking</h2>
      <p>
        I am not going to stop using models because of a dream. Generating more
        and comparing more is still a good way to work. But I want to keep a few
        lines for myself.
      </p>
      <p>
        <strong>Know that I am wearing the pack.</strong> When I choose from a
        set of candidates, at least ask who supplied them, along what the
        differences run, and whether a larger option is missing altogether.
      </p>
      <p>
        <strong>Keep some choices outside the room.</strong> Not every judgement
        has to pass through candidates, comparison, and a score. Some things I
        would rather decide from scratch, even if it is slower, even if the
        result is less polished than the model's average.
      </p>
      <p>
        <strong>Know which things are options and which are not.</strong> This
        one matters most. The person who appears in the room is not in any
        group.
      </p>
    </>
  );
}

export const randomRoom: Post = {
  slug: "random-room",
  date: "2026-09-28",
  locales: {
    zh: {
      title: "随机房间",
      summary:
        "写完《品味》后的一个梦：家里有个每次打开都不一样的房间，场景几个一组，组内只差一点点，而在每一组里选出最好的那个，是我谋生的手段。选择一旦被记录，就会变成下一版的默认，品味在被使用的那一刻就开始被收割。能被学走的是偏好，学不走的是承诺，以及哪些东西根本不是选项。",
    },
    en: {
      title: "The Random Room",
      summary:
        "A dream I had after writing Taste: a room at home that shows a different scene each time it opens, in groups that barely differ, and picking the best of each group is how I make a living. A choice that gets recorded becomes the next default, so taste starts being harvested the moment it is used. What can be learned is a preference. What cannot is a commitment, or the line between options and what is not an option at all.",
    },
  },
  Body: { zh: RandomRoomZh, en: RandomRoomEn },
};
