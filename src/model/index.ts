import Game from '../index'

export default class Model {
  private power: number
  private x: number
  private y: number
  private hp: number

  // get width() {}

  // get height() {}

  get alive() {
    return this.hp > 0
  }

  constructor(private game: Game) {
    this.x = 0
    this.y = 0

    this.hp = 1
    this.power = 1
  }

  public render() {
    // this.game.renderModel(this)
  }

  public update() {
    // TODO:
  }
}
