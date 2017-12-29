import Scene from './scene'
import SceneStart from './start'
import User from '../user'

class SceneEnd extends Scene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.game.registerAction('q', () => {
            this.game.user = new User(this.game)
            this.game.scene = new SceneStart(this.game)
        })
        this.game.c.ontouchstart = () => {
            this.game.user = new User(this.game)
            this.game.scene = new SceneStart(this.game)
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
        g.ctx.save()
        g.ctx.font = '30px sans-serif'
        // if (this.game.user.score > 100000) {
        //     g.ctx.fillText(`哇！您的积分：${this.game.user.score}`, g.w / 2, g.h / 2 - 60)
        //     g.ctx.fillText(`您简直是个疯子`, g.w / 2, g.h / 2 - 30)
        // } else if (this.game.user.score < 10000) {
        //     g.ctx.fillText(`您的积分才${this.game.user.score}`, g.w / 2, g.h / 2 - 60)
        //     g.ctx.fillText(`骚年加油啊！`, g.w / 2, g.h / 2 - 30)
        // } else {
        //     g.ctx.fillText(`您的积分：${this.game.user.score}`, g.w / 2, g.h / 2 - 60)
        // }
        g.ctx.fillText(`您的积分：${this.game.user.score}`, g.w / 2, g.h / 2 - 60)
        g.ctx.restore()
        g.ctx.fillText('按 q 返回', g.w / 2, g.h / 2)
        g.ctx.fillText('Game Over', g.w / 2, g.h / 2 + 15)
        g.ctx.fillText('移动端', g.w / 2, g.h / 2 + 30)
        g.ctx.fillText('点击屏幕重新开始游戏', g.w / 2, g.h / 2 + 45)
        g.ctx.restore()
    }
}

export default SceneEnd