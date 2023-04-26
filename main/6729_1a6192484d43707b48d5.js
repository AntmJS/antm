"use strict";(self.webpackChunkantm=self.webpackChunkantm||[]).push([[6729],{36729:function(s,a,n){n.r(a),a.default={tile:"如何在 React 中使用（单纯的 React 应用，非 Taro 应用）",docs:'<h1>如何在 React 中使用（单纯的 React 应用，非 Taro 应用）</h1>\n<div class="card"><h3 id="%E5%9C%A8%20React%20%E5%BA%94%E7%94%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%9C%80%E8%A6%81%E5%9C%A8%E5%A6%82%E4%B8%8B%E6%96%87%E4%BB%B6"><svg viewBox="0 0 1024 1024"  width="14" height="14"><path d="M491.054545 779.636364l-125.672727 125.672727c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-67.490909-67.490909-67.490909-179.2 0-246.690909l223.418182-223.418182c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c13.963636 13.963636 34.909091 13.963636 46.545455 0 13.963636-13.963636 13.963636-34.909091 0-46.545455-93.090909-93.090909-246.690909-93.090909-342.109091 0L69.818182 612.072727c-46.545455 46.545455-69.818182 107.054545-69.818182 169.890909C0 847.127273 25.6 907.636364 69.818182 954.181818c46.545455 46.545455 109.381818 69.818182 169.890909 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l125.672727-125.672727c13.963636-13.963636 13.963636-34.909091 0-46.545455-9.309091-16.290909-30.254545-16.290909-44.218182-2.327272z" p-id="2808"></path><path d="M954.181818 69.818182c-93.090909-93.090909-246.690909-93.090909-342.109091 0l-125.672727 125.672727c-13.963636 13.963636-13.963636 34.909091 0 46.545455 13.963636 13.963636 34.909091 13.963636 46.545455 0L658.618182 116.363636c32.581818-32.581818 76.8-51.2 123.345454-51.2s90.763636 18.618182 123.345455 51.2c67.490909 67.490909 67.490909 179.2 0 246.690909l-223.418182 223.418182c-32.581818 32.581818-76.8 51.2-123.345454 51.2s-90.763636-18.618182-123.345455-51.2c-13.963636-13.963636-34.909091-13.963636-46.545455 0-13.963636 13.963636-13.963636 34.909091 0 46.545455 46.545455 46.545455 109.381818 69.818182 169.89091 69.818182 62.836364 0 123.345455-23.272727 169.890909-69.818182l223.418181-223.418182c46.545455-46.545455 69.818182-107.054545 69.818182-169.890909C1024 176.872727 998.4 116.363636 954.181818 69.818182z" p-id="2809"></path></svg>在 React 应用中使用需要在如下文件中添加代码</h3>\n<pre><code class="language-bash">yarn add @tarojs/taro @tarojs/components @antmjs/vantui\nyarn add @antmjs/babel-preset --dev\n</code></pre>\n<ul>\n<li>index.html</li>\n</ul>\n<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">\n    !(<span class="hljs-keyword">function</span> (<span class="hljs-params">n</span>) {\n      <span class="hljs-keyword">function</span> <span class="hljs-title function_">e</span>(<span class="hljs-params"></span>) {\n        <span class="hljs-keyword">var</span> e = n.<span class="hljs-property">document</span>.<span class="hljs-property">documentElement</span>,\n          t = e.<span class="hljs-title function_">getBoundingClientRect</span>().<span class="hljs-property">width</span>\n        e.<span class="hljs-property">style</span>.<span class="hljs-property">fontSize</span> =\n          t &gt;= <span class="hljs-number">640</span> ? <span class="hljs-string">&#x27;40px&#x27;</span> : t &lt;= <span class="hljs-number">320</span> ? <span class="hljs-string">&#x27;20px&#x27;</span> : (t / <span class="hljs-number">320</span>) * <span class="hljs-number">20</span> + <span class="hljs-string">&#x27;px&#x27;</span>\n      }\n      n.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;resize&#x27;</span>, <span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) {\n        <span class="hljs-title function_">e</span>()\n      }),\n        <span class="hljs-title function_">e</span>()\n    })(<span class="hljs-variable language_">window</span>)\n  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>\n</code></pre>\n<ul>\n<li>src/index.js (入口文件)</li>\n</ul>\n<pre><code class="language-js"><span class="hljs-keyword">import</span> { init } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@antmjs/vantui&#x27;</span>\n<span class="hljs-keyword">import</span> { defineCustomElements, applyPolyfills } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@tarojs/components/loader&#x27;</span>\n\n<span class="hljs-title function_">init</span>()\n<span class="hljs-title function_">applyPolyfills</span>().<span class="hljs-title function_">then</span>(<span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) {\n  <span class="hljs-title function_">defineCustomElements</span>(<span class="hljs-variable language_">window</span>)\n})\n</code></pre>\n<ul>\n<li>webpack.config.js</li>\n</ul>\n<pre><code class="language-js">{\n  <span class="hljs-attr">resolve</span>: {\n    <span class="hljs-attr">mainFields</span>: [\n      <span class="hljs-string">&#x27;main:h5&#x27;</span>,\n      <span class="hljs-string">&#x27;browser&#x27;</span>,\n      <span class="hljs-string">&#x27;module&#x27;</span>,\n      <span class="hljs-string">&#x27;jsnext:main&#x27;</span>,\n      <span class="hljs-string">&#x27;main&#x27;</span>,\n    ],\n    <span class="hljs-attr">alias</span>: {\n      <span class="hljs-comment">// 默认@tarojs/components要指向dist-h5/react，而loader和taro-components.css只要直接指向@tarojs/components就行</span>\n      <span class="hljs-comment">// 理论上还有优化的空间，慢慢来，持续迭代</span>\n      <span class="hljs-string">&#x27;@tarojs/components/dist/taro-components/taro-components.css&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;./node_modules/@tarojs/components/dist/taro-components/taro-components.css&#x27;</span>),\n      <span class="hljs-string">&#x27;@tarojs/components/loader&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;./node_modules/@tarojs/components/loader&#x27;</span>),\n      <span class="hljs-string">&#x27;@tarojs/components&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;./node_modules/@tarojs/components/dist-h5/react&#x27;</span>),\n      <span class="hljs-attr">react</span>: path.<span class="hljs-title function_">resolve</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;./node_modules/react&#x27;</span>),\n      <span class="hljs-string">&#x27;react-dom&#x27;</span>: path.<span class="hljs-title function_">resolve</span>(process.<span class="hljs-title function_">cwd</span>(), <span class="hljs-string">&#x27;./node_modules/react-dom&#x27;</span>),\n    },\n  },\n  <span class="hljs-attr">module</span>: {\n    <span class="hljs-attr">rules</span>: [\n      {\n        <span class="hljs-comment">// 这里其实可以在自己的webpack内配置，核心就是匹配到test的部分不触发polyfill，仅仅更新下语法就行，否则会报错</span>\n        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/node_modules[\\/]@tarojs(.+?).[tj]sx?$/i</span>,\n        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;babel-loader&#x27;</span>),\n        <span class="hljs-attr">options</span>: {\n          <span class="hljs-attr">presets</span>: [\n            [\n              <span class="hljs-string">&#x27;@antmjs/babel-preset&#x27;</span>,\n              {\n                <span class="hljs-attr">presets</span>: {\n                  <span class="hljs-attr">env</span>: {\n                    <span class="hljs-attr">debug</span>: <span class="hljs-literal">false</span>,\n\n                    <span class="hljs-comment">/**\n                     * false: 不处理polyfill，自己手动引入【全量】\n                     * usage: 按需加载 polyfill，且不需要手动引入【按需】\n                     * entry: 必须手动引入，但会根据设置的目标环境全量导入【按环境全量】\n                     * 注：在 Babel 7.4.0 之后的版本，Babel官方明确建议了不再使用 <span class="hljs-doctag">@babel</span>/polyfill ，建议使用 core-js/stable 和 regenerator-runtime/runtime。本包已经安装了core-js、<span class="hljs-doctag">@babel</span>/plugin-transform-runtime和<span class="hljs-doctag">@babel</span>/runtime，所以选择false或者entry选项的只需要在主文件顶部引入core-js即可\n                     */</span>\n                    <span class="hljs-attr">useBuiltIns</span>: <span class="hljs-literal">false</span>,\n                    <span class="hljs-attr">corejs</span>: <span class="hljs-literal">false</span>,\n                    <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 对es6的模块文件不做转译，以便使用tree shaking、sideEffects等</span>\n                  },\n                  <span class="hljs-attr">react</span>: {\n                    <span class="hljs-attr">runtime</span>: <span class="hljs-string">&#x27;automatic&#x27;</span>,\n                  },\n                  <span class="hljs-attr">typescript</span>: {\n                    <span class="hljs-attr">isTSX</span>: <span class="hljs-literal">true</span>,\n                    <span class="hljs-attr">jsxPragma</span>: <span class="hljs-string">&#x27;React&#x27;</span>,\n                    <span class="hljs-attr">allExtensions</span>: <span class="hljs-literal">true</span>,\n                    <span class="hljs-attr">allowNamespaces</span>: <span class="hljs-literal">true</span>,\n                  },\n                },\n                <span class="hljs-attr">decorators</span>: {\n                  <span class="hljs-attr">legacy</span>: <span class="hljs-literal">false</span>,\n                  <span class="hljs-attr">decoratorsBeforeExport</span>: <span class="hljs-literal">false</span>,\n                },\n                <span class="hljs-attr">classProperties</span>: {\n                  <span class="hljs-attr">loose</span>: <span class="hljs-literal">false</span>,\n                },\n                <span class="hljs-attr">runtime</span>: {\n                  <span class="hljs-attr">absoluteRuntime</span>: path.<span class="hljs-title function_">dirname</span>(\n                    <span class="hljs-built_in">require</span>.<span class="hljs-title function_">resolve</span>(\n                      <span class="hljs-string">&#x27;@babel/runtime-corejs3/package.json&#x27;</span>,\n                    ),\n                  ),\n                  <span class="hljs-attr">version</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;@babel/runtime-corejs3/package.json&#x27;</span>)\n                    .<span class="hljs-property">version</span>,\n                  <span class="hljs-attr">corejs</span>: <span class="hljs-literal">false</span>,\n                  <span class="hljs-attr">helpers</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 使用到@babel/runtime</span>\n                  <span class="hljs-attr">regenerator</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 使用到@babel/runtime</span>\n                  <span class="hljs-attr">useESModules</span>: <span class="hljs-literal">false</span>,\n                },\n                <span class="hljs-attr">exclude</span>: [<span class="hljs-regexp">/@babel[/|\\\\]runtime/</span>, <span class="hljs-regexp">/core-js/</span>],\n              },\n            ],\n          ],\n        },\n      },\n      {\n        <span class="hljs-comment">// 可以参考Taro的自适应方案</span>\n        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/.less$/</span>\n        <span class="hljs-attr">use</span>: [\n          <span class="hljs-comment">// 这里展示的是组件核心需要的loader，其他loader请自行添加</span>\n          {\n            <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;postcss-loader&#x27;</span>),\n            <span class="hljs-attr">options</span>: {\n              <span class="hljs-attr">ident</span>: <span class="hljs-string">&#x27;postcss&#x27;</span>,\n              <span class="hljs-attr">plugins</span>: <span class="hljs-function">() =&gt;</span> [\n                <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;postcss-pxtransform&#x27;</span>)({\n                  <span class="hljs-attr">platform</span>: <span class="hljs-string">&#x27;h5&#x27;</span>,\n                  <span class="hljs-attr">designWidth</span>: <span class="hljs-number">750</span>,\n                })\n              ]\n            }\n          }\n        ]\n      }\n    ]\n  },\n  <span class="hljs-attr">plugins</span>: [\n    <span class="hljs-comment">// 为了使移动H5和Taro小程序保持同一套组件，原因在介绍有说明，所以这里需要把Taro内置的一些插件属性给加进来</span>\n    <span class="hljs-keyword">new</span> webpack.<span class="hljs-title class_">DefinePlugin</span>({\n      <span class="hljs-attr">ENABLE_INNER_HTML</span>: <span class="hljs-literal">true</span>,\n      <span class="hljs-attr">ENABLE_ADJACENT_HTML</span>: <span class="hljs-literal">true</span>,\n      <span class="hljs-attr">ENABLE_TEMPLATE_CONTENT</span>: <span class="hljs-literal">true</span>,\n      <span class="hljs-attr">ENABLE_CLONE_NODE</span>: <span class="hljs-literal">true</span>,\n      <span class="hljs-attr">ENABLE_SIZE_APIS</span>: <span class="hljs-literal">false</span>,\n    }),\n    <span class="hljs-keyword">new</span> webpack.<span class="hljs-title class_">EnvironmentPlugin</span>({\n      <span class="hljs-attr">LIBRARY_ENV</span>: <span class="hljs-string">&#x27;react&#x27;</span>,\n      <span class="hljs-attr">TARO_ENV</span>: <span class="hljs-string">&#x27;h5&#x27;</span>,\n    }),\n    <span class="hljs-comment">// const VantUIPlugin = require(&#x27;@antmjs/plugin-vantui&#x27;)</span>\n    <span class="hljs-comment">// 如果用的就是750，则不需要添加该插件了</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-title class_">VantUIPlugin</span>({\n      <span class="hljs-attr">designWidth</span>: <span class="hljs-number">750</span>,\n      <span class="hljs-attr">deviceRatio</span>: {\n        <span class="hljs-number">640</span>: <span class="hljs-number">2.34</span> / <span class="hljs-number">2</span>,\n        <span class="hljs-number">750</span>: <span class="hljs-number">1</span>,\n        <span class="hljs-number">828</span>: <span class="hljs-number">1.81</span> / <span class="hljs-number">2</span>,\n      },\n    }),\n  ],\n}\n\n</code></pre>\n<pre><code class="language-bash">TARO_ENV=h5 yarn start\n</code></pre>\n<blockquote>\n<p>愉快的玩耍吧！</p>\n</blockquote>\n</div>',h3Ids:"在 React 应用中使用需要在如下文件"}}}]);