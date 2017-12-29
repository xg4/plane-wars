import Model from './model'
import { config } from '../config'

class Cover extends Model {
    constructor(game, player) {
        super(game, 'cover')
        this.player = player
        this.init()
    }
    init() {
        this.angle = 0
        this.i = 10
        this.x = this.player.x - this.i
        this.y = this.player.y - this.i
        this.w = this.player.w + (2 * this.i)
        this.h = this.player.h + (2 * this.i)
        this.centerPoint = { x: this.x + this.w / 2, y: this.y + this.h / 2 }
    }
    draw() {
        let ctx = this.game.ctx
        ctx.save()
        ctx.translate(this.centerPoint.x, this.centerPoint.y)
        ctx.rotate(this.angle)
        ctx.translate(-this.centerPoint.x, -this.centerPoint.y)
        ctx.drawImage(this.me, this.x, this.y, this.w, this.h)
        ctx.restore()
    }
    update() {
        this.x = this.player.x - this.i
        this.y = this.player.y - this.i
        this.centerPoint = { x: this.x + this.w / 2, y: this.y + this.h / 2 }
        this.angle++
    }
}

export default Cover