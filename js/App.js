class App {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.elementDistance = 75;
    }
    init() {
        this.elements = [];
        let firstElement = new Elementr(
            document.body.clientWidth/2,
            document.body.clientHeight/2,
            []
        );
        firstElement.id = this.elements.length;
        firstElement.create();
        elements.push(firstElement)
    }
    render() {
        requestAnimationFrame(() => this.render());
    }
    newLine(from, to) {
        let line = {

        }
    }
    newElement(from, to) {
        let connectToNumber;
        let element = new Elementr;
        if(from.number == 1) {
            // ke atas
            connectToNumber = 3;
            element.x = from.element.offsetLeft  // same x as fromElement
            element.y = from.element.offsetTop - this.elementDistance - from.element.clientHeight// move to top as elementDistance px
        }else if(from.number == 2) {
            // ke atas
            connectToNumber = 4;
            element.x = from.element.offsetLeft + this.elementDistance  + from.element.clientWidth 
            element.y = from.element.offsetTop // same y as fromElement
        }else if(from.number == 3) {
            // ke atas
            connectToNumber = 1;
            element.x = from.element.offsetLeft, // same x as fromElement  
            element.y = from.element.offsetTop + this.elementDistance + from.element.clientHeight
        }else if(from.number == 4) {
            // ke atas
            connectToNumber = 2;
            element.x = from.element.offsetLeft - this.elementDistance - from.element.clientWidth, 
            element.y = from.element.offsetTop // same y as fromElement  
        }
        element.connections.push({
            number: from.number,
            text: `Go to ${from.number}`
        });
        element.create()
        elements.push(element)
    }
    
    numberToConnect(from) {
        if(from == 1) return 3;
        else if(from == 2) return 4;
        else if(from == 3) return 1;
        else if(from == 4) return 2;
    }
}