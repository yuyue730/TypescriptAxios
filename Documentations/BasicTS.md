# Basic Typescript Knowledge

## Basic Types
### `boolean`
### `number`
  * Example: Number in different format
    ```
    let decLiteral: number = 20;
    let hexLiteral: number = 0x14;
    let binaryLiteral: number = 0b10100;
    let octalLiteral: number = 0o24;
    ```
### `string` and template string
  * Example:
    ``` 
    let str: string = `decLiteral = decLiteral ${decLiteral == hexLiteral}`
    ```
### Array
### Tuple
  * Allow you to express an array with a fixed number of elements whose types are known, but need not be the same. For example: `let x: [string, number]; x = ['hello', 3];`