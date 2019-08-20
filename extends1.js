/***************************************构造函数继承******************************************/
function SuperClass(bool) {
    this.superValue = bool
    this.books = [1, 2, 3]
}

SuperClass.prototype.getSuperValue = function () {
    return this.superValue
}

function SubClass(bool) {
    SuperClass.call(this, bool)  //  call用来更改函数的作用环境
    this.subValue = false
}

SubClass.prototype.getSubValue = function () {
    return this.subValue
}

const instance1 = new SubClass(true)
const instance2 = new SubClass(false)

console.log(instance1)
instance1.books.push(4)
console.log(instance2)
// console.log(SubClass.prototype);

// console.log(SuperClass);

/**
 * 构造函数继承  此时没有继承父类的prototype上的方法以及属性
 */