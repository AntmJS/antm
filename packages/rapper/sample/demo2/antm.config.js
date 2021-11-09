// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('./../../dist/index')

module.exports = {
  rapper: defineConfig({
    rapper: {
      tokenCookie:
        'aliyungf_tc=62e5f6341aee97fa8dbd09c07654908a09fb0a8e2c1ee406d4a5f63783db3436; koa.sid=W6SK_tmw12qoX6HJOzijITG4xFJEeKUS; koa.sid.sig=tTyxm4xTT6TcRKHWP82MUGrP2EI',
    },
  }),
}
