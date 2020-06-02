/* 
  Animaciones de los algoritmos Estables, dentro de esta categoría esta la 
  implementación de los siguientes algoritmos: Bubble sort, cocktail Sort,
  insertion Sort ymerge Sort.  
*/

let values = []; // array with the values of the array 
let w = 10; // size of each bar in the visualization 
let z = 0; //for countingSort
let order = 0;

let states = [];// states to change the color

/* 
Function setup: this function creates the canvas where the animation will be visualized
@param: nothing 
@return:nothing
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = Math.floor(random(height)+1);
        states[i] = -1;
    }

    bubbleSort(values);
    //cocktailSort(values);
    //insertionSort(values);
    //mergeSort(values);
    //radixSort(values);
    //bucketSort(values);
    // countingSort(values);
}//end setup 

/* 
    Function Bubble sort: Sorting takes place by stepping through all the elements 
    one-by-one and comparing it with the adjacent element and swapping them if required.
    @param arr: the array of the values to be sorted 
    @return: nothing
*/
async function bubbleSort(arr){
    for (let i = arr.length ; i >= 0; i--) {
      states[i]=0;//state of the array, this is for the color
		for (let j = 0; j < i; j++) {
			if (comparar(order, arr[j], arr[j+1])) { //arr[j] > arr[j + 1]
                // swap
                await swap(arr, j, j+1);
			}
		}
	}
  // saveJSON(arr, "finalArray.json");
  save('finalGraphic.png')
  tiempo("Bubble Sort");//time the algorithm took to execute
}//end bubblesort

/* 
    Function Cocktail sort: is the same mechanics of the cocktail sort, but when it reaches the 
    end of the array it goes backwards comparing the elemtns. Then it starts from the index 0, 
    all this until it's sorted. 
    @param arr: the array of the values to be sorted 
    @return: nothing
*/
async function cocktailSort(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
    states[i]=0;//state of the array, this is for the color
		for (let j = 0; j < i; j++) {
			if (comparar(order, arr[j], arr[j + 1])) { //arr[j] > arr[j + 1]
                // swap
                await swap(arr, j, j+1);
			}
		}
      for (let h = arr.length-1; h > 0; h--) {
			if (comparar(order, arr[h], arr[h + 1])) { //arr[h] > arr[h + 1]
                // swap
                await swap(arr, h, h+1);
			}
		}
	}
  tiempo("Cocktail Sort");//time the algorithm took to execute
}//end cocktail

/* 
    Function Insertion sort:is a simple sorting algorithm that works 
    the way we sort playing cards in our hands. It iterates over the 
    array and compares two items at a time. It swaps the items if one is 
    larger than the other and continues to iterate left, comparing and 
    swapping until the minimum is at the front of the array.
    @param arr: the array of the values to be sorted 
    @return: nothing
*/
async function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = i - 1;
        let tmp = arr[i];
        states[i]=0; //state of the array, this is for the color
        while (j >= 0 && comparar(order, arr[j], tmp)) { //arr[j] > tmp
            await swap(arr, j, j+1);
            j--;
        }
        arr[j+1] = tmp;
    }
   tiempo("Insertion Sort");//time the algorithm took to execute
}//end insertion

/* 
    Function Merge sort: Imagine having to take a deck of cards, split it in two 
    halves and continue splitting those piles in halves, and halves again until all 
    you have is 52 piles of 1 card. Then, you regroup the piles in pairs again 
    but this time, sort them in ascending order.
    @param a: the array of the values to be sorted 
    @return: nothing
*/
function mergeSort(a) {
    // create copy of the array 
    copy1 = a.slice()
    // asynchronous sort the copy
    mergeSortSlice(copy1, 0, copy1.length, order);
  return;
}//end merge sort 

/* 
    Function MergesortSlice: divides the array into equal parts and sorts each part
    @param a: the array of the values to be sorted 
    @param start: the first element of the array
    @param end: the last element of the array
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
    states[i]=0;//states of the array, this is for the color
    states[j]=0;//states of the array, this is for the color
        if (a[i] > a[j]) {
            let t = a[j]; //a.splice(j, 1); a.splice(i, 0, t);
          comparar(order, a.splice(j, 1), a.splice(i, 0, t))
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
    tiempo("Merge Sort");//time the algorithm took to execute

}//end mergeSort Slice

/* 
    Function getNum: finds the digit in a specific number at a specific index
    @param num: the number to be searched 
    @param index: the place on the number qhere the digit will be search. 
    @return: the digit of the number 
*/
function getNum (num, index) {
    const strNum = String(num);
    let end = strNum.length - 1;
    const foundNum = strNum[end - index];
  
    if (foundNum === undefined) return 0;
    else return foundNum;
}//end getNum

/* 
    Function largestNum:finds the largest number in the array
    @param arr: the array to be searched 
    @return: the length of the largest number in the array
*/
function largestNum (arr) {
    let largest = "0";
  
    arr.forEach(num => {
      const strNum = String(num);
  
      if (strNum.length > largest.length) largest = strNum;
    });
  
    return largest.length;
}//end largestNum

/* 
    Function radixSort: sorts an array by creating buckets, where each number is 
    stored based on its digits and then putting it back into the original array. This
    process repeats the length of the largest number in the array.  
    @param arr: the array to be sorted
    @return:nothing
*/
async function radixSort(arr){
    let maxLength = largestNum(arr);
    for (let i = 0; i < maxLength; i ++) {
      let buckets = Array.from({ length: 10}, () => []);
      for (let j = 0; j < arr.length; j ++) {
        let num = getNum(arr[j], i);
        
        if (num !== undefined) buckets[num].push(arr[j]);
      }
      arr = buckets.flat();
      noLoop();
    }
    for (let i = 0; i < values.length; i++) {
      await swapRadix(values, arr, i);
      states[i]=0;//states of the array, this is for the color
      redraw(i);
    }
   tiempo("Radix Sort");//time the algorithm took to execute
}//end radixSort

/* 
    Function bucketSort:is a distribution sort. It works by arranging elements into ‘buckets’ 
    which are then sorted using insertion sort. Then it is merged into the original array. 
    @param arr: array to be sorted 
    @return arr: if it's equal to 0
*/
async function bucketSort(arr) {
  if (arr.length === 0) {
    return arr;
  }//end if 
  
  var n = arr.length-1;
    var minValue = arr[0],
        maxValue = arr[0],
        bucketSize = bucketSize || 5;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }// end for 
  
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var allBuckets = new Array(bucketCount);
  
  for (i = 0; i < allBuckets.length; i++) {
    allBuckets[i] = [];
  }//end for
  for (let i = 0; i < arr.length; i++) {
    allBuckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }//end for
  let index = 0;
  
  for (let i = 0; i < allBuckets.length; i++) {
    console.log("Bucket", i, "=", allBuckets[i]); // prints the buckets with the elements
      insertionSort(allBuckets[i]);
      for (let j = 0; j < allBuckets[i].length; j++) {
        await swapBuck(arr, allBuckets, index++, i, j);
        states[index]=0;//states of the array, this is for the color
      }
  }//end for
  console.log(arr);//prints the sorted array 

  tiempo("Bucket Sort");//time the algorithm took to execute
}//end bucketsort

/* 
    Function countingSort: sorts an array by creating an auxiliar array of the same size,
    and counting how many times the number is in the original array. 
    Once it's done it put backs the array in order
    @param arr: array to be sorted 
    @return: nothing
*/
async function countingSort(arr) {
  var orderArray = new Array(windowHeight + 1);
  var finalArray = new Array(arr.length);
  for (let i = 0; i < orderArray.length; i++) {
    orderArray[i] = 0;
  }
  for (let i = 0; i < finalArray.length; i++) {
    finalArray[i] = 0;
  }
  for (let k = 0; k < arr.length; k++) {
    let num = arr[k];
    orderArray[num] += 1;
  }
  for (let j = 1; j < orderArray.length; j++) {
    for (let i = 0; i < orderArray[j]; i++) {
      finalArray[z] = j;
      z++;
    }
  } //prints ascendant
  /*for (let j = orderArray.length; j >= 1; j--) {
    for (let i = 0; i < orderArray[j]; i++) {
      finalArray[z] = j;
      z++;
    }
  }*/ //prints descendant
  
  for (let i = 0; i < arr.length; i++) {
    states[i]=0;//state of the array, this is for the 
    await swapCount(arr, finalArray, i);
  }
  console.log(finalArray);
  tiempo("Counting Sort");//time the algorithm took to execute

}//end counting 

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
}// end draw

/* 
    Function swapCount: swaps the sorted array into the original array, so it can be drawn. 
    Called by the function countingSort
    @param arr1: the original array 
    @param arr2: the sorted array
    @param i: the position to be swapped
    @return:nothing
*/
async function swapCount(arr1, arr2, i) {
    await sleep(50);//delay
    arr1[i] = arr2[i];
}//end swapCount

/* 
    Function swapRadix: swaps the sorted array into the original array, so it can be drawn
    @param arr1: the original array 
    @param arr2: the sorted array 
    @param i: the position to be swapped
    @return:nothing
*/
async function swapRadix(arr1, arr2, i) {
    await sleep(50);//delay
    arr1[i] = arr2[i];
}//end swapRadix

/* 
    Function swapBuck:swaps the buckets into the original array 
    @param arr1: the original array 
    @param arr2: the buckets array
    @param indx: the position in the original array
    @param i: the position in "x"
    @param j: the position in "y"
    @return:nothing
*/
async function swapBuck(arr1, arr2, indx, i, j) {
    await sleep(50);//delay
    arr1[indx] = arr2[i][j];
}//end swapBuck

/* 
    Function Swap: this function was implemented to save the switches on the other functions. Basically it changes the positiion of one element into the other elements position. 
    @param arr: the array of the values to be sorted 
    @a: the first element to be switched
    @b: the second element to be switched
    @return: nothing
*/
async function swap(arr, a, b) {
    await sleep(5);
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
}

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