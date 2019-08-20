/***************************************原型式继承******************************************/

//  没必要构建构造函数，仅仅是想模拟一个对象的时候


const obj = {
    books: [1, 2, 3],
    name: 2
}

function inheritObject(o) {
    function F() { }
    // console.log(o)
    F.prototype = o
    return new F()
}

const instance1 = inheritObject(obj)
const instance2 = inheritObject(obj)

console.log(instance1)
instance1.books.push(4)
console.log(instance2)

        //  跟类式继承一样  引用类型被共用  值类型的被复制