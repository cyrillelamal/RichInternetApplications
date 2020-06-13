const [WITH, HEIGHT] = [600, 240]


const makeCanvas = async (x, y) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.setAttribute('width', x)
    canvas.setAttribute('height', y)

    return {canvas, ctx}
}

const drawRates = async (ctx, dimensions, rates) => {
    // const {width, height} = canvas.getBoundingClientRect()
    const [width, height] = dimensions
    const len = rates.length
    const blockWidth = Math.floor(width / len)

    const max = rates.reduce((acc, c) => acc['sell'] < c['sell'] ? c : acc)

    const percentages = rates.map(rate => {
        const obj = JSON.parse(JSON.stringify(rate))
        obj.percentage = obj['sell'] / max['sell']
        return obj
    })

    let x = 0

    ctx.fillStyle = 'red'
    percentages.forEach(rate => {
        const blockHeight = Math.floor(height * rate.percentage)
        const y = height - blockHeight
        const endX = x + blockWidth

        ctx.rect(x, y, blockWidth, blockHeight)
        ctx.fill()

        x = endX
    })
    ctx.stroke()

    x = 0

    ctx.textAlign = 'center'
    ctx.font = 'normal bold 14px sans-serif'
    rates.forEach(rate => {
        const txt = rate.name

        console.log(x + blockWidth / 2, txt)

        ctx.fillStyle = 'blue'
        ctx.fillText(txt, Math.floor(x + blockWidth / 2), height - 10)

        x += blockWidth
    })
}

const main = async () => {
    const {canvas, ctx} = await makeCanvas(WITH, HEIGHT)

    await document.body.appendChild(canvas)

    const rates = await fetch('https://kodaktor.ru/j/rates').then(x => x.json())

    await drawRates(ctx, [WITH, HEIGHT], rates)
}


document.addEventListener('DOMContentLoaded', main)
