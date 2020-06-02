/* 
  Animaciones de los algoritmos Inestables, dentro de esta categoría esta la 
  implementación de los siguientes algoritmos: Shell sort, Selection Sort,
  Quick Sort y Heap Sort. 
*/

/* <!DOCTYPE html>
<html>

<head>
  <title>QuickSort Visualization
  </title>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.min.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/addons/p5.sound.min.js"></script>
  <meta charset="utf-8" />
</head>

<body>
<script>
/* 
  Animaciones de los algoritmos Inestables, dentro de esta categoría esta la 
  implementación de los siguientes algoritmos: Shell sort, Selection Sort,
  Quick Sort y Heap Sort. 

// QuickSort Visualization
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU */

let values = [];//array with the values 
let w = 10;// width de los rectangulos de la animación
let orderQS = 1; //1 - descendant, 0 - ascendant
let orderHS = 0; //0 - descendant, 1 - ascendant

let states = []; //array to determine the colors in the visualization 

/* 
  Function setup: this function creates the canvas where the   animation will be visualized
  @param: nothing 
  @return:nothing
*/
function setup(){
  createCanvas(600, 600); // size of the canvas 
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = Math.floor(random(height));
    states[i] = -1;
  }

  //quickSort(values, 0, values.length - 1, orderQS);
  //heapSort(values, orderHS);
  //selectionSort(values, orderQS);
  shellSort(values, orderHS);
}// end setup 

/* 
  Function QuickSort: We select a number, called our pivot, 
  which we’ll compare every number to when we loop through our items. 
  The goal is to reorganize the array so it is partitioned into two halves, 
  with everything in each either being less than or greater than our pivot. 
  When the pivot is in it’s final position we’ll move on to doing the same 
  thing with a new pivot, with every pivot being cemented 
  in place until every item has been a pivot at least once.
  @param arr:the array of elements to be sorted
  @param start: the first element of the array 
  @param end: the last element of the array 
  @return: nothing
*/
async function quickSort(arr, start, end, order) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end, order);

  await Promise.all([
    quickSort(arr, start, index - 1, order),
    quickSort(arr, index + 1, end, order)
  ]);
  tiempo("Quick Sort");//time the algorithm took to execute

}// end quicksort

/* 
  Function HeapSort: sorts the array by creating a heap data and sorting it with it's help
  @param arr:the array of elements to be sorted
  @return: nothing 
*/
async function heapSort(arr, order) {
  
  let size = arr.length;
  for(let i = Math.floor(size/2-1); i >= 0; i--){
    let index = await heapify(arr, size, i, order);
    states[index] = 0; //state of the array, this is for the color, complete
  }

  for(let i = size-1; i>=0; i--){
    await swap(arr, 0, i);
    await Promise.all([
      heapify(arr, i, 0, order)
    ]);
  }
  tiempo("Heap Sort");//time the algorithm took to execute
}// end heap sort

/* 
  Function Selection Sort:This sorting algorithm is an in-place comparison-based algorithm 
  in which the list is divided into two parts, the sorted part at the left end and the unsorted part at the right end. 
  Initially, the sorted part is empty and the unsorted part is the entire list.The smallest element is selected 
  from the unsorted array and swapped with the leftmost element, and that element becomes a part of the sorted array. 
  This process continues moving unsorted array boundary by one element to the right.
  @param array:the array of elements to be sorted
  @return:nothing
*/
async function selectionSort(array, order){
  for (let i = 0; i < array.length; i++) {
    states[i] = -1; //state of the array, this is for the color, start
  }

  for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
    let minIndex = currentIndex;
    states[minIndex] = 0; //state of the array, this is for the color, complete
    for (let i = currentIndex + 1; i < array.length; i++) {
      if (comparar(order, array[i], array[minIndex])) { //se voltea para direccion, array[i] < array[minIndex]
        minIndex = i;
      }
    }
    if (minIndex != currentIndex) {
      await swap(array, currentIndex, minIndex);
    }
  }
  tiempo("Selection Sort");//time the algorithm took to execute
}// End selection sort 

/* 
  Function Shell Sort:It's a variation of insertion sort. The idea of shellSort is to allow exchange of far items. 
  In shellSort, we make the array h-sorted for a large value of h. We keep reducing the value of h until it becomes 1. 
  An array is said to be h-sorted if all sublists of every h’th element is sorted.
  @param array:the array of elements to be sorted
  @return:nothing
*/
async function shellSort(array, order){
  for (let i = 0; i < array.length; i++) {
    states[i] = -1; //state of the array, this is for the color, start
     //console.log(array);
  }
  for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let index = gap; index <array.length; index++) {
      states[index] = 1 //state of the array, this is for the         color, iteration
      let indexCopy = index
      let itemValue = array[index]
      while (indexCopy >= gap && comparar(order, array[indexCopy - gap], itemValue)) { //aqui se cambia //array[currentIndexCopy - gapSize] > itemValue
        await swap (array, indexCopy, indexCopy - gap)
        states[indexCopy] =0;
        indexCopy -= gap;
        states[indexCopy] = 0 //se compara y cambian izquierdo
      }
    }
  }
  for (let i = 0; i < array.length; i++) {
    states[i] = 0; //state of the array, this is for the color, start
     //console.log(array);
  }
  console.log(array);
  tiempo("Shell Sort");//time the algorithm took to execute
}// end ShellSort

/* 
  Function Partition: this function is part of the quick sort, it compares the @param start with all the other elements
  from back to front until it finds a smaller value to swap. 
  @param arr:the array of elements to be sorted
  @param start:the first element of the array 
  @param end:the last element of the array 
  @return:nothing
*/
async function partition(arr, start, end, orden) {
  for (let i = start; i < end; i++) {
    states[i] = -1; //state of the array, this is for the color, start
  }
  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0; //state of the array, this is for the color, complete
  for (let i = start; i <=end; i++) {
    if (comparar(orden, arr[i], pivotValue)) { //se voltea signo para direccion //arr[i] < pivotValue
      await swap(arr, i, pivotIndex);
      pivotIndex++;
      states[pivotIndex] = 0; //state of the array, this is for the color, complete
    }
  }
  await swap(arr, pivotIndex, end);

  return pivotIndex;
}// end partition 

/* 
  Function Heapify: auxiliar function for heapSort to sort the array by taking the first element
  of the heap and placing it where it goes, this repeats until it's sorte
  @param arr:the array of elements to be sorted
  @param size: size of the array
  @param i : index where it starts to make the heap
  @return:nothing
*/
async function heapify(array, size, i, order){
  for (let i = 0; i < size; i++) {
    states[i] = -1; //state of the array, this is for the color, start   
  }
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  states[max] = 1;
  

  if(left < size && comparar(order, array[left], array[max])){ //se voltea el segundo para direccion //array[left] < array[max]   
    max = left;
  }
  if(right < size && comparar(order, array[right], array[max])){ //se voltea el segundo para direccion //array[right] < array[max]  
    max = right
  }
  if (max != i){
      await swap(array, i, max);
      await heapify(array, size, max, order);
  }
  for(let i = 0; i < size; i++){
    if( i != max-2){
      states[i] = 0; //state of the array, this is for the color, complete      
    }
  }
}//end heapify 

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
      fill(161, 220, 144);
    } else if (states[i] == 1) {
      fill('#D6FFB7');
    } else {
      fill(255, 204, 100);
    }
    //dibuja las lineas
    rect(i * w, height - values[i], w, values[i]);
  }
}//end draw

/* 
    Function Swap: this function was implemented to save the switches on the other functions. Basically it changes the positiion of one element into the other elements position. 
    @param: the array of the values to be sorted 
    @a: the first element to be switched
    @b: the second element to be switched
    @return: nothing
*/
async function swap(arr, a, b) {
  await sleep(50);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}//end swap 

/* 
  Function sleep: it's a function used as an delay in the animation 
  @param ms : miliseconds for the duration of the delay
  @return: timeout
*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}//end sleep 

/* 
  Function desc: to determine the order of the numbers
  @param a: number 1 to be compare
  @param n: number 2 to be compare
  @return: boolean 
*/
function desc(a, n) {
  return a<n;
}//end desc

/* 
  Function asc: to determine the order of the numbers
  @param a: number 1 to be compare
  @param n: number 2 to be compare
  @return: boolean 
*/
function asc(a, n) {
	return a>n;
}//end asc

/* 
  Function comparar: to choose the order of the numbers
  @param a: number 1 to be compare
  @param n: number 2 to be compare
  @return: boolean 
*/
function comparar(tipo, a, n)
{
	if(tipo == 1) //a
	{
		return asc(a,n);
	}
	if(tipo == 0) //d
	{
		return desc (a,n);
	}
}//end comparar

/* 
    function tiempo: this function takes the time in miliseconds of the animations execution
    @param algorithm: the algorithm executed
    @return: nothin
 */
async function tiempo(algorithm){
  let tiempo=Math.ceil(millis());
   console.log("Tiempo animación " + algorithm + " en milisegundos:",tiempo);
}// end tiempo


/* </script>
</body>

</html> */