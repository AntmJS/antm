const routerEvent = {
  RouterEvent: [] as any,
  register: function (call) {
    this?.['RouterEvent'].push(call)
  },
  unregister: function () {
    this.RouterEvent = []
  },
  trigger: function () {
    if (this.RouterEvent) {
      this.RouterEvent.forEach((item: any) => {
        item()
      })
    }
  },
  switch: function (
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
  },
}

export { routerEvent }
