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
