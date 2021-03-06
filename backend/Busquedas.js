/* 
  Animaciones de los algoritmos de busquedas, dentro de esta categoría esta la 
  implementación de los algoritmos; busqueda secuencial y busqueda binaria. 
*/


let values = []; // array with the values of the array 
let w = 20; // size of each bar in the visualization 
let states = [];// states to change the color
var num; //number to search for

/* 
Function setup: this function creates the canvas where the animation will be visualized
@param:nothing 
@return:nothing
*/
function setup() {
    createCanvas(400, 400);
    i = 200;
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = floor(random(height)+1);
        states[i] = -1;
        num = floor(random(values));
    }
  
    values.sort(function(a, b) {
      return a - b
    });
    
    //busquedaBinaria(values, num);
    busquedaSecuencial(values, num);
}//end setup

/* 
Function busquedaBinaria: this function works by dividing the array in a sorted array. The search starts at the middle, if the number is bigger it goes to the right and vicersa. This "partition" is done until it finds the number. 
@param arr: the array to be searched 
@param num: the number to be searched
@return:nothing
*/
async function busquedaBinaria(arr, num) {
  var low = 0;
  var high = arr.length - 1;
  while (low <= high) {
    var middle = Math.floor((low + high)/2);
    var guess = arr[middle];
    if(guess == num){
      console.log("Number searched:", num);
      console.log("Found at index (starting from 0) : ", middle);
      console.log(arr);
      states[middle] = 0;
      break;
    }
    if(guess > num){
      high = middle - 1;
      states[high] = 1;
    } else {
      low = middle + 1;
      states[low] = 1;
    }
  }
  tiempo("Busqueda Binaria");
}//end busquedaBin

/* 
Function busquedaSecuencial: this function works as a normal sort, where it iterates each index of the array until it finds it.
@param arr: the array to be searched 
@param num: the number to be searched
@return:nothing
*/
async function busquedaSecuencial(arr, num) {
  //bubbleSort(arr);
  for(let i = 0; i < arr.length-1; i++) {
    states[i] = 1;
    if(arr[i] == num) {
      console.log("Number searched", num);
      console.log("Found at index", i);
      states[i] = 0;
      break;
    } else {
      console.log(arr);
    }
  }
  tiempo("Busqueda Secuencial");

}//end busquedaSecu

/* 
    Function draw: this function of the p5 library draws the lines of the visaulizations. 
    @param:nothing
    @return: nothing
*/
function draw() {
    background(230);
    stroke("white");
    for (let i = 0; i < values.length; i++) {
      if (states[i] == 0) {
        fill(0, 191, 255);
      } else if (states[i] == 1) {
        fill(212, 161, 198);
      } else {
        fill(255, 204, 100);
      }
      //dibuja las lineas
      rect(i * w, height - values[i], w, values[i]);
    }
}//end draw

/* 
    function tiempo: this function takes the time in miliseconds of the animations execution
    @param algorithm: the algorithm executed
    @return: nothin
 */
async function tiempo(algorithm){
  let tiempo=Math.ceil(millis());
   console.log("Tiempo animación " + algorithm + " en milisegundos:",tiempo);
}// end tiempo