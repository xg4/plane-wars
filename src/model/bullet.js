import Model from './model'
import { config } from '../config'

class Bullet extends Model {
    constructor(game) {
        super(game, 'bullet')

        this.init()
    }
    init() {
        this.speed = Number(config.bullet_speed)
    }
    update() {
        this.y -= this.speed
        if (this.y < 0) {
            this.over()
        }
    }
    debug() {
        this.speed = Number(config.bullet_speed)
    }
}

export default Bullet