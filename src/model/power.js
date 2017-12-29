import Model from './model'
import { config } from '../config'
import { randomBetween, collide } from '../util'

class Power extends Model {
    constructor(game) {
        super(game, 'power')

        this.init()
    }
    init() {
        this.speedX = randomBetween(2, 5)
        this.speedY = randomBetween(2, 5)
        this.x = randomBetween(0, this.game.w - this.w)
        this.y = -randomBetween(this.h, 200)
        this.w = 50
        this.h = 50
    }

    draw() {
        this.game.ctx.drawImage(this.me, this.x, this.y, this.w, this.h)
    }

    update() {
        if (this.x + this.w > this.game.w) {
            this.speedX *= -1
        }
        if (this.x < 0) {
            this.speedX *= -1
        }
        this.x += this.speedX
        this.y += this.speedY
        if (this.y > this.game.h) {
            this.over()
        }

    }

    collide(model) {
        if (this.alive) {
            if (model.alive) {
                return collide(this, model)
            }
            return false
        }
        return false
    }
}

export default Power