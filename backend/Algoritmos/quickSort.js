/* 
  Algoritmo de quickSort en JavaScript
*/

/* 
  Function QuickSort: Algorithm to sort an array by Quick Sort
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
  }
  
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
  }
  
  let array = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8]
  quickSort(array, 0, array.length - 1)
  console.log(array)