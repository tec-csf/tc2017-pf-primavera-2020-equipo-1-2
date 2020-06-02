let array = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8]

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
};

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
  };

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
}
  
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
  };

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
  }
  
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
  };