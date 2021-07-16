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

// kata 9 

const
  id = x => x,
  number = x => (f = id) => f(x),
  [zero, one, two, three, four, five, six, seven, eight, nine] =
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number),
  plus = x => y => y + x,
  minus = x => y => y - x,
  times = x => y => y * x,
  dividedBy = x => y => y / x;

// solution 2

var n = function(digit) {
  return function(op) {
    return op ? op(digit) : digit;
  }
};
var zero = n(0);
var one = n(1);
var two = n(2);
var three = n(3);
var four = n(4);
var five = n(5);
var six = n(6);
var seven = n(7);
var eight = n(8);
var nine = n(9);

function plus(r) { return function(l) { return l + r; }; }
function minus(r) { return function(l) { return l - r; }; }
function times(r) { return function(l) { return l * r; }; }
function dividedBy(r) { return function(l) { return l / r; }; }

// kata 10 

const loop_size = node => {
  let visited = [];
  while (!visited.includes(node)) {
    visited.push(node);
    node = node.next;
  }
  let distance = visited.length - visited.indexOf(node)
  return distance;
}; 

// kata 11

const convertFrac = (lst, i = 1) => {
  while (!lst.every(([, den]) => i % den === 0)) i++
  return lst.reduce((acc, curr) => acc + `(${curr[0] * i / curr[1]},${i})`,'')
};

// kata 12 

const hexStringToRGB = hexString =>
  (([r, g, b]) => ({r, g, b}))
  (hexString.match(/\w{2}/g).map(val => parseInt(val, 16)));

// kata 13

ipsBetween=(...a)=>a.map(i=>i.split`.`.reduce((a,b,i)=>b*256**(3-i)+a,0)).reduce((a,b)=>b-a)

// solution 2

function ipsBetween(start, end){
  return ipToInt32(end) - ipToInt32(start);
}

function ipToInt32(ip) {
  return parseInt(ip.split('.').map(function(v) {
    var bin = parseInt(v).toString(2);
    return new Array(9 - bin.length).join('0') + bin;
  }).join(''), 2);
}

// kata 14 

const solve = (map, miner, exit, path=[])=> {
  if (!map[miner.x] || !map[miner.x][miner.y]) return false;
  if (miner.x == exit.x && miner.y == exit.y) return path;
  map = map.map(v => v.slice());
  map[miner.x][miner.y] = false;
  return solve(map, {x: miner.x    , y: miner.y - 1}, exit, path.concat('up')) ||
         solve(map, {x: miner.x    , y: miner.y + 1}, exit, path.concat('down')) ||
         solve(map, {x: miner.x - 1, y: miner.y    }, exit, path.concat('left')) ||
         solve(map, {x: miner.x + 1, y: miner.y    }, exit, path.concat('right'));
}
