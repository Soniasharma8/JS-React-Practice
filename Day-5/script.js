/* -------------------- 📝 Day-1 Practice Questions (If–Else / Basic Logic) -------------------- */

/* 1. Take a variable temperature.
If temperature is greater than 30, print "It's Hot". Otherwise, print "It's Cool". */
let temp = 30;
if (temp >= 30) {
  console.log("It's Hot");
} else {
  console.log("It's Cold");
}

/* 2. Take a variable age.
If age is greater than or equal to 18, print "Eligible for Vote". Otherwise, print "Not Eligible". */
let age = 17;
if(age >= 18) {
  console.log("Eligible for Vote");
} else {
  console.log("Not Eligible")
}

/* 3. Take a variable marks.
If marks are greater than or equal to 40, print "Pass". Otherwise, print "Fail". */
let marks = 30;
if(marks >= 40) {
    console.log("Pass");
} else {
     console.log("Fail");
 }

/* 4.Take a variable num.
If the number is even, print "Even Number". Otherwise, print "Odd Number". */
let num = 2;
if(num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

/* 5. Take a variable cart (array).
If the cart is empty, print "Cart is Empty". Otherwise, print "Cart has Products". */
let cart = ["Apple"];
if(cart.length === 0) {
    console.log("cart is empty");
} else {
     console.log("cart is full");
}

/* -------------------- 📝 Day-2 Practice Questions (Arrays & Loops Practice) -------------------- */

/* 1. Create an array fruits = ["apple", "banana", "mango"] and print all fruits using a for loop. */
let fruits = ["apple", "banana", "mango"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

/* 2. Print the same fruits array using .map() function. */
fruits.map((fruit) => {
    console.log(fruit);
});

/* 3. Create an array numbers = [2, 4, 6, 8, 10] and print each element doubled. */
let numbers = [2, 4, 6, 8, 10];
numbers.map((num) => {
    console.log(num * 2);
});

/* 4. Create an array marks = [45, 60, 30, 90, 55]. Print only the passing students (marks ≥ 40).*/
let marks = [45, 60, 30, 90, 55];
marks.map((m) => {
    if (m >= 40) {
        console.log(m);
    }
});

/* 5. Create an array cart = ["shoes", "bag", "watch"]. Check using a loop whether "watch" exists in the cart. If found → print "Watch found" Otherwise → print "Watch not found"  */
let cart = ["shoes", "watch", "bag"];
if (cart.includes("watch")) {
  console.log("watch was found");
} else {
  console.log("watch was not found");
}

/* -------------------- 📝 Day-3 Practice Questions (Functions Practice) -------------------- */
/* 1. Create a function greetUser(name) that prints a greeting message in the console. */
function greetUser(name) {
    console.log("Hello " + name + ", Welcome Back!");
}
greetUser("Sonia");
greetUser("Rahul");

/* 2. "Create a function square(number) that returns the square of a given number." */
function square(number) {
    return number * number;  
}
console.log(square(5));  // Output: 25
console.log(square(9));  // Output: 81

/* 3. Write a function isEven(num) that checks whether a number is even or odd.If the number is even → return true If the number is odd → return false */\
function isEven(num) {
    return num % 2 === 0; 
}
console.log(isEven(4)); // true
console.log(isEven(5)); // false

/* 4. Write a function calculateTotal(cart) that returns the total price of the cart array. */
let cart = [100, 250, 50]; 
function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + item, 0);
}
console.log(calculateTotal(cart)); // 400

/* 5. Write a function findMax(arr) that returns the largest number in the array. */
let numbers = [12, 45, 78, 23, 56]; 
function findMax(arr) {
    return Math.max(...arr); 
}
console.log(findMax([12, 45, 78, 23, 56]));

/* 6. Write a function findMax(arr) that returns the biggest number from the array. */
let num = [10, 45, 32, 99, 7];
function findMax(arr) {
    return Math.max(...arr)
}
console.log(findMax([10, 45, 32, 99, 7]));

/* 7. Write a function findMin(arr) that returns the smallest number from the array. */

let num = [10, 45, 32, 99, 7];
function findMin(arr) {
    return Math.min(...arr)
}
console.log(findMin([10, 45, 32, 99, 7]));

/* 8. Write a function filterEven(arr) that returns only the even numbers from the array. */

let arr = [2, 5, 8, 11, 14];
function filterEven(num) { 
   return num.filter((item) => item % 2 === 0);
}
console.log(filterEven(arr));


/* 9. Write a function filterOdd(arr) that returns only the odd numbers from the array. */

let arr = [2, 5, 8, 11, 14];
function filterOdd(num) {
    return arr.filter((item) => item % 2 === 1);
}
console.log(filterOdd(arr));

/* -------------------- Array Methods Practice Set -------------------- */
// 1.
    let num = [1,2,3,4,5];
    function newArr(sum) {
        return sum.map((item) => item * 2);
    }
    console.log(newArr(num));


  // 2.
let str = ["a", "b", "c"];
    function newStr(a) {
        return a.map((item) => item.toUpperCase());
    }

    console.log(newStr(str));
// 3.
    let num = [10, 25, 30, 45, 60];
    function min(a) {
        return a.filter((item) => item < 30);
    }
console.log(min(num));

// 4.
let num1 = [2, 5, 8, 11, 14];
function findEven(b) {
    return b.filter((item) => item % 2 === 0);
}

console.log(findEven(num1));
//5.

let num = [5, 10, 15];
function newSum(a) {
    return a.reduce((acc, item) => item + acc, 0);
}

console.log(newSum(num));

//6. 
let num1 = [2, 3, 4];
function newArr(b) {
    return b.reduce((accc, item) => item * accc, 1)
}

console.log(newArr(num1));

//7.
let num = [3, 7, 12, 18, 21];
function newArr(a) {
    return a.find((item) => item > 10)
}

console.log(newArr(num));

//8.
let str = ["apple", "banana", "cherry"];
function newStr(c) {
    return c.find((item) => item === "banana")
}

console.log(newStr(str))

//9.
let num = [1, 2, 3, 4, 5];
function newNum(a) {
    return a.some((item) => item > 4)
}

console.log(newNum(num));

//10.
let str = ["dog", "cat", "lion"];
function newStr(b) {
    return b.some((item) => item === "tiger" )
}

console.log(newStr(str));

//11.
let num = [2, 4, 6, 8];
function findEven(a) {
    return a.every((item) => item % 2 === 0)
}

console.log(findEven(num));

//12.
let num1 = [5, 10, 15, 20];
function findBig(b) {
    return b.every((item) => item > 0)
}
console.log(findBig(num1));

//13.
let num = ["red", "blue", "green"];
function newColor(a) {
    return a.includes('blue')
}

console.log(newColor(num));

//14.
let num1 = [100, 200, 300];
function findVal(b) {
    return b.includes(500)
}

console.log(findVal(num1));

/* --------------------Next Day Practice -------------------- */

// Questions 1. Take a string `" MERN Stack Developer "`, clean it (remove extra spaces), and print it in all capital letters.
// 2. Take an array `["React", "Node", "MongoDB"]` and convert it into a single string.
// 3. Take a string `"JavaScript is awesome"` and print the first word.
// 4. Take an array `[50, 10, 70, 20]`, sort it, and then reverse it.
// 5. Take a string `"apple,banana,grapes"`, split it into an array, and print the last fruit.

// 1. Capital letters
let abc = "MERN Stack Developer";
let a = abc.trim().toUpperCase();
console.log(a);  // "MERN STACK DEVELOPER"

// 2. Array to string
let a1 = ["React", "Node", "MongoDB"];
let b1 = a1.join(" ");   
console.log(b1);  // "React Node MongoDB"

// 3. First word of string
let a2 = "JavaScript is awesome";
let b2 = a2.split(" ")[0];   
console.log(b2);  // "JavaScript"

// 4. Sort + reverse
let a3 = [50, 10, 70, 20];
let b3 = a3.sort((x, y) => x - y).reverse();  
console.log(b3);  // [70, 50, 20, 10]

// 5. Last fruit from string
let a4 = "apple,banana,grapes";
let b4 = a4.split(",");      
console.log(b4[b4.length - 1]);  // "grapes"











