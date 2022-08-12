v0.0.2

本地的类型上传

实现流程

1. 为了灵活性 还是 解析 config 拿到配置

2. 把目标文件夹内的 ts 文件

3. 把文件内容喂给 typescript

4. 遍历 ast 把所有的 请求函数信息拿到

5. 根据 请求函数的信息可以拿到 拿到 请求 相应类型是什么，在哪

6. 解析类型生成 附和 rap 接口的 json

7. 调用 rap 接口

要解决的 问题

1. rap 的接口 格式是什么?

> 去扒网页， 看接口请求信息

---

2. rap 修改文档需要登录， 登录需要输入验证码 怎么跳过？

> 登录需要输入一个验证码， 目前没有好的方法， config 配置登录 cookie

---

3. 怎么判断一个接口/模块 是新增还是修改

> 提交 rap 的时候 给请求函数增加标准注释

4. typescript 类型 如何转为 json

> [typescript-json-schema](https://github.com/YousefED/typescript-json-schema)这个包 他会把类型文件转成 json 树,调整一下 扔给 rap 请求接口

5. 如果做到增量提交 修改谁 提交谁 而不是每次都全量提交 容易出问题

> 目前增量的颗粒度是 模块， 只提交修改的模块 其他模块不提交
> 每个文件是一个模块. 每个文件在提交之后都会打一个 MD5 值 ， 对比一下

## 看代码

---

## 看执行结果

演示自动创建模块 自动创建接口 检查改动

---

## 引出

```ts
export const user = <T extends boolean = false>(
  data: IReqUser,
  options?: {
    proxy?: T
    pageError?: boolean
  },
): Promise<T extends true ? IReqUser['data'] : IResUser> =>
  instance(
    {
      url: '/c/b/w/api/2.0/user',
      method: 'GET',
      data,
    },
    options,
  )
```

> 很明显的看出 很多重复性代码

> 需要每次都去复制粘贴

> 可以看到必要的信息只有

1. 方法名称 -- user
2. 请求类型 -- IReqUser
3. 相应类型 -- IResUser
4. 接口 url -- /c/b/w/api/2.0/user
5. 请求方法 -- GET

### 能不能 用什么方法把 其他的东西都去掉 还能够享受 ts 类型？

---

---看 ppt ---
