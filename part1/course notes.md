### Notes

React Library and JavaScript

#### JavaScript Functions:
 - Functions can be defined using `function()` declaration or arrow function expression syntax
    -  name, parameter and statements within a function expression is optional
    - if name is omitted the function becomes anonymous and local to the function bdody 
    ``` javascript
    const getRectArea = function(width, height) { return width*height;};
    console.log(getRectArea(3,4));
    //Expected output: 12
    ```
    - function expressions are not hoisted unlike function declaration (You cannot use the function before you create them)
    - Named Function
    ```javascript
    const math = {
        factorial: function factorial(n) {
            console.log(n);
            if(n<=1) { 
                return 1;
            }
            return n* factorial(n-1);
        },
    };

    math.factorial(3); //3;2;1
    ```
#### JSX
- layout of react components is mostly written using JSX
- JSX is XML like, every tag needs to be closed (for example <br />)

#### props: passing data to components
- 

#### Other Notes:

##### React

**What it is:** React is an open-source JavaScript library for building user interfaces (UIs). Unlike a full framework, it focuses on the "view" layer of an application. 

A core philosophy of React is composing applications from many specialized reusable components.

**Key features:**

Component-based: UIs are built from small, reusable pieces called components, making code modular and easier to manage.

JSX: A syntax extension that lets you write HTML-like code directly within JavaScript, making the UI more intuitive to build.

Declarative: You describe what your UI should look like for each state, and React efficiently updates the necessary components when the data changes.

Virtual DOM: React uses an in-memory representation of the browser's Document Object Model (DOM) to minimize updates, which improves performance. 

##### Vite
**What it is:** Vite (French for "quick," pronounced "veet") is a next-generation build tool that aims to provide a faster and leaner development experience for modern web projects.

**Key features:**

Speed: Vite's development server is extremely fast because it serves files over native ES modules, eliminating the need for bundling during development.

Hot Module Replacement (HMR): HMR updates the browser instantly as you make changes to your code, without a full page reload, which drastically speeds up the feedback loop.

Optimized production builds: For production, Vite uses a highly-optimized bundler called Rollup to produce efficient, static assets.

Role in a project: Think of Vite as the project's infrastructure. It sets up the development server, configures the build process, and handles many of the complex "under the hood" tasks needed to get a project running.

### Links
- [Function Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
- [Arrow Function Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)