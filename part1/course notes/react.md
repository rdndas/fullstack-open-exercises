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
- the function accepts only one props Object. if multiple parameters need to be passed, destructure it using `{}`
- The Single `props` Object
```javascript
const MyComponent = (props) => {
  // 'props' is the single parameter, and it is always a JavaScript object.
  // Example: { data1: "value", data2: 123 }
  // ...
}
```
- Accessing Multiple Values (Destructuring)
```javascript
<ChildComponent name="John" age={30} /> 
// React bundles these into ONE object: { name: "John", age: 30 }

const ChildComponent = ({ name, age }) => {
    // Here, { name, age } is NOT a list of parameters, 
    // it is destructuring the single 'props' object.
    return <p>{name} is {age} years old.</p>;
}
```

- 3 methods to send and receive props

| Method | What it is | When to use it |
| --- | --- | --- |
| Pass Individually (Recommended) | The parent passes key-value pairs (propName={value}). The child uses destructuring ({ propName }) to pull the values out of the single props object. | Most common and clearest approach for up to 5 or 6 distinct props. |
| Pass as an Object (Your "Dictionary") | The parent creates a single object and passes the whole object under one prop name (userData={myObject}). The child accesses values using dot notation (props.userData.name). | Best for passing large, related data groups (like a user's entire profile or a configuration object). |
| Pass with Spread ({...object}) | The parent uses the spread operator (<Child {...myObject} />). This is syntactic sugar for passing the individual key-value pairs, which the child then receives via destructuring (Option 1). | Great for passing many variables when their names perfectly match what the child component needs. |

