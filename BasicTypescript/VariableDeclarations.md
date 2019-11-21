# Variable Declarations
## `var` declarations
  * Scoping rules of `var`:  For example
    ```
    function func(isInit: boolean) {
      if (isInit) {
        var b = 1;
      }
      return b;
    }

    console.log(func(true)); //Output 1
    console.log(func(false)); //Output undefined
    ```
    **Explanation** Variables are initialized at the beginning of function call and can be accessed within their containing function. So for example 2, `b` is initialized as `undefined`, but value is never set, so return is also `undefined`.

  * Variable capturing quirks
    * A bad example:
      ```
      for (var i = 0; i < 3; ++i) {
        setTimeout(function() {
          console.log(i);
        }, 100 * i);
      }
      ```
      This will print `3 3 3`.
    * Fix would be using IIFE **Immediate Invoked Function Expression** pattern
      ```
      for (var i = 0; i < 3; ++i) {
        ((j) => {setTimeout(() => {console.log(j);}, 100 * j)})(i);
      }
      ```

## `let` declarations
  * Variables declared by `let` follows block-scope. The variable cannot be re-declared within the same block scope. But, **variable can be re-declared in the same function scope but different block scop**. For example
    ```
    function func(cond: boolean, x) {
      if (cond) {
        let x = 100;  // Different block scope, okay to re-declare
        return x;
      }
      return x;
    }

    console.log(func(true, 50)); //Output: 100
    console.log(func(false, 50)); //Output: 50
    ```
  * **Shadowing** Example:
    ```
    let sum = 0;
    for (let i = 0; i < matrix.length; ++i) {
      let curRow = matrix[i];
      for (let i = 0; i < curRow.size(); ++i) {
        sum = curRow[i]; //inner loop i shadows i from outer loop 
      }
    }
    ```
    **Nevertheless, shadowing should most likely be avoided.**
  * **Block-scope variable capturing** For example:
    ```
    for (let i = 0; i < 3; ++i) {
      setTimeout(function() {
        console.log(i);
      }, 100 * i);
    }
    ```
    By using `let`, block-scope variable will be captured and IIFE can be avoided. Output will be `0 1 2`.

## `const` declarations
  * Same scoping rules as `let`.
  * Object value cannot be changed, but object member value can be changed unless member is defined as `readonly`. For example,
    ```
    const someObj = { a: 2, b: 3 };

    someObj = { a: 4, b: 5 }; //Error Message: Cannot assign to 'someObj' because it is a constant.(2588)

    someObj.a = 4;  //Okay
    someObj.b = 5;  //Okay
    ```

## Destructing
  * Array Destructing
    ```
    let [a, b] = [1, 2]; //a=1, b=2
    let [a, ...rest] = [1, 2, 3, 4]; //a=1, rest=[2,3,4]
    let [a] = [1, 2, 3, 4]; //Ignore trailing, a=1
    let [, b, ,d] = [1, 2, 3, 4]; //b=2, d=4
    ```
  * Tuple Destructing
    ```
    let tp: [number, string, boolean] = [1, "Hello", true];

    { let [a, b, c] = tp; } //Okay. a=1, b="Hello", c=true
    { let [a, b, c, d] = tp; }
      //Error Message: Tuple type '[number, string, boolean]' of length '3' has no element at index '3'.(2493)
    { let [a, ...bc] = tp; }  //Okay. a=1, bc=["Hello", true]
    { let [a, b, c, ...d] = tp;}  //Okay. d=[] which is empty tuple
    ```
  * Object Destructing
    ```
    let obj = { a: 1, b: "Hello", c: true };

    { let { a, b } = obj; } //a=1, b="Hello
    { let { a, ...rest } = obj; } //a=1, rest={b: "Hello", c: true}
    ```
  * Property Renaming
    ```
    let obj = { a: 1, b: "Hello", c: true };
    { let { a: newname1, b: newname2 } = obj; } 
      //rename a to newname1, b to newname2, newname1 = 1, newname2="Hello"
    { let {a, b}: { a: number, b: string } = obj; } 
      //Type declaration, Not to be confused with above.
    ```
  * Function Declaration
    ```
    function func({ a, b = 0 } = { a: "" }): void {
        //
    }

    func(); //Okay, will pass in {a: "", b: 0}
    func({ a: 1, b: 2 }); 
      //Error Message: Argument of type '{ a: number; b: number; }' is not assignable to parameter of type '{ a: string; b?: number | undefined; }'.
    func({ a: "Hello", b: 2 }); //Okay
    func({});
      //Error Message: Argument of type '{}' is not assignable to parameter of type '{ a: string; b?: number | undefined; }'.
    ```

## Spread
  * Array Spread
    ```
    let a = [2, 3];
    let b = [4, 5];
    let c = [...a, ...b, 5];  //c=[1,2,3,4,5]
    ```
  * Object Spread
    ```
    let obj1 = { a: 3, b: "Hello", c: true };
    let obj2 = { ...obj1, b: "World" }; //obj1={a:3,b:"World",c:true}
    ```
