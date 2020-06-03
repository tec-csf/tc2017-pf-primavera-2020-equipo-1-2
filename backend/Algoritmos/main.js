/* 
  Algoritmo de prueba para intentar llamar las funciones de diferentes Java Scripts
*/

var miTitulo = document.querySelector('h1');
var orden = document.querySelector('h2');
//import 'bubbleSort.js';

/* 
  Function generarAleatorio: fills an array with random numbers
  @param arr:the array of elements to be sorted
  @return: nothing 
*/
function generarAleatorio(tamano)
{
    var a = new Array(tamano);
    var add;
    for (var i = 0; i < tamano; ++i) { 
        a[i]= Math.floor(Math.random() * 10 )
        console.log(a);
    }
    return a;
} //end generarAleatorio

var regla = generarAleatorio(5);
miTitulo.innerHTML = regla;

orden.innerHTML = bubble_Sort(regla) ;
