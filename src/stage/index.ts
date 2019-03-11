import Game from '../index'
import Model from '../model'

export default class Stage {
  private elements: Model[]

  constructor(private game: Game) {
    this.elements = []
  }

  public addElements(model: Model | Model[]) {
    const modelArr = (Array.isArray(model) ? model : [model]) as Model[]
    this.elements.push(...modelArr)
  }

  public update() {
    this.elements.forEach((model, index, elements) => {
      if (model.alive) {
        model.update()
      } else {
        elements.splice(index, 1)
      }
    })
  }

  public render() {
    this.elements.forEach((model) => {
      model.render()
    })
  }
}
