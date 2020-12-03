class Editor {
    constructor({canvas}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')
        this.init();
        this.elementRadius = 60;
        this.elements = [
            {
                x: window.innerWidth/2,
                y: window.innerHeight/2,
                content: {}
            }
        ]
    }
    init() {
        window.onload = () => {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight
        }
    }
    draw() {
        this.ctx.fillStyle = "#dee"
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.drawElements()
    }
    drawElements() {
        this.ctx.fillStyle = "#fff";
        this.elements.forEach((element,index) => {
            this.ctx.beginPath();
            this.ctx.arc(element.x, element.y, this.elementRadius, 0, Math.PI*2)
            this.ctx.fill();
            this.ctx.closePath();

            // Draw numbers
            this.ctx.fillStyle = "#333"
            this.ctx.font = "24px arial"
            
            this.ctx.fillText("1", element.x - this.ctx.measureText("1").width/2, element.y - this.elementRadius/2);
            this.ctx.fillText("2", element.x + this.elementRadius/2, element.y + this.ctx.measureText("1").width/2);
            this.ctx.fillText("3", element.x - this.ctx.measureText("1").width/2, element.y + this.elementRadius/1.5);
            this.ctx.fillText("4", element.x - this.elementRadius/2 - this.ctx.measureText("1").width/2, element.y + this.ctx.measureText("1").width/2);
        })
    }
    render() {
        this.draw();
        requestAnimationFrame(() => this.render());
    }
}