var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Recibe un array y el elemento a Buscar. Devolverá el arreglo  si en caso
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
}

console.log(binarySearch(a, 3));