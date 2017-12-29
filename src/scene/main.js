import Scene from './scene'
import Model from '../model/model'
import Player from '../model/player'
import Enemy from '../model/enemy'
import Cloud from '../model/cloud'
import { config } from '../config'
import { randomBetween } from '../util'
import Power from '../model/power'
import Energy from '../model/energy'
import Blood from '../model/blood'
import { setTimeout } from 'timers';

class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.setup()
    }

    setup() {
        let g = this.game

        g.registerAction('a', () => {
            this.player.moveLeft()
        })
        g.registerAction('d', () => {
            this.player.moveRight()
        })
        g.registerAction('w', () => {
            this.player.moveUp()
        })
        g.registerAction('s', () => {
            this.player.moveDown()
        })
        g.registerAction('A', () => {
            this.player.moveLeft()
        })
        g.registerAction('D', () => {
            this.player.moveRight()
        })
        g.registerAction('W', () => {
            this.player.moveUp()
        })
        g.registerAction('S', () => {
            this.player.moveDown()
        })

        this.sky = new Model(this.game, 'sky')
        this.cloud = new Cloud(this.game)
        this.addElement(this.sky)
        this.addElement(this.cloud)

        this.player = new Player(this.game)
        this.addElement(this.game.user)
        this.addElement(this.player)
        this.enemies = this.addEnemies()

        // 道具
        this.power
        this.powerTimer = randomBetween(500, 1000)
        this.energy
        this.energyTimer = randomBetween(500, 1000)
        this.blood
        this.bloodTimer = randomBetween(500, 1000)

        // 移动端
        this.game.c.ontouchstart = (ev) => {
            ev.preventDefault()
            let x = ev.touches[0].clientX
            let y = ev.touches[0].clientY
            let px = this.player.x
            let py = this.player.y
            this.game.c.ontouchmove = (ev) => {
                ev.preventDefault()
                this.player.x = px + ev.touches[0].clientX - x
                this.player.y = py + ev.touches[0].clientY - y
                if (this.player.x < 0) {
                    this.player.x = 0
                }
                if (this.player.x + this.player.w > this.game.w) {
                    this.player.x = this.game.w - this.player.w
                }
                if (this.player.y < 0) {
                    this.player.y = 0
                }
                if (this.player.y + this.player.h > this.game.h) {
                    this.player.y = this.game.h - this.player.h
                }
            }
            this.game.c.ontouchend = function () {
                ev.preventDefault()
                this.ontouchmove = null
                this.ontouchend = null
            }
        }
    }

    addEnemies() {
        let es = []
        let n = randomBetween(1, config.enemies_max_number)
        for (let i = 0; i < n; i++) {
            let e = new Enemy(this.game)
            es.push(e)
            this.addElement(e)
        }
        return es
    }

    addPower() {
        this.power = new Power(this.game)
        this.addElement(this.power)
    }
    addEnergy() {
        this.energy = new Energy(this.game)
        this.addElement(this.energy)
    }
    addBlood() {
        this.blood = new Blood(this.game)
        this.addElement(this.blood)
    }

    update() {
        super.update()

        // power
        if (this.power && this.power.alive) {
            if (this.power.collide(this.player)) {
                this.player.power()
                this.power.over()
            }
        } else {
            this.powerTimer--
            if (this.powerTimer < 0) {
                this.powerTimer = randomBetween(500, 1000)
                this.addPower()
            }
        }

        // energy
        if (this.energy && this.energy.alive) {
            if (this.energy.collide(this.player)) {
                this.player.energy()
                this.energy.over()
            }
        } else {
            this.energyTimer--
            if (this.energyTimer < 0) {
                this.energyTimer = randomBetween(500, 1000)
                this.addEnergy()
            }
        }

        // blood
        if (this.blood && this.blood.alive) {
            if (this.blood.collide(this.player)) {
                this.player.blood()
                this.blood.over()
            }
        } else {
            this.bloodTimer--
            if (this.bloodTimer < 0) {
                this.bloodTimer = randomBetween(500, 1000)
                this.addBlood()
            }
        }

        if (!this.enemies.some(e => e.alive)) {
            this.enemies = this.addEnemies()
        }

        this.enemies.forEach((e, ei) => {
            e.bullets.forEach((b) => {
                if (b.collide(this.player)) {
                    this.player.kill()
                    b.over()
                }

            })
            if (e.collide(this.player)) {
                this.player.kill()
                e.over()
            }
            this.player.bullets.forEach((b, bi) => {
                if (e.collide(b)) {
                    e.kill(b)
                    b.over()
                }
            })
        })

    }

}

export default SceneMain