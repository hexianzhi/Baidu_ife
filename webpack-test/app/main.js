const commonCss = require('./css/common.css');


const greeter = require('./Greeter.js');
document.querySelector("#root").style.color = 'red';
document.querySelector("#root").appendChild(greeter());
