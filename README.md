# Project setup and basic documentations

## Install Typescript
  * Make sure `node` is installed, install `typescript` and run `tsc -v` to make sure typescript is successfully installed.
    ```
    Yus-MacBook-Pro:TypescriptAxios yyu196$ npm -v
    6.1.0
    Yus-MacBook-Pro:TypescriptAxios yyu196$ npm install -g typescript
    // Successfully install `typescript`
    Yus-MacBook-Pro:~ yyu196$ tsc -v
    Version 3.7.2
    ```

## Basic Typescript Knowledge
  ### [Basic Types](./BasicTypescript/BasicTypes.md)
  ### [Variable Declarations](./BasicTypescript/VariableDeclarations.md)
  ### [Interfaces](./BasicTypescript/Interfaces.md)
  ### [Classes](./BasicTypescript/Classes.md)
  ### [Functions](./BasicTypescript/Functions.md)
  ### [Generics](./BasicTypescript/Generics.md)
  ### [Type Inference](./BasicTypescript/TypeInference.md)

## Features
  * Make `XMLHTTPRequests` from the browser
    * Transform URL (especially all parameters), Request Data (body), headers (normalize `Content-Type` field name and pass the correct field value) into correct form before `XMLHttpRequest` opens and sends data from browser.
    * Define `AxiosResponse` type and wrap it into `AxiosPromise` type. Handle `XMLHTTPRequestResponse` in a `AxiosPromise` for asynchronization purpose.
      * Convert `response.headers` from a string to a `json` object. 
      * Convert `response.data` from a string into a `json` object when possible.
  * Error Handling
    * Handle response with wrong Network Error, Timeout and Non-200 response status
    * Encapsulate error into an `AxiosError` class object.
  * Define an Axios interface with methods `request`, `get`, `delete`, `delete`, `head`, `options`, `post`, `put` and `patch`.
    * Encapsulate axios into an `Axios` class and an `AxiosInterface` that has one method. Mixin the class and the interface with request method in the `Axios` class binded to the interface's method.
    * Support `axios()` overloads as `axios(config)` and `axios(url, config)`.

## Create Typescript project using `typescript-library-starter`
  ```
  git clone https://github.com/alexjoverm/typescript-library-starter.git src
  cd src

  # Run npm install and write your library name when asked. That's all!
  npm install
  ```

## Setup Demo for the project
  * Setup `SourceCodes/examples` directory and add `"dev": "node examples/server.js"` to `package.json` scripts section.
  * For `XMLHttpRequest` part, add `simple`, `basic`, `basic_promise`, `error_handle` and `extend` directory under `SourceCodes/examples` and call axios to send Request via `axios`.
  * Setup routing to `simple`, `base`, `basic_promise`, `error_handle` and `extend` folder in `SourceCodes/examples/index.html` and `SourceCodes/examples/server.js`.
  * Run `npm run dev`, go to `http://localhost:8080/` and check Network Response in Chrome.