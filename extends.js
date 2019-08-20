/***************************************类式继承******************************************/
function SuperClass() {
    this.superValue = true
    this.books = [1, 2, 3]
}

SuperClass.prototype.getSuperValue = function () {
    return this.superValue
}

function SubClass() {
    this.subValue = false
}

SubClass.prototype = new SuperClass()

//  这种方式也会覆盖掉
// SubClass.prototype = {
//     getSubValue: function () {
//         return this.subValue
//     }
// }
SubClass.prototype.getSubValue = function () {
    return this.subValue
}

// console.log(SubClass.prototype);

// console.log(SuperClass);

/**
 * 类式继承  由于子类的property指向的是父类的实例，进而继承父类
 * 如果父类的共有属性是引用类型，多个实例对象如果对父类的共有属性操作时候会相互影响
 */
const instance1 = new SubClass()
const instance2 = new SubClass()

console.log(instance1.books)
instance1.books.push(4)
console.log(instance2.books)