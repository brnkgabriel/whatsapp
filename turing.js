// const user = {
//   hello: "Welcome to Turing",
//   sayWelcome() {
//     console.log(this.hello)
//   }
// }

// setTimeout(user.sayWelcome.bind(user), 1000)

// console.log(1)
// setTimeout(() => {
//   console.log(2)
// }, 0);
// Promise.resolve(3).then(console.log)
// console.log(4)

// var URL = require("url").URL
// const myURL = new URL("https://example.org:8888")
// console.log(myURL.port)
// myURL.port = "443"
// console.log(myURL.port)
// myURL.port = 1234
// console.log(myURL.port)
// console.log(myURL.href)
// myURL.port = "abcd"
// console.log(myURL.port)
// myURL.port = "5678abcd"
// console.log(myURL.port)
// myURL.port = 1234.5678
// console.log(myURL.port)
// console.log(myURL.href)

// {
//   console.time("loop")
//   for (let i = 0; i < 1000000; i+= 1) {

//   }
//   console.timeEnd("loop")
// }

// let inputs = [1, "Turing", {x: 2}, [3, 4], {y: 5}]

// for (let i = 0; i < inputs.length; i++) {
//   if (inputs[i] === "Turing") inputs.splice(i, 1)
//   else console.log(inputs[i])
// }

// let a = {y: 10}
// a.x = a
// console.log(JSON.stringify(a))

let arg = [1, "Turing", {x: 2}, [3,4]]
delete arg[1]
console.log(arg.length)
console.log(arg)