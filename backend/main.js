function generarAleatorio(tamano)
{
    var a;
    for (var i = 0; i < tamano; ++i) { 
        a[i] = Math.random() * 10;
    } 
    return a
}
console.log(generarAleatorio(5));