# Generics

## Hello World of Generics
  * Use **Type Variables** to capture the type the user provides. For example,
    ```
    function func<T>(arg: T): T {
      console.log(typeof arg);
      return arg;
    }
    ```
  * Use **Type Argument Inference** set the value of `T` for us automatically based on the type of the argument we pass in. For example,
    ```
    let output = identity("myString");  // type of output will be 'string'
    ```
  * If we want to call `arg.length`, we should let arg's type be an array of generic type. For example,
    ```
    // Method 1
    function func1<T>(arg: T[]): T[] {
      console.log(arg.length);
      return arg;
    }
    // Method 2
    function func1<T>(arg: Array<T>): Array<T> {
      console.log(arg.length);
      return arg;
    }
    ```

## Generic Types
  * Type of generic functions is just like non-generic functions, and we can also use a different type parameter in the type. For example,
    ```
    function func<T>(arg: T): T {
      console.log(typeof arg);
      return arg;
    }

    let myFunc: <U>(arg: U) => U = func;
    ```
  * **Generic Interface**: We can also specify the corresponding type argument.
    ```
    interface GenericFunc<T> {
      <T>(arg: T): T
    }

    function myFunc<T>(arg: T): T {
      return arg;
    }

    let funcNum: GenericFunc<number> = myFunc;
    ```
## Generic Classes
  * Generic classes have a generic type parameter list in angle brackets (`<>`) following the name of the class. For example
    ```
    class myAdd<T> {
      zero: T;
      add: (x: T, y: T) => T;
    }

    const myAddInstance = new myAdd<number>();
    myAddInstance.zero = 0;
    myAddInstance.add = (x, y) => { return x + y; }
    ```
## Generic Constraints
  * List our requirements in the interface as a constraint on what T can be. For example,
    ```
    interface mustLength {
      length: number
    }

    function myFunc<T extends mustLength>(arg: T): number {
      return arg.length;
    }

    myFunc(3);  //Error Message: Argument of type '3' is not assignable to parameter of type 'mustLength'.(2345)
    myFunc({ a: 5, length: 4 });  //Okay 
    ```
  * We can also place a constraint between two types `T` and `K`, making `K` to be the key of `T`. For example,
    ```
    function getProp<T, K extends keyof T>(obj: T, key: K) {
      return obj[key];
    }

    let prop1 = getProp({ "a": 1, "b": 2 }, "a"); //Okay
    let prop2 = getProp({ "a": 1, "b": 2 }, "c"); //Error Message: Argument of type '"c"' is not assignable to parameter of type '"a" | "b"'.(2345)
    ```
  * When creating factories in Typescript using generic, we should refer to the class types by their constructors. The prototype property can also help to infer and constrain relationships between constructors and instance side of class types. For example,
    ```
    class BeeKeeper {
      constructor() { this.hasMask = true; }
      hasMask: boolean;
    }; 

    class ZooKeeper {
      constructor() { this.name = ""; }
      name: string;
    }

    class Animal {
      constructor(legNum: number) { this.numberOfLegs = legNum; }
      numberOfLegs: number;
    }

    class Bee extends Animal {
      constructor() { super(16); this.keeper = new BeeKeeper(); }
      keeper: BeeKeeper;
    }

    class Lion extends Animal {
      constructor() { super(4); this.keeper = new ZooKeeper(); }
      keeper: ZooKeeper;
    }

    function createInstance<T extends Animal>(c: new () => T): T {
      return new c();
    }

    const lion = createInstance(Lion).keeper.name;
      //Can infer this is zookeeper who has name
    const bee = createInstance(Bee).keeper.hasMask;
      //Can infer this is zookeeper who has mask or not
    ```