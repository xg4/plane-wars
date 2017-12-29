import Model from './model'
import { config } from '../config'
import { randomBetween, collide } from '../util'
import Boom from '../model/boom'
import EnemyBullet from '../model/enemyBullet'

class Enemy extends Model {
    constructor(game) {
        let level = randomBetween(0, 4)
        let name = `enemy${level}`
        super(game, name)
        this.level = level

        this.init()
    }
    init() {
        this.hp = this.level + 1
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, this.game.w - this.w)
        this.y = -randomBetween(this.h, 200)

        this.bullet = EnemyBullet
        this.bullets = []
        this.cooldown = 0
        this.cooldownLimit = Number(config.enemy_fire_cooldown)
    }

    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
        this.y += this.speed
        if (this.y > this.game.h) {
            this.over()
        }
        this.fire()
        this.bullets.forEach((b, i, bs) => {
            if (!b.alive) bs.splice(i, 1)
        })
    }

    fire() {
        if (this.cooldown == 0) {
            this.cooldown = this.cooldownLimit
            let b = new this.bullet(this.game)
            b.x = this.x + (this.w / 2) - (b.w / 2)
            b.y = this.y + this.h
            this.bullets.push(b)
            this.game.scene.addElement(b)
        }
    }

    kill(model) {
        this.hp -= model.hurt
        if (this.hp < 1) {
            this.game.user.addScore()
            this.over()
            this.game.scene.addElement(new Boom(this.game, this))
        }
    }

    debug() {
        this.speed = Number(config.enemy_speed)
        this.cooldownLimit = Number(config.enemy_fire_cooldown)
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

export default Enemy