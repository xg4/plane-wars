import Model from './model'
import Bullet from './bullet'
import Cover from './cover'
import { config } from '../config'
import Boom from '../model/boom'
import SceneEnd from '../scene/end'
import { setTimeout } from 'timers'

class Player extends Model {
    constructor(game) {
        super(game, 'player')

        this.God = config.player_God
        this.init()
    }
    init() {
        this.x = this.game.w / 2 - this.w / 2
        this.y = this.game.h - this.h

        this.speed = Number(config.player_speed)

        this.bulletLevel = 1
        this.bullet = Bullet
        this.bullets = []
        this.cooldown = 0
        this.cooldownLimit = Number(config.fire_cooldown)


        this.cover
        this.coverTime = 0
        this.coverLimit = 300
    }
    update() {

        if (this.coverTime > 0) {
            this.coverTime--
        }

        if (this.coverTime < 10) {
            if (this.cover) {
                this.cover.over()
            }
        }

        if (this.cooldown > 0) {
            this.cooldown--
        }
        if (config.player_auto) {
            this.fire()
        }
        this.bullets.forEach((b, i, bs) => {
            if (!b.alive) bs.splice(i, 1)
        })
    }
    debug() {
        this.speed = Number(config.player_speed)
        this.cooldownLimit = Number(config.fire_cooldown)
        this.God = config.player_God
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = this.cooldownLimit
            if (this.bulletLevel == 1) {
                let b = new this.bullet(this.game)
                b.x = this.x + (this.w / 2) - (b.w / 2)
                b.y = this.y - b.h
                this.bullets.push(b)
                this.game.scene.addElement(b)
            }
            if (this.bulletLevel == 2) {
                let a = new this.bullet(this.game)
                a.x = this.x + (this.w / 2) - a.w
                a.y = this.y - a.h
                let b = new this.bullet(this.game)
                b.x = this.x + (this.w / 2)
                b.y = this.y - b.h
                this.bullets.push(a)
                this.game.scene.addElement(a)
                this.bullets.push(b)
                this.game.scene.addElement(b)
            }
            if (this.bulletLevel == 3) {
                let a = new this.bullet(this.game)
                a.x = this.x + (this.w / 2) - (a.w / 2) - a.w
                a.y = this.y - a.h
                let b = new this.bullet(this.game)
                b.x = this.x + (this.w / 2) - (b.w / 2)
                b.y = this.y - b.h
                let c = new this.bullet(this.game)
                c.x = this.x + (this.w / 2) - (c.w / 2) + c.w
                c.y = this.y - c.h
                this.bullets.push(a)
                this.bullets.push(b)
                this.bullets.push(c)
                this.game.scene.addElement(a)
                this.game.scene.addElement(b)
                this.game.scene.addElement(c)
            }
            if (this.bulletLevel == 4) {
                let a = new this.bullet(this.game)
                a.x = this.x + (this.w / 2) - a.w
                a.y = this.y - a.h
                let b = new this.bullet(this.game)
                b.x = this.x + (this.w / 2)
                b.y = this.y - b.h
                let c = new this.bullet(this.game)
                c.x = this.x + (this.w / 2) - c.w - c.w
                c.y = this.y - c.h
                let d = new this.bullet(this.game)
                d.x = this.x + (this.w / 2) + d.w
                d.y = this.y - d.h
                this.bullets.push(a)                
                this.bullets.push(b)
                this.bullets.push(c)                
                this.bullets.push(d)
                this.game.scene.addElement(a)
                this.game.scene.addElement(b)
                this.game.scene.addElement(c)
                this.game.scene.addElement(d)
            }
        }
    }
    power() {
        this.bulletLevel++
        this.bulletLevel = this.bulletLevel > 4 ? 4 : this.bulletLevel
    }
    energy() {
        this.coverTime = this.coverLimit
        this.addCover()
    }
    blood() {
        this.game.user.addBlood()
    }
    addCover() {
        this.cover && this.cover.over()
        this.cover = new Cover(this.game, this)
        this.game.scene.addElement(this.cover)
    }
    over() {
        this.alive = false
        this.game.scene.addElement(new Boom(this.game, this))
    }
    kill() {
        if (this.coverTime == 0) {
            this.coverTime = this.coverLimit
            this.game.user.kill()
            if (this.game.user.over()) {
                this.over()
                setTimeout(() => {
                    this.game.scene = new SceneEnd(this.game)
                }, 1000 * 1.5)
            } else {
                this.bulletLevel = 1
                this.addCover()
            }
        }
    }
    moveX(x) {
        if (x < 0) {
            x = 0
        }
        if (x + this.w > this.game.w) {
            x = this.game.w - this.w
        }
        this.x = x
    }
    moveY(y) {
        if (y < 0) {
            y = 0
        }
        if (y + this.h > this.game.h) {
            y = this.game.h - this.h
        }
        this.y = y
    }
    moveRight() {
        this.moveX(this.x + this.speed)
    }
    moveLeft() {
        this.moveX(this.x - this.speed)
    }
    moveUp() {
        this.moveY(this.y - this.speed)
    }
    moveDown() {
        this.moveY(this.y + this.speed)
    }
}

export default Player