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
}

console.log(cocktailSort([5,4,3,2,1]));