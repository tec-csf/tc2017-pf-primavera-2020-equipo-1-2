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

app.use(express.static(path.join(__dirname, "public")));

//Así se le da render a un html
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

//Render de los HTMLS que despliegan las animaciones

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

    var convRand = parseInt(req.body.noRand);

    //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor. 
    nuRand = [];
    nombrePrim = [];
    nombreSec = [];

    nombrePrim.push(primer);
    nombreSec.push(segundo);
    nuRand.push(convRand);

    console.log(nombrePrim + " " + nombreSec + " " + convRand)

    console.log("Stable\n" + primer + ", " + segundo + ", " + nuRand);



    res.redirect('/');
});

app.post('/algoritmosInestables/conf', async(req, res)=>{
    var primer = req.body.primerAlg;
    var segundo = req.body.segundoAlg;

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
  const primer = req.body.newFile;

  //  Inserta el valor numérico a un arreglo global para que pueda ser accedido por todas las operaciones que dependan de ese valor.
  jsonfile.readFile(primer, function (err, obj) {
    if (err) console.error(err);
    console.dir(obj);
  });

  console.log("Doc stable\n" + primer);

  res.redirect("/");
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