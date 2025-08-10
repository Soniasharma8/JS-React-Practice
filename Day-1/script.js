// var fullName  = "Sonia";
// let age = 23;
// const country = "India";
// console.log("My Name is "+ fullName + "," + " I am " + age + " years old," + " and I live in " + country)


// let marks = 49;
// if (marks >= 90) {
//     console.log("Grade A");
// }
// else if(marks >= 70 && marks < 90) {
//     console.log("Grade B");
// }
// else if (marks >= 50 && marks < 70) {
//     console.log("Grade C");
// }
// else {
//     console.log("Fail");
// }

// let colors = ["red", "green", "blue", "yellow"];
// for (let i = 0; i < colors.length; i++) {   
//     console.log(colors[i])
// }

// for(let color of colors) {
//     console.log(color)
// }

// colors.forEach(function(color) {
//     console.log(color)
// })


// function square(number) {
//     console.log(`updated, ${number * number}`)
// }
// square(5);

// function sum(number) {
//     let sum = 0;
//     for(let i = 0; i <= number; i++) {
//         sum += i;
//         }
// }
// sum(5);

// let users = [
//   { name: "Sonia", age: 23 },
//   { name: "Ravi", age: 17 },
//   { name: "Priya", age: 25 }
// ];

// let newuser = users.map(function(user) {
//     return user.name
// })
// console.log(newuser)

// let newuser2 = users.filter(function(user) {
//     return user.age > 18;
// })
// console.log(newuser2);

// let newuser3 = users.find(function(user) {
//     return user.age > 18;
// })
// console.log(newuser3);


// Elements select karna
let title = document.getElementById("title");
let nameInput = document.getElementById("nameInput");
let btn = document.getElementById("btn");

// Event lagana
btn.addEventListener("click", function() {
    let newName = nameInput.value; // input ka value lena
    title.innerText = `Hello, ${newName}!`; // h1 me set karna
});
