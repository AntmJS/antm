# 常见问题

### 执行和配置

- 须使用 npx 执行，避免某些路径引用问题
- `globalStyles`选项缺失会导致 style-resources-loader 致性报错，2.18 已经修复

### 依赖缺失

- 项目内需要安装 `typescript`、`style-resources-loader`、`swc-loader`
- 还有可能出现其他以来缺失，请根据提示安装

### 文档编写

引用代码样式问题
下面写法将出现样式问题

```markdown
- xxxxx1
- xxxxx2
  ::: demo-xx :::
```

请使用普通文案或其他文字分割

```markdown
- xxxxx1
- xxxxx2
  下面是展示代码
  ::: demo-xx :::
```
