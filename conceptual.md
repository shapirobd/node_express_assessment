### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
    - Callbacks, which allow you to provide functions to call once the asynchronous method has finished running using tools such as $.getJSON() and $.ajax()
    - Promises, which allow you to chain methods together using .then() and .catch()
    - Async/await keywords, which provide simpler syntax for working with promises.

- What is a Promise?
    - A promise is an assurance of a future value that has not yet been determined.
- What are the differences between an async function and a regular function?
    - A regular function can not perform actions involving the "await" keyword.
- What is the difference between Node.js and Express.js?
    - Node.js is an open source server environment that allows you to write the back-end of your applications entirely in JavaScript.
    - Express.js is a framework (like Flask) that allows you to start a server & create route handlers with Node.js
- What is the error-first callback pattern?
    - Within Node.js, the first argument of the callback is reserved for an error object. If an error occurred, it will be returned by the first err argument.
- What is middleware?
    - Middleware is code that runs after a request is sent and before the response is received.
- What does the `next` function do?
    - next() allows you to move on to whatever comes next in the program. If next() contains a parameter (next(err)), it will automatically take the argument as an error and run the error handler function.
- What does `RETURNING` do in SQL? When would you use it?
    - RETURNING allows you to retrieve values of columns (and expressions based on columns) that were modified by an insert, delete or update. You want to use this when you want to avoid another roundtrip to the database.
- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
    - Instead of $.getJSON() you should use axios.get()
    - To make the code more dynamic, you could make one request to get all users, and then use that response to return a list of all users.
    
```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```