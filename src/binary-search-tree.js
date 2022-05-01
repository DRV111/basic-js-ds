const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.mainRoot = null;
  }
  root() {
    return this.mainRoot;
  }

  add(data) {
    this.mainRoot = addElement(this.mainRoot, data);
    function addElement(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (value < node.data) {
        node.left = addElement(node.left, value);
      } else {
        node.right = addElement(node.right, value);
      }
      return node;
    }
  }

  has(data) {
    return searchElement(this.mainRoot, data);

    function searchElement(node, value) {
      if (!node) {
        return false;
      }
      if (node.data === value) {
        return true;
      }

      return value < node.data
        ? searchElement(node.left, value)
        : searchElement(node.right, value);
    }
  }

  find(data) {
    return findElement(this.mainRoot, data);

    function findElement(node, value) {
      if (!node) {
        return null;
      }

      if (node.data === value) {
        return node;
      }

      return value < node.data
        ? findElement(node.left, value)
        : findElement(node.right, value);
      // if (value < node.data) {
      //   return findElement(node.left, value);
      // } else {
      //   return findElement(node.right, value);
      // }
    }
  }

  remove(data) {
    this.mainRoot = removeElement(this.mainRoot, data);
    function removeElement(node, value) {
      if (!node) {
        return null;
      }
      if (value < node.data) {
        node.left = removeElement(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeElement(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeElement(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.mainRoot) {
      return;
    }

    let node = this.mainRoot;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.mainRoot) {
      return;
    }

    let node = this.mainRoot;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
