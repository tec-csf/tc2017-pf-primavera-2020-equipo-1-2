// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning
/* 
  Animaciones de Binary Search Tree, dentro de esta categoría esta la 
  implementación de los siguientes algoritmos: Shell sort, Selection Sort,
  Quick Sort y Heap Sort. 
*/
let values = []; //array with the values 
let w = 10; // width de los rectangulos de la animación
let j = 0; //

/* 
  Function tree: this function initializes the root to null 
  @param: nothing 
  @return:nothing
*/
function Tree() {
  // Just store the root
  this.root = null;
} //end Tree

/* 
  Function: Start by visiting the root
  @param: nothing 
  @return: nothing
*/
Tree.prototype.traverse = function() {
  this.root.visit(this.root);
} //end function

/* 
  Function: Start by searching the root
  @param val: the value it is searching
  @return found: returns the value if it's found
*/
Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  return found;
} //end function

/* 
  Function: Add a new value to the tree
  @param val: the value to be added to the tree
  @return: returns nothing
*/
Tree.prototype.addValue = function(val) {
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;
    // An initial position for the root node
    this.root.x = width / 2;
    this.root.y = 16;
  } else {
    this.root.addNode(n);
  }
} //end function

// Binary tree
var tree;

/* 
  Function setup: this function creates the canvas where the animation will be visualized and initializes the tree
  @param: nothing 
  @return:nothing
*/
function setup() {
  createCanvas(1200, 800);

  // New tree
  tree = new Tree();
  values = new Array(40);
  // Add ten random values
  for (var i = 0; i < values.length; i++) {
    tree.addValue(Math.floor(random(values.length*2)));
  }

  background(0);

  // Traverse the tree
  tree.traverse();

  // Search the tree for 10
  var result = tree.search(10);
  if (result == null) {
    console.log('not found');
  } else {
    console.log(result);
  }
} //end setup

/* 
  Function Node: initializes the node in the tree
  @param val: value to be inserted
  @param x: position in x
  @param y: position in y
  @return:nothing
*/
function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  // How far apart should the children nodes be
  // This will be based on "level" in the tree
  this.distance = 2;
  // Now has a an xy position
  this.x = x;
  this.y = y;
}//end function Node

/* 
  Function: Search the tree for a value
  @param val: value to be searched
  @return: value if it's found, else returns null
*/
Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
} //end function

/* 
  Function: visits a node in a tree and draws it
  @param parent: the node to visit
*/
Node.prototype.visit = function(parent) {
  // Recursively go left
  if (this.left != null) {
    this.left.visit(this);
  }
  
  values[j] = this.value;
  j++;
  console.log(values);
  // Print out the value

  // Draw a line from the parent
  stroke(100);
  line(parent.x, parent.y, this.x, this.y);
  // Draw a circle
  stroke(255);
  fill(map(this.value,0,100,0,255),100,100);
  ellipse(this.x, this.y, 24, 24);
  noStroke();
  // Display the value
  fill(255);
  textAlign(CENTER);
  textSize(12);
  text(this.value, this.x, this.y + 4);

  // Go right
  if (this.right != null) {
    this.right.visit(this);
  }
} //end function

/* 
  Function: adds a new node
  @param n: node to be added 
*/
Node.prototype.addNode = function(n) {
  // If it's less go left
  if (n.value < this.value) {
    // Is there nothing there? Place the node
    if (this.left == null) {
      this.left = n;
      // Exponentially shrink the distance between nodes for each level
      this.left.x = this.x - (width / pow(2, n.distance));
      this.left.y = this.y + (height / 12);
    // Keep going!
    } else {
      n.distance++;
      this.left.addNode(n)
    }
    // If it's more go right
  } else if (n.value > this.value) {
    // Is there nothing there? Place the node
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + (width / pow(2, n.distance));
      this.right.y = this.y + (height / 12);
    // Keep going!
    } else {
      n.distance++;
      this.right.addNode(n);
    }
  }
} //end function