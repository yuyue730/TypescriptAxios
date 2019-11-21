# Basic Types
## `boolean`
## `number`
  * Example: Number in different format
    ```
    let decLiteral: number = 20;
    let hexLiteral: number = 0x14;
    let binaryLiteral: number = 0b10100;
    let octalLiteral: number = 0o24;
    ```
## `string` and template string
  * Example:
    ``` 
    let str: string = `decLiteral = decLiteral ${decLiteral == hexLiteral}`
    ```
## Array
## Tuple
  * Allow you to express an array with a fixed number of elements whose types are known, but need not be the same. For example: `let x: [string, number]; x = ['hello', 3];`
  * Access an element outside the set of known indices will fail transpilation. For example
    ```
    let x: [string, number] = ["Hello", 10];
    console.log(`${x[2]}`)
    ```
    when transpiling, we will see `error TS2493: Tuple type '[string, number]' of length '2' has no element at index '2'.`

## `enum`
  * A sweet feature of enum in Typescript is **Go from a numeric value to the name of that value in the enum**. For example
    ```
    enum color {
      Red = 1, Green, Blue
    };
    let colorName = color[2];
    console.log(colorName);   //output "Green"
    ```

## `any`
## `void`
  * The opposite of `any`, the absence of any type. Usually see as return type of a function that do not return a value.

## `null` and `undefined`
## `never`
  * Type of value that never occur. Can be a return type of a function that always throws an exception. For example
    ```
    function func1(): never {
      return 0;
    } //Error message: Type '0' is not assignable to type 'never'.(2322)

    function func2(): never {
      throw("Hello World");
    } //Okay
    ```

## `object` -- Anything that is not primitive type.
  For example,
  ```
  function func3(a: object) {
    console.log(a);
  }

  func3({ a: 2 });  // Okay
  func3(2);
    //Error message:  Argument of type '2' is not assignable to parameter of type 'object'.(2345)
  func3("Hello");
    //Error message:  Argument of type '"Hello"' is not assignable to parameter of type 'object'.(2345)
  ```