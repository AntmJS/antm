"use strict";(self.webpackChunkantmjs_doc=self.webpackChunkantmjs_doc||[]).push([[882],{3882:function(s,n,a){a.r(n),n.default={tile:"BuildComponentLibraryDocument",docs:'<h1>Build Component Library Document</h1>\n<div class="card"><h3 id="Introduction"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>Introduction</h3>\n<p>Antmjs Doc can support both mobile and PC component libraries, with different operations required for both methods</p>\n</div><div class="card"><h3 id="PC%20component%20library"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>PC component library</h3>\n<h4>Case code file</h4>\n<p>-Path: The case code and document MD file need to be at the same level as the file\n-Naming: The file must start with \'demo\' as the prefix, followed by \'[a-z -]<code> Avoid naming conflicts within the same MD document -Type: Supports three file types: \'. tsx\' and \'. jsx\'. Currently, only \'react\' is supported</code>\n-Code: The case code must have a default exported component, which is\' export default \'::::_QA\nThe \'import\' local file in the code will also be displayed, except for the file path containing \'index\'\nThe folder where the case code is located is configured under \'antm. config\',</p>\n<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {\n  <span class="hljs-attr">docs</span>: {\n    <span class="hljs-attr">demoCode</span>: {\n      <span class="hljs-attr">dir</span>: <span class="hljs-string">&#x27;example&#x27;</span>,\n    },\n  },\n}\n</code></pre>\n<blockquote>\n<p>If not set, the case code and markup file are at the same level\nDirectory structure, for example:</p>\n</blockquote>\n<pre><code class="language-markdown">├── docs\n├── example/demo-button.tsx\n├── components.md\n</code></pre>\n<h4>Referencing Case Codes in MD Files</h4>\n<p>Used in the above file components.md, empty lines and line breaks must be included in actual use</p>\n<pre><code class="language-markdown">::: demo-buttona :::\n//Only reference code display, no rendering\n::: $demo-buttona :::\n</code></pre>\n<blockquote>\n<p>It should be noted that the case code file needs to be created first, and then the introduction identifier needs to be set\nBelow is a simple \'toast\' component case study of React\n::: demo-button :::\nThe following is a simple Vue \'toast\' component case display\n::: demo-buttona :::</p>\n</blockquote>\n</div><div class="card"><h3 id="I8n%20of%20component%20lib"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>I8n of component library</h3>\n<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {\n  <span class="hljs-attr">docs</span>: {\n    <span class="hljs-comment">// ......</span>\n    <span class="hljs-attr">demoCode</span>: {\n      <span class="hljs-attr">container</span>: {\n        <span class="hljs-attr">react</span>: path.<span class="hljs-title function_">join</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;./ docs/demo-i18n.tsx&#x27;</span>),\n        <span class="hljs-attr">vue</span>: path.<span class="hljs-title function_">join</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;./ docs/demo-i18n.tsx&#x27;</span>),\n      },\n    },\n  },\n}\n</code></pre>\n<p>Configure \'doc. demoCode. container. read\' under the configuration file \'antm. config\', which is a container component that is common to component cases\nThe following is a simple implementation of simulating i18n components, with global variables<code>__ LANGE__</code> Language for switching the current document</p>\n<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>\n\n<span class="hljs-keyword">let</span> langCache = <span class="hljs-string">&#x27;&#x27;</span>\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Index</span>(<span class="hljs-params">{ children }</span>) {\n  <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>[<span class="hljs-string">&#x27;__LANGE__&#x27;</span>] &amp;&amp; <span class="hljs-variable language_">window</span>[<span class="hljs-string">&#x27;__LANGE__&#x27;</span>] !== langCache) {\n    <span class="hljs-keyword">const</span> I18nMap = {\n      <span class="hljs-attr">CN</span>: {\n        点击<span class="hljs-title class_">Toast</span>: <span class="hljs-string">&#x27;点击Toast&#x27;</span>,\n        点击按钮: <span class="hljs-string">&#x27;点击按钮&#x27;</span>,\n        操作成功: <span class="hljs-string">&#x27;操作成功&#x27;</span>,\n      },\n      <span class="hljs-attr">EN</span>: {\n        点击<span class="hljs-title class_">Toast</span>: <span class="hljs-string">&#x27;click Toast&#x27;</span>,\n        点击按钮: <span class="hljs-string">&#x27;click button&#x27;</span>,\n        操作成功: <span class="hljs-string">&#x27;operate success&#x27;</span>,\n      },\n    }\n    <span class="hljs-variable language_">window</span>[<span class="hljs-string">&#x27;$L&#x27;</span>] = I18nMap[<span class="hljs-variable language_">window</span>[<span class="hljs-string">&#x27;__LANGE__&#x27;</span>]]\n  }\n\n  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>\n}\n</code></pre>\n</div><div class="card"><h3 id="Mobile%20component%20lib"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>Mobile component library</h3>\n<p>The main configurations are as follows\n-URL: divided into development environment and production environment\n-\'noMate\': Set redirection when there is no mapping relationship between urls\n-\'transform \': Define mapping rules</p>\n<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({\n  <span class="hljs-attr">docs</span>: {\n    <span class="hljs-attr">simulator</span>: {\n      <span class="hljs-attr">url</span>: {\n        <span class="hljs-attr">development</span>: <span class="hljs-string">&#x27; http://10.254.9.214:10086 &#x27;</span>,\n        <span class="hljs-attr">production</span>: <span class="hljs-string">&#x27;/vantui/main/mobile.html&#x27;</span>,\n      },\n      <span class="hljs-attr">transform</span>: <span class="hljs-function">(<span class="hljs-params">url</span>) =&gt;</span> <span class="hljs-string">::::_QA#/pages/<span class="hljs-subst">::::_ABurl}</span>/index::::_QA</span>,\n      <span class="hljs-attr">noMate</span>: {\n        <span class="hljs-attr">urls</span>: [\n          <span class="hljs-string">&#x27;quickstart&#x27;</span>,\n          <span class="hljs-string">&#x27;custom-style&#x27;</span>,\n          <span class="hljs-string">&#x27;home&#x27;</span>,\n          <span class="hljs-string">&#x27;theme&#x27;</span>,\n          <span class="hljs-string">&#x27;use-in-react&#x27;</span>,\n          <span class="hljs-string">&#x27;contributing&#x27;</span>,\n          <span class="hljs-string">&#x27;v2-to-v3&#x27;</span>,\n          <span class="hljs-string">&#x27;comments&#x27;</span>,\n          <span class="hljs-string">&#x27;premium&#x27;</span>,\n        ],\n        <span class="hljs-attr">redirect</span>: <span class="hljs-string">&#x27;#/pages/dashboard/index&#x27;</span>,\n      },\n    },\n  },\n})\n</code></pre>\n</div>',h3Ids:"Introduction:::PC component library:::I8n of component lib:::Mobile component lib",codePath:[]}}}]);