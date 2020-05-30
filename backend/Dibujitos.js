// QuickSort Visualization
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/143-quicksort.html
// https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// https://youtu.be/eqo2LxRADhU

let values = [];
let w = 10;
let i, finished, s;
let comparisons = 0;

let states = [];


function setup() {
    createCanvas(windowWidth, windowHeight);
    i = 200;
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height)+1;
        states[i] = -1;
    }

    //bubbleSort(values);
    //cocktailSort(values);
    //insertionSort(values);
    mergeSort(values);
}
/* 
    Function Bubble sort: Sorting takes place by stepping through all the elements one-by-one and comparing it with the adjacent element and swapping them if required.
    @param: the array of the values to be sorted 
    @return: nothing
*/
async function bubbleSort(arr){
    for (let i = arr.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
                // swap
                await swap(arr, j, j+1);
			}
		}
	}
}
/* 
    Function Cocktail sort: is the same mechanics of the cocktail sort, but when it reaches the end of the array it goes backwards comparing the elemtns. Then it starts from the index 0, all this until it's sorted. 
    @param: the array of the values to be sorted 
    @return: nothing
*/
async function cocktailSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
                // swap
                await swap(arr, j, j+1);
			}
		}
      for (let h = arr.length-1; h > 0; h--) {
			if (arr[h] > arr[h + 1]) {
                // swap
                await swap(arr, h, h+1);
			}
		}
	}
}
/* 
    Function Insertion sort:is a simple sorting algorithm that works the way we sort playing cards in our hands. It iterates over the array and compares two items at a time. It swaps the items if one is larger than the other and continues to iterate left, comparing and swapping until the minimum is at the front of the array
    @param: the array of the values to be sorted 
    @return: nothing
*/
async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        let tmp = arr[i];
        while (j >= 0 && arr[j] > tmp) {
            await swap(arr, j, j+1);
            j--;
        }
        arr[j+1] = tmp;
    }
}
/* 
    Function Merge sort: Imagine having to take a deck of cards, split it in two halves and continue splitting those piles in halves, and halves again until all you have is 52 piles of 1 card. Then, you regroup the piles in pairs again but this time, sort them in ascending order
    @param: the array of the values to be sorted 
    @return: nothing
*/
function mergeSort(a) {
    // create copy of the array 
    copy1 = a.slice()
    // asynchronous sort the copy
    mergeSortSlice(copy1, 0, copy1.length);
    return;
}
/* 
    Function MergesortSlice: divides the array into equal parts and sorts each part
    @param: the array of the values to be sorted 
    @start: the first element of the array
    @end: the last element of the array
    @return: nothing
*/
async function mergeSortSlice(a, start, end){
    if (end-start <= 1)
        return;
    
    var mid = Math.round((end+start) / 2);

    // wait till divides are sort 
    await mergeSortSlice(a, start, mid);
    await mergeSortSlice(a, mid, end);

    // merge divides
    let i = start, j = mid;
    while (i < end && j < end) {
        if (a[i] > a[j]) {
            let t = a[j]; a.splice(j, 1); a.splice(i, 0, t);
            j ++;
        }
        i ++;
        if (i==j) j ++;

        // copy back the current state of the sorting
        values = a.slice();
        
        // slow down
        await sleep(10);// Es para que vaya más lento
    }

    // restart
    if (start == 0 && end == a.length) {
        await sleep(10);
        //startSort = true;
    }
}
/* 
    Function draw: this function of the p5 library draws the lines of the visaulizations. 
    @param:nothing
    @return: nothing
*/
function draw() {
    background(230);
    stroke("white");
    fill(255, 204, 100);
    for (let i = 0; i < values.length; i++) {
      /*if (states[i] == 0) {
        fill('#E0777D');
      } else if (states[i] == 1) {
        fill('#D6FFB7');
      } else {
        fill(255);
      }*/
      //dibuja las lineas
      rect(i * w, height - values[i], w, values[i]);
    }
}
/* 
    Function Swap: this function was implemented to save the switches on the other functions. Basically it changes the positiion of one element into the other elements position. 
    @param: the array of the values to be sorted 
    @a: the first element to be switched
    @b: the second element to be switched
    @return: nothing
*/
async function swap(arr, a, b) {
    await sleep(5);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
/* 
    Function MergesortSlice: 
    @param: the array of the values to be sorted 
    @start: the first element of the array
    @end: the last element of the array
    @return: nothing
*/

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
