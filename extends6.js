/***************************************寄生组合式继承******************************************/

//  组合继承 子类不是父类的实例


function inheritObject(o) {
    function F() { }
    // console.log(o)
    F.prototype = o
    return new F()
}

function inheritProperty(subClass, superClass) {
    const p = inheritObject(superClass.prototype)
    p.constructor = subClass
    subClass.prototype = p
}

function SuperClass(name) {
    this.name = name
    this.books = [1, 2, 3]
}
SubClass.prototype.getName = function () {
    return this.name
}

function SubClass(name, id) {
    SuperClass.call(this, name)
    this.id = id
}

inheritProperty(SubClass, SuperClass)

SubClass.prototype.getId = function () {
    return this.id
}

const instance1 = new SubClass('张三', 12)
const instance2 = new SubClass('李四', 22)

console.log(instance1)
instance1.books.push(4)
console.log(instance2)