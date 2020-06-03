/* 
  Código de los algoritmos Inestables, dentro de esta categoría esta la 
  implementación de los siguientes algoritmos: Shell sort, Selection Sort,
  Quick Sort y Heap Sort. 
*/

let array = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8] //array to be sorted

/* 
  Function Shell Sort:It's a variation of insertion sort. The idea of shellSort is to allow exchange of far items. 
  In shellSort, we make the array h-sorted for a large value of h. We keep reducing the value of h until it becomes 1. 
  An array is said to be h-sorted if all sublists of every h’th element is sorted.
  @param array:the array of elements to be sorted
  @return:nothing
*/
function shellSort(array) {
    /*
     * for-loop setup:
     *      1. set the gapSize to the length of the array / 2
     *      2. run the loop as long as gapSize > 0
     */
    for (let gapSize = Math.floor(array.length / 2); gapSize > 0; gapSize = Math.floor(gapSize / 2)) {
      for (let currentIndex = gapSize; currentIndex < array.length; currentIndex++) {
  
        // save the currentIndex
        let currentIndexCopy = currentIndex
        // save the value of the currentIndex
        let itemValue = array[currentIndex]
  
        while (currentIndexCopy >= gapSize && array[currentIndexCopy - gapSize] > itemValue) {
          array[currentIndexCopy] = array[currentIndexCopy - gapSize]
          currentIndexCopy -= gapSize
        }
  
        array[currentIndexCopy] = itemValue
      }
    }
}; //end shellSort

/* 
  Function Selection Sort:This sorting algorithm is an in-place comparison-based algorithm 
  in which the list is divided into two parts, the sorted part at the left end and the unsorted part at the right end. 
  Initially, the sorted part is empty and the unsorted part is the entire list.The smallest element is selected 
  from the unsorted array and swapped with the leftmost element, and that element becomes a part of the sorted array. 
  This process continues moving unsorted array boundary by one element to the right.
  @param array:the array of elements to be sorted
  @return:nothing
*/
function selectionSort(array) {
    // step 1: loop from the beginning of the array to the second to last item
    for (let currentIndex = 0; currentIndex < array.length - 1; currentIndex++) {
      // step 2: save a copy of the currentIndex
      let minIndex = currentIndex;
      // step 3: loop through all indexes that proceed the currentIndex
      for (let i = currentIndex + 1; i < array.length; i++) {
        /* step 4:  if the value of the index of the current loop is less
                    than the value of the item at minIndex, update minIndex
                    with the new lowest value index */
        if (array[i] < array[minIndex]) {
          // update minIndex with the new lowest value index
          minIndex = i;
        }
      }
      // step 5: if minIndex has been updated, swap the values at minIndex and currentIndex
      if (minIndex != currentIndex) {
        let temp = array[currentIndex];
        array[currentIndex] = array[minIndex];
        array[minIndex] = temp;
      }
    }
  }; //end of selectionSort

/* 
  Function HeapSort: sorts the array by creating a heap data and sorting it with it's help
  @param arr:the array of elements to be sorted
  @return: nothing 
*/
function heapSort(array) {
    let size = array.length
  
    // build heapSort (rearrange array)
    for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
      heapify(array, size, i)
  
    // one by one extract an element from heapSort
    for (let i = size - 1; i >= 0; i--) {
      // move current root to end
      let temp = array[0]
      array[0] = array[i]
      array[i] = temp
  
      // call max heapify on the reduced heapSort
      heapify(array, i, 0)
    }
}; //end heapSort
  
/* 
  Function Heapify: auxiliar function for heapSort to sort the array by taking the first element
  of the heap and placing it where it goes, this repeats until it's sorte
  @param arr:the array of elements to be sorted
  @param size: size of the array
  @param i : index where it starts to make the heap
  @return:nothing
*/
  // to heapify a subtree rooted with node i which is an index in array[]
  function heapify(array, size, i) {
    let max = i // initialize max as root
    let left = 2 * i + 1
    let right = 2 * i + 2
  
    // if left child is larger than root
    if (left < size && array[left] > array[max])
      max = left
  
    // if right child is larger than max
    if (right < size && array[right] > array[max])
      max = right
  
    // if max is not root
    if (max != i) {
      // swap
      let temp = array[i]
      array[i] = array[max]
      array[max] = temp
  
      // recursively heapify the affected sub-tree
      heapify(array, size, max)
    }
  }; //end heapify

  /* 
  Function QuickSort: We select a number, called our pivot, 
  which we’ll compare every number to when we loop through our items. 
  The goal is to reorganize the array so it is partitioned into two halves, 
  with everything in each either being less than or greater than our pivot. 
  When the pivot is in it’s final position we’ll move on to doing the same 
  thing with a new pivot, with every pivot being cemented 
  in place until every item has been a pivot at least once.
  @param arr:the array of elements to be sorted
  @param startIndex: the first element of the array 
  @param endIndex: the last element of the array 
  @return: nothing
*/
  function quickSort(array, startIndex, endIndex) {
    // verify that the start and end index have not overlapped
    if (startIndex < endIndex) {
      // calculate the pivotIndex
      let pivotIndex = partition(array, startIndex, endIndex)
      // sort the left sub-array
      quickSort(array, startIndex, pivotIndex)
      // sort the right sub-array
      quickSort(array, pivotIndex + 1, endIndex)
    }
  } // end quickSort

  /* 
  Function Partition: this function is part of the quick sort, it compares the @param start with all the other elements
  from back to front until it finds a smaller value to swap. 
  @param arr:the array of elements to be sorted
  @param startIndex:the first element of the array 
  @param endIndex:the last element of the array 
  @return:nothing
  */
  
  function partition(array, startIndex, endIndex) {
    let pivotIndex = Math.floor((startIndex + endIndex) / 2)
    let pivotValue = array[pivotIndex]
  
    while (true) {
      // start at the FIRST index of the sub-array and increment
      // FORWARD until we find a value that is > pivotValue
      while (array[startIndex] < pivotValue) {
        startIndex++
      }
  
      // start at the LAST index of the sub-array and increment
      // BACKWARD until we find a value that is < pivotValue
      while (array[endIndex] > pivotValue) {
        endIndex--
      }
  
      if (startIndex >= endIndex) return endIndex
  
      // swap values at the startIndex and endIndex
      let temp = array[startIndex]
      array[startIndex] = array[endIndex]
      array[endIndex] = temp
    }
  }; //end partition