import { updatables } from '#/renderer'

/**
 * Basic class for any game tile.
 */
export default class GameTile {

  /**
   * The current 3D position of the game tile.
   */
  _position = { x: 0, y: 0, z: 0 }

  /**
   * The game tiles model data.
   */
  _model = null

  /**
   * If the game tile has animations.
   */
  _hasAnimations = false

  /**
   * If the game tile is currently playing their animations.
   */
  _isAnimating = false

  /**
   * If the gane tile should be removed on the next game tick.
   */
  _shouldBeRemoved = false

  /**
   * Tracks the current "tick" for the animations.
   */
  _tick = 0

  /**
   * The game tile's game name.
   */
  displayName = ''

  /**
   * Initialize the game tile.
   *
   * @param {Object} position - The position of the game tile.
   * @param {Number} direction - The direction the game tile is facing.
   */
  constructor ({ position = { x: 0, y: 0, z: 0 } } = {}) {
    this._position = position
  }

  updatePosition () {
    this._model.position.x = this._position.x * 10
    this._model.position.y = this._position.y * 5
    this._model.position.z = this._position.z * 10
  }

  /**
   * Get the current posiiton of the game tile.
   */
  get position () {
    return this._position
  }

  /**
   * Set the new position of the game tile and update the model's physical
   * position on the board.
   */
  set position (position) {
    this._position = position
    this.updatePosition()
  }

  /**
   * Get the current direction the game tile is facing.
   */
  get model () {
    return this._model
  }

  set model (model) {
    this._model = model

    this.updatePosition()

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
