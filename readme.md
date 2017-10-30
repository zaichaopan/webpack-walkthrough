# Webpack Walk Through

Larevle mix and vue webpack-simple are great ways to quick set up vue in your project. But at some point, you might wandering how these things work. And you have a lot of confuse. You want to know about to feel more confortable. This repos will show things behind the screen.

## Webpack Introduction

Both Laravel mix and vue webpack-simple reply on webpack. So the first question is what is webpack and what is it used for?

Webpack is a great tool to build javascript and site assets like css/images. But why do we need it?  To solve the confusion, we need to compare __server side templating__ with __single page application__.

__Server Side Templating (SST)__:

Backend server creates an HTML document and sends it to the user. This HTML Document is fully renderd and has all the required information that users want to see. That is:

Users Visit Page&#8594;HTTP request to server&#8594;New HTML Document&#8594;React/Angular/vue boots up&#8594;show page content.

__Single Page Application__:

Server sends a bare-bones HTML doc to the user. Javasacript runs on the users machine to assemble to full web page. That is:

Users Visit Page&#8594;HTTP request to server&#8594;New HTML Document&#8594;React/Angular/vue boots up&#8594;show page content.

## JS in SST and SPA

__Traditional server side templating (SST)__ may not need a lot of js code. But nowadays a real life proejct needs a lot of js code, especially for a  __single page application (SPA)__.

### Problems with a huge amount of JS code

 For a site which needs a lot of js code, putting all the code in or a few js files will cause a huge headache for maintaining the code. Assume you need to find a single line of code to change in a file which has thousands of code. But it is nature to use js modules. We break thousands lines of code into many __indiviudal modules__. So we can quickly locate the line of code we need to change or refactor.

### Js modules

Modules are stored in files. There is exactly one module per file and one file per module. Each module is a piece of code that is executed once it is loaded.
In that code, there may be declarations (variable declarations, function declarations, etc.). By default, these declarations stay local to the module. They are not accessible from any other files. So we cannot go to index.js to call function in sum.js.

* Each module is a piece of code that is executed once it is loaded.

* In that code, there may be declarations (variable declarations, function declarations, etc.).

  * By default, these declarations stay local to the module.

  * You can mark some of them as exports, then other modules can import them.

* A module can import things from other modules. It refers to those modules via module specifiers, strings that are either:

  * Relative paths ('../model/user'): these paths are interpreted relatively to the location of the importing module. The file extension .js can usually be omitted.

  * Absolute paths ('/lib/js/helpers'): point directly to the file of the module to be imported.

* Modules are singletons. Even if a module is imported multiple times, only a single “instance” of it exists.

This approach to modules avoids global variables, the only things that are global are module specifiers.

#### Linking between modules

In order to access the code in sum.js, we have to form a explicit link between index.js and sum.js.

There are two main rules (systems) that determine how javascript modules behave (how to link two modules).

| Module System | Common Syntax |
| --- | --- |
| Common JS | module.exports  require |
| ES2015 | export import|

#### CommonJS

Common JS is the module system implemented by Node.js. If we are only in a node environment, we can only use CommonJS (like the webpack.config.js we will discuss later)

##### export

* module.exports

Using **module.exports** to make a varible whether it represents a value/function or whatever available in othe modules of the site project

```javascript
//sum.js
const sum = (a, b) => a + b;

module.exports = sum;
```

* exports[variable_name]

If you have more than one variable to export

```javascript
// usersController.js
exports.loginForm = (req, res) => {
    res.render('login', {title: 'Log IN'});
};

exports.registerForm = (req, res) => {
    res.render('register', { title: 'Register' });
};
```

##### import

* import from module.exports

We use **require** function and pass in **a relative path reference** to the module that we want to import code from

```javascript
// index.js
const sum = require('./sum');

const total = sum(10, 5);
console.log(total);
```

* import from multiple explorts

```javascript
// route.js
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(storeController.getStores));
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
```

#### ES6 Modules

##### export in ES6

* export default

```javascript
const sum = (a, b) => {
    return a + b;
}

export default sum;
```

or

```javascript
export default (a, b) => {
    return a + b;
}
```

Export a default and declare a variable at the same time, which is invalid syntax. That is, using the export default syntax already creates a variable called default that needs to contain a value or reference.

So the following code will throw error

```javascript
export default const hello = () => console.log("say hello")
```

You can

```javascript
export default () => console.log("say hello");
```

or

```javascript
const hello = () => console.log("say hello");
export default hello;
```

* export multiple variables

```javascript
export const sum = () => {
    // ...
}

export const minus = () => {
}
```

##### import in ES6

* import from export default

```javascript
import  sum from './sum';
```

* import from multiple export

```javascript
import * as helpers from './uti';
import { sum } from './uti';
```

If we only require or import something without assignment. We just only run that script.

### problem with modules

But breaking code into modules doesn't come free.

* One module (file) may need to use code from other modules (files). So you need to make sure code needs to be executed in proper order.

* Loading many modules will cause peformance issues. So you need to merge them into a big file.

How can you do this? Webpack is a great tool to help you. Put it simply. Webpack's main job is merge many small, individual js modules into a big bundle js file and make sure they are exected in the propered order.

Webpack can also do other jobs like converting ES6 to ES5, converting sass to css and compressing images. We will talk all of these in the later section.

## loaders

* vue-loader

* css-loader

* vue-template-compiler

## [runtime-compiler vs runtime-only](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only)

For full build, you need to add need to configure an alias in your bundler:

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  }
}
```

If vue.esm.js, using esm module. So you should import instead of require in your entry and define your global components. You can use vue.comom.js which allows you to use

```javascript
window.vue = require('vue');
```

but the vue-loader ues esmode by default, so you cannot

```javascript
Vue.component('todo-list, require('./src/TodoList.vue'));
```

becauase exporting from a *.vue file is now an ES module by default. So you have to

```javascript
Vue.component('todo-list, require('./src/TodoList.vue').default);
```

[more info](https://github.com/vuejs/vue-loader/releases/tag/v13.0.0)

If you still like the use the old way (like laravel mix), turn esModule off in the webpackconfig, see laravel mix [config](https://github.com/JeffreyWay/laravel-mix/blob/master/src/config.js)
