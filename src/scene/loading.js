import Scene from './scene'
import SceneStart from './start'

class SceneLoading extends Scene {
    constructor(game) {
        super(game)

        this.w = 100
        this.h = 10
        this.loading = 0
    }

    update() {
        this.loading = Math.min(this.loading, this.w * (this.game.loadNow / this.game.loadAll))
        this.loading += 1
        if (this.loading >= this.w) this.game.scene = new SceneStart(this.game)
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

        // loading
        g.ctx.fillStyle = '#444'
        g.ctx.fillText('loading', g.w / 2, g.h / 2 - 12)
        g.ctx.strokeRect(g.w / 2 - this.w / 2 - 1, g.h / 2 - 1, this.w + 2, 12)
        g.ctx.fillRect(g.w / 2 - this.w / 2, g.h / 2, this.loading, 10)
        g.ctx.restore()
    }
}

export default SceneLoading