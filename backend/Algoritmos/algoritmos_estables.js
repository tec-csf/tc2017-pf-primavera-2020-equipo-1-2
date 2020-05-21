function ascendente(x, j)
{
    if (x[j] > x[j+1]) {
        var temp = x[j];
        x[j] = x[j+1];
        x[j+1] = temp;
    }
};
function descendente(x, j)
{
    if (x[j] < x[j+1]) {
        var temp = x[j];
        x[j] = x[j+1];
        x[j+1] = temp;
    }
};
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
};
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
};
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
};
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
};
function countingSort(arr, min, max)
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
};
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
};
function mergeSort (arr){
    let len = arr.length;
    if (len < 2) {
        return arr;
    }
    let mid = Math.floor(len / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
};
const getNum = (num, index) => {
    const strNum = String(num);
    let end = strNum.length - 1;
    const foundNum = strNum[end - index];
  
    if (foundNum === undefined) return 0;
    else return foundNum;
};
const largestNum = arr => {
    let largest = "0";
  
    arr.forEach(num => {
      const strNum = String(num);
  
      if (strNum.length > largest.length) largest = strNum;
    });
  
    return largest.length;
};
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
};