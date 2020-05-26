const bodyParser = require("body-parser");
const express = require("express");
const os = require('os');
var Parallel = require('paralleljs');
const path = require("path");

const app = new express();
const { config, engine } = require("express-edge");

const port = 4000;

var nuRand = [];
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

app.use(express.static(path.join(__dirname, "public")));

app.get('/', async (req, res) => {
    console.log(nuRand[0]);
    res.render('home');
});

app.get('/search', async (req, res) => {
    res.render('search')
});

app.get('/sorting', async (req, res) => {
    res.render('sorting')
});

app.get('/index', async(req, res)=>{
    res.render('index');
})

app.get('/unstable', async (req, res) => {
    res.render('unstable')
});

app.get('/stable', async (req, res) => {
    res.render('stable')
});

//  La página llamada stable (/stable) envía los campos a esta solicitud POST
//  aquí se igualan los valores insertados para que sean usados por otras operaciones.
//  var primer = campo llamado primerAlg en ../frontend/stable.edge
//  var segundo = campo llamado segundoAlg en ../frontend/stable.edge
//  convRand = parseInt(campo llamado noRand en ../frontend/stable.edge)
app.post('/algoritmosEstables/conf', async(req, res)=>{
    var primer = req.body.primerAlg;
    var segundo = req.body.segundoAlg;

    var convRand = parseInt(req.body.noRand);

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand.push(convRand);

    console.log("\n" + primer + "\n" + segundo + "\n" + nuRand);

    res.render('')
});

app.listen(port, () => {
    console.log('App is running in port ' + port)
});

//Paralelización
var cantNum = parseInt(nuRand);
const n_cpus = os.cpus().length;
var cantXthread = Math.floor(cantNum/n_cpus);

var arreglo = [] ;//new Array(p.data.length*2);
function aleatorio(tamano) {
    var a = new Array(tamano);
    for (var i = 0; i < tamano; ++i) { 
        a[i]= Math.floor(Math.random() * (tamano*8));
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
            var tiempoFinal = endprim-primero;
            console.log(`Prim Execution time: ${tiempoFinal} ms`);
            console.timeEnd("primero");
        });
        var segundo = Date.now();
        console.time("segundo");
        dos.spawn(hola).then(function (n) {
            console.timeEnd("segundo");
            var endseg = Date.now();
            console.log(`Seg Execution time: ${endseg - segundo} ms`);
        });

    });
}
//principal();