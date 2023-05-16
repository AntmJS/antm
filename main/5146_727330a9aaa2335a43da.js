"use strict";(self.webpackChunkantm=self.webpackChunkantm||[]).push([[5146],{5146:function(s,c,n){n.r(c),c.default={tile:"约定式路由",docs:'<h1>约定式路由</h1>\n<div class="card"><h3 id="%E4%BB%80%E4%B9%88%E6%98%AF%E7%BA%A6%E5%AE%9A%E5%BC%8F%E8%B7%AF%E7%94%B1"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>什么是约定式路由</h3>\n<p>antm.js Doc 使用的是文件系统路由，页面的文件路径会简单的映射为路由路径，这样会让整个项目的路由非常直观。</p>\n<p>例如，如果在 docs 目录中有一个名为 foo.md 的文件，则该文件的路由路径将是 /foo</p>\n<blockquote>\n<p>浏览器控制台会默认打印 <code>DOC_ROUTERS</code>即生成的全部路由页面</p>\n</blockquote>\n</div><div class="card"><h3 id="%E6%98%A0%E5%B0%84%E8%A7%84%E5%88%99"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>映射规则</h3>\n<p>antm.js Doc 会自动扫描根目录和所有子目录，并将文件路径映射到路由路径。例如，如果你有以下的文件结构：</p>\n<pre><code class="language-markdown">docs\n├── foo\n│ └── bar.md\n└── foo.md\n</code></pre>\n<p>得到的映射规则如下：</p>\n<table>\n<thead>\n<tr>\n<th>文件路径</th>\n<th>路由路径</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>docs/foo.md</code></td>\n<td><code> /foo</code></td>\n</tr>\n<tr>\n<td><code>docs/foo/bar.md</code></td>\n<td><code> /foo/bar</code></td>\n</tr>\n<tr>\n<td><code>docs/abc/README.md</code></td>\n<td><code> /abc</code></td>\n</tr>\n</tbody>\n</table>\n</div><div class="card"><h3 id="%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A7%84%E5%88%99"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>自定义规则</h3>\n<p>通过配置定义自定义生成路由的规则</p>\n<p><code>src</code>配置，文档文件所在的根路径，可以是字符或数字</p>\n<p><code>route</code>配置：</p>\n<ul>\n<li><code>exclude</code>：不需要转换为文档的 markdown 文件, 支持 <code>/abc/*.md</code>写法,请使用全路径匹配</li>\n<li><code>redirect</code>：当路由没有匹配的，或者为<code>/</code>根路由的时候重定向的路径</li>\n<li><code>type</code>：路由类型<code>hash</code>或<code>history</code></li>\n<li><code>level</code>：控制路由路径的长度，如 level 设置 1 的时候，<code>docs/foo/bar.md</code>映射<code>/bar</code>, 可能会出现<strong>路由冲突</strong>，谨慎使用</li>\n</ul>\n<pre><code class="language-js"><span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@antmjs/types&#x27;</span>;\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({\n  <span class="hljs-attr">docs</span>: {\n    <span class="hljs-attr">src</span>: [<span class="hljs-string">&#x27;./doc&#x27;</span>],\n    <span class="hljs-attr">route</span>: {\n      <span class="hljs-attr">level</span>: <span class="hljs-number">1</span>,\n      <span class="hljs-attr">exclude</span>: [<span class="hljs-title function_">join</span>(<span class="hljs-variable constant_">CWD</span>, <span class="hljs-string">&#x27;/a/*.md&#x27;</span>)],\n      <span class="hljs-attr">redirect</span>: <span class="hljs-string">&#x27;/introduce&#x27;</span>\n      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;hash&#x27;</span>\n    }\n  }\n})\n</code></pre>\n</div>',h3Ids:"什么是约定式路由:::映射规则:::自定义规则"}}}]);