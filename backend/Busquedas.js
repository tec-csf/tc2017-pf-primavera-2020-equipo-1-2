let values = [];
let w = 20;
let i;
let states = [];
var num; //number to search for


function setup() {
    createCanvas(400, 400);
    i = 200;
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = floor(random(height)+1);
        states[i] = 1;
        num = floor(random(values));
    }
  
    values.sort(function(a, b) {
      return a - b
    });
    
    //busquedaBinaria(values, num);
    busquedaBinaria(values, num);
}


async function busquedaBinaria(arr, num) {
  var low = 0;
  var high = arr.length - 1;
  while (low <= high) {
    var middle = Math.floor((low + high)/2);
    var guess = arr[middle];
    if(guess == num){
      console.log(num);
      console.log("Found", middle);
      console.log(arr);
      states[middle] = 0;
    }
    if(guess > num){
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
}

async function search(arr, num) {
  //bubbleSort(arr);
  for(let i = 0; i < arr.length-1; i++) {
    if(arr[i] == num) {
      console.log(num);
      console.log("Found", i);
      states[i] = 0
    } else {
      console.log(arr);
    }
  }
}

function draw() {
    background(230);
    stroke("white");
    for (let i = 0; i < values.length; i++) {
      if (states[i] == 0) {
        fill(0, 191, 255);
      } else if (states[i] == 1) {
        fill(255, 204, 100);
      } else if (states[i] == 2) {
        fill(255, 69, 0);
      }
      //dibuja las lineas
      rect(i * w, height - values[i], w, values[i]);
    }
}