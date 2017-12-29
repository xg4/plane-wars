const loadImg = function (obj) {
    let images = obj.model
    let img_read = []
    let index = 1
    for (let name in images) {
        let img = new Image()
        img.src = images[name]
        img_read.push(new Promise(function (resolve, reject) {
            img.onload = function () {
                images[name] = img
                obj.loadNow = index++
                resolve()
            }
        }))
    }
    return img_read
}

const randomBetween = function (start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

const collide = function (a, b) {
    if ((a.x + a.w) <= b.x || (b.x + b.w) <= a.x || (a.y + a.h) <= b.y || (b.y + b.h) <= a.y) {
        return false
    }
    return true
}

export { loadImg, randomBetween, collide }