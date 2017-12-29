import Model from './model'
import { config } from '../config'
import { collide } from '../util'

class EnemyBullet extends Model {
    constructor(game) {
        super(game, 'enemyBullet')

        this.init()
    }
    init() {
        this.speed = Number(config.enemy_bullet_speed)
    }
    update() {
        this.y += this.speed
        if (this.y > this.game.h) {
            this.over()
        }
    }
    debug() {
        this.speed = Number(config.enemy_bullet_speed)
    }
    collide(model) {
        if (model.God) return false
        if (this.alive) {
            if (model.alive) {
                return collide(this, model)
            }
            return false
        }
        return false
    }
}

export default EnemyBullet