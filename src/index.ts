export interface GameOptions {
  el: HTMLCanvasElement
}
export default class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  get width() {
    return this.canvas.width
  }

  get height() {
    return this.canvas.height
  }

  constructor({ el }: GameOptions) {
    this.canvas = el
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }
}
