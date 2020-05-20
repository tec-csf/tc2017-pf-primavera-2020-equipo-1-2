let array = [12, 11, 15, 10, 9, 1, 2, 3, 13, 14, 4, 5, 6, 7, 8]

function shell(){
    shellSort(array);
}

function selection(){
    selectionSort(array);
}

function heap(){
    heapSort(array);
}

function quick(){
    quickSort(array, 0, array.length - 1);
}