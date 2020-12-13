const appEl = document.getElementById('app');
const elementDummy = document.getElementById('element-dummy').cloneNode(true);
const canvas = document.getElementById('canvas')

const app = new App(canvas);
app.init();