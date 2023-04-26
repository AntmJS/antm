"use strict";(self.webpackChunkantm=self.webpackChunkantm||[]).push([[4726],{96515:function(s,a,n){n.r(a),a.default={tile:"自定义全局样式",docs:'<h1>自定义全局样式</h1>\n<p>某些场景下，你可能需要在主题 UI 的基础上添加一些全局样式，框架提供了一个配置项 globalStyles 来实现这个功能</p>\n<div class="card"><h3 id="%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>使用方法</h3>\n<p>在 antm.config.ts 中添加以下配置</p>\n<pre><code class="language-ts"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@antmjs/types&#x27;</span>\n<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;path&#x27;</span>\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({\n  <span class="hljs-attr">doc</span>: {\n    <span class="hljs-attr">globalStyles</span>: [<span class="hljs-title function_">join</span>(<span class="hljs-variable constant_">CWD</span>, <span class="hljs-string">&#x27;./styles/index.css&#x27;</span>)],\n  },\n})\n</code></pre>\n<p>暂时只支持少量 css 变量, 样式案例代码如下：</p>\n<pre><code class="language-less"><span class="hljs-selector-pseudo">:root</span> {\n  <span class="hljs-attr">--primary-color</span>: rgb(78, 78, 200);\n  <span class="hljs-attr">--primary-back-color</span>: #e5e4f8;\n  <span class="hljs-attr">--header-back-color</span>: rgb(78, 78, 200);\n}\n\n<span class="hljs-selector-class">.antm-docs-menu</span> {\n  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;\n}\n</code></pre>\n</div>',h3Ids:"使用方法"}}}]);