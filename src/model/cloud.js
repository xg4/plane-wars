import Model from './model'
import { config } from '../config'
import { randomBetween } from '../util'

class Cloud extends Model {
    constructor(game) {
        super(game, 'cloud')

        this.init()
    }
    init() {
        this.speed = Number(config.cloud_speed)
        this.x = randomBetween(0, this.game.w - this.w)
        this.y = -randomBetween(0, this.h)
    }
    update() {
        this.y += this.speed
        if (this.y > this.game.h) {
            this.init()
        }
    }
    debug() {
        this.speed = Number(config.cloud_speed)
    }
}

export default Cloud