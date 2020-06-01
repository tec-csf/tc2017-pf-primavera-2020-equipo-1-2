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
// QuickSort Visualization
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU */

let values = [];//array with the values 
let w = 10;// width de los rectangulos de la animación

let states = []; //array to determine the colors in the visualization 

/* 
  Function setup: this function creates the canvas where the animation will be visualized
  @param: nothing 
  @return:nothing
*/
function setup(){
  createCanvas(windowWidth, windowHeight); // size of the canvas 
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }

  quickSort(values, 0, values.length - 1);
  //heapSort(values);
  //selectionSort(values);
  //shellSort(values);
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
async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1; //como funciona esto?

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}// end quicksort

/* 
  Function HeapSort: sorts the array by creating a heap data and sorting it with it's help
  @param arr:the array of elements to be sorted
  @return: nothing 
*/
async function heapSort(arr) {
  let size = arr.length;
  for(let i = Math.floor(size/2-1); i >= 0; i--){
    let index = await heapify(arr, size, i);
    states[index] = -1;
  }

  for(let i = size-1; i>=0; i--){
    await swap(arr, 0, i);
    await Promise.all([
      heapify(arr, i, 0)
    ]);
  }
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
async function selectionSort(array){
  //Este pinta de verde
  for (let i = 0; i < array.length; i++) {
    states[i] = 1;
  }

  for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
    let minIndex = currentIndex;
    states[minIndex] = -1;
    states[currentIndex+1] = 0;
    for (let i = currentIndex + 1; i < array.length; i++) {
      if (array[i] < array[minIndex]) { //se voltea para direccion
        minIndex = i;
      }
    }
    if (minIndex != currentIndex) {
      states[minIndex] = 0;
      await swap(array, currentIndex, minIndex);
      states[minIndex] = 1;
    }
  }
}// End selection sort 

/* 
  Function Shell Sort:It's a variation of insertion sort. The idea of shellSort is to allow exchange of far items. 
  In shellSort, we make the array h-sorted for a large value of h. We keep reducing the value of h until it becomes 1. 
  An array is said to be h-sorted if all sublists of every h’th element is sorted.
  @param array:the array of elements to be sorted
  @return:nothing
*/
async function shellSort(array){
  for (let i = 0; i < array.length; i++) {
    states[i] = 1;
  }
  for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let index = gap; index < array.length; index++) {
      let indexCopy = index
      let itemValue = array[index]
      while (indexCopy >= gap && comparar(1, array[indexCopy - gap], itemValue)) { //aqui se cambia //array[currentIndexCopy - gapSize] > itemValue
        states[indexCopy] = 0 //se comparan y cambian derecho
        await swap (array, indexCopy, indexCopy - gap)
        indexCopy -= gap
        states[indexCopy] = 0 //se compara y cambian izquierdo
      }
      states[index] = -1 //lo hace en las mitades de la derecha
    }
  }
}// end ShellSort

/* 
  Function Partition: this function is part of the quick sort, it compares the @param start with all the other elements
  from back to front until it finds a smaller value to swap. 
  @param arr:the array of elements to be sorted
  @param start:the first element of the array 
  @param end:the last element of the array 
  @return:nothing
*/
async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (comparar(1, arr[i], pivotValue)) { //se voltea signo para direccion //arr[i] < pivotValue
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

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
async function heapify(array, size, i){
  for (let i = 0; i < size; i++) {
    states[i] = 1;
  }
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  states[max] = 0;

  if(left < size && comparar(0, array[left], array[max])){ //se voltea el segundo para direccion //array[left] < array[max]
    states[left] = 0;
    max = left;
  }
  if(right < size && comparar(0, array[right], array[max])){ //se voltea el segundo para direccion //array[right] < array[max]
    states[right] = 0;
    max = right
  }
  if (max != i){
      await swap(array, i, max);
      await heapify(array, size, max);
  }
  for(let i = 0; i < size; i++){
    if( i != max-2){
      states[i] = -1;        
    }
  }
}//end heapify 

/* 
  Function draw: this function of the p5 library draws the lines of the visaulizations. 
  @param:nothing
  @return: nothing
*/
function draw() {
  background(0);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill('#E0777D');
    } else if (states[i] == 1) {
      fill('#D6FFB7');
    } else {
      fill(255);
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
  await sleep(500);
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
/* </script>
</body>

</html> */