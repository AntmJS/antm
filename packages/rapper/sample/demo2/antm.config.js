// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('./../../dist/index')

module.exports = {
  rapper: defineConfig({
    rapper: {
      tokenCookie:
        'aliyungf_tc=62e5f6341aee97fa8dbd09c07654908a09fb0a8e2c1ee406d4a5f63783db3436; koa.sid=weDQXgw2JR8kIbpo8ZoKEXB9Vlb029tL; koa.sid.sig=ZHTFy9z62SNDmkB0dvQt2Y4nfyo',
    },
  }),
}
