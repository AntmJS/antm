export type IWarningConfig = {
  monitorFiles?: string[]
  branchs?: string[]
  webhooks?: {
    url: string
  }
  email?: {
    sender: string // 'abcd@126.com', // 发送人
    senderPass: string // 'ASDFGHJASD', // 发送令牌，邮箱需要设置SMTP服务获取
    receivers: string // 接收人邮箱，多个用数组
  }
}
