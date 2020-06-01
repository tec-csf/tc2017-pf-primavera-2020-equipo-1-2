const bodyParser = require("body-parser");
const express = require("express");
const os = require('os');
var Parallel = require('paralleljs');
const path = require("path");
const fs = require("fs-extra");
const jsonfile = require("jsonfile");

const app = new express();
const {
    config,
    engine
} = require("express-edge");

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
app.get('/', async (req, res) => {
    //console.log(nuRand[0]);
    res.sendFile(path.resolve(__dirname, '../frontend/home.html'));
});

app.get('/search', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/search.html'))
});

app.get('/sorting', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/sorting.html'))
});

app.get('/animacionInestables', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/AnimacionInestables.js'))
})

app.get('/unstable', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/unstable.html'))
});

app.get('/stable', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/stable.html'))
});

app.get('/stableUI', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/stableUI.html'))
})

app.get('/unstableUI', async (req, res) => {
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

app.get('/heapsortDisplay', async (req, res) => {
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

app.get('/info', async(req, res)=>{
    res.sendFile(path.resolve(__dirname, '../frontend/info.html'))
})

//A partir de esta sección se están mandando a llamar los datos insertados en los forms/botones individuales,
//que se encuentran en la segunda tabla del stableUI.html

//Tipo y nombre de la operación
app.post('/burbujaVis', async(req, res)=>{
    //Este es el valor que está siendo insertado por el usuario
    var inputNo = parseInt(req.body.noRand);

    //Va a abrir en la misma ventana el documento que hayan especificado y va a enviar el campo llamado
    //inputN
    res.redirect('/NOMBREDOCUMENTO', {
        inputNo
    })

    console.log(inputNo);
})

app.post('/bucketVis', async(req, res)=>{
    var inputNo = parseInt(req.body.noRand);

    console.log(inputNo);
})

app.post('/cocktailVis', async(req, res)=>{
    var inputNo = parseInt(req.body.noRand);

    console.log(inputNo);
})

app.post('/countingVis', async(req, res)=>{
    var inputNo = parseInt(req.body.noRand);

    console.log(inputNo);
})

app.post('/insertVis', async(req, res)=>{
    var inputNo = parseInt(req.body.noRand);

    console.log(inputNo);
})

app.post('/mergeVis', async(req, res)=>{
    var inputNo = parseInt(req.body.noRand);

    console.log(inputNo);
})

app.post('/radixVis', async(req, res)=>{
    var inputNo = parseInt(req.body.noRand);

    console.log(inputNo);
})
//Hasta acá 


//  La página llamada stable (/stable) envía los campos a esta solicitud POST
//  aquí se igualan los valores insertados para que sean usados por otras operaciones.
//  var primer = campo llamado primerAlg en ../frontend/stable.edge
//  var segundo = campo llamado segundoAlg en ../frontend/stable.edge
//  convRand = parseInt(campo llamado noRand en ../frontend/stable.edge)
app.post('/algoritmosEstables/conf', async (req, res) => {
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
                    res.redirect('/tiempos')
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
                            bucketSort(n);
                            console.time("segundo");
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
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
                            bucketSort(n);
                            var endprim = Date.now();
                            var tiempoFinalUno = endprim - primero;
                            console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                            console.timeEnd("primero");
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
                            bucketSort(n);
                            var endprim = Date.now();
                            var tiempoFinalUno = endprim - primero;
                            console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                            console.timeEnd("primero");
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
                            bucketSort(n);
                            var endprim = Date.now();
                            var tiempoFinalUno = endprim - primero;
                            console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                            console.timeEnd("primero");
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
                            bucketSort(n);
                            var endprim = Date.now();
                            var tiempoFinalUno = endprim - primero;
                            console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                            console.timeEnd("primero");
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
                            bucketSort(n);
                            var endprim = Date.now();
                            var tiempoFinalUno = endprim - primero;
                            console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                            console.timeEnd("primero");
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
                            bucketSort(n);
                            var endprim = Date.now();
                            var tiempoFinalUno = endprim - primero;
                            console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                            console.timeEnd("primero");
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
                            bucketSort(n);
                            var endprim = Date.now();
                            var tiempoFinalUno = endprim - primero;
                            console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                            console.timeEnd("primero");
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
                            bucketSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

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
                    function principal() {
                        var prueba = Date.now();
                        var p = new Parallel(min());
                        console.time("arreglo");
                        var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                            var uno = new Parallel(n);
                            var dos = new Parallel(n);
                            console.time("primero");
                            var primero = Date.now();
                            uno.spawn(countingSort).then(function (n) {
                                console.timeEnd("primero");
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            bucketSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

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
                            uno.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(countingSort).then(function (n) {
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
                            uno.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(countingSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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

        case "insertion":
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
                            uno.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            bucketSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

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
                            uno.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(countingSort(n)).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(countingSort(n)).then(function (n) {
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
                            uno.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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
                            uno.spawn(insertionSort).then(function (n) {
                                console.timeEnd("segundo");
                                var endseg = Date.now();
                                var tiempoFinalDos = endseg - segundo;
                                console.log(`Seg Execution time: ${tiempoFinalDos} ms`);
                                /* res.send("Tiempo total: " + tiempoFinalDos) */
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

        case "merge":
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

                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            mergeSort(n)

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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            mergeSort(n)
                            var segundo = Date.now();
                            console.time("segundo");
                            bucketSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            mergeSort(n)
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
                            uno.spawn(countingSort(n)).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(countingSort(n)).then(function (n) {
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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            mergeSort(n)
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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            mergeSort(n)
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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            mergeSort(n)
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

        case "redix":
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

                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            radixSort(n);

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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            radixSort(n);
                            var segundo = Date.now();
                            console.time("segundo");
                            bucketSort(n);
                            console.timeEnd("segundo");
                            var endseg = Date.now();
                            var tiempoFinalDos = endseg - segundo;
                            console.log(`Seg Execution time: ${tiempoFinalDos} ms`);

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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            radixSort(n);
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
                            uno.spawn(countingSort(n)).then(function (n) {
                                var endprim = Date.now();
                                var tiempoFinalUno = endprim - primero;
                                console.log(`Prim Execution time: ${tiempoFinalUno} ms`);
                                console.timeEnd("primero");
                            });
                            var segundo = Date.now();
                            console.time("segundo");
                            dos.spawn(countingSort(n)).then(function (n) {
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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            radixSort(n);
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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            radixSort(n);
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
                            console.timeEnd("primero");
                            var endseg = Date.now();
                            var tiempoFinalUno = endseg - primero;
                            console.log(`Seg Execution time: ${tiempoFinalUno} ms`);
                            /* res.send("Tiempo total: " + tiempoFinalDos) */
                            radixSort(n);
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

        default:
            console.log("null")
            break;
    }

    //res.redirect('/');
});

app.post('/algoritmosInestables/conf', async (req, res) => {
    var primer = req.body.primerAlg;
    var segundo = req.body.segundoAlg;
    var ordenImpresion = req.body.ordenImp;
    var convRand = parseInt(req.body.noRand);

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand = [];

    nuRand.push(convRand);

    var cantNum = convRand;
    const n_cpus = os.cpus().length;
    var cantXthread = Math.floor(cantNum / n_cpus);

    //var p = new Parallel([2,8]);
    var arreglo = []; //new Array(p.data.length*2);
    function aleatorio(tamano) {
        var a = new Array(tamano);
        for (var i = 0; i < tamano; ++i) {
            a[i] = Math.floor(Math.random() * (tamano * 8));
        }
        return a;
    }
    //esta función concatena los arreglos para que se unan
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

    //crea un arreglo con la cantidad que debe tener cada hilo que procese la funcion de paralelizacion
    //Ejemplo: si tienes 4 cores y quieres hacer 40 elementos en un arreglo
    //se crea el arreglito= [10,10,10,10]; :D que sería lo que mandaría la funcion paralle
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

    function shellSort(arreglo) {
        /*
         * for-loop setup:
         *      1. set the gapSize to the length of the arreglo / 2
         *      2. run the loop as long as gapSize > 0
         */
        for (let gapSize = Math.floor(arreglo.length / 2); gapSize > 0; gapSize = Math.floor(gapSize / 2)) {
            for (let currentIndex = gapSize; currentIndex < arreglo.length; currentIndex++) {

                // save the currentIndex
                let currentIndexCopy = currentIndex
                // save the value of the currentIndex
                let itemValue = arreglo[currentIndex]

                while (currentIndexCopy >= gapSize && arreglo[currentIndexCopy - gapSize] > itemValue) {
                    arreglo[currentIndexCopy] = arreglo[currentIndexCopy - gapSize]
                    currentIndexCopy -= gapSize
                }

                arreglo[currentIndexCopy] = itemValue
            }
        }
    };

    function selectionSort(arreglo) {
        // step 1: loop from the beginning of the arreglo to the second to last item
        for (let currentIndex = 0; currentIndex < arreglo.length - 1; currentIndex++) {
            // step 2: save a copy of the currentIndex
            let minIndex = currentIndex;
            // step 3: loop through all indexes that proceed the currentIndex
            for (let i = currentIndex + 1; i < arreglo.length; i++) {
                /* step 4:  if the value of the index of the current loop is less
                            than the value of the item at minIndex, update minIndex
                            with the new lowest value index */
                if (arreglo[i] < arreglo[minIndex]) {
                    // update minIndex with the new lowest value index
                    minIndex = i;
                }
            }
            // step 5: if minIndex has been updated, swap the values at minIndex and currentIndex
            if (minIndex != currentIndex) {
                let temp = arreglo[currentIndex];
                arreglo[currentIndex] = arreglo[minIndex];
                arreglo[minIndex] = temp;
            }
        }
    };

    function heapSort(arreglo) {
        let size = arreglo.length

        // build heapSort (rearrange arreglo)
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
            heapify(arreglo, size, i)

        // one by one extract an element from heapSort
        for (let i = size - 1; i >= 0; i--) {
            // move current root to end
            let temp = arreglo[0]
            arreglo[0] = arreglo[i]
            arreglo[i] = temp

            // call max heapify on the reduced heapSort
            heapify(arreglo, i, 0)
        }
        return arreglo;
    }

    // to heapify a subtree rooted with node i which is an index in arreglo[]
    function heapify(arreglo, size, i) {
        let max = i // initialize max as root
        let left = 2 * i + 1
        let right = 2 * i + 2

        // if left child is larger than root
        if (left < size && arreglo[left] > arreglo[max])
            max = left

        // if right child is larger than max
        if (right < size && arreglo[right] > arreglo[max])
            max = right

        // if max is not root
        if (max != i) {
            // swap
            let temp = arreglo[i]
            arreglo[i] = arreglo[max]
            arreglo[max] = temp

            // recursively heapify the affected sub-tree
            heapify(arreglo, size, max)
        }
    };

    function quickSort(arreglo, startIndex, endIndex) {
        // verify that the start and end index have not overlapped
        if (startIndex < endIndex) {
            // calculate the pivotIndex
            let pivotIndex = partition(arreglo, startIndex, endIndex)
            // sort the left sub-arreglo
            quickSort(arreglo, startIndex, pivotIndex)
            // sort the right sub-arreglo
            quickSort(arreglo, pivotIndex + 1, endIndex)
        }
        return arreglo;
    }

    function partition(arreglo, startIndex, endIndex) {
        let pivotIndex = Math.floor((startIndex + endIndex) / 2)
        let pivotValue = arreglo[pivotIndex]

        while (true) {
            // start at the FIRST index of the sub-arreglo and increment
            // FORWARD until we find a value that is > pivotValue
            while (arreglo[startIndex] < pivotValue) {
                startIndex++
            }

            // start at the LAST index of the sub-arreglo and increment
            // BACKWARD until we find a value that is < pivotValue
            while (arreglo[endIndex] > pivotValue) {
                endIndex--
            }

            if (startIndex >= endIndex) return endIndex

            // swap values at the startIndex and endIndex
            let temp = arreglo[startIndex]
            arreglo[startIndex] = arreglo[endIndex]
            arreglo[endIndex] = temp
        }
    };

    /* switch (primer) {
        case "heap":
            switch (segundo) {
                case "heap":
                        function principal() {
                            var prueba = Date.now();
                            var p = new Parallel(min());
                            console.time("arreglo");
                            var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                                var uno = n;
                                var dos = n;
                                console.time("primero");
                                var primero = Date.now();
          /*                       console.log(uno); 
                                //heapSort(uno);
                                var endprim = Date.now();
                                console.log(`Prim Execution time: ${endprim - primero} ms`);
                                console.timeEnd("primero");

                                var segundo = Date.now();
                                console.time("segundo");
                                //heapSort(dos);
                                console.timeEnd("segundo")
/*                                 console.log(dos);
                               var endseg = Date.now();
                                console.log(`Seg Execution time: ${endseg - segundo} ms`);

                            });
                        }
                        principal();
                    break;

                case "quick":
                        function principal() {
                            var prueba = Date.now();
                            var p = new Parallel(min());
                            console.time("arreglo");
                            var res = p.map(aleatorio, console.log(Date.now() - prueba)).then(logi).then(function (n) {
                                var uno = new Parallel(n);
                                var dos = new Parallel(n);
                                console.time("primero");
                                var primero = Date.now();
                                
                                heapSort(n);
                                var endprim = Date.now();
                                console.log(`Prim Execution time: ${endprim - primero} ms`);
                                console.timeEnd("primero");


                                console.log(n);
                                var segundo = Date.now();
                                console.time("segundo");
                                console.timeEnd("segundo");
                                quickSort(n);
                                var endseg = Date.now();
                                console.log(`Seg Execution time: ${endseg - segundo} ms`);

                            });
                        }
                        principal();
                    break;

                case "selection":

                    break;

                case "shell":

                    break;

                default:
                    console.log("NULL")
                    break;
            }
            break;

        case "quick":
            switch (segundo) {
                case "heap":

                    break;

                case "quick":

                    break;

                case "selection":

                    break;

                case "shell":

                    break;

                default:
                    console.log("NULL")
                    break;
            }
            break;

        case "selection":
            switch (segundo) {
                case "heap":

                    break;

                case "quick":

                    break;

                case "selection":

                    break;

                case "shell":

                    break;

                default:
                    console.log("NULL")
                    break;
            }
            break;

        case "shell":
            switch (segundo) {
                case "heap":

                    break;

                case "quick":

                    break;

                case "selection":

                    break;

                case "shell":

                    break;

                default:
                    console.log("NULL")
                    break;
            }
            break;

        default:
            console.log("NULL")
            break;
    } */

    //res.redirect('/');
});

app.post('/algoritmosBusqueda/conf', async (req, res) => {
    var primer = req.body.primerAlg;
    var segundo = req.body.segundoAlg;
    var ordenImpresion = req.body.ordenImp;
    var convRand = parseInt(req.body.noRand);

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand = [];

    nuRand.push(convRand);

    var cantNum = convRand;
    const n_cpus = os.cpus().length;
    var cantXthread = Math.floor(cantNum / n_cpus);

    //var p = new Parallel([2,8]);
    var arreglo = []; //new Array(p.data.length*2);
    function aleatorio(tamano) {
        var a = new Array(tamano);
        for (var i = 0; i < tamano; ++i) {
            a[i] = Math.floor(Math.random() * (tamano * 8));
        }
        return a;
    }
    //esta función concatena los arreglos para que se unan
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

    function binarySearch(array, item) {
        var low = 0;
        var high = array.length - 1;

        while (low <= high) {
            var middle = Math.floor((low + high) / 2);
            var guess = array[middle];
            if (guess == item) {
                return middle;
            }
            if (guess > item) {
                high = middle - 1;
            } else {
                low = middle + 1;
            }
        }
        return -1;
    }

    function linearSearch(list, value) {
        let found = false;
        let position = -1;
        let index = 0;

        while (!found && index < list.length) {
            if (list[index] == value) {
                found = true;
                position = index;
            } else {
                index += 1;
            }
        }
        return position;
    }

    switch (primer) {
        case "binary":
            switch (segundo) {
                case "binary":
                    
                    break;
            
                default:
                    break;
            }
            break;
    
        default:
            break;
    }

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
    jsonfile.readFile(primer, function (err, obj) {
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

    console.log("Try 1")

    const documento = req.body.newFile;
    const primerAlg = req.body.primerAlg;
    const segundoAlg = req.body.segundoAlg;
    const fileCont = req.body.fileContent;

    console.log(fileCont)

    console.log("Try finished")

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
