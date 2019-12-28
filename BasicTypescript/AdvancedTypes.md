# Advanced Types

## Intersection Types
  * Combine multiple types into one, allow you to add together existing types to get a single type that has all the features you need. Most used for mixins and other concepts that do not fit into the classic Object Oriented mold.
  * For example, mixin a `Person` and `Logger` object together,
    ```
    class Person {
      name: string;
      constructor(theName: string) {
        this.name = theName;
      }
    }

    class Logger {
      logName(name: string) {
        console.log(`Name = ${name}`)
      }
    }

    function extend<First, Second>(first: First, second: Second): First & Second {
      const result: Partial<First & Second> = {};
      for (const prop in first) {
        (result as First)[prop] = first[prop];
      }

      for (const prop in second) {
        (result as Second)[prop] = second[prop];
      }

      return result as First & Second;
    }

    const personLogger = extend(new Person("Tom"), Logger.prototype);
    personLogger.logName(personLogger.name);
    ```

## Union Types
  * A Union Type describes a value can be one of several types and we use a pipe `|` to separate each type. For example,
    ```
    function padLeft(value: string, padding: string | number) {
      // TODO
    }

    padLeft("Hello", true); //Error Msg: Argument of type 'true' is not assignable to parameter of type 'string | number'.(2345)
    ```

  * We can only access members that are common to all types in the Union. For example,
    ```
    interface Bird {
      fly(): void;
      layEggs(): void;
    }

    interface Fish {
      swim(): void;
      layEggs(): void;
    }

    function getAnimal(): Bird | Fish {
      let a: any;
      return (a as Bird | Fish);
    }

    let animal: Bird | Fish = getAnimal();
    animal.layEggs();   //Okay
    animal.swim();  //Error Msg: Property 'swim' does not exist on type 'Bird | Fish'. Property 'swim' does not exist on type 'Bird'.
    ```