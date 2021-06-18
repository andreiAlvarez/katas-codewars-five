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
