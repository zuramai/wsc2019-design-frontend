const appEl = document.getElementById('app');
const elementDummy = document.getElementById('element-dummy');
const canvas = document.getElementById('canvas')

let lines=[], elements=[]

const app = new App(canvas);
app.init();