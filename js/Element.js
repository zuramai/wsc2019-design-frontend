class Elementr extends App {
    constructor(x, y, connections=[]) {
        super(canvas)
        this.x = x;
        this.y = y;
        this.connections = connections;
        this.element = null;
        this.id = 1;
    }
    init() {
        this.element = elementDummy;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.display = 'flex';
        this.element.setAttribute('id', `element-${this.id}`);
        this.draw();
        this.listener()

        console.log(this)
    }
    draw() {
        appEl.appendChild(this.element);
    }
    addConnection() {

    }
    listener() {
        this.element.querySelectorAll('.number').forEach(number => {
            number.addEventListener('click', (e) => {
                console.log('number clicked => ',e.target.getAttribute('data-number'));
            });
        });
    }
}