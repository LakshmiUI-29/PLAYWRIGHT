//Scoping in JS how var,let,const behaves in various blocks like function block{}, and if block{}

//var scoping

 if (true) {
    var companyName = "Testleaf" // Other programming lang. string companyName = "Testleaf"
     console.log("Accessing var inside the if block ", companyName);    
}
console.log("Accessing var outside the if block ", companyName);  

//let scoping

// if (true) {
//     let companyName = "Testleaf" // Other programming lang. string companyName = "Testleaf"
//     console.log("Accessing let inside the if block ", companyName);    
// }
// console.log("Accessing let outside the if block ", companyName);  //


//const scoping

// if (true) {
//     const companyName = "Testleaf" // Other programming lang. string companyName = "Testleaf"
//     console.log("Accessing const inside the if block ", companyName);    
// }

//Introducing function scope
//var, let and const is function scoped
//let and const is scoped within if block

function greet(){

    var message = "Hello Team"
    console.log(message)

}
 //console.log(message)

 greet()