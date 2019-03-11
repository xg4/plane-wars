export function query(el?: string | HTMLCanvasElement): HTMLCanvasElement {
  if (!el) {
    return createCanvas()
  }
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected || selected.tagName !== 'CANVAS') {
      return createCanvas()
    }
    return selected as HTMLCanvasElement
  } else {
    return el
  }
}

function createCanvas() {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  return canvas
}
