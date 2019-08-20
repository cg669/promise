/***************************************寄生式继承******************************************/

// 


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

function createObj(obj) {
    const o = new inheritObject(obj)
    o.getBooks = function () {
        console.log(this)
        return this.books
    }
    return o
}

const instance1 = createObj(obj)
const instance2 = createObj(obj)

console.log(instance1, instance1.getBooks())
instance1.books.push(4)
console.log(instance2, instance2.getBooks())