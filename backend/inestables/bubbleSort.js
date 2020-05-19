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
}

console.log(bubble_Sort([1,2,3,4,5]));