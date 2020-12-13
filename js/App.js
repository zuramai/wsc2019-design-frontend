class App {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.elements = [];
        this.lines = [];
    }
    init() {
        let firstElement = new Elementr(
            document.body.clientWidth/2,
            document.body.clientHeight/2,
            []
        );
        firstElement.id = this.elements.length;
        firstElement.init();
    }
    render() {
        requestAnimationFrame(() => this.render());
    }
    newElement(from, to) {

    }
}