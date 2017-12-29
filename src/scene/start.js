import Scene from './scene'
import SceneMain from './main'

class SceneStart extends Scene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.game.registerAction('k', () => {
            this.game.scene = new SceneMain(this.game)
        })
        this.game.c.ontouchstart = () => {
            this.game.scene = new SceneMain(this.game)
        }
    }
    update() {

    }
    draw() {   
        this.game.drawVersion()

        this.tooltip()
    }
    tooltip() {
        let g = this.game
        g.ctx.save()
        g.ctx.font = '15px sans-serif'
        g.ctx.fillStyle = '#000'
        g.ctx.textAlign = "center"
        g.ctx.textBaseline = "middle"

        g.ctx.fillText('按 k 开始游戏！', g.w / 2, g.h / 2)
        g.ctx.fillText('移动端', g.w / 2, g.h / 2 + 30)
        g.ctx.fillText('点击屏幕开始游戏', g.w / 2, g.h / 2 + 45)
        g.ctx.fillText('无法启动DEBUG功能', g.w / 2, g.h / 2 + 60)
        g.ctx.restore()
    }
}

export default SceneStart