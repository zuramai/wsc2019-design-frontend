const app = document.getElementById('app')
let element_dummy = document.getElementById('element-wrapper')
const distance = 150;
let lines = []

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
 * Draw and create a line
 * @param {Object} element
 */
function drawLine(line) {
    let newLine = document.createElement('div');
    newLine.classList.add("line");
    
    let fromElementLocation = line.from.element.getBoundingClientRect();
    let toElementLocation = line.to.element.getBoundingClientRect();

    console.log(fromElementLocation, toElementLocation)
    let from,to;
    
    if(line.from.number == 1) from = { x: fromElementLocation.x, y: fromElementLocation.y }
    else if(line.from.number == 2) from = { x: fromElementLocation.x + fromElementLocation.width, y: fromElementLocation.y + fromElementLocation.height/2 }
    else if(line.from.number == 3) from = { x: fromElementLocation.x, y: fromElementLocation.y }
    else from = { x: toElementLocation.x + toElementLocation.width, y: fromElementLocation.y + fromElementLocation.height/2 }

    if(line.to.number == 1) to = { x: toElementLocation.x, y: toElementLocation.y }
    else if(line.to.number == 2) to = { x: fromElementLocation.x, y: toElementLocation.y }
    else if(line.to.number == 3) to = { x: toElementLocation.x, y: toElementLocation.y }
    else to = { x: toElementLocation.x, y: toElementLocation.y }

    console.log(line)

    newLine.style.width = Math.abs(to.x - from.x)+'px';
    newLine.style.top = from.y+'px';
    newLine.style.left = from.x+'px';

    return newLine;
}
document.querySelectorAll('.element').forEach(element => {
    let numbers = element.querySelectorAll('.number');

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

function createElement(el) {
    console.log('create element, target =>',el)

    elements.push({
        x: el.x,
        y: el.y
    });
    let newEl = drawElement(el)
    app.appendChild(newEl)

    let numbers = newEl.querySelectorAll('.number');
    numbers.forEach((number) => {
        number.addEventListener('click', (e) => newElement(e, newEl));
    });

    return newEl;
}
function createLine(line) {
    lines.push(line);
    console.log('newline ',line)
    let newLine = drawLine(line);
    app.appendChild(newLine)
}