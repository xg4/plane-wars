class User {
    constructor(game) {
        this.game = game
        this.init()
    }
    init() {
        this.hp = 3
        this.score = 0
        this.alive = true
        this.wait = 0
        this.waitLimit = 300
    }
    addBlood() {
        this.hp++
        this.hp = this.hp > 3 ? 3 : this.hp
    }
    kill() {
        this.hp--
    }
    over() {
        if (this.hp < 1) return true
        return false
    }
    addScore() {
        this.score += 100
    }
    draw() {
        this.game.ctx.save()
        this.game.ctx.font = '15px sans-serif'
        this.game.ctx.fillStyle = '#fff'
        this.game.ctx.textBaseline = "bottom"
        this.game.ctx.textAlign = "start"
        this.game.ctx.fillText(`积分：${this.score}`, 0, this.game.h)
        this.game.ctx.restore()

        let h = this.game.getModelByName('heart')
        for (let i = 0; i < this.hp; i++) {
            this.game.ctx.drawImage(h, this.game.w - (h.width * (i + 1)), this.game.h - h.height)
        }
    }
    update() {
        if (this.wait > 0) {
            this.wait--
        }
    }
}

export default User