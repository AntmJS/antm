import { supportsConstructableEventTarget } from './support'

/**
 * A minimal Event class shim.
 * This is used if the browser doesn't natively support constructable
 * EventTarget objects.
 */
class EventShim {
  type: any
  /**
   * @param {string} type
   */
  constructor(type) {
    this.type = type
  }
}

export default supportsConstructableEventTarget ? Event : EventShim
