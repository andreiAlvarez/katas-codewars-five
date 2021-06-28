// kata 1

let Cat = (function () {
  let catCount = 0, catAggWeight = 0;
  let constr = function(name, weight) {
    if(!name || !weight) {throw 'Must provide a name and a weight!';}
    catCount++;
    catAggWeight += weight;
    Object.defineProperty(this, 'weight', {set: function(v) {
      catAggWeight += v - weight;
      weight = v;
    }, get: function() {return weight;}});
  }
  constr.averageWeight = function() {
    return catAggWeight / catCount;
  }
  return constr;
}());

// kata 2

const nouveau = (Constructor, ...args) => Reflect.construct(Constructor, args);

// kata 3

const isPrime = num => {
  for (let i = 2; i <= num ** .5; i++) {
    if (!(num % i)) return false;
  }
  return num > 1;
};

const prime = num =>
  [...Array(++num).keys()].filter(isPrime);


// kata 4

const createArgumentMap=(func,...vals)=>
  func
    .toString()
    .match(/\(([^)]*)\)/)[1]
    .split`,`.filter(e=>e)
    .reduce((a,b,i)=>(a[b]=vals[i],a),{});

// solution 2

function createArgumentMap(func, ...args) {
    let s = func.toString();
    let [i, j] = [s.indexOf('('), s.indexOf(')')];
    let p = s.slice(i+1, j).split(',');
    if (!p[0].length) return [];
    return p.reduce((a, v, i) => {
        a[v] = args[i];
        return a;
    }, {});
}

// kata 5

String.prototype.toBase64 = function() {
  return (new Buffer(this.valueOf())).toString('base64')
}

String.prototype.fromBase64 = function() {
  return (new Buffer(this.valueOf(), 'base64')).toString()
};

// kata 6 

const preOrder = (node) => node == null || node.data == null ? [] : [node.data].concat(preOrder(node.left)).concat(preOrder(node.right));

const inOrder = (node) => node == null || node.data == null ? [] : inOrder(node.left).concat(node.data).concat(inOrder(node.right));

const postOrder = (node) => node == null || node.data == null ? [] : postOrder(node.left).concat(postOrder(node.right)).concat(node.data);

// kata 7 

class Node {
  constructor(value, left = null, right = null){
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const isBST = node => {
  const arr = inOrder(node);
  
  return arr.every( (v, i, a) => i == 0 ? true : v > a[i-1])
    || arr.every( (v, i, a) => i == 0 ? true : v < a[i-1]);
  
  function inOrder(node) { 
    if (node == undefined) return [];
    return inOrder(node.left).concat(node.value).concat(inOrder(node.right)); 
  }
};

// kata 8

const CaesarCipher = function (shift) {
  const code = (str, shift) =>
    str.toUpperCase().replace(/[A-Z]/g, val => String.fromCharCode(65 + (val.charCodeAt() + shift - 65) % 26));
  this.encode = str =>
    code(str, shift);
  this.decode = str =>
    code(str, 26 - shift);
};
