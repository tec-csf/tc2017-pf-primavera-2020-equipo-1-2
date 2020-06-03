/* 
  Algoritmos de busquedas en JavaScript
*/
var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* 
Function binarySearch: this function will look for a number in the array, by spliting the array in half 
and searching on the lower or upper part
@param arr: the array to be searched 
@param item: the number to be searched
@return: the number if found, or -1 if not found 
*/
function binarySearch(array, item){
  var low = 0;
  var high = array.length - 1;

  while(low <= high) {
    var middle = Math.floor((low + high)/2);
    var guess = array[middle];
    if(guess == item){
      return middle;
    }
    if(guess > item){
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
  return -1;
} //end binarySearch

/* 
Function linearSearch: this function will look for a number in the array, 
by searching for the number one by one on the array
@param list: the array to be searched 
@param value: the number to be searched
@return: position where the number is found
*/
function linearSearch(list, value) {
    let found = false;
    let position = -1;
    let index = 0;
  
    while(!found && index < list.length) {
        if(list[index] == value) {
            found = true;
            position = index;
        } else {
            index += 1;
        }
    }
    return position ;
  } //end linearSearch

console.log("Busqueda Secuencial")
console.log(linearSearch(a,3));
console.log("Busqueda Binaria")
console.log(binarySearch(a, 3));