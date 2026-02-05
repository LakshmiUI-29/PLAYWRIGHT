function reverseString(str)
{
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    console.log("Reversed String:", reversed);
    return reversed;
}

function isPalindrome(str)
{
    let reversedStr = reverseString(str);
    if (str === reversedStr) {
        console.log(`${str} is a Palindrome`);
        return true;
    } else {
        console.log(`${str} is not a Palindrome`);
        return false;
    }
}
let input = "madam";

let result = isPalindrome(input);
console.log("Is Palindrome?", result);

function example1(){
    let str = "Hello World";
    wordArray = str.split(" ");
    console.log("Word Array:", wordArray);
    let lastword = wordArray[wordArray.length - 1];
    console.log("Last Word:", lastword);
    console.log("Length of Last Word:", lastword.length);

}
example1();

function example2(){
    let str = "   fly me   to   the moon  ";
    let trimmedStr = str.trim();
    console.log("Trimmed String:", trimmedStr);
    let wordArray = trimmedStr.split(" ");
    console.log("Word Array:", wordArray);
    let lastword = wordArray[wordArray.length - 1];
    console.log("Last Word:", lastword);
    console.log("Length of Last Word:", lastword.length);
}
example2();

function example3(){
    let str = "'listen', 'silent'";
    let result1 = str.replace(/\s+/g,"").toLowerCase();
    let sorted = str.split('').sort().join('') ;
    console.log("Sorted String:", sorted);
    if (result1 === sorted) {
        console.log("The strings are anagrams.");
    } else {
        console.log("The strings are not anagrams.");
    }
}
example3();
