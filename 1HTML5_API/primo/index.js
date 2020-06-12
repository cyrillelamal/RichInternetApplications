const inputs = (type) => document.querySelectorAll(`input[type="${type}"]`)

const zip = (arr1, arr2) => arr1.map((e, i) => [e, arr2[i]])

const colorRGB = (r, g, b) => `rgb(${r}, ${g}, ${b})`

zip([...inputs('number')], [...inputs('range')])
    .forEach(([n, r]) => {
        n.addEventListener('change', () => {
            r.value = n.value
            document.body.style.backgroundColor = colorRGB(
                ...([...inputs('number')]).map(i => i.value)
            )
        })

        r.addEventListener('change', () => {
            n.value = r.value
            document.body.style.backgroundColor = colorRGB(
                ...([...inputs('range')]).map(i => i.value)
            )
        })
    })
