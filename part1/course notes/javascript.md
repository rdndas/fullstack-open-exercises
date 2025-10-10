#### Javascript
- ECMAScript is the JavaScript Standard
- Browsers do not yet support all of JavaScript's newest features. Due to this fact, a lot of code run in browsers has been transpiled from a newer version of JavaScript to an older, more compatible version.
- Transpiling means - `A source-to-source translator, source-to-source compiler, transcompiler, or transpiler is a type of translator that takes the source code of a program written in a programming language as its input and produces an equivalent source code in the same or a different programming language, usually as an intermediate representation.`

- JavaScript is sort of reminiscent, both in name and syntax, to Java. But when it comes to the core mechanism of the language they could not be more different. Coming from a Java background, the behavior of JavaScript can seem a bit alien, especially if one does not make the effort to look up its features.
- In certain circles, it has also been popular to attempt "simulating" Java features and design patterns in JavaScript. We do not recommend doing this as the languages and respective ecosystems are ultimately very different.

#### Variables

- Few ways to define variables

```javascript
const x = 1
let y = 5

console.log(x, y)   // 1 5 are printed
y += 10
console.log(x, y)   // 1 15 are printed
y = 'sometext'
console.log(x, y)   // 1 sometext are printed
x = 4               // causes an error
```
- variable's data type can change during execution
  
##### var keyword
```javascript
for(var i = 0; i<10; i++) {
  console.log(i)
}
console.log(i)
```

- here inside the loop it will print 0..9 and outside the loop it will print 10
- this is because i is still valid outside the loop.
- it is not bound by the curly braces

```javascript
function printing(){
  for(var i = 0; i<10; i++) {
    console.log(i)
  }
}
printing()
console.log(i)
```
- in the above example, the output is same as the previous example but the last log statement after `printing()` will result in `undefined` sinc it is not 

##### let keyword

```javascript
for(let i = 0; i<10; i++) {
  console.log(i)
}
console.log(i)
```

- scoped within the braces
- 0..9 inside the loop 
- reference error outside the loop
- let defines a normal variable.


##### const keyword
- const does not define a variable but a constant for which the value can no longer be changed. (introduced in 2015 as part of ES6)
- cannot change the value during the course of the program
- you can still change the values of objects like arrays or dictionary but you cannot add new values to the array dictionary
- const declaration ensures the immutability of the reference itself, not the data it points to.

#### Arrays
- Example
```javascript
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each on its own line
})                    
```
- although a variable declared with `const` cannot be reassigned to a different value, contents of the object it references can be modified.
- this is because `const` declaration ensures the immutability of the reference and not the data it points to.
-  new item was added to the array using the method push. 
-  When using React, techniques from functional programming are often used. One characteristic of the functional programming paradigm is the use of immutable data structures. 
-  In React code, it is preferable to use the method concat, which creates a new array with the added item. This ensures the original array remains unchanged.
-  `map` method another array method which creates a new array
-  it can also create something completely different
**Example 1**
```javascript
const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed
```
   - the original value is multiplied by two.

**Example2**
```javascript
const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
```
  - Here an array filled with integer values is transformed into an array containing strings of HTML using the map method. 


- Individual items of an array are easy to assign to variables with the help of the destructuring assignment.

```javascript
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1 2 is printed
console.log(rest)          // [3, 4, 5] is printed```
```
#### Objects
There are a few different ways of defining objects in JavaScript. One very common method is using object literals, which happens by listing its properties within braces:

const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}

The values of the properties can be of any type, like integers, strings, arrays, objects...

The properties of an object are referenced by using the "dot" notation, or by using brackets:
```javascript
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName])    // 35 is printed
```

You can also add properties to an object on the fly by either using dot notation or brackets:
```javascript
object1.address = 'Helsinki'
object1['secret number'] = 12341
```

*The latter of the additions has to be done by using brackets because when using dot notation, **secret number** is not a valid property name b**ecause of the space character**.*

Objects can also be defined using so-called constructor functions, which results in a mechanism reminiscent of many other programming languages, e.g. Java's classes. Despite this similarity, JavaScript does not have classes in the same sense as object-oriented programming languages. There has been, however, the addition of the class syntax starting from version ES6, which in some cases helps structure object-oriented classes.

#### Functions

##### arrow function
- The general syntax
  - (param1, param2, …, paramN) => { statements }
- If there is only one expression you can leave off the {}
  - (param1, param2, …, paramN) => expression
- If there is no parameters you use only the () and they become compulsory
  - () => { statements }
- If there is only one parameter then the parenthesis are optional
  - singleParam => { statements }
- The arrow function feature was added to JavaScript in 2015, with version ES6

##### function
- There are two ways to reference the function.
- one is giving a name in a function declaration.
```javascript
function product(a, b) {
  return a * b
}

const result = product(2, 6)
// result is now 12
```

- The other way to define the function is by using a function expression. 
- In this case, there is no need to give the function a name and the definition may reside among the rest of the code:
```javascript
const average = function(a, b) {
  return (a + b) / 2
}

const result = average(2, 5)
// result is now 3.5
```

#### Object methods and "this"

Arrow functions and functions defined using the function keyword vary substantially when it comes to how they behave with respect to the keyword this, which refers to the object itself.

We can assign methods to an object by defining properties that are functions:
```javascript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {    console.log('hello, my name is ' + this.name)  },}

arto.greet()  // "hello, my name is Arto Hellas" gets printed
```

Methods can be assigned to objects even after the creation of the object:
```javascript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.growOlder = function() {  this.age += 1}
console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed
```

Let's slightly modify the object:

```javascript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
  doAddition: function(a, b) {    console.log(a + b)  },}

arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed
```

Now the object has the method `doAddition` which calculates the sum of numbers given to it as parameters. The method is called in the usual way, using the object arto.`doAddition(1, 4)`or by storing a method reference in a variable and calling the method through the variable: referenceToAddition(10, 15).

If we try to do the same with the method greet we run into an issue:

```javascript
arto.greet()       // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined"
```

When calling the method through a reference, the method loses knowledge of what the original `this` was. Contrary to other languages, in JavaScript the value of `this` is defined based on how the method is called. When calling the method through a reference, the value of `this` becomes the so-called global object and the end result is often not what the software developer had originally intended.

One situation leading to the "disappearance" of this arises when we set a timeout to call the greet function on the arto object, using the setTimeout function.

```javascript
const arto = {
  name: 'Arto Hellas',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

setTimeout(arto.greet, 1000)
```

As mentioned, the value of this in JavaScript is defined based on how the method is being called. When setTimeout is calling the method, it is the JavaScript engine that actually calls the method and, at that point, this refers to the global object.

There are several mechanisms by which the original this can be preserved. One of these is using a method called bind:

```javascript
setTimeout(arto.greet.bind(arto), 1000)
```
Using arrow functions it is possible to solve some of the problems related to this. They should not, however, be used as methods for objects because then this does not work at all. 

#### Classes
here is no class mechanism in JavaScript like the ones in object-oriented programming languages. There are, however, features to make "simulating" object-oriented classes possible.

Let's take a quick look at the class syntax that was introduced into JavaScript with ES6, which substantially simplifies the definition of classes (or class-like things) in JavaScript.

In the following example we define a "class" called Person and two Person objects:

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja Garnbret', 23)
janja.greet()
```

#### Spread 
- The spread (...) syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.

```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(sum(...numbers));
// Expected output: 6

console.log(sum.apply(null, numbers));
// Expected output: 6
```

The syntax may seem a bit strange at first. In practice { ...numbers } creates a new object that has copies of all of the properties of the numbers object. When we specify a particular property in the new object will be passed and added based onteh `sum()`.

Spread syntax can be used when all elements from an object or array need to be included in a new array or object, or should be applied one-by-one in a function call's arguments list. There are three distinct places that accept the spread syntax:
```javascript
    Function arguments list (myFunction(a, ...iterableObj, b))
    Array literals ([1, ...iterableObj, '4', 'five', 6])
    Object literals ({ ...obj, key: 'value' })
```

#### References
- [JavaScript Variables - Should You Use let, var or const?](https://medium.com/craft-academy/javascript-variables-should-you-use-let-var-or-const-394f7645c88f)
- [Keyword: var vs let on JS Tips](http://www.jstips.co/en/javascript/keyword-var-vs-let/)
- [var, let, const - What, why and how - ES6 JavaScript Features](https://www.youtube.com/watch?v=sjyJBL5fkp8)
- [Understanding Javascript's this Keyword in Depth](https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth)
- [Prototypal Inheritance](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance)
- [Boolean, Null, Undefined, Number, String, Symbol, BigInt, and Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [Mozilla's JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript language overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview)
- [Namaste Javascript -  Youtube](https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP)
- [egghead.io](https://egghead.io/)