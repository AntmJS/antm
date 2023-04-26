"use strict";(self.webpackChunkantm=self.webpackChunkantm||[]).push([[9940],{69940:function(s,a,n){n.r(a),a.default={tile:"Signature 签名",docs:'<h1>Signature 签名</h1>\n<div class="card"><h3 id="%E4%BB%8B%E7%BB%8D"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>介绍</h3>\n<p>基于 Canvas 的签名组件</p>\n</div><div class="card"><h3 id="%E5%BC%95%E7%94%A8"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>引用</h3>\n<pre><code class="language-jsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Signature</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@antmjs/vantui&#x27;</span>\n</code></pre>\n</div><h2>代码演示</h2>\n<div class="card"><h3 id="%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>基础用法</h3>\n<pre><code class="language-jsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Demo</span>(<span class="hljs-params"></span>) {\n  <span class="hljs-keyword">const</span> instance = react.<span class="hljs-title function_">useRef</span>()\n  <span class="hljs-keyword">const</span> [img, setImage] = react.<span class="hljs-title function_">useState</span>()\n\n  <span class="hljs-keyword">const</span> <span class="hljs-title function_">getImageAction</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {\n    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> instance.<span class="hljs-property">current</span>.<span class="hljs-title function_">getImage</span>()\n    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(res)\n    <span class="hljs-title function_">setImage</span>(res.<span class="hljs-property">tempFilePath</span>)\n  }\n\n  <span class="hljs-keyword">const</span> <span class="hljs-title function_">clear</span> = (<span class="hljs-params"></span>) =&gt; {\n    instance.<span class="hljs-property">current</span>?.<span class="hljs-title function_">clear</span>()\n    <span class="hljs-title function_">setImage</span>(<span class="hljs-string">&#x27;&#x27;</span>)\n  }\n\n  <span class="hljs-keyword">return</span> (\n    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">Signature</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{instance}</span> /&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginTop:</span> <span class="hljs-attr">20</span>, <span class="hljs-attr">display:</span> &#x27;<span class="hljs-attr">flex</span>&#x27; }}&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{getImageAction}</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>\n          截图\n        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{clear}</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;danger&quot;</span>&gt;</span>\n          重绘\n        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">Image</span>\n        <span class="hljs-attr">src</span>=<span class="hljs-string">{img}</span>\n        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>\n          <span class="hljs-attr">backgroundColor:</span> &#x27;#<span class="hljs-attr">fff</span>&#x27;,\n          <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ddd</span>&#x27;,\n          <span class="hljs-attr">marginTop:</span> &#x27;<span class="hljs-attr">20px</span>&#x27;,\n        }}\n        <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>\n        <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;150px&quot;</span>\n      /&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>\n  )\n}\n</code></pre>\n</div><div class="card"><h3 id="%E4%BF%AE%E6%94%B9%E9%A2%9C%E8%89%B2%E5%92%8C%E7%AD%BE%E5%AD%97%E7%B2%97%E7%BB%86"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>修改颜色和签字粗细</h3>\n<pre><code class="language-jsx"><span class="hljs-keyword">function</span> <span class="hljs-title function_">Demo</span>(<span class="hljs-params"></span>) {\n  <span class="hljs-keyword">const</span> instance = react.<span class="hljs-title function_">useRef</span>()\n  <span class="hljs-keyword">const</span> [img, setImage] = react.<span class="hljs-title function_">useState</span>()\n\n  <span class="hljs-keyword">const</span> <span class="hljs-title function_">getImageAction</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {\n    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> instance.<span class="hljs-property">current</span>.<span class="hljs-title function_">getImage</span>()\n    <span class="hljs-title function_">setImage</span>(res.<span class="hljs-property">tempFilePath</span>)\n  }\n\n  <span class="hljs-keyword">const</span> <span class="hljs-title function_">clear</span> = (<span class="hljs-params"></span>) =&gt; {\n    instance.<span class="hljs-property">current</span>?.<span class="hljs-title function_">clear</span>()\n    <span class="hljs-title function_">setImage</span>(<span class="hljs-string">&#x27;&#x27;</span>)\n  }\n\n  <span class="hljs-keyword">return</span> (\n    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">Signature</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{instance}</span> <span class="hljs-attr">lineWidth</span>=<span class="hljs-string">{4}</span> <span class="hljs-attr">strokeStyle</span>=<span class="hljs-string">&quot;green&quot;</span> /&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginTop:</span> <span class="hljs-attr">20</span>, <span class="hljs-attr">display:</span> &#x27;<span class="hljs-attr">flex</span>&#x27; }}&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{getImageAction}</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>\n          截图\n        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>\n        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{clear}</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;danger&quot;</span>&gt;</span>\n          重绘\n        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>\n      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>\n      <span class="hljs-tag">&lt;<span class="hljs-name">Image</span>\n        <span class="hljs-attr">src</span>=<span class="hljs-string">{img}</span>\n        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>\n          <span class="hljs-attr">backgroundColor:</span> &#x27;#<span class="hljs-attr">fff</span>&#x27;,\n          <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ddd</span>&#x27;,\n          <span class="hljs-attr">marginTop:</span> &#x27;<span class="hljs-attr">20px</span>&#x27;,\n        }}\n        <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>\n        <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;150px&quot;</span>\n        <span class="hljs-attr">fit</span>=<span class="hljs-string">&quot;widthFix&quot;</span>\n      /&gt;</span>\n    <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>\n  )\n}\n</code></pre>\n</div><div class="card"><h3 id="ISignatureProps%20%3Ca%20h"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>ISignatureProps <a href="https://github.com/AntmJS/vantui/tree/main/packages/vantui/types/signature.d.ts">[详情]</a></h3>\n<table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n<th>必填</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>canvasId</td>\n<td>画布元素 id</td>\n<td><em>  string<br/></em></td>\n<td>spcanvas</td>\n<td><code>true</code></td>\n</tr>\n<tr>\n<td>type</td>\n<td>获取图片的类型</td>\n<td><em>  &quot;jpg&quot; ¦ &quot;png&quot;<br/></em></td>\n<td><code>png</code></td>\n<td><code>true</code></td>\n</tr>\n<tr>\n<td>lineWidth</td>\n<td>线条的宽度</td>\n<td><em>  number<br/></em></td>\n<td><code>3</code></td>\n<td><code>true</code></td>\n</tr>\n<tr>\n<td>strokeStyle</td>\n<td>绘图颜色</td>\n<td><em>  string<br/></em></td>\n<td><code>#000</code></td>\n<td><code>true</code></td>\n</tr>\n<tr>\n<td>className</td>\n<td>样式名</td>\n<td><em>  string<br/></em></td>\n<td>-</td>\n<td><code>true</code></td>\n</tr>\n</tbody>\n</table>\n</div><div class="card"><h3 id="%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%20%3Ca%20href%3D%22https%3A"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>组件实例 <a href="https://github.com/AntmJS/vantui/tree/main/packages/vantui/types/signature.d.ts">[详情]</a></h3>\n<table>\n<thead>\n<tr>\n<th>方法</th>\n<th>说明</th>\n<th>类型</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>getImage</td>\n<td>获取绘制生成的图片相关数据，tempFilePath 在 h5 为 base64，小程序为临时图片，由于 canvasToTempFilePath 在部分小程序 IDE 无法调试</td>\n<td><em>  () =&gt; Promise&lt;{<br/>    base64: string<br/>    tempFilePath: string<br/>    canvas: HTMLCanvasElement<br/>  }&gt;<br/></em></td>\n</tr>\n<tr>\n<td>clear</td>\n<td>清除画布方法</td>\n<td><em>  () =&gt; void<br/></em></td>\n</tr>\n</tbody>\n</table>\n</div><div class="card"><h3 id="%E6%A0%B7%E5%BC%8F%E5%8F%98%E9%87%8F"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>样式变量</h3>\n<p>组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考<a href="https://antmjs.github.io/vantui/#/config-provider">ConfigProvider 组件</a></p>\n<table>\n<thead>\n<tr>\n<th>名称</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>--signature-border-color</td>\n<td><code> #dadada;</code></td>\n</tr>\n<tr>\n<td>--signature-border-width</td>\n<td><code> 1px;</code></td>\n</tr>\n<tr>\n<td>--signature-height</td>\n<td><code> 300px;</code></td>\n</tr>\n<tr>\n<td>--signature-margin-bottom</td>\n<td><code> 20px;</code></td>\n</tr>\n</tbody>\n</table>\n</div>',h3Ids:'介绍:::引用:::基础用法:::修改颜色和签字粗细:::ISignatureProps <a h:::组件实例 <a href="https::::样式变量'}}}]);