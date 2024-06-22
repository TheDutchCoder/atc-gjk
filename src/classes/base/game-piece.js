import { updatables } from '#/renderer'

/**
 * Basic class for any game piece.
 */
export default class GamePiece {

  /**
   * The current 3D position of the game piece.
   */
  _position = { x: 0, y: 0, z: 0 }

  /**
   * The direction the game piece is facing.
   */
  _direction = 0

  /**
   * The game pieces model data.
   */
  _model = null

  /**
   * If the game piece has animations.
   */
  _hasAnimations = false

  /**
   * If the game piece is currently playing their animations.
   */
  _isAnimating = false

  /**
   * If the gane piece should be removed on the next game tick.
   */
  _shouldBeRemoved = false

  /**
   * Tracks the current "tick" for the animations.
   */
  _tick = 0

  /**
   * The game piece's game name.
   */
  displayName = ''

  /**
   * Initialize the game piece.
   *
   * @param {Object} position - The position of the game piece.
   * @param {Number} direction - The direction the game piece is facing.
   */
  constructor ({ position = { x: 0, y: 0, z: 0 }, direction = 0 } = {}) {
    this._position = position
    this._direction = direction
  }

  updatePosition () {
    this._model.position.x = this._position.x * 10
    this._model.position.y = this._position.y * 5
    this._model.position.z = this._position.z * 10
  }

  updateDirection () {
    this._model.rotation.y = this._direction * (Math.PI / -4)
  }

  /**
   * Get the current posiiton of the game piece.
   */
  get position () {
    return this._position
  }

  /**
   * Set the ne wposition of the game piece and update the model's physical
   * position on the board.
   */
  set position (position) {
    this._position = position
    this.updatePosition()
  }

  /**
   * Get the current direction the game piece is facing.
   */
  get direction () {
    return this._direction
  }

  /**
   * Set the new direction of the game piece and update the model's physical
   * rotation on the board.
   */
  set direction (direction) {
    this._direction = direction
    this.updateDirection()
  }

  /**
   * Get the current direction the game piece is facing.
   */
  get model () {
    return this._model
  }

  set model (model) {
    this._model = model

    this.updatePosition()
    this.updateDirection()

    if (this._hasAnimations) {
      updatables.push(this)
    }
  }

  get isAnimating () {
    return this._isAnimating
  }

  set isAnimating (value) {
    this._isAnimating = value
  }

}
