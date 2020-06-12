const makeCanvas = (x, y) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.setAttribute('width', x)
    canvas.setAttribute('height', y)

    return {canvas, ctx}
}

const write = (string, ctx, start, end, interval) => {
    const len = string.length
    const letters = string.split('')

    let [x, y] = start

    const letterWidth = Math.floor((end[0] - start[0] - (interval * len - 1)) / len)
    const letterHeight = end[1] - start[1]

    letters.forEach(letter => {
        if (map.has(letter)) {
            const endX = x + letterWidth
            const endY = y + letterHeight

            map.get(letter)(ctx, [x, y], [endX, endY])
            map.get('')(ctx, [endX + interval, endY])

            x = endX + interval
        }
    })
}

let map = new Map()
map.set('', (ctx, end) => {
    ctx.moveTo(...end)
})
map.set('К', (ctx, start, end) => {
    const [x, y] = start
    const [endX, endY] = end
    const mid = Math.floor((endY - y) / 2)

    ctx.beginPath()

    ctx.moveTo(x, y)
    ctx.lineTo(x, endY)

    ctx.moveTo(x, mid)
    ctx.lineTo(endX, y)

    ctx.moveTo(x, mid)
    ctx.lineTo(endX, mid)

    ctx.lineTo(endX, endY)

    ctx.stroke()
})
map.set('И', (ctx, start, end) => {
    const [x, y] = start
    const [endX, endY] = end
    const mid = Math.floor((endY - y) / 2)

    ctx.beginPath()

    ctx.moveTo(x, y)
    ctx.lineTo(x, endY)

    ctx.moveTo(x, mid)
    ctx.lineTo(endX, y)

    ctx.moveTo(endX, y)
    ctx.lineTo(endX, endY)

    ctx.stroke()
})
map.set('Р', (ctx, start, end) => {
    const [x, y] = start
    const [endX, endY] = end
    const mid = Math.floor((endY - y) / 2)

    ctx.beginPath()

    ctx.moveTo(x, y)
    ctx.lineTo(x, endY)

    ctx.moveTo(x, y)
    ctx.lineTo(endX, y)

    ctx.moveTo(endX, y)
    ctx.lineTo(endX, mid)

    ctx.moveTo(endX, mid)
    ctx.lineTo(x, mid)

    ctx.stroke()
})
map.set('Л', (ctx, start, end) => {
    const [x, y] = start
    const [endX, endY] = end
    const mid = Math.floor((endY - y) / 2)

    ctx.beginPath()

    ctx.moveTo(x, endY)
    ctx.lineTo(x, mid)

    ctx.lineTo(endX, y)

    ctx.lineTo(endX, endY)

    ctx.stroke()
})

const arc = (ctx, center) => {
    const [x, y] = center

    const ray = 80
    const angle = radians(0)
    const finalAngle = radians(180)

    ctx.beginPath()


    ctx.arc(x, y, ray, angle, finalAngle, false)

    ctx.stroke()
}

const radians = (deg) => Math.PI / 180 * deg


// main
const {canvas, ctx} = makeCanvas(500, 500)

document.body.appendChild(canvas);

ctx.strokeStyle = 'blue'
write('КИРИЛЛ', ctx, [80, 10], [220, 50], 4)

ctx.strokeStyle = 'red'
arc(ctx, [150, 50])

ctx.save()

ctx.rotate(radians(40))

ctx.strokeStyle = 'blue'
write('КИРИЛЛ', ctx, [10, 10], [290, 80], 10)

ctx.strokeStyle = 'red'
arc(ctx, [150, 80])

ctx.restore()
