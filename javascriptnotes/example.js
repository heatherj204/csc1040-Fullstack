let x = 'Mike'; // best way to create variables
var y = 5; // older way that is not used anymore
z = 7.0; // just create the variable
const a = 'Hello'; // create a constant, its value cannot be changed after

// you dont need to have semi colons at the end of each line this is just soming that used to be the case
let myList = ['john', 'paul', 'george', 'ringo']
let mixedList = ['john', 15, 6.0, 'a']

let myObj = {'name':'Mike', 'age':50}
myObj['name'] // returns mike
myObj.name // returns mike

let num = 2
num + num // 4
num - num // 0
num * num // 4
num ** num // 2^2=4
num/num // 1
num % num // 0
num++ // num+1
num-- // num-1

for(let name of a){
    console.log(name)
}

a.forEach(x => {
    console.log(x)
});

// Example function

function square(x){
    return x**2
}

let square2 = (x)=>x**2

console.log(square(3))
console.log(square2(4))

let myObj2 = {
    'square':square2
}

console.log(myObj2['square'](9))