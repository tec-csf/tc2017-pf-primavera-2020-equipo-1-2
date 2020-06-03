/* 
  Algoritmo de selectionSort en JavaScript
*/

/* 
  Function Selection Sort:This sorting algorithm divides the array into two parts, the sorted part at the left end and the unsorted part at the right end. 
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
  } //end selectionSort.js
  
  let array = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8]
  selectionSort(array)
  console.log(array)
  