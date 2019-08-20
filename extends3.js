/***************************************组合继承******************************************/
function SuperClass(id) {
    this.superValue = id
    this.books = [1, 2, 3]
}

SuperClass.prototype.getSuperValue = function () {
    return this.superValue
}

function SubClass(id) {
    SuperClass.call(this, id)
    this.subValue = false
}

SubClass.prototype = new SuperClass()

SubClass.prototype.getSubValue = function () {
    return this.subValue
}

// console.log(SubClass.prototype); 

// console.log(SuperClass);

/**
 * 这种继承构造函数的时候执行了一次父类的构造函数
 * 原型类式继承的时候又执行了一次父类的构造函数
 */
const instance1 = new SubClass(1)
const instance2 = new SubClass(2)

console.log(instance1, instance1.books)
instance1.books.push(4)
console.log(instance2, instance1.books)

console.log(instance1 instanceof SuperClass)
console.log(instance1 instanceof SubClass)
console.log(SubClass.prototype instanceof SuperClass)
console.log(SubClass instanceof SuperClass)