class Node { 
    constructor(data) { 
      this.left = null
      this.right = null
      this.value = data
    } 
} 
  
class BST {
    constructor() {
      this.root = null
    }
    
    insert(value) {
      let newNode = new Node(value)
      
      if (!this.root) {
        this.root = newNode
      } else {
        this.insertNode(this.root, newNode)
      }
    }
    
    insertNode(root, newNode) {
      if (newNode.value < root.value) {
        if (!root.left) {
          root.left = newNode
        } else {
          this.insertNode(root.left, newNode)
        }
      } else {
        if (!root.right) {
          root.right = newNode
        } else {
          this.insertNode(root.right, newNode)
        }
      }
    }
    
    remove(value) {
      if (!this.root) {
        return 'Tree is empty!'
      } else {
        this.removeNode(this.root, value)
      }
    }
    
    removeNode(root, value) {
      if (!root) {
        return null
      }
      
      if (value < root.value) {
        root.left = this.removeNode(root.left, value)
        return root
      } else if (value > root.value) {
        root.right = tis.removeNode(root.right, value)
        return root
      } else {
        if (!root.left && !root.right) {
          root = null
          return root
        }
        
        if (root.left) {
          root = root.left
          return root
        } else if (root.right) {
          root = root.right
          return root
        }
        
        let minRight = this.findMinNode(root.right)
        root.value = minRight.value
        
        root.right = this.removeNode(root.right, minRight.value)
        return root
      }
    }
    
    findMinNode(root) {
      if (!root.left) {
        return root
      } else {
        return this.findMinNode(root.left)
      }
    }
    
    search(value) {
      if (!this.root) {
        return 'Tree is empty'
      } else {
        return Boolean(this.searchNode(this.root, value))
      }
    }
    
    searchNode(root, value) {
      if (!root) {
        return null
      }
      
      if (value < root.value) {
        return this.searchNode(root.left, value)
      } else if (value > root.value) {
        return this.searchNode(root.right, value)
      }
      
      return root
    }

    inOrder(root) {
        if (!root) {
          return 'Tree is empty'
        } else {
          this.inOrder(root.left)
          console.log(root.value)
          this.inOrder(root.right)
        }
    }
}

var B = new BST();

B.insert(15); 
B.insert(25); 
B.insert(10); 
B.insert(7); 
B.insert(22); 
B.insert(17); 
B.insert(13); 
B.insert(5); 
B.insert(9); 
B.insert(27); 

B.inOrder(15);

