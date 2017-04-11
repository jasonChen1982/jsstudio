
var promise = new Promise(function(resolve, reject) {
  setTimeout(function(){
    resolve('成功了哩');
  },3e3)
});
promise.then(function(res){
  console.log(res);
});

// Promise.all([])
// Promise.resolve()

function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

var g = function* () {
  try {
    var foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  var it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);

// 循环 Promise
const aa = new Promise((res, rej)=>{
  setTimeout(res,10000);
});
let bb = false;
let cc = false;
aa.then(_=>{
  console.log('>>>>>> aaaaaa <<<<<<');
  return new Promise((res, rej)=>{
    function check() {
      if (!bb) {
        setTimeout(check, 500);
      } else {
        res();
      }
    }
    check();
  });
}).then(_=>{
  console.log('>>>>>> bbbbbb <<<<<<');
  return new Promise((res, rej)=>{
    function check() {
      if (!cc) {
        setTimeout(check, 500);
      } else {
        res();
      }
    }
    check();
  });
}).then(_=>{
  console.log('>>>>>> cccccc <<<<<<');
});