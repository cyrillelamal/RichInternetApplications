// Total price
let total = 0;
// limit price
const LIMIT = 1000;

let bufferPrice = null;
let bufferItem = null;

const goods = document.querySelectorAll('div .card');

const totalDiv = document.getElementById('total'); // total output
const dropZone = document.querySelector('.jumbotron');

totalDiv.textContent = total;
goods.forEach(item => {

    item.setAttribute('draggable', true);

    // Define the drag's data
    item.addEventListener('dragstart', e => {
        bufferPrice = e.target.dataset.price;
        bufferItem = e.target.innerHTML;
        // e.dataTransfer.setData('text/plain', e.target.dataset.price); // price
    });
});

dropZone.addEventListener('dragover', e => e.preventDefault());
dropZone.addEventListener('drop', () => {
    if (total + Number(bufferPrice) > LIMIT) {
        document.getElementById('limit-waring').style = '';
        return
    }
    total += Number(bufferPrice);
    totalDiv.textContent = total;

    let div = document.createElement('div');
    div.textContent = bufferItem;
    div.setAttribute('class', 'card m-2');
    dropZone.appendChild(div);
});

document.getElementById('reset-total').addEventListener('click', () => {
    total = 0;
    totalDiv.textContent = 0;
    dropZone.innerHTML = '';
    document.getElementById('limit-waring').style = 'display: none';
});
