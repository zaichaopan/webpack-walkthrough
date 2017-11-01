# Webpack

Larevle mix and vue-webpack-simple are great ways to quickly set up vue in your project. But at some point, you might wander how these things work. And you have a lot of confuse. You want to know more to feel more confortable or have more control of your project. This repos will show things behind the screen.

## Table of Contents

1. [Webpack Introduction](#wepack-introduction)
    1. [SST and SPA](#SST-and-SPA)
    1. [Js modules](#js-modules)
        1. [CommonJs](#commonjs)
        1. [ES6 module](#es6-modules)
1. [Basic configuration](#basic-configuration)
    1. [Install webpack](#install-webpack)
    1. [webpack.config.js](#webpack.config.js)
        1. [entry](#entry)
        1. [output](#output)
    1. [run webpack](#run-webpack)
1. [Loader](#loader)
    1. [Babel loader](#babel-loader)
    1. [CSS loader](#css-loader)
    1. [SASS loader](#sass-loader)

1. [Plugin](#plugin)

1. [Code Split and caching](#code-split-and-caching)

## Webpack Introduction

Both Laravel mix and vue-webpack-simple reply on webpack. So the first question that comes naturally is what webpack is and what it is used for.

Webpack is a great tool to build javascript and site assets like css/images. But why do we need it?  To answer this question, we need to compare __server side templating__ with __single page application__.

### SST and SPA

* __Server Side Templating (SST)__:

Backend server creates a HTML document and sends it to the user. This HTML Document is fully renderd and has all the required information that users want to see. That is:

Users Visit Page&#8594;HTTP request to server&#8594;New HTML Document&#8594;React/Angular/vue boots up&#8594;show page content.

* __Single Page Application__:

Server sends a bare-bones HTML doc to the user. Javasacript runs on the users machine to assemble to full web page. That is:

Users Visit Page&#8594;HTTP request to server&#8594;New HTML Document&#8594;React/Angular/vue boots up&#8594;show page content.

|  | SST | SPA |
| --- | --- | --- |
| js  | may not need a lot of js code | needs a lot of js code |

#### Problems with a huge amount of JS code

 For a site  with a lot of js code, putting all the code in or a few js files will cause a big headache for maintaining the code. Assume you need to find a single line of code to change in a file with thousands of code. So it is nature to use js modules to solve the problem. We break thousands oflines of code into many __indiviudal modules__. So we can quickly locate the line of code we need to change or refactor.

### Js modules

Modules are stored in files. There is exactly one module per file and one file per module.

* Each module is a piece of code that is executed once it is loaded.
* In that code, there may be declarations (variable declarations, function declarations, etc.).

  * By default, these declarations stay local to the module. They are not accessible from any other files. So we cannot go to index.js to call functions in sum.js.

  * You can mark some of them as exports, then other modules can import them.
* A module can import things from other modules. It refers to those modules via module specifiers, strings that are either:
  * Relative paths ('../model/user'): these paths are interpreted relatively to the location of the importing module. The file extension .js can usually be omitted.

  * Absolute paths ('/lib/js/helpers'): point directly to the file of the module to be imported.
* Modules are singletons. Even if a module is imported multiple times, only a single “instance” of it exists.

This approach to modules avoids global variables, the only things that are global are module specifiers.

In order to access the code in sum.js, we have to form __an explicit link__ between two modules (e.g,index.js and sum.js). There are two main rules (systems) that determine how javascript modules behave (how to link two modules). One is __CommonJs__; the other one is __ES6 modules__.

#### CommonJS

Common JS is the module system implemented by Node.js. If we are only in a node environment, we can only use CommonJS (like the webpack.config.js we will discuss later)

| default exports (one per module) | named exports (several per module)|
| --- | --- |
| module.exports | exports.variableName|

|  | Default | Named |
| --- | --- | --- |
| export | module.exports | exports.variable |
| import | var variable = require(module_relatiave_path) |  var variable = require(module_relatiave_path) |

 Default exports example

```javascript
//sum.js
const sum = (a, b) => a + b;
module.exports = sum;
```

```javascript
// index.js
var sum  = require('./sum');

sum(1, 2);
```

named export example

```javascript
// math.js
exports.sum = (a, b) => {
   return a + b;
};

exports.minus = (a, b) => {
  return a - b;
};
```

```javascript
// route.js
const math = require('./math');
// or
const { sum } = require('./math');

//
math.sum(1, 2);
math.minus(2, 1);
sum(1, 2)
```

#### ES6 Modules

| syntax| default | named |
| --- | --- | --- |
| export | export default | export variable|
| import | import variable from 'module_relative_path' | import * as variable from 'module_relatiave_path' or import { ...} from 'module_relative_path' |

default export example

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

```javascript
import  sum from './sum';
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

named exports example

```javascript
export const sum = () => {
    // ...
}

export const minus = () => {
}
```

```javascript
import * as helpers from './uti';
import { sum } from './uti';
```

If we only require or import something without assignment. We just only run that script.

#### problems with modules

Breaking large code into small modules makes it easy to maintainer, it doesn't come free. It introduces two main problems.

* One module (file) may need to use code from other modules (files). So you need to make sure code will be executed in proper order.

* Loading many modules will cause peformance issues. So you need to merge them into a big file.

How can you do this? Webpack is a great tool to help you. Put it simply. Webpack's main job is merge many small, individual js modules into a big bundle js file and make sure they are exected in the propered order.

Webpack can also do other jobs like converting ES6 to ES5, converting sass to css and compressing images. We will talk all of these in the later section.

[Back to Top](#webpack)

[Back to Top](#webpack)

## Basic configuration

### Install webpack

```shell
npm install --save webpack
```

### webpack.config.js

In order for webpack to work, we need to have a configuration file in your app root directory to tell webpack what we want or need.  This file is called __webpack.config.js__.  This configuration will export a default object  which will be used by webpack. Since webpack is working in a node environment, you need to use CommonJS module systm.

```javascript
// webpack.config.js
module.exports = {
  //...
}
```

or

```javascript
// webpack.config.js
var configure = {
  //
}

module.exports configure;
```

#### entry

The first property we need to define in our webpack.config.js is the entry property. It tells webpack the entry point of our app. The entry point is the bootstrap file of our app. It is the first file that needs to be executed when our app starts out in the browser. By convention, it is often called __index.js__ or __main.js__.  It only imports modules and doesn't export code. When we have entry point in the configuration file, it will do the following two things.

* First, it will instruct webpack that index.js is the first file webpack will execute when our application starts out in the browser.

* Second, webpack will look what files that index.js imports and look at what files those files import, and so do and forms a tree structure

There are two ways to define entry.

* Using a string value to represent a relative path of the entry file

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js'
}
```

By convention, we often put all site js files in a src directory. Now, webpack knows  __src/index.js__ is the first file to kick off our app.

* Using object

Using a string to represent our entry is simple, but what if we want more entry files. Using object can solve the problem.

```javascript
// webpack.config.js
module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['JQuery'],
  }
}
```

By this way, we can have multiple entries. One is our own js file; the other is for the libs we are using like JQuery. We will talk about why we need multiple entries in the code split section.

#### output

We have defined the entry of our app. Since webpack's main job is merge individual files into a big file. We need to tell webpack where to store the output and what the name of the output is ( (we often call it bundle.js)). So we need to define the output property in the configuration object.

```javascript
// webpack.config.js
var path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    fileName: 'bundle.js'
  }
}
```

* __path__: different from entry, path in output property has to be an absolute path. The **require statement** here will be handled by node.js runtime itself not webpack. When we run webpack, we run it in a node js environment, so we can use any pieces of node js technology. The path module has a function on it called **resolve(__dirname, 'dist')**. **__dirname** is a const in node js which references to the current working directory. The second param we use string __'build'__ or __'dist'__. This is the convention, we put the bundle.js inside the build (dist) directory.

* fileName: We can hardcode the name of the output file. Like the example above, or you can use placeholder __name__ to take use of the name of the entry point. This is very useful when we have multiple files.

```javascript
// webpack.config.js
var path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    fileName: '[name].js'
  }
}
```

Now, the output file will be __app.js__.  You can also add a hash section in the filename: __fileName: '[name].[hash].js'__. We will talk about in code split.

### Run webpack

In order to run webpack, we need to configure the package.json script.

```javascript
//package.json
"scripts": {
    "build": "webpack"
  },
```

Now when you run **npm run build**, it will trigger **webpack**. If you want to watch the changes, you can add **--watch** after the webpack. Or create another one

```json
//package.json
"scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  },
```

or using optional argument: --

```json
//package.json
"scripts": {
    "build": "webpack",
    "watch": "npm run build -- --watch"
  },
```

Now when running npm run watch, it will add --watch after npm run build. This is very useful when you don't want to repeat.

We have to use doube quotes. By adding this command, we can use **npm run build** in our terminal.

You may ask why not install webpack globally using -g and run it instead of creating a script command in package.json. When installing **globaly**, we can only have a version of module at a time (one version of webpack). But by putting it into our app's node_modules and using **npm run build**, we just use the webpack for that particular project

From the output, we will find that the bundle.js file, is much bigger compare to the individual modules. So what webpack is doing to our js file? What webpack is doing is similar to this

```javascript
var myModuels = [
    function () {
        const sum = (a, b) => a + b;
        return sum;
    },

    function () {
        const sum = myModules[0]();
        const total = sum(10, 10);
        console.log(total);
    }
]

var entryPointIndex = 1;
myModules[entryPointIndex]();
```

## Loader and plugins

Module loaders are used to do some prepprocessing on files before they are added to our bundle.js. Loaders are like transformers. They are commonly used to convert ES6 code to ES5 code. They can also be used to handle css/sass/images/files with different loaders.

In order to use loaders,  we need to define a property called **module** Inside there, we need to define a rules property which is an array.  Each item of the array is an object to define a loader/rule

```javascript
//webpack.config.js
const path = require('path');

const config = {
    entry:  './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'), 
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: loader_name,
                test: regular_expression
            }
        ]
    }
};

module.exports = config;
```

* loader_name: specify which loader to use

* regular expression: speicify which modules you want to apply the loader to

### Babel loader

Difference between loader and webpack

| Babel | Webpack |
| --- | --- |
|Turn ES2015 (ES6) code into ES5 code | Link up JS modules together |

We need to set up 3 modules to get babel working

| babel-lader | babel-core | babel-preset-env |
| --- | --- | --- |
| Teaches babel how to work with webpack | Knows how to take in code, parse it, and generate some output files | Ruleset for telling babel exactly what pieces of ES6/7 syntax to look for and how to turn it into ES5

#### install babel loader

```shell
npm install --save-dev babel-loader babel-core babel-preset-env
```

#### configure babel loader rule

```javascript
//webpack.config.js
const path = require('path');

const config = {
    entry:  './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'), 
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            }
        ]
    }
};

module.exports = config;
```

#### define preset-env

We need to tell babel what kind of rule to compile (babel-preset-env). To do that, create a file .babelrc in the root directory. Inside it, we need to create an object and define a presents property

```javascript
//.babelrc (has to use double quotes)
{
    "presets": ["babel-preset-env"]
}
```

### CSS loader 

You may need to import css file to your module, webpack doesn't know have to handle css. We need to use css loader to handle css module.

Example: We have to files:

* image.js

* image.css

```javascript
// image.js
import '../styles/image.css';
```

Or in your entry file (index.js/main.js), you want to import/require css file

```javascript
//index.js
import './main.css';
// or
require('./main.css');
```

Now, we need to make sure our webpack and apply css loader to it. We need to install two modules

| css-loader | style-loader |
| --- | --- |
| knows how to deal with css imports | take css import and add them to the html document |

Install style-loader and css-loader

```terminal
npm install --save-dev style-loader css-loader
```

In webpack.config.js

```javascript
const path = require('path');

const config = {
    entry:  './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'), 
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    }
};

module.exports = config;
```

The css loaders have to be in **right order**: style-loader and then css-loader because it takes effect from right to left.

After running npm run dev, and open the file in the browser, you will find it add the css style to head section of the html document. So the question is how can the webpack modify the html and insert the style? Actually webpack didn't modify the html, style-loader will inject css to the dom in the head section. But this approach has some downsides. In particularly, loading css in a separate file is a lot faster than loading all css and js in the same file. To do this, we need to use another library in our build process.

### extract-text-webpack-plugin

Install extract-text-webpack-plugin

```shell
npm install --save-dev extract-text-webpack-plugin
```

```javascript
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    entry:  './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'), 
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            },
            {
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  }),
                test: /\.css$/
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};

module.exports = config;
```

add css file to html

```html
    <link rel="stylesheet" href="build/style.css"></link>
```

### Sass loader

To install

```shell
npm install sass-loader node-sass
```

* inject to head

```javascript
// webpack.config.js
module.exports = {
    //...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    }
};
```

or

```javascript
// webpack.config.js
module.exports = {
    //...
    module: {
        rules: [{
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    }
};
```

The order is important. It takes affect from right to left. First covert sass to css and then convert css to commonJs module (it wraps your css into a commonJs module) and then inject it to the head of the page.

To extract to a separate file

```javascript
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //...
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                // for things that cannot be extracted
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
        // or you can use placeholder for name
        // new ExtactTextPlugin('[name].css'), it will use the name of you js entry file
    ]
};
```

Remember we have to use it to make it work. Import the sass file in module or your entry file. If you don't want to add the scss to your js file, you can add it to your webpack.config.js entry point

```javascript
// webpack.config.js
module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/main.scss'
        ]
    },
    output: {
        //
    }
}
```

We can also specify when to minify our css file

```javascript
// webpack.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //...
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                // for things that cannot be extracted
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
    ]
};
```

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



## NPM

To create a NPM projet,

```shell
npm init
```

If you want to skip all the questiosn prompting up,

```shell
npm init -y
```
