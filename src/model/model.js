class Model {
    constructor(game, name) {
        this.game = game
        this.me = this.game.getModelByName(name)
        this.x = 0
        this.y = 0

        this.w = this.me.width
        this.h = this.me.height

        this.alive = true
        this.hurt = 1
    }

    draw() {
        if (this.alive) {
            this.game.drawModel(this)
        }
    }

    update() {

    }
    
    over() {
        this.alive = false
    }
}

export default Model