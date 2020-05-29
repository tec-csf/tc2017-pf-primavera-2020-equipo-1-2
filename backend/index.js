const bodyParser = require("body-parser");
const express = require("express");
const os = require('os');
var Parallel = require('paralleljs');
const path = require("path");
const fs = require("fs-extra");
const jsonfile = require("jsonfile");

const app = new express();
const { config, engine } = require("express-edge");

const port = 4000;

var nuRand = [];
var nombrePrim = [];
var nombreSec = [];

var tiempos = [];

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set("views", `../frontend`);

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Paralelización
var cantNum = 100;
const n_cpus = os.cpus().length;
var cantXthread = Math.floor(cantNum / n_cpus);

var arreglo = []; //new Array(p.data.length*2);
function aleatorio(tamano) {
    var a = new Array(tamano);
    for (var i = 0; i < tamano; ++i) {
        a[i] = Math.floor(Math.random() * (tamano * 8));
    }
    return a;
}

function min() {
    var arreglito = Array(n_cpus);
    for (let i = 0; i < n_cpus; i++) {
        arreglito[i] = cantXthread;

    }
    return arreglito;
}

function hola(d) {
    return d;
};

function bubli(a) {
    var n = a.length - 1;
    var x = a;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {

            //mayor a menor
            if (x[j] < x[j + 1]) {
                var temp = x[j];
                x[j] = x[j + 1];
                x[j + 1] = temp;
            }
        }
    }
    return x;
}

function print() {
    console.log(arguments[0]);
};

function logi(d) {
    if (Array.isArray(arreglo)) {
        arreglo = d[0].concat(d[1]);
    }
    for (let i = 2; i < n_cpus; i++) {
        arreglo = arreglo.concat(d[i]);
    }
    if (arreglo.length < cantNum) {
        for (let index = arreglo.length; index < cantNum; index++) {
            arreglo[index] = Math.floor(Math.random() * cantXthread);
        }
    }
    console.log(arreglo);
    console.log(arreglo.length);
    return arreglo;
};

app.use(express.static(path.join(__dirname, "public")));

//Site rendering
app.get('/',  async(req, res) => {
    //console.log(nuRand[0]);
    res.sendFile(path.resolve(__dirname, '../frontend/home.html'));
});

app.get('/search', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/search.html'))
});

app.get('/sorting', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/sorting.html'))
});

app.get('/animacionInestables', async(req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/AnimacionInestables.js'))
})

app.get('/unstable', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/unstable.html'))
});

app.get('/stable', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/stable.html'))
});

app.get('/stableUI', async(req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/stableUI.html'))
})

app.get('/unstableUI', async(req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/unstableUI.html'))
});

app.get('/search', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/search.html'))
});

app.get('/searchUI', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/searchUI.html'))
});

app.get('/unstableDoc', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/unstableDoc.html'))
});

app.get('/stableDoc', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/stableDoc.html'))
});

app.get("/searchDoc", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/searchDoc.html"));
});

app.get('/heapsortDisplay', async(req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/heapsortDisplay.html'));
})

app.get('/quicksortDisplay', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/quicksortDisplay.html'));
})

app.get('/shellsortDisplay', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/shellsortDisplay.html'))
});

app.get('/selectionsortDisplay', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/selectionsortDisplay.html'));
})

//  La página llamada stable (/stable) envía los campos a esta solicitud POST
//  aquí se igualan los valores insertados para que sean usados por otras operaciones.
//  var primer = campo llamado primerAlg en ../frontend/stable.edge
//  var segundo = campo llamado segundoAlg en ../frontend/stable.edge
//  convRand = parseInt(campo llamado noRand en ../frontend/stable.edge)
app.post('/algoritmosEstables/conf', async(req, res)=>{
    var primer = req.body.primerAlg;
    var segundo = req.body.segundoAlg;
    var inpNumber = parseInt(req.body.noRand);

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand = [];
    nombrePrim = [];
    nombreSec = [];

    nombrePrim.push(primer);
    nombreSec.push(segundo);

/*     console.log("Stable\n" + primer + ", " + segundo + ", " + nuRand);
 */
    var cantNum = inpNumber;
    const n_cpus = os.cpus().length;
    var cantXthread = Math.floor(cantNum / n_cpus);

    var arreglo = []; //new Array(p.data.length*2);
    function aleatorio(tamano) {
        var a = new Array(tamano);
        for (var i = 0; i < tamano; ++i) {
            a[i] = Math.floor(Math.random() * (tamano * 8));
        }
        return a;
    }

    function min() {
        var arreglito = Array(n_cpus);
        for (let i = 0; i < n_cpus; i++) {
            arreglito[i] = cantXthread;

        }
        return arreglito;
    }

    function hola(d) {
        return d;
    };

    function bubli(a) {
        var n = a.length - 1;
        var x = a;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n - i; j++) {

                //mayor a menor
                if (x[j] < x[j + 1]) {
                    var temp = x[j];
                    x[j] = x[j + 1];
                    x[j + 1] = temp;
                }
            }
        }
        return x;
    }

    function print() {
        console.log(arguments[0]);
    };

    function cocktailSort(a) {
        var n = a.length - 1; // tamaño del arreglo
        var x = a; //copy array 
        var swapped = true; //boolean 
        var start = 0;

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
    };

    function insertionSort(a) {
        for (let i = 1; i < a.length; i++) {
            let j = i - 1;
            let tmp = a[i];
            while (j >= 0 && a[j] > tmp) {
                a[j + 1] = a[j]
                j--
            }
            a[j + 1] = tmp
        }
        return a
    };

    function bucketSort(a) {
        if (a.length === 0) {
            return a;
        }
        // Declaring vars
        var n = a.length - 1;
        var i, minValue = a[0],
            maxValue = a[0],
            bucketSize = bucketSize || 5;

        // Setting min and max values
        a.forEach(function (currentVal) {
            if (currentVal < minValue) {
                minValue = currentVal;
            } else if (currentVal > maxValue) {
                maxValue = currentVal;
            }
        })

        // Initializing buckets
        var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
        var allBuckets = new Array(bucketCount);

        for (i = 0; i < allBuckets.length; i++) {
            allBuckets[i] = [];
        }

        // Pushing values to buckets
        a.forEach(function (currentVal) {
            allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
        });

        // Sorting buckets
        a.length = 0;

        allBuckets.forEach(function (bucket) {
            insertionSort(bucket);
            bucket.forEach(function (element) {
                a.push(element)
            });
        });

        return a;
    };

    function countingSort(arr, min, max) {
        var i, z = 0,
            count = [];
        var min = 0,
            max = arr.length - 1;

        for (i = min; i <= max; i++) {
            count[i] = 0;
        }

        for (i = 0; i < arr.length; i++) {
            count[arr[i]]++;
        }

        for (i = min; i <= max; i++) {
            while (count[i]-- > 0) {
                arr[z++] = i;
            }
        }
        return arr;
    };

    function merge(left, right) {
        let result = [],
            leftLen = left.length,
            rightLen = right.length,
            l = 0,
            r = 0;
        while (l < leftLen && r < rightLen) {
            if (left[l] < right[r]) {
                result.push(left[l]);
                l++;
            } else {
                result.push(right[r]);
                r++;
            }
        }
        return result.concat(left.slice(l)).concat(right.slice(r));
    };

    function mergeSort(arr) {
        let len = arr.length;
        if (len < 2) {
            return arr;
        }
        let mid = Math.floor(len / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid);
        return merge(mergeSort(left), mergeSort(right));
    };

    const getNum = (num, index) => {
        const strNum = String(num);
        let end = strNum.length - 1;
        const foundNum = strNum[end - index];

        if (foundNum === undefined) return 0;
        else return foundNum;
    };

    const largestNum = arr => {
        let largest = "0";

        arr.forEach(num => {
            const strNum = String(num);

            if (strNum.length > largest.length) largest = strNum;
        });

        return largest.length;
    };

    const radixSort = arr => {
        let maxLength = largestNum(arr);

        for (let i = 0; i < maxLength; i++) {
            let buckets = Array.from({
                length: 10
            }, () => []);

            for (let j = 0; j < arr.length; j++) {
                let num = getNum(arr[j], i);

                if (num !== undefined) buckets[num].push(arr[j]);
            };
            arr = buckets.flat();
        };
        return arr;
    };

    //Función para join
    function logi(d) {
        if (Array.isArray(arreglo)) {
            arreglo = d[0].concat(d[1]);
        }
        for (let i = 2; i < n_cpus; i++) {
            arreglo = arreglo.concat(d[i]);
        }
        if (arreglo.length < cantNum) {
            for (let index = arreglo.length; index < cantNum; index++) {
                arreglo[index] = Math.floor(Math.random() * cantXthread);
            }
        }
        console.log(arreglo);
        console.log(arreglo.length);
        return arreglo;
    };

    switch (primer) {
        case "burbuja":
            
            switch (segundo) {
                case "burbuja":
                     function principal() {
                         var prueba = Date.now();
                         var p = new Parallel(min());
                         console.time("arreglo");
                         var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                             var uno = new Parallel(n);
                             var dos = new Parallel(n);
                             console.time("primero");
                             var primero = Date.now();
                             uno.spawn(bubli).then(function (n) {
                                 var endprim = Date.now();
                                 var tiempoFinalUno = endprim - primero;
                                 console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                 console.timeEnd("primero");
                             });
                             var segundo = Date.now();
                             console.time("segundo");
                             dos.spawn(bubli).then(function (n) {
                                 console.timeEnd("segundo");
                                 var endseg = Date.now();
                                 var tiempoFinalDos = endseg - segundo;
                                 console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                 /* res.send("Tiempo total: " + tiempoFinalDos) */
                             });

                         });

                     } //Fin principal

                     principal();
                     res.redirect('/quicksortDisplay');
                    break;

                case "bucket":
                     function principal() {
                         var prueba = Date.now();
                         var p = new Parallel(min());
                         console.time("arreglo");
                         var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                             var uno = new Parallel(n);
                             var dos = new Parallel(n);
                             console.time("primero");
                             var primero = Date.now();
                             uno.spawn(bubli).then(function (n) {
                                 var endprim = Date.now();
                                 var tiempoFinalUno = endprim - primero;
                                 console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                 console.timeEnd("primero");
                             });
                             var segundo = Date.now();
                             console.time("segundo");
                             dos.spawn(bucketSort).then(function (n) {
                                 console.timeEnd("segundo");
                                 var endseg = Date.now();
                                 var tiempoFinalDos = endseg - segundo;
                                 console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                 /* res.send("Tiempo total: " + tiempoFinalDos) */
                             });

                         });

                     } //Fin principal

                     principal();
                    break;

                case "cocktail":
                        function principal() {
                         var prueba = Date.now();
                         var p = new Parallel(min());
                         console.time("arreglo");
                         var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                             var uno = new Parallel(n);
                             var dos = new Parallel(n);
                             console.time("primero");
                             var primero = Date.now();
                             uno.spawn(bubli).then(function (n) {
                                 var endprim = Date.now();
                                 var tiempoFinalUno = endprim - primero;
                                 console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                 console.timeEnd("primero");
                             });
                             var segundo = Date.now();
                             console.time("segundo");
                             dos.spawn(cocktailSort).then(function (n) {
                                 console.timeEnd("segundo");
                                 var endseg = Date.now();
                                 var tiempoFinalDos = endseg - segundo;
                                 console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                 /* res.send("Tiempo total: " + tiempoFinalDos) */
                             });

                         });

                     } //Fin principal

                     principal();
                    break;

                case "counting":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bubli).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "insertion":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bubli).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "merge":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bubli).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            mergeSort(n);
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

                        });

                    } //Fin principal

                    principal();
                    break;

                case "redix":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bubli).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            radixSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

                        });

                    } //Fin principal

                    principal();
                    break;

                default:
                    console.log("NULL")
                    break;
            }
            break;
    
        case "bucket":
            switch (segundo) {
                case "burbuja":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bucketSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(bubli).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    res.redirect('/quicksortDisplay');
                    break;

                case "bucket":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bucketSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(bucketSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "cocktail":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bucketSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(cocktailSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "counting":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bucketSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "insertion":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bucketSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "merge":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bucketSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            mergeSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

                        });

                    } //Fin principal

                    principal();
                    break;

                case "redix":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(bucketSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            radixSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

                        });

                    } //Fin principal

                    principal();
                    break;

                default:
                    console.log("NULL")
                    break;
            }
            break;
        
        case "cocktail":
            switch (segundo) {
                case "burbuja":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(cocktailSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(bubli).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    res.redirect('/quicksortDisplay');
                    break;

                case "bucket":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(cocktailSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(bucketSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "cocktail":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(cocktailSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(cocktailSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "counting":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(cocktailSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "insertion":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(cocktailSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });

                        });

                    } //Fin principal

                    principal();
                    break;

                case "merge":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(cocktailSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            mergeSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

                        });

                    } //Fin principal

                    principal();
                    break;

                case "redix":
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(cocktailSort).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            radixSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

                        });

                    } //Fin principal

                    principal();
                    break;

                default:
                    console.log("NULL")
                    break;
            }
            break;

        case "counting":
            switch (segundo) {
                case "burbuja":

                    break;

                case "bucket":

                    break;

                case "binary":

                    break;

                case "cocktail":

                    break;

                case "counting":
                    break;

                case "insertion":
                    break;

                case "merge":
                    break;

                case "redix":
                    break;

                default:
                    console.log("DEF 2")
                    break;
            }
            break;

        case "insertion":
            switch (segundo) {
                case "burbuja":

                    break;

                case "bucket":

                    break;

                case "binary":

                    break;

                case "cocktail":

                    break;

                case "counting":
                    break;

                case "insertion":
                    break;

                case "merge":
                    break;

                case "redix":
                    break;

                default:
                    console.log("DEF 2")
                    break;
            }
            break;

        case "merge":
            switch (segundo) {
                case "burbuja":

                    break;

                case "bucket":

                    break;

                case "binary":

                    break;

                case "cocktail":

                    break;

                case "counting":
                    break;

                case "insertion":
                    break;

                case "merge":
                    break;

                case "redix":
                    break;

                default:
                    console.log("DEF 2")
                    break;
            }
            break;

        case "redix":
            switch (segundo) {
                case "burbuja":

                    break;

                case "bucket":

                    break;

                case "binary":

                    break;

                case "cocktail":

                    break;

                case "counting":
                    break;

                case "insertion":
                    break;

                case "merge":
                    break;

                case "redix":
                    break;

                default:
                    console.log("DEF 2")
                    break;
            }
            break;

        default:
            console.log("DEF 1")
            break;
    }

    //res.redirect('/');
});

app.post('/algoritmosInestables/conf', async(req, res)=>{
    var primer = req.body.primerAlg;
    var segundo = req.body.segundoAlg;

    var ordenImpresion = req.body.ordenImp;

    var convRand = parseInt(req.body.noRand);

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand = [];

    nuRand.push(convRand);

    console.log("Unstable\n" + primer + ", " + segundo + ", " + nuRand);

    res.redirect('/');
});

app.post('/algoritmosBusqueda/conf', async (req, res) => {
    var primer = req.body.primerAlg;
    var segundo = req.body.segundoAlg;

    var convRand = parseInt(req.body.noRand);

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand = [];

    nuRand.push(convRand);

    console.log("Search\n" + primer + ", " + segundo + ", " + nuRand);

    res.redirect('/');
});

app.post('/algoritmosInestables/doc', async (req, res) => {
    var primer = req.body.newFile;

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand = [];

    console.log("Doc unstable\n" + primer);

    res.redirect('/');
});

app.post('/algoritmosEstables/doc', async (req, res) => {
    const primer = req.body.newFile;

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
   jsonfile.readFile(primer, function(err, obj){
       if (err) console.error(err);
       console.dir(obj);
   })

    console.log("Doc stable\n" + primer);

    res.redirect('/');
});

app.post("/algoritmosInestables/doc", async (req, res) => {
  const primer = req.body.newFile;

  //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor.
  jsonfile.readFile(primer, function (err, obj) {
    if (err) console.error(err);
    console.dir(obj);
  });

  console.log("Doc stable\n" + primer);

  res.redirect("/");
});

app.post("/algoritmosBusqueda/doc", async (req, res) => {
    
    const documento = req.body.newFile;
    const primerAlg = req.body.primerAlg;
    const segundoAlg = req.body.segundoAlg;

  //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor.
  jsonfile.readFile(documento, function (err, obj) {
    if (err) console.error(err);
    console.dir(obj);
  });

  console.log("Doc stable\n" + documento + "\n" + primerAlg + "\n" + segundoAlg);

  res.redirect("/");
});

app.listen(port, () => {
    console.log('App is running in port ' + port)
});
