let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");

let modeRgb = document.getElementById("mode-rgb");
let modeHex = document.getElementById("mode-hex");

let sliders = document.getElementById("sliders");
let input = document.getElementById("hex-input");
let randomize = document.getElementById("random");
input.style.display = "none";

let preview = document.getElementById("preview");

let hex = document.getElementById("hex-val");
let rgb = document.getElementById("rgb-val");

let r=65, g=105, b=255;

let mode = 0;

red.oninput = function(){
    r = this.value;
    update();
}

green.oninput = function(){
    g = this.value;
    update();
}

blue.oninput = function(){
    b = this.value;
    update();
}

input.oninput = function(){
  let hexvalue = input.value;
  let rgbvalue = hexToRgb(hexvalue);
  if(rgbvalue === null){
    input.style.borderColor = "#e94335";
  }else{
    r = red.value = rgbvalue.r;
    g = green.value = rgbvalue.g;
    b = blue.value = rgbvalue.b;
    input.style.borderColor = "#5f6368";
    update();
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function randomColor(){
  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  red.value = r;
  green.value = g;
  blue.value = b;
  update();
}

function lightOrDark(color) {
    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
  
      r = color[1];
      g = color[2];
      b = color[3];
    } 
    else {
      color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'
      )
               );
  
      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }

    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    
    if (hsp>125.5) {
      return 'black';
    } 
    else {
      return 'white';
    }
}

var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};

var fullColorHex = function(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
};

function changeMode(){
    mode = 1 - mode;
    switch(mode){
        case 0:
            modeRgb.classList.add("active");
            modeHex.classList.remove("active");
            sliders.style.display = "flex";
            input.style.display = "none";
            break;
        case 1:
            modeRgb.classList.remove("active");
            modeHex.classList.add("active");
            sliders.style.display = "none";
            input.style.display = "flex";
            break;
    }
}

function update(){
    let hexvalue = fullColorHex(r, g, b);
    rgb.innerText = "rgb("+r+", "+g+", "+b+")";
    hex.innerText = "#"+hexvalue;
    preview.style.background = "rgb("+r+", "+g+", "+b+")";
    let textcolor = lightOrDark(hexvalue);
    hex.style.color = textcolor;
    rgb.style.color = textcolor;
    input.value = "#"+hexvalue;
}