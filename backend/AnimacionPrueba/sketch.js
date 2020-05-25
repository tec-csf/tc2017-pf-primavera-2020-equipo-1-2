// QuickSort Visualization
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU

let values = [];
let w = 10;

let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }

  //quickSort(values, 0, values.length - 1);
  //heapSort(values);
  //selectionSort(values);
  shellSort(values);
}

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
}

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
}

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
}

async function shellSort(array, size){
  for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let index = gap; index < array.length; index++) {
      let indexCopy = index
      let itemValue = array[index]
      while (indexCopy >= gap && comparar(1, array[indexCopy - gap], itemValue)) { //aqui se cambia //array[currentIndexCopy - gapSize] > itemValue
        await swap (array, indexCopy, indexCopy - gap)
        indexCopy -= gap
      }
    }
  }
}

async function partition(arr, start, end) {
  //creo que esto es para la grafica
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
}

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
}

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
}

async function swap(arr, a, b) {
  await sleep(500);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function desc(a, n) {
  return a<n;
}

function asc(a, n) {
	return a>n;
}

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
}