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
  * Support the `Promise` API
  * Intercept request and response
  * Transform request and response data
  * Cancel requests
  * Automatic transforms for JSON Data
  * Client side support for protecting against `XSRF`

## Create Typescript project using `typescript-library-starter`
  ```
  git clone https://github.com/alexjoverm/typescript-library-starter.git src
  cd src

  # Run npm install and write your library name when asked. That's all!
  npm install
  ```

## Setup Demo for the project
  * Setup `SourceCodes/examples` directory and add `"dev": "node examples/server.js"` to `package.json` scripts section.
  * For Basic `XMLHttpRequest` part, add `simple` directory under `SourceCodes/examples` and call axios to send Request via `axios`.
  * Setup routing to `simple` folder in `SourceCodes/examples/index.html` and `SourceCodes/examples/server.js`.
  * Run `npm run dev`, go to `http://localhost:8080/` and check Network Response in Chrome.