import Model from './model'

class Boom extends Model {
    constructor(game, model) {
        super(game, 'boom01')

        this.init(model)
    }
    init(model) {
        this.x = model.x
        this.y = model.y
        this.w = model.w
        this.h = model.h

        this.sx = 0
        this.sy = 0
    }
    draw() {
        if (this.alive) this.game.ctx.drawImage(this.me, (this.sx - this.sy * 4) * 64, this.sy * 64, 64, 64, this.x, this.y, this.w, this.h)
    }
    update() {
        this.sx++
        if (this.sx > 3) {
            this.sy = 1
            if (this.sx > 7) {
                this.sy = 2
            }
            if (this.sx > 11) {
                this.sy = 3
            }
            if (this.sx > 15) {
                this.over()
            }
        }
    }
}

export default Boom