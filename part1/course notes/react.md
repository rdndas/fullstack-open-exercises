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

### Component state, event handlers

```javascript
const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}
```
Component helper functions

Let's expand our Hello component so that it guesses the year of birth of the person being greeted:
```javascript
const Hello = (props) => {
  const bornYear = () => {    const yearNow = new Date().getFullYear()    return yearNow - props.age  }
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>    </div>
  )
}
```

The logic for guessing the year of birth is encapsulated within a function of its own, which is invoked when the component is rendered. The person's age does not need to be explicitly passed as a parameter to this function because the function can directly access all the props provided to the component.

*We notice that the helper function is defined within another function that determines the component's behavior. In Java programming, defining a function within another function can be complex and is uncommon. However, in JavaScript, defining functions within functions is a common and efficient practice.*


#### Desctructuring


Destructuring makes the assignment of variables even easier since we can use it to extract and gather the values of an object's properties into separate variables:

```javascript
const Hello = (props) => {
  const { name, age } = props  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

We can take destructuring a step further:

```javascript
const Hello = ({ name, age }) => {  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```
The props that are passed to the component are now directly destructured into the variables, name and age.

Page re-rendering

Up to this point, our applications have been static — their appearance remains unchanged after the initial rendering. But what if we wanted to create a counter that increases in value, either over time or when a button is clicked?

Let's start with the following. File App.jsx becomes:

```javascript
const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App
```
And file main.jsx becomes:
```javascript
import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1

ReactDOM.createRoot(document.getElementById('root')).render(
  <App counter={counter} />
)
```
The App component is given the value of the counter via the counter prop. This component renders the value to the screen. What happens when the value of counter changes? Even if we were to add the following

counter += 1

the component won't re-render. We can get the component to re-render by calling the render method a second time, e.g. in the following way:

```javascript
let counter = 1

const root = ReactDOM.createRoot(document.getElementById('root'))

const refresh = () => {
  root.render(
    <App counter={counter} />
  )
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
```
The re-rendering command has been wrapped inside of the refresh function to cut down on the amount of copy-pasted code.

Now the component renders three times, first with the value 1, then 2, and finally 3. However, values 1 and 2 are displayed on the screen for such a short amount of time that they can't be noticed.

We can implement slightly more interesting functionality by re-rendering and incrementing the counter every second by using setInterval:
```javascript
setInterval(() => {
  refresh()
  counter += 1
}, 1000)
```

Making repeated calls to the render method is not the recommended way to re-render components. Next, we'll introduce a better way of accomplishing this effect.

### Stateful component

All of our components up till now have been simple in the sense that they have not contained any state that could change during the lifecycle of the component.

Next, let's add state to our application's App component with the help of React's state hook.

We will change the application as follows. main.jsx goes back to:

```javascript
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```
and `App.jsx` changes to the following:

```javascript
import { useState } from'react'
const App = () => {
  const [ counter, setCounter ] = useState(0)
  setTimeout(    
    () => setCounter(counter + 1),    1000  )
  return (
    <div>{counter}</div>
  )
}

export default App
```

`useState` is a hook in react

- React suggests not to change the state directly (not to mutate the state of a react component)
- the reason is React relies on immutability to optimize performance. When you call a state setter function, react does a shallow comparison between the old state and the new state.
- if you create a new object/array for the new state, the memory address(reference) changes. the shallow comparison sees that the old reference is different from the new one, and React knows the state has changed and triggers a re-render
- if you mutate the state directly you are changing the vlaue within the same memory address. the shallow comparison checks the references, finds that the old reference and the new reference are the same and assumes that the state hasn't changed.
  - This might cause react may fail to re-render
  - bypass optimization
  - debugging dificulties
  - concurrency and race conditions
- always treat state as immutable and usethe provided state setter function.
  - For primitives:
    - setCount(count + 1) ✅
    - count = count + 1 ❌
  - For objects and arrays:
    - setPerson({...person, age: 30}) ✅
    - setItems([...items, newItem]) ✅ OR setItems(items.concat(newItem)) ✅
    - person.age = 30 or items.push(newItem) ❌
  - a state update in React happens asynchronously, i.e. not immediately but "at some point" before the component is rendered again.
- Rules of Hooks

  - There are a few limitations and rules that we have to follow to ensure that our application uses hooks-based state functions correctly.
  - The useState function (as well as the useEffect) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. 
  - This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.
  - hooks may only be called from the inside of a function body that defines a React component:

#### Event Handlers
- Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.

```javascript
 <button onClick={console.log('clicked the button')}>
  button
</button>
```

- The message gets printed to the console once when the component is rendered but nothing happens when we click the button. Why does this not work even when our event handler contains a function console.log?

- The issue here is that our event handler is defined as a function call which means that the event handler is assigned the returned value from the function, which in the case of console.log is undefined.

- The ```console.log``` function call gets executed when the component is rendered and for this reason, it gets printed once to the console.

Executing a particular function call when the button is clicked can be accomplished like this:

```javascript
<button onClick={() => console.log('clicked the button')}>
  button
</button>
```

- Now the event handler is a function defined with the arrow function syntax () => console.log('clicked the button'). When the component gets rendered, no function gets called and only the reference to the arrow function is set to the event handler. Calling the function happens only once the button is clicked.
- We can implement resetting the state in our application with this same technique:

```javascript
<button onClick={() => setValue(0)}>button</button>
``` 
- Defining event handlers directly in the attribute of the button is not necessarily the best possible idea.

- You will often see event handlers defined in a separate place. In the following version of our application we define a function that then gets assigned to the handleClick variable in the body of the component function:

```javascript
const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```

- The handleClick variable, which references the function definition, is passed to the button as the onClick attribute:

```javascript
<button onClick={handleClick}>button</button>
```


##### A function that returns a function

- Another way to define an event handler is to use a function that returns a function.
- You probably won't need to use functions that return functions in any of the exercises in this course. If the topic seems particularly confusing, you may skip over this section for now and return to it later.
- Let's make the following changes to our code:

```javascript
const App = () => {
  const [value, setValue] = useState(10)


  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}
```
- The event handler is now set to a function call
- Earlier, we stated that an event handler may not be a function call; rather, it has to either be a function definition or a reference to one. Why then does a function call work in this case?
- When the component is rendered, the following function gets executed:

```javascript
const hello = () => {
  const handler = () => console.log('hello world')

  return handler
}
```
- The return value of the function is another function that is assigned to the handler variable.
- It assigns the return value of hello() to the onClick attribute.
- What's the point of this concept?

```javascript
const App = () => {
  const [value, setValue] = useState(10)


  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}

      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
``` 
- Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. The hello function that creates the event handlers can be thought of as a factory that produces customized event handlers meant for greeting users.
- Our current definition is slightly verbose:

```javascript
const hello = (who) => {
  const handler = () => {
    console.log('hello', who)
  }

  return handler
}
```

- Let's eliminate the helper variables and directly return the created function:

```javascript
const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
```
- Since our hello function is composed of a single return command, we can omit the curly braces and use the more compact syntax for arrow functions:

```javascript
const hello = (who) =>
  () => {
    console.log('hello', who)
  }
```
- Lastly, let's write all of the arrows on the same line:

``` javascript
const hello = (who) => () => {
  console.log('hello', who)
}
```
- We can use the same trick to define event handlers that set the state of the component to a given value. Let's make the following changes to our code:

```javascript
const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {    console.log('value now', newValue)  // print the new value to console    setValue(newValue)  }  
  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>      <button onClick={setToValue(0)}>reset</button>

      <button onClick={setToValue(value + 1)}>increment</button>    </div>
  )
}
```

- Never define components inside of other components. The method provides no benefits and leads to many unpleasant problems. The biggest problems are because React treats a component defined inside of another component as a new component in every render. This makes it impossible for React to optimize the component.


#### References
- [Beginner's guide to react](https://egghead.io/courses/the-beginner-s-guide-to-react)
