import { updatables } from '#native/renderer'

/**
 * Base class for instanced objects.
 */
export default class Instance {

  /**
   * The current 3D position of the instance.
   */
  _position = { x: 0, y: 0, z: 0 }

  /**
   * The amount of instances that should be rendered.
   */
  _amount = 1

  /**
   * A list of instances.
   */
  _instances = []

  /**
   * The positions to exclude when creating instances.
   */
  _exclude = {
    width: 0,
    direction: 0,
  }

  /**
   * The actual instanced model to be added to the sceme.
   */
  _model = null

  /**
   * If the instance has animations.
   */
  _hasAnimations = false

  /**
   * If the instance is currently playing their animations.
   */
  _isAnimating = false

  /**
   * Tracks the current "tick" for the animations.
   */
  _tick = 0

  /**
   * Initialize the instance.
   *
   * @param {Number} amount - The amount of instanced objects.
   */
  constructor({ position = { x: 0, y: 0, z: 0 }, amount = 1, exclude = { width: 0, direction: 0 } } = {}) {
    this._amount = amount
    this._position = position
    this._exclude = exclude

    console.log('new instance')
  }

  get model() {
    return this._model
  }

  set model(value) {
    this._model = value

    this._model.position.y = this._position.y * 5

    if (this._hasAnimations) {
      updatables.push(this)
    }
  }

  get isAnimating() {
    return this._isAnimating
  }

  set isAnimating(value) {
    this._isAnimating = value
  }
}
