/* 
  Códigos en JavaScript de los algoritmos estables, al igual que funciones auxiliares para
  algoritmos
*/

/* 
  Function asc: to determine the order of the numbers
  @param x: number 1 to be compare
  @param j: number 2 to be compare
  @return: nothing
*/
function ascendente(x, j)
{
    if (x[j] > x[j+1]) {
        var temp = x[j];
        x[j] = x[j+1];
        x[j+1] = temp;
    }
}; //end ascendente

/* 
  Function desc: to determine the order of the numbers
  @param x: number 1 to be compare
  @param j: number 2 to be compare
  @return: nothing 
*/
function descendente(x, j)
{
    if (x[j] < x[j+1]) {
        var temp = x[j];
        x[j] = x[j+1];
        x[j+1] = temp;
    }
}; //end descendente

/* 
    Function Bubble sort: Sorting takes place by stepping through all the elements 
    one-by-one and comparing it with the adjacent element and swapping them if required.
    @param a: the array of the values to be sorted 
    @return x: the sorted array
*/
function bubble_Sort(a)
{
    var n = a.length-1;
    var x=a;
    for (var i = 0; i < n; i++) 
    {
        for (var j = 0; j < n-i; j++) {

            //mayor a menor
            if (x[j] < x[j+1]) {
                var temp = x[j];
                x[j] = x[j+1];
                x[j+1] = temp;
            }
            //menor a mayor
            /*if (x[j] > x[j+1]) {
                var temp = x[j];
                x[j] = x[j+1];
                x[j+1] = temp;
            }*/
        }
    }
 return x; 
}; //end bubble_Sort

/* 
    Function Cocktail sort: is the same mechanics of the cocktail sort, but when it reaches the 
    end of the array it goes backwards comparing the elemtns. Then it starts from the index 0, 
    all this until it's sorted. 
    @param a: the array of the values to be sorted 
    @return x: the sorted array
*/
function cocktailSort(a)
{
    var n = a.length-1; // tamaño del arreglo
    var x=a; //copy array 
    var swapped = true; //boolean 
    var start  = 0;

    while (swapped == true) { 
        swapped = false; 
        /* ordena de menor a mayor o sea 1 2 3 4 5 */ 
        for (var i = start; i < n; ++i) { 
            if (a[i] > a[i + 1]) { 
                var temp = a[i]; 
                a[i] = a[i + 1]; 
                a[i + 1] = temp; 
                swapped = true; 
            } 
        } 
        if (swapped == false) 
            break; 
        swapped = false; 
        for (var i = n - 1; i >= start; i--) { 
            if (a[i] > a[i + 1]) { 
                var temp = a[i]; 
                a[i] = a[i + 1]; 
                a[i + 1] = temp; 
                swapped = true; 
            } 
        }
        start = start + 1;
        /* ordena de mayor a menor 5 4 3 2 1 */
         
    }
    return x; 
}; //end of cocktailSort

/* 
    Function Insertion sort:is a simple sorting algorithm that works 
    the way we sort playing cards in our hands. It iterates over the 
    array and compares two items at a time. It swaps the items if one is 
    larger than the other and continues to iterate left, comparing and 
    swapping until the minimum is at the front of the array.
    @param a: the array of the values to be sorted 
    @return a: the sorted array
*/
function insertionSort(a)
{
    for (let i = 1; i < a.length; i++) {
      let j = i - 1;
      let tmp = a[i];
      while (j >= 0 && a[j] > tmp) {
        a[j + 1] = a[j]
        j--
      }
      a[j+1] = tmp
    }
    return a
}; //end of insertionSort

/* 
    Function bucketSort:is a distribution sort. It works by arranging elements into ‘buckets’ 
    which are then sorted using insertion sort. Then it is merged into the original array. 
    @param a: array to be sorted 
    @return a: the sorted array
*/
function bucketSort(a) {
    if (a.length === 0) {
      return a;
    }
    // Declaring vars
    var n = a.length-1;
    var i, minValue = a[0],
        maxValue = a[0],
        bucketSize = bucketSize || 5;
    
    // Setting min and max values
    a.forEach(function (currentVal) {
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    })
  
    // Initializing buckets
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var allBuckets = new Array(bucketCount);
    
    for (i = 0; i < allBuckets.length; i++) {
      allBuckets[i] = [];
    }
    
    // Pushing values to buckets
    a.forEach(function (currentVal) {
        allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
    });
  
    // Sorting buckets
    a.length = 0;
    
    allBuckets.forEach(function(bucket) {
        insertionSort(bucket);
        bucket.forEach(function (element) {
            a.push(element)
        });
    });
  
    return a;
};//end of bucketSort

/* 
    Function countingSort: sorts an array by creating an auxiliar array of the same size,
    and counting how many times the number is in the original array. 
    Once it's done it put backs the array in order
    @param arr: array to be sorted 
    @return arr: the sorted array
*/
function countingSort(arr)
  {
    var i, z = 0, count = [];
    var min = 0, max = arr.length-1;
 
    for (i = min; i <= max; i++) {
        count[i] = 0;
    }
 
    for (i=0; i < arr.length; i++) {
        count[arr[i]]++;
    }
 
    for (i = min; i <= max; i++) {
        while (count[i]-- > 0) {
            arr[z++] = i;
        }
    }
 return arr;
}; //end countingSort

/* 
    Function merge: divides the array into equal parts and sorts each part
    @param left: the left side of the array
    @param right: right side of the array
    @return: the result of merging both sides
*/
function merge (left, right){
    let result = [],
        leftLen = left.length,
        rightLen = right.length,
        l = 0,
        r = 0;
    while (l < leftLen && r < rightLen) {
        if (left[l] < right[r]) {
            result.push(left[l]);
            l++;
        } else {
            result.push(right[r]);
            r++;
        }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
}; //end merge 

/* 
    Function Merge sort: Imagine having to take a deck of cards, split it in two 
    halves and continue splitting those piles in halves, and halves again until all 
    you have is 52 piles of 1 card. Then, you regroup the piles in pairs again 
    but this time, sort them in ascending order.
    @param arr: the array of the values to be sorted 
    @return: the sorted array
*/
function mergeSort (arr){
    let len = arr.length;
    if (len < 2) {
        return arr;
    }
    let mid = Math.floor(len / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}; //end mergeSort

/* 
    Function getNum: finds the digit in a specific number at a specific index
    @param num: the number to be searched 
    @param index: the place on the number qhere the digit will be search. 
    @return: the digit of the number 
*/
const getNum = (num, index) => {
    const strNum = String(num);
    let end = strNum.length - 1;
    const foundNum = strNum[end - index];
  
    if (foundNum === undefined) return 0;
    else return foundNum;
}; //end getNum

/* 
    Function largestNum:finds the largest number in the array
    @param arr: the array to be searched 
    @return: the length of the largest number in the array
*/
const largestNum = arr => {
    let largest = "0";
  
    arr.forEach(num => {
      const strNum = String(num);
  
      if (strNum.length > largest.length) largest = strNum;
    });
  
    return largest.length;
}; //end largestNum

/* 
    Function radixSort: sorts an array by creating buckets, where each number is 
    stored based on its digits and then putting it back into the original array. This
    process repeats the length of the largest number in the array.  
    @param arr: the array to be sorted
    @return arr: sorted array
*/
const radixSort = arr => {
    let maxLength = largestNum(arr);
  
    for (let i = 0; i < maxLength; i++) {
      let buckets = Array.from({ length: 10 }, () => []);
  
      for (let j = 0; j < arr.length; j++) {
        let num = getNum(arr[j], i);
  
        if (num !== undefined) buckets[num].push(arr[j]);
      };
      arr = buckets.flat();
    };
    return arr;
}; //end radixSort