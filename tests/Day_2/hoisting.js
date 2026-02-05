//console.log(x); // x is not declared using any keyword like var,let or const
//var x=10
//console.log(x); //10

// /* Internally the .js file is scanned completely and finds a var kyword with a declaration using x

// var x
// console.log(x) // undefined*/



//let hoisting

// console.log(y); // y is not declared using any keyword like var,let or const
// let y

/* Internally the .js file is scanned completely and finds a let kyword with a declaration using y it will point toward a Temporal Dead Zone => Reference Error

let y
console.log(y)// Refernce Error*/

//const hoisting

// console.log(z); // z is not declared using any keyword like var,let or const
// const z

/* Internally the .js file is scanned completely and finds a const kyword with a declaration using z it will point toward a Temporal Dead Zone => Reference Error

const z
console.log(z) // Refernce Error*/