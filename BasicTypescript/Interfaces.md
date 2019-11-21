# Interfaces
## Optional Property:
```
interface OptInt {
    a ?: string,
    b: number
};
function func(obj: OptInt): void {
    //
}

func({ b: 4 }); //Okay, a is optional
```
## Readonly Property
  * Readonly property is only modifiable when object is created.
    ```
    interface ROInt {
    readonly a: string,
    readonly b: number
    };

    let p: ROInt = { a: "Hello", b: 5 };
    p.a = "World";  
    //Error Message: Cannot assign to 'a' because it is a read-only property.(2540)
    p.b = 4;
    //Same error
    ```
  * `ReadonlyArray<number>`
    ```
    let ROArr: ReadonlyArray<number> = [1, 2, 3, 4];

    ROArr.push(5); //Error Message: Property 'push' does not exist on type 'readonly number[]'.
    ROArr[0] = 0; 
    //Error Message: Index signature in type 'readonly number[]' only permits reading.(2542)
    ROArr.length = 5; 
    //Error Message: Cannot assign to 'length' because it is a read-only property.(2540)
    ```
    **Even assigning the entire ReadonlyArray back to a normal array is illegal**
    ```
    let arr = ROArr as [];  //arr will be undefined
    arr[0] = 0; //Error Message: Type '0' is not assignable to type 'undefined'.(2322)
    ```
