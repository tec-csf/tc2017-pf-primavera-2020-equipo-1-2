var nWidth = 400;
var nHeight = 400;
var shuffleArray = new Array(nWidth).fill(0);
var orderArray = new Array(nHeight+1).fill(0);
var finalArray = new Array(nWidth).fill(-1);

var k=0, j=0, z=0;
var nPerCycle = 5;
var rand = x => Math.floor(Math.random()*x);


function setup() {
  createCanvas(nWidth, nHeight);
  shuffleArray = shuffleArray.map(x => rand(nHeight));
  /*console.log("maxRandom", nHeight);
	console.log("nElements", nWidth);
	console.log(shuffleArray);
	console.log(orderArray);*/
}

function draw() {
  background(0);
  stroke(255);
  countingSort();
}

async function countingSort() {
  if(k < shuffleArray.length) {
    //console.log("here: ", shuffleArray[k]);
  orderArray[shuffleArray[k++]] += 1;
  } else {
    if(j < orderArray.length) {
      for(let y=0; y < orderArray[j]; y++) {
        finalArray[z++] = j;
        shuffleArray[z] = finalArray[z];
      }
      j++;
    } else {
      //console.log("FINISHED SORTING");
	  noLoop();
    }
  }
  colorMode(HSB, height);
  for( let i = 0; i < shuffleArray.length; i++ ) {
    stroke(i, height-shuffleArray[i], 255);
    if(shuffleArray[i] == shuffleArray[k]) {
      stroke(0,height,height/2); //esta va recorriendo, comparando
    }
    line(i, height, i, height-shuffleArray[i]);
    if(finalArray[i] != -1) {
      stroke(0,255,0);
	  stroke(i, height-finalArray[i], 255);
      line(i, height, i, height-finalArray[i]);
    }
  }
  colorMode(RGB);
}