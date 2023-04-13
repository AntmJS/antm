import Event from './event'

/**
 * implements {IStateChangeEvent}
 */
export default class StateChangeEvent extends Event {
  newState: any
  oldState: any
  originalEvent: any
  /**
   * @param {string} type
   * @param {!Object} initDict
   */
  constructor(type, initDict) {
    super(type)
    this.newState = initDict.newState
    this.oldState = initDict.oldState
    this.originalEvent = initDict.originalEvent
  }
}
