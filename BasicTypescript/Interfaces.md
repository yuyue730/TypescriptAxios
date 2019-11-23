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

## Excess Property Checks
  * If an object literal has any properties that the target type does not have, compile will fail and error will show up. For example
    ```
    interface Intf {
      a?: string,
      b?: number
    }

    function func(obj: Intf) {
      //
    }

    func({ a: "Hello", b1: 3 });
      //Error Message: Argument of type '{ a: string; b1: number; }' is not assignable to parameter of type 'Intf'.
    ```
  * An approach: Add an **additional string index signiture** to allow additional properties. For example
    ```
    interface Intf {
      a?: string,
      b?: number,
      [propName: string]: any 
    }
    
    function func(obj: Intf) {
      //
    }

    func({ a: "Hello", b1: 3 });  //Okay
    ```

## Function Types
  * To describe a function type with an interface, we give the interface a call signature. For example
    ```
    interface FuncIntf {
      (a: boolean, b: number): string
    }

    let func1: FuncIntf
    let func2: FuncIntf

    func1 = (a, b) => {
      //
      return "Hello";
    } //Okay

    func2 = (a, b) => {
      //
      return 2;
    } //Error Message: Type '(a: boolean, b: number) => number' is not assignable to type 'FuncIntf'.
    ```

## Indexable Types
  * Have an **index signiture** describing the types we can use to index into an object. For example
    ```
    interface IndexInf {
      [idx: number]: string 
    }; 

    let arr: IndexInf = ["Hello", "World"]; 
    ```
  * Supported index signiture types: `number` and `string`. When indexing with number, Javascript will actually convert that to a string before indexing into the object. This will cause some problem when deal with class inheritance, for example 
    ```
    class A {
      constructor() { this.a = 1;}
      a: number;
    }

    class B extends A {
      constructor() { super(); this.b = "string";}
      b: string;
    }

    interface IntfNotOkay {
      [idxA: string]: B,
      [idxB: number]: A 
    } //Error: indexing with a numeric string might get you a completely separate type of Animal!

    interface IntfOkay {
      [idxA: string]: A,
      [idxB: number]: B
    } //Okay
    ```
  * String index signiture enforces that all properties will match their return type. For example,
    ```
    interface Intf {
      [idx: string]: string,
      a: number,  //Error Message: Property 'a' of type 'number' is not assignable to string index type 'string'.(2411)
      b: string //Okay
    }
    ```
  * Make index signiture `readonly`. For example,
    ```
    interface IntfReadOnly {
      readonly [idx: number]: string
    }

    let arr: IntfReadOnly = ["Hello", "World"];
    arr[0] = "What";  //Error Message: Index signature in type 'IntfReadOnly' only permits reading.(2542)
    ```

## Class Types
  * Most common use case of interface is to enforce a class meeting a particular contract. For example,
    ```
    interface ClockInterface {
      currentTime: Date,
      setTime(d: Date): void 
    }

    class Clock implements ClockInterface {
      currentTime: Date = new Date()
      constructor(h: number, m: number) { }
      setTime(d: Date) { this.currentTime = d; }
    }
    ```
  * Class has two types: **static** type of the class and **instance** type of the class.
    * Create a interface with only constructor signiture will have error. For example,
      ```
      interface ClockCotr {
        new(h: number, m: number);
          //Error Message: Construct signature, which lacks return-type annotation, implicitly has an 'any' return type.(7013)
      }
      ```
      Constructor is on the static side of an interface, so it will not be checked.
    * An example of method to takes in both static and instance type of a class looks like this
      ```
      interface ClockCotr {
        new(h: number, m: number): ClockIntf;
      }

      interface ClockIntf {
        tick(): void;
      }

      const c: ClockCotr = class Clock implements ClockIntf {
        constructor(h: number, m: number) { }
        tick() { }
      }
      ```

## Extending Interfaces
  * Allows copy members from one interface to another extended one.
  * May extend multiple interfaces. For example,
    ```
    interface baseIntf1 {
      a: string;
    }

    interface baseIntf2 {
      b: number
    }

    interface extendedIntf extends baseIntf1, baseIntf2 {
      c: boolean;
    }

    let instance: extendedIntf = {} as extendedIntf;
    instance.a = "Hello"; //Okay
    instance.b = 2; //Okay
    instance.c = true;  //Okay
    ```

## Hybrid Types
  * Interface defining an object with both function and additional objects. For example
    ```
    interface Counter {
      (startTime: number): string;
      interval: number;
      reset(): void;
    }

    function counterFunc(): Counter {
      let counter = ((startTime: number) => { }) as Counter;
      counter.interval = 1;
      counter.reset = () => { console.log("reset") };
      return counter;
    }
    ```

## Interfaces extending classes
  * When an interface type extends a class type it inherits the members of the class but not their implementations.
  * Example:
    ```
    class Control {
      private state: string;
      constructor() { this.state = "New"; }
    }

    interface SelectControl extends Control {
      select(): void;
    }

    class SelectButton1 extends Control implements SelectControl {
      select() { }  //Okay. No need to define state, it will be derived
    }

    class SelectButton2 implements SelectControl {
      select() { } //Error: Property 'state' is missing in type 'SelectButton2' but required in type 'SelectControl'.(2420)
    }
    ```