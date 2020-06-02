var miTitulo = document.querySelector('h1');
var orden = document.querySelector('h2');
//import 'bubbleSort.js';

function generarAleatorio(tamano)
{
    var a = new Array(tamano);
    var add;
    for (var i = 0; i < tamano; ++i) { 
        a[i]= Math.floor(Math.random() * 10 )
        console.log(a);
    }
    return a;
}
var regla = generarAleatorio(5);
miTitulo.innerHTML = regla;

orden.innerHTML = bubble_Sort(regla) ;
