try {
    module.exports = Promise
  } catch (e) {}

function Promise( handler ){
    let self = this;
    self.status = 'pending';
    self.data = undefined;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];

    function resolve(value){
        if(value instanceof Promise){
            return value.then(resolve,reject);
        }
        setTimeout(()=>{
            if(self.status === 'pending'){
                self.status = 'resolved';
                self.data = value;
                self.onResolvedCallback.forEach( fn => fn(value));
            }
        })
    }
    function reject(err){
        setTimeout(()=>{
            if(self.status === 'pending'){
                self.status = 'rejected';
                self.data = err;
                self.onRejectedCallback.forEach( fn => fn(err));
            }
        })
    }
    
    try {
        handler(resolve,reject)
    }catch(err){
        reject(err);
    }
 }
 //  测试
 Promise.deferred = Promise.defer = function() {
    var dfd = {}
    dfd.promise = new Promise(function(resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
}
Promise.prototype.catch = function(onRejected) {
return this.then(null, onRejected)
}
 Promise.prototype.then = function(onResolved, onRejected){
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : v =>  {
        throw new Error(err)
    };
    let self = this;
    let promise2;
	//  console.log(self,self.onResolvedCallback,'self');
    if(self.status === 'resolved'){
        //  将来返回一个promise对象
        promise2 = new Promise( function(resolved,rejected){
            setTimeout( ()=> {
                try{
                    //  得到上一个then传入的resolve函数处理后的值
                    let x = onResolved(self.data);
                    //  回调处理直到返回的是resolved函数处理上一个then处理后的值
                    resolvePromise(promise2,x,resolved,rejected);
                }catch(err){
                    rejected(err);
                }
            })
        })
    };
    if(self.status === 'rejected'){
        promise2 = new Promise( function(resolved,rejected){
            setTimeout( ()=> {
                try{
                    //  得到上一个then传入的resolve函数处理后的值
                    let x = onRejected(self.data);
                    //  回调处理直到返回的是resolved函数处理上一个then处理后的值
                    resolvePromise(promise2,x,resolved,rejected);
                }catch(err){
                    rejected(err);
                }
            })
        })
    };
	if(self.status === 'pending'){
        promise2 = new Promise( function(resolved, rejected){
            self.onResolvedCallback.push(function(val){
                try{
                    let x = onResolved(val);
                    resolvePromise(promise2,x,resolved,rejected);
                }catch(err){
                    // console.log(err);
                    rejected(err)
                }
            });
			self.onRejectedCallback.push(function(){
                try {
                    let x = onRejected(val);
                    resolvePromise(promise2, x, resolved, rejected)
                } catch (e) {
                    rejected(e);
                } 
            });
        })
    }
    return promise2;
 }
 //  回调处理函数，直到最后返回的不是promise，支持链路调用
 function resolvePromise(promise2, x, resolve, reject){
     if(promise2 === x){
         return reject(new TypeError('循环引入'))
     }
	//  console.log(x,'x');
     let called = false;  //  是否调用过，同一个then只能返回一次
     //  2.3.3
     if(x instanceof Promise){
        if(x.status === 'pending'){
            x.then(function(v){
                resolvePromise(promise2,v,resolve,reject)
            },reject)
        }else{
            x.then(resolve,reject);
        }
        return;
     }
     if(x !== null && (typeof x === 'object' || typeof x ===  'function')){
        try {
            then = x.then;
            //  如果具有then方法，则当成promise对象并调用then方法
            if(typeof then === 'function'){
                //  新的promise处理
                then.call(x,function rs(y){
                    if(called) return;
                    called = true;
                    return resolvePromise( promise2,y,resolve,reject);
                },function rj(err){
                    if(called) return;
                    called = true;
                    return reject(err);
                })
            }else{
                resolve(x);
            }
        }catch(err){
            if(called) return;
            called = true;
            reject(err);
        }
     }else{
        resolve(x);
     }
 }




// new Promise(function(resolve,reject){
// 	console.log('start');
// 	resolve(2);
// 	//  setTimeout( ()=> {console.log(1);resolve(2) }, 3000)
// }).then( res=>{
	
// 	console.log(res,'res');
// }).then(res => console.log(res,'res2')).then(res=>{
// 	console.log(res,'res3');
// })






