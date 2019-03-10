import raf from 'raf'
import { version } from '../package.json'
import { query } from './util'
export interface GameOptions {
  el?: string | HTMLCanvasElement
  width?: number
  height?: number
}
export default class Game {
  public static version = version
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private level: number
  private stages: any[]

  set width(value) {
    this.canvas.width = value
  }

  get width() {
    return this.canvas.width
  }

  set height(value) {
    this.canvas.height = value
  }

  get height() {
    return this.canvas.height
  }

  get stage() {
    return this.stages[this.level]
  }

  constructor({ el, width, height }: GameOptions = {}) {
    this.canvas = query(el)
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

    this.width = width === undefined ? 300 : width
    this.height = height === undefined ? 150 : height

    this.level = 0
    this.stages = []
    this.run()
  }

  private run(now: number = 0, prev: number = 0) {
    const diff = now - prev
    const fps = diff ? Math.round(1000 / diff) : 0
    this.update()
    this.clean()
    this.renderFPS(fps)
    this.renderVersion()
    this.render()

    raf((timestamp) => {
      this.run(timestamp, now)
    })
  }

  private clean() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  private render() {
    if (!this.stage) {
      return
    }
    this.stage.render()
  }

  private update() {
    if (!this.stage) {
      return
    }
    this.stage.update()
  }

  private pass() {
    this.level++
  }

  private renderVersion() {
    const { context: ctx } = this
    ctx.save()
    ctx.font = '15px sans-serif'
    ctx.fillStyle = '#000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`version: ${Game.version}`, this.width / 2, this.height / 2)
    ctx.restore()
  }

  private renderFPS(fps?: number) {
    if (!fps) {
      return
    }

    const { context: ctx } = this
    ctx.save()
    ctx.fillStyle = '#000'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'end'
    ctx.fillText(`${fps} FPS`, this.width, 0)
    ctx.restore()
  }
}
