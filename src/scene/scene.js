class Scene {
    constructor(game) {
        this.game = game
        this.elements = []

        this.init()
    }

    init() {
        this.game.actions = {}
        this.game.c.ontouchstart = null
    }

    addElement(model) {
        this.elements.push(model)
    }

    update() {
        this.elements.forEach((model, i, es) => {
            if (model && !model.alive) es.splice(i, 1)
            model && model.update()
        })
    }

    draw() {
        this.elements.forEach(model => {
            model && model.draw()
        })
    }

}
export default Scene