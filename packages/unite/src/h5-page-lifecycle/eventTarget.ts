import { supportsConstructableEventTarget } from './support'

/**
 * A minimal EventTarget class shim.
 * This is used if the browser doesn't natively support constructable
 * EventTarget objects.
 */
class EventTargetShim {
  _registry: any
  /**
   * Creates the event registry.
   */
  constructor() {
    this._registry = {}
  }

  /**
   * @param {string} type
   * @param {EventListener|function(!Event):(boolean|undefined)} listener
   * @param {(boolean|!AddEventListenerOptions)=} opts
   * @return {undefined}
   * @see https://dom.spec.whatwg.org/#dom-eventtarget-addeventlistener
   */
  addEventListener(type, listener, _opts = false) {
    this._getRegistry(type).push(listener)
  }

  /**
   * @param {string} type
   * @param {EventListener|function(!Event):(boolean|undefined)} listener
   * @param {(boolean|!EventListenerOptions)=} opts
   * @return {undefined}
   * @see https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
   */
  removeEventListener(type, listener, _opts = false) {
    const typeRegistry = this._getRegistry(type)
    const handlerIndex = typeRegistry.indexOf(listener)
    if (handlerIndex > -1) {
      typeRegistry.splice(handlerIndex, 1)
    }
  }

  /**
   * @param {!Event|!EventShim} evt
   * @return {boolean}
   * @see https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
   */
  dispatchEvent(evt) {
    // Set the target then freeze the event object to prevent modification.
    evt.target = this
    Object.freeze(evt)

    this._getRegistry(evt.type).forEach((listener) => listener(evt))
    return true
  }

  /**
   * Returns an array of handlers associated with the passed event type.
   * If no handlers have been registered, an empty array is returned.
   * @private
   * @param {string} type The event type.
   * @return {!Array} An array of handler functions.
   */
  _getRegistry(type) {
    return (this._registry[type] = this._registry[type] || [])
  }
}

export default supportsConstructableEventTarget ? EventTarget : EventTargetShim
