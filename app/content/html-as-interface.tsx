/**
 * The `html-as-interface` post, Chinese and English.
 *
 * A design argument for treating semantic HTML as the complete interface for
 * both people and browser-driving agents: readable resources, explicit links
 * and forms, durable result states, and CSS and JavaScript as enhancements.
 * The two bodies carry the same argument, not the same sentences.
 */

import type { Post } from "./posts";

function HtmlAsInterfaceZh() {
  return (
    <>
      <p>
        我最近常让 AI Agent
        替我操作网页。查一条记录、填一张表、从列表里找到某个项目，事情本身都不复杂，真正消耗时间的却常常是另一件事：按钮没有名字，内容只画在画布上，链接其实不是链接，提交结果只在屏幕角落闪现一下。人看一眼界面就知道该怎么办，Agent
        却要在大量视觉线索和 DOM 节点之间猜测。
      </p>
      <p>
        于是我开始构想一种更克制的网页：只使用基础的 HTML
        特性，把内容和操作直接写在文档里；CSS 让页面保持易读，JavaScript
        只做可选的增强。人仍然可以正常浏览、点击和填写，只是没有复杂的动效、拖拽和层层弹窗。对使用
        BrowserMCP 这类工具的 Agent
        来说，它也不需要先理解一套为视觉效果设计的界面，才能完成任务。
      </p>
      <p>
        这不是要再造一个「Agent 版互联网」。我的想法恰好相反：
        <strong>
          不增加一套专用协议，而是把 HTML 本身当作接口；不为 Agent
          另做一个页面，而是让同一个页面对人和 Agent 都保持直接。
        </strong>
      </p>
      <h2>Agent 需要的不是更聪明地猜</h2>
      <p>
        用浏览器完成一件事，本质上是一个循环：观察当前状态，决定下一步，执行动作，再检查结果。网页越依赖位置、颜色、悬停和临时出现的控件，这个循环里就越充满猜测。一个只有图标的按钮，人可以根据经验认出它；一个没有文本、没有可访问名称的按钮，给
        Agent 留下的却只有一种暗示：去猜这张图通常代表什么。
      </p>
      <p>
        当然可以让模型更强，让它看截图、理解布局、模拟鼠标轨迹。但用更强的模型弥补含混的界面，是把设计成本转移给每一次访问。每次都要重新识别，每次都多一次点错的机会。更省事的办法是在页面上直接写明：这是什么，它能做什么，操作之后发生了什么。
      </p>
      <p>
        所以，Agent
        友好并不等于给网页塞满供机器读取的特殊标记。最基本的要求反而很普通：
        <strong>让观察、动作和结果都能从文档中确定地读出来。</strong>
      </p>
      <h2>内容应该是一份文档，不是一幅画面</h2>
      <p>
        这样的网页从一个朴素的结构开始：页面有明确的标题，正文放在
        <code>main</code> 里，章节使用有层级的标题，导航使用链接，列表就是
        <code>ul</code> 或 <code>ol</code>，表格数据放在
        <code>table</code> 里。重要信息以文本存在于 HTML
        中，而不是只出现在图片、画布或一段运行后才生成的脚本状态里。
      </p>
      <p>
        这些标签不是为了通过某种规范检查。它们是在减少歧义。标题告诉访问者这一页是什么，列表告诉访问者这些项目属于同一组，表头说明每一列的含义。人看到的是排版后的结果，Agent
        读到的是同一层结构。双方不必维护两份关于页面的理解。
      </p>
      <p>
        链接也应该是真的链接。一个资源有稳定的
        URL，打开、刷新、收藏和转交时都指向同一件事；下一页是
        <code>a href</code>，而不是只在点击时改变内部状态的
        <code>div</code>
        。无限滚动可以提供便利，但至少应该留一条可以逐页访问的路径。否则，Agent
        很难知道列表是否读完，也很难在中断之后回到原来的位置。
      </p>
      <h2>操作应该回到链接和表单</h2>
      <p>
        只读页面还容易，真正拉开差距的是操作。很多现代界面把动作拆散在一串脚本事件里：单击某个区域、拖动一个卡片、等待菜单出现，再从几个没有说明的选项中选择。对人来说，这些动作可能很顺滑；对
        Agent 来说，每一步都是额外的状态和失败点。
      </p>
      <p>我想象中的主要流程，用最普通的表单就能表达：</p>
      <pre>
        <code>{`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>新建任务</title>
  </head>
  <body>
    <main>
      <h1>新建任务</h1>
      <form method="post" action="/tasks">
        <p>
          <label for="title">标题</label><br>
          <input id="title" name="title" required>
        </p>
        <p>
          <label for="description">说明</label><br>
          <textarea id="description" name="description"></textarea>
        </p>
        <button type="submit">创建任务</button>
      </form>
      <p><a href="/tasks">返回任务列表</a></p>
    </main>
  </body>
</html>`}</code>
      </pre>
      <p>
        这段代码没有任何视觉上的野心，却已经把接口说清楚了。
        <code>label</code> 说明要填什么，<code>name</code>{" "}
        说明提交什么，按钮说明会发生什么，<code>action</code> 和
        <code>method</code> 说明动作发往哪里。人可以在浏览器里使用它，Agent
        也可以。即使 JavaScript 完全没有加载，主要任务仍然能够完成。
      </p>
      <p>
        查询可以尽量使用普通的 GET 表单，让搜索条件留在 URL
        中；创建和修改使用明确的表单与提交按钮；危险操作不要伪装成一次含义模糊的点击。这里没有什么新技术，只有一条约束：
        <strong>
          不要用一个看似灵活的事件系统，重新发明浏览器本来就会做的事情。
        </strong>
      </p>
      <h2>结果必须留下来</h2>
      <p>
        操作完成只是流程的一半。Agent
        还需要知道动作是否成功，失败又失败在哪里。一个两秒后消失的
        toast，一个只改变颜色的边框，一个永远旋转的加载图标，都没有把结果说清楚。
      </p>
      <p>
        更可靠的方式是让结果成为页面状态的一部分。创建成功后跳转到一个有稳定 URL
        的详情页，标题和正文明确显示新建的对象；失败时重新渲染表单，保留已经填写的内容，并用文本列出错误。动态页面可以在现有文档中更新状态，但状态不能只存在于某段脚本的内存里，更不能要求访问者恰好在那一秒盯着屏幕。
      </p>
      <p>
        这条要求对人同样有用。网络中断后可以刷新，填写出错后不必重来，完成一项操作后可以复制链接交给别人确认。为
        Agent 减少的不确定性，通常也是为人减少的不确定性。
      </p>
      <h2>克制不等于简陋</h2>
      <p>
        我说只保留基础特性，并不是主张回到白底蓝字、完全不考虑阅读体验的年代。合适的行宽、清楚的层级、足够的对比度、可见的键盘焦点、在手机上也能点中的控件，都应该保留。基础交互也不只意味着「能提交」：清楚的返回路径、可修正的输入、可理解的分页和错误提示，都是交互的一部分。
      </p>
      <p>
        真正要去掉的是不必要的间接层。能用链接完成的导航，不必做成手势；能用按钮完成的动作，不必只支持拖拽；能直接显示的说明，不必藏在悬停之后；能用普通页面完成的确认，不必嵌进三层对话框。CSS
        和 JavaScript
        仍然可以改善这些流程，但移除它们之后，页面不应只剩一堆无法理解的容器。
      </p>
      <p>
        换句话说，这不是降低网页的能力，而是给能力安排一个可靠的底座：
        <strong>先让 HTML 完整，再让增强有地方发生。</strong>
      </p>
      <h2>不需要另开一个 Agent 版</h2>
      <p>
        一个很容易想到的方案，是保留原来的网页，再提供
        <code>/agent</code> 或 <code>?format=agent</code>
        之类的简化入口。这在迁移期或许有用，但我不希望它成为最终形态。两个版本会分别变化，简化版迟早会缺少字段、落后一步，或者只剩下只读内容。最后，Agent
        能访问的又变成了一种次等功能。
      </p>
      <p>
        更好的关系是同一份语义完整的
        HTML，加上面向人的视觉呈现和可选增强。人看到的是设计过的页面，Agent
        读到的是同一个资源、同一组操作、同一个结果。底层不分裂，才不会要求站长永远维护两种真相。
      </p>
      <p>
        这也不排斥
        API。高频调用、批量处理和长期稳定的系统集成，仍然应该使用有明确契约的
        API。网页适合的是另一种场景：任务不固定，调用量不大，Agent
        需要利用现有账号和权限，在人的监督下完成一次具体操作。BrowserMCP
        这类工具的价值，就在于不必等待每个网站都为每种任务提供专用接口。语义清楚的
        HTML，则让这条通用路径少一点猜测。
      </p>
      <h2>可访问不等于不设防</h2>
      <p>
        让 Agent 容易理解页面，不等于让 Agent
        可以执行页面上的所有动作。读取和写入应该有不同的权限，敏感操作需要明确的确认，服务端仍然必须检查身份、权限和请求来源。一个表单再简单，也不能替代安全边界。
      </p>
      <p>
        同样，减少脚本和装饰并不会自动解决提示注入，也不会让网页内容变得可信。页面里的文字仍然是外部输入，Agent
        仍然需要区分「页面上写了什么」和「自己应该服从什么」。克制的 HTML
        提供的是清楚，不是豁免。
      </p>
      <h2>少设计一点接口</h2>
      <p>
        这个构想里最吸引我的地方，是它几乎不要求发明什么。标题、段落、链接、列表、表格、表单、稳定的
        URL，这些 Web
        很早就拥有的东西，已经能描述大多数阅读和操作。后来增加的层层抽象当然有其价值，但它们也经常把最简单的任务包进最复杂的表达方式。
      </p>
      <p>
        如果网页的主要流程能重新落成一份可操作的文档，那么人不必学习一套多余的动作，Agent
        也不必模仿人的每一次视觉判断。对 Agent
        时代来说，一种很激进的网页设计，也许恰恰是少设计一点：让内容直接可读，让动作直接可做，让结果直接可见。剩下的，交给浏览器就够了。
      </p>
    </>
  );
}

function HtmlAsInterfaceEn() {
  return (
    <>
      <p>
        Lately I have been asking AI agents to operate web pages for me. Find a
        record, fill in a form, locate an item in a list: the tasks are simple.
        What consumes the effort is everything around them. A button has no
        name, the content exists only on a canvas, a link is not really a link,
        and the result of a submission flashes in a corner and disappears. A
        person takes one look and knows what to do. An agent has to infer it
        from visual cues and a pile of DOM nodes.
      </p>
      <p>
        That has made me imagine a more restrained kind of web page. Use basic
        HTML and put the content and operations directly in the document. Let
        CSS keep it readable and JavaScript provide optional enhancements.
        People can still browse, click, and fill things in, but without
        elaborate animation, drag-only interactions, and layers of dialogs. An
        agent using a tool such as BrowserMCP no longer has to understand an
        interface designed around visual effects before it can get the job done.
      </p>
      <p>
        This is not a proposal for a separate agent web. It is the opposite:{" "}
        <strong>
          do not add another special-purpose protocol; treat HTML itself as the
          interface. Do not build a second page for agents; make the same page
          direct for both people and agents.
        </strong>
      </p>
      <h2>Agents should not have to guess better</h2>
      <p>
        Using a browser to complete a task is a loop: observe the current state,
        choose a step, perform it, and inspect the result. The more a page
        depends on position, color, hover states, and transient controls, the
        more guessing that loop contains. Experience tells a person what an
        icon-only button probably means. A button without text or an accessible
        name leaves an agent with only a suggestion: guess what this picture
        usually does.
      </p>
      <p>
        We can, of course, make models better at screenshots, layout, and mouse
        movement. But using a stronger model to compensate for an ambiguous
        interface shifts a design cost onto every visit. Every visit must
        recognize the interface again, and every visit has another chance to
        click the wrong thing. The cheaper approach is for the page to state
        what this is, what it can do, and what happened after it was done.
      </p>
      <p>
        Agent-friendly therefore does not mean stuffing a page with special
        machine-readable annotations. The basic requirement is much more
        ordinary:{" "}
        <strong>
          let the observation, the action, and the result all be read
          unambiguously from the document.
        </strong>
      </p>
      <h2>Content should be a document, not a picture</h2>
      <p>
        Such a page starts with a plain structure. It has a clear title, its
        body sits in a <code>main</code>, sections use headings in a sensible
        hierarchy, navigation uses links, lists are <code>ul</code> or{" "}
        <code>ol</code>, and tabular data goes in a <code>table</code>.
        Important information exists as text in the HTML, not only in an image,
        on a canvas, or inside a script's state after the page has run.
      </p>
      <p>
        These elements are not there to pass a conformance check. They remove
        ambiguity. A heading says what the page is about, a list says these
        items belong together, and table headers explain the columns. A person
        sees the formatted result; an agent reads the same structure. There are
        not two separate understandings of the page to maintain.
      </p>
      <p>
        Links should be real links too. A resource has a stable URL, so opening,
        refreshing, bookmarking, and handing it to someone else all refer to the
        same thing. The next page is an <code>a href</code>, not a{" "}
        <code>div</code> that changes internal state when clicked. Infinite
        scrolling can remain as a convenience, but there should at least be a
        paged route through the collection. Otherwise an agent cannot readily
        tell whether it has seen the whole list or return to its place after an
        interruption.
      </p>
      <h2>Actions should return to links and forms</h2>
      <p>
        Read-only pages are the easy part. Operations reveal the real
        difference. Many modern interfaces scatter an action across a chain of
        script events: click this region, drag that card, wait for a menu, then
        choose among unexplained options. This may feel smooth to a person. To
        an agent, every step is another piece of state and another point of
        failure.
      </p>
      <p>In the main flow I imagine, an ordinary form says enough:</p>
      <pre>
        <code>{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>New task</title>
  </head>
  <body>
    <main>
      <h1>New task</h1>
      <form method="post" action="/tasks">
        <p>
          <label for="title">Title</label><br>
          <input id="title" name="title" required>
        </p>
        <p>
          <label for="description">Description</label><br>
          <textarea id="description" name="description"></textarea>
        </p>
        <button type="submit">Create task</button>
      </form>
      <p><a href="/tasks">Back to tasks</a></p>
    </main>
  </body>
</html>`}</code>
      </pre>
      <p>
        This code has no visual ambition, but it already describes the
        interface. The <code>label</code> says what to enter, <code>name</code>{" "}
        says what will be submitted, the button says what will happen, and{" "}
        <code>action</code> and <code>method</code> say where the operation
        goes. A person can use it in a browser, and so can an agent. The main
        task still works if JavaScript never loads.
      </p>
      <p>
        Searches can use ordinary GET forms where possible, leaving their
        conditions in the URL. Creation and editing get explicit forms and
        submit buttons. A destructive action should not be disguised as an
        ambiguous click. There is no new technology here, only a constraint:{" "}
        <strong>
          do not use an apparently flexible event system to reinvent what the
          browser already knows how to do.
        </strong>
      </p>
      <h2>The result has to remain</h2>
      <p>
        Finishing an operation is only half the flow. An agent also needs to
        know whether it succeeded and, if not, where it failed. A toast that
        vanishes after two seconds, a border that only changes color, and a
        spinner that never stops do not explain the result.
      </p>
      <p>
        A more reliable approach makes the result part of the page state. After
        a successful creation, navigate to a detail page with a stable URL and
        show the new object in its heading and body. On failure, render the form
        again, preserve the input, and list the errors as text. A dynamic page
        can update the current document, but the state cannot live only in a
        script's memory, nor require the visitor to be watching at precisely the
        right second.
      </p>
      <p>
        This helps people for the same reasons. They can refresh after a network
        failure, correct a form without starting over, and copy the link to a
        completed object for someone else to inspect. Reducing uncertainty for
        an agent usually reduces it for a person too.
      </p>
      <h2>Restraint is not crudeness</h2>
      <p>
        Keeping basic features does not mean going back to an era of default
        blue links and no concern for reading. A sensible line length, clear
        hierarchy, adequate contrast, visible keyboard focus, and controls large
        enough to use on a phone should all remain. Basic interaction means more
        than accepting a submission: a clear way back, correctable input,
        understandable pagination, and useful errors are part of it too.
      </p>
      <p>
        What goes is unnecessary indirection. If a link can provide navigation,
        do not require a gesture. If a button can perform an action, do not make
        dragging the only option. If an explanation can be visible, do not hide
        it behind hover. If an ordinary page can handle confirmation, do not
        bury it inside three dialogs. CSS and JavaScript can still improve these
        flows, but removing them should not leave behind a pile of meaningless
        containers.
      </p>
      <p>
        This is not reducing what a page can do. It is giving those capabilities
        a dependable base:{" "}
        <strong>
          make the HTML complete first, then give enhancements somewhere to
          happen.
        </strong>
      </p>
      <h2>Do not open a separate agent edition</h2>
      <p>
        An obvious alternative is to keep the existing page and offer a
        simplified entry point such as <code>/agent</code> or{" "}
        <code>?format=agent</code>. That may help during a migration, but I
        would not want it as the end state. Two versions drift apart. The
        simplified one eventually loses fields, falls a release behind, or
        becomes read-only. Once again, agents get the second-class version.
      </p>
      <p>
        A better arrangement is one semantically complete HTML document, with
        visual presentation and optional enhancements for people. A person sees
        a designed page; an agent reads the same resource, the same operations,
        and the same result. Keeping the base unified means the site does not
        have to maintain two versions of the truth.
      </p>
      <p>
        None of this replaces APIs. High-frequency calls, batch processing, and
        durable system integrations still belong behind an explicit API
        contract. The web fits a different case: an occasional, variable task
        where an agent uses an existing account and permissions under human
        supervision. Tools such as BrowserMCP matter because a site need not
        publish a dedicated interface for every possible task. Semantically
        clear HTML makes that general path less dependent on guesswork.
      </p>
      <h2>Accessible does not mean undefended</h2>
      <p>
        Making a page easy for an agent to understand does not mean allowing the
        agent to perform every action on it. Reading and writing need different
        permissions, sensitive operations need explicit confirmation, and the
        server must still check identity, authorization, and request origin. A
        simple form is no substitute for a security boundary.
      </p>
      <p>
        Less script and decoration also does not solve prompt injection or make
        web content trustworthy. Text on a page remains external input, and an
        agent still has to distinguish what the page says from what it should
        obey. Restrained HTML provides clarity, not immunity.
      </p>
      <h2>Design the interface a little less</h2>
      <p>
        What attracts me most to this idea is how little it asks us to invent.
        Headings, paragraphs, links, lists, tables, forms, and stable URLs were
        part of the web early on, and they can already describe most reading and
        operations. The abstractions added since have real value, but they also
        routinely wrap the simplest task in the most elaborate representation.
      </p>
      <p>
        If a page's main flow can again become an operable document, people need
        not learn a redundant set of gestures, and agents need not reproduce
        every visual judgement a person makes. For the agent era, a radical kind
        of web design may be to design a little less: make content directly
        readable, actions directly performable, and results directly visible.
        The browser can take care of the rest.
      </p>
    </>
  );
}

export const htmlAsInterface: Post = {
  slug: "html-as-interface",
  date: "2026-11-03",
  locales: {
    zh: {
      title: "把 HTML 当作接口",
      summary:
        "构想一种适合 AI Agent 访问的网页：内容和操作都由基础 HTML 完整表达，CSS 与 JavaScript 只做增强。人保留直接、可修正的基础交互，BrowserMCP 等工具驱动的 Agent 也不必在视觉线索中猜测。不是另做一个 Agent 版，而是让同一个页面成为双方共用的接口。",
    },
    en: {
      title: "HTML Is the Interface",
      summary:
        "A web page suited to AI agents can express its content and operations completely in basic HTML, with CSS and JavaScript as enhancements. People keep direct, correctable interactions, while agents using tools such as BrowserMCP need not infer everything from visual cues. Not a separate agent edition, but one page serving as an interface for both.",
    },
  },
  Body: { zh: HtmlAsInterfaceZh, en: HtmlAsInterfaceEn },
};
