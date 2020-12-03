const app = document.getElementById('app')
const element_dummy = document.querySelector('.element')
const distance = 150;
const canvas = document.getElementById('canvas');
const modalWrapper = document.getElementById('modal-wrapper')
const ctx = canvas.getContext('2d')
let lines = []
initCanvas()

let elements = [
    {
        x: document.body.clientWidth / 2,
        y: document.body.clientHeight / 2,
        content: {
            text: '',
            connectedNumbers: []
        }
    }
];

// Draw
elements.forEach((element,index) => {
    let newEl = drawElement(element)
    app.appendChild(newEl)
});

/**
 * Draw and create an element
 * @param {Object} element
 */
function drawElement(element) {
    let temp = element_dummy.cloneNode(true);
    temp.style.top = `${element.y}px`
    temp.style.left = `${element.x}px`
    temp.style.display = 'flex';

    element.element = temp;
    return temp;
}

/**
 * Draw and create line element
 * @param {Object} element
 */
function drawLine(line) {

    let fromRect = line.from.element.getBoundingClientRect();
    let toRect = line.to.element.getBoundingClientRect();
    let fromLocation, toLocation;

    if(line.from.number == 1) fromLocation = {x: fromRect.x + fromRect.width/2, y: fromRect.y}
    else if(line.from.number == 2) fromLocation = {x: fromRect.x + fromRect.width, y: fromRect.y + fromRect.height/2}
    else if(line.from.number == 3) fromLocation = {x: fromRect.x + fromRect.width/2, y: fromRect.y + fromRect.height}
    else if(line.from.number == 4) fromLocation = {x: fromRect.x, y: fromRect.y + fromRect.height/2}

    if(line.to.number == 1) toLocation = {x: toRect.x + toRect.width/2, y: toRect.y}
    else if(line.to.number == 2) toLocation = {x: toRect.x + toRect.width, y: toRect.y + toRect.height/2}
    else if(line.to.number == 3) toLocation = {x: toRect.x + toRect.width/2, y: toRect.y + toRect.height}
    else if(line.to.number == 4) toLocation = {x: toRect.x, y: toRect.y + toRect.height/2}

    ctx.strokeStyle = "#000"
    ctx.beginPath();
    ctx.moveTo(fromLocation.x, fromLocation.y);
    ctx.lineTo(toLocation.x, toLocation.y);
    ctx.stroke()
}


function newElement(event, element) {
    let numberClicked = event.target.getAttribute('data-number');
    let elementLocation = element.getBoundingClientRect();
    let connectedNumber, createElementLocation;

    

    if(numberClicked == 1) {
        connectedNumber = 3;
        createElementLocation = {
            x: elementLocation.x + elementLocation.width/2,
            y: elementLocation.y - distance
        }        
    }else if(numberClicked == 2) {
        connectedNumber = 4;
        createElementLocation = {
            x: elementLocation.x + elementLocation.width + distance,
            y: elementLocation.y + elementLocation.height/2
        }        
    }else if(numberClicked == 3) {
        connectedNumber = 1;
        createElementLocation = {
            x: elementLocation.x + elementLocation.width/2,
            y: elementLocation.y + elementLocation.height + distance
        }        
    }else if(numberClicked == 4) {
        connectedNumber = 2;
        createElementLocation = {
            x: elementLocation.x - distance,
            y: elementLocation.y + elementLocation.height/2
        }        
    }
    
    createElementLocation.content = {
        text: '',
        connectedNumbers: [
            {
                number: numberClicked,
                buttonText: ''
            }
        ]
    };
    let createdElement = createElement(createElementLocation);
    createLine({
        from: {
            element,
            number: numberClicked
        },
        to: {
            element: createdElement,
            number: connectedNumber,
        }   
    });
    elements[elements.length-2].content.connectedNumbers.push({
        number: connectedNumber,
        buttonText: ''
    })

}

/**
 * Create Element Callback
 * @param Element el 
 */
function createElement(el) {
    elements.push({
        x: el.x,
        y: el.y,
        content: el.content
    });
    let newEl = drawElement(el)
    newEl.setAttribute("id", `element-${countElement()}`);
    app.appendChild(newEl)

    let numbers = newEl.querySelectorAll('.number');
    let edit = newEl.querySelector('.edit');
    edit.addEventListener("click", (e) => {
        editContent(e, elements.length-1);
    });
    numbers.forEach((number) => {
        number.addEventListener('click', (e) => newElement(e, newEl));
    });

    return newEl;
}
function createLine(line) {
    lines.push(line);
    drawLine(line)
}

function countElement() {
    return document.querySelectorAll(".element").length
}

/**
 * Edit Content Callback
 * @param {Event} event 
 * @param {Number} index  
 */
function editContent(event, index) {
    modalWrapper.style.display = "flex";
}

/**
 * Create initial settings for canvas
 */
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
document.querySelectorAll('.element').forEach((element,index) => {
    let numbers = element.querySelectorAll('.number');
    let edit = element.querySelector(".edit");

    edit.addEventListener("click", (e) => {
        editContent(e, index);
    });
    numbers.forEach((number) => {
        number.addEventListener('click', (e) => newElement(e, element));
    });
})
document.querySelector(".close").addEventListener('click', () => {
    modalWrapper.style.display = 'none';
})