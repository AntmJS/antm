class RouterEvent {
  RouterEvent: (() => void)[]
  register: (call: any) => void
  unregister: () => void
  trigger: () => void
  // @ts-ignore
  switch: (url: string, type?: 'hash' | 'history' | undefined) => void
  constructor() {
    this.RouterEvent = []

    this.register = (call) => {
      this.RouterEvent.push(call)
    }

    this.unregister = () => {
      this.RouterEvent = []
    }

    this.trigger = () => {
      if (this.RouterEvent) {
        this.RouterEvent.forEach((item) => {
          item()
        })
      }
    }
  }
}

RouterEvent.prototype.switch = function (
  url: string,
  type?: 'hash' | 'history',
  data?: Record<string, any>,
) {
  if (type === 'history') {
    history.pushState(data || {}, '', url)
  } else {
    window.location.hash = url
  }
  this.trigger()
}

const routerEvent = new RouterEvent()

export { routerEvent }
