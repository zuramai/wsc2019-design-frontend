const app = document.getElementById('app')
const element_dummy = document.querySelector('.element')
const distance = 150;
const canvas = document.getElementById('canvas');

let lines = []
initCanvas()

let elements = [
    {
        x: document.body.clientWidth / 2,
        y: document.body.clientHeight / 2,
    }
];

// Draw
elements.forEach((element,index) => {
    let newEl = drawElement(element)
    app.appendChild(newEl)
});
lines.forEach((line,index) => {
    let newLine = drawLine(line)
    app.appendChild(newLine)
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

    let lineWrapper = document.createElement('div');
    lineWrapper.classList.add("line-wrapper");
    
    let newLine = document.createElement('div')
    newLine.classList.add("line");
    
    let fromElementLocation = line.from.element.getBoundingClientRect();
    let toElementLocation = line.to.element.getBoundingClientRect();

    console.log(fromElementLocation, toElementLocation)
    let from,to;
        console.log(line)
    if(line.from.number == 1) from = { x: fromElementLocation.x +fromElementLocation.width/2 , y: toElementLocation.y + toElementLocation.height }
    else if(line.from.number == 2) from = { x: fromElementLocation.x + fromElementLocation.width, y: fromElementLocation.y + fromElementLocation.height/2 }
    else if(line.from.number == 3) from = { x: fromElementLocation.x + fromElementLocation.width/2, y: fromElementLocation.y + fromElementLocation.height }
    else from = { x: toElementLocation.x + toElementLocation.width, y: fromElementLocation.y + fromElementLocation.height/2 }
 
    if(line.to.number == 1) to = { x: toElementLocation.x, y: toElementLocation.y }
    else if(line.to.number == 2) to = { x: fromElementLocation.x, y: toElementLocation.y }
    else if(line.to.number == 3) to = { x: toElementLocation.x + toElementLocation.width/2, y: toElementLocation.y + toElementLocation.height/2-10 }
    else to = { x: toElementLocation.x, y: toElementLocation.y }

    console.log(line)

    if(["1",'3'].includes(line.from.number)) {
        lineWrapper.style.height = Math.abs(to.y - from.y)+'px';
        lineWrapper.classList.add("vertical")
    }else{
        lineWrapper.style.width = Math.abs(to.x - from.x)+'px';
        lineWrapper.classList.add("horizontal")
    }
    lineWrapper.style.top = from.y+'px';
    lineWrapper.style.left = from.x+'px';


    lineWrapper.appendChild(newLine)

    return lineWrapper;
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
}

/**
 * Create Element Callback
 * @param Element el 
 */
function createElement(el) {
    elements.push({
        x: el.x,
        y: el.y
    });
    let newEl = drawElement(el)
    newEl.setAttribute("id", `element-${countElement()}`);
    app.appendChild(newEl)

    let numbers = newEl.querySelectorAll('.number');
    numbers.forEach((number) => {
        number.addEventListener('click', (e) => newElement(e, newEl));
    });

    return newEl;
}
function createLine(line) {
    lines.push(line);
    let newLine = drawLine(line);
    app.appendChild(newLine)
}

function countElement() {
    return document.querySelectorAll(".element").length
}

function editContent(event, index) {
    console.log('edit content')
}

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}