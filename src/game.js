import SenenLoading from './scene/loading'
import { loadImg } from './util'
import { setTimeout } from 'timers';
import { config } from './config'
import { images } from './image'
import User from './user'

class Game {
    constructor() {
        this.version = config.game_version

        this.c = document.querySelector(config.el)
        this.ctx = this.c.getContext('2d')

        this.c.width = config.width
        this.c.height = config.height

        this.w = this.c.width
        this.h = this.c.height

        this.fps = Number(config.fps)
        this.testFps = 0
        this.realFps = 0

        this.user = new User(this)
        this.scene = new SenenLoading(this) // 开始场景

        this.model = images

        this.actions = {}
        this.keydowns = {}

        // for debug
        this.enableDebug = config.enableDebug
        this.pause = config.game_pause

        //loading
        this.loadNow = 0
        this.loadAll = Object.keys(this.model).length

        this.init()
    }

    init() {
        let x = this

        window.addEventListener('keydown', e => {
            x.keydowns[e.key] = true
        })

        window.addEventListener('keyup', e => {
            x.keydowns[e.key] = false
        })

        setInterval(() => {
            x.realFps = x.testFps
            x.testFps = 0
        }, 1000)

        x.run()
        loadImg(x)
        // 加载资源
        // let loading = loadImg(x)
        // Promise.all(loading).then(function () {
        //     x.scene = new SenenMain(x)
        // })
    }

    run() {
        let x = this
        const runloop = () => {
            // for debug
            if (x.enableDebug) {
                x.debug()
                x.scene.elements.forEach(e => {
                    e && e.debug && e.debug()
                })
                if (this.pause) {
                    return false
                }
            }

            for (let key in x.actions) {
                if (x.keydowns[key]) {
                    x.actions[key]()
                }
            }
            x.testFps++

            // update
            x.update()

            x.ctx.clearRect(0, 0, x.w, x.h)

            //draw
            x.draw()

            // 显示 fps
            x.drawFps()

            setTimeout(() => {
                runloop()
            }, 1000 / x.fps)
        }

        setTimeout(() => {
            runloop()
        }, 1000 / x.fps)
    }

    draw() {
        if (!this.scene) return false
        this.scene.draw()
    }

    update() {
        if (!this.scene) return false
        this.scene.update()
    }

    replaceScene(scene) {
        this.scene = scene
    }

    drawModel(model) {
        this.ctx.drawImage(model.me, model.x, model.y)
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    debug() {
        this.fps = Number(config.fps)
        this.pause = Boolean(config.game_pause)
    }

    getModelByName(name) {
        return this.model[name]
    }
    drawVersion() {
        let g = this
        g.ctx.save()
        g.ctx.font = '15px sans-serif'
        g.ctx.fillStyle = '#000'
        g.ctx.textAlign = "center"
        g.ctx.textBaseline = "middle"
        g.ctx.fillText('作者：XR', g.w / 2, g.h / 2 - 155)
        g.ctx.fillText('鸣谢：ZY ZXC LWJ', g.w / 2, g.h / 2 - 125)
        g.ctx.fillText(`version: ${g.version}`, g.w / 2, g.h / 2 - 95)
        g.ctx.restore()
    }
    drawFps() {
        let x = this
        x.ctx.save()
        x.ctx.fillStyle = '#fff'
        x.ctx.textBaseline = "top"
        x.ctx.textAlign = "end"
        x.ctx.fillText(`${x.realFps} FPS`, x.w, 0)
        x.ctx.restore()
    }

}

export default Game