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

## Type Guards and Differentiating Types
### User-Defined Type Guards
  * Using **type predicates**
    * A predicate takes the form `parameterName is Type` where `parameterName` must be the name of a parameter from the current function signature. For example,
      ```
      function isFish(pet: Fish | Bird): pet is Fish {
        return (pet as Fish).swim !== undefined;
      }

      const animal = getAnimal();
      if (isFish(animal)) {   //Typescript compiler can narrow the variable to the specific type if original type is compatible
        animal.swim();  
      } else {
        animal.fly();   //Here Typescript compiler already knew animal is Bird
      }
      ```
  * Using the `in` operator as a narrowing expression for types
    * For `n in x` expression, where `n` is a string literal or a string literal type and `x` is a union type
    * The "true" branch narrows to types having a required/optional property `n`
    * The "false" branch narrows to types having a missing/optional property `n`
    * For example,
      ```
      function move(pet: Fish | Bird) {
        if ("swim" in pet) {
          pet.swim();
        } else {
          pet.fly();
        }
      }
      ```
  * `typeof` type guards: recognized in two forms: `typeof v === "typename` and `typeof v !== "typename`; `typename` must be `number`, `string`, `boolean` and `symbol`. For example,
    ```
    function padLeft(value: string, padding: string | number) {
      if (typeof padding === "number") {
        return Array(padding + 1).join(' ') + value;
      } else if (typeof padding === "string") {
        return padding + value;
      } else {
        throw new Error("Unexpected Type")
      }
    }
    ```
  * `instanceof` type guards: A way of narrowing types using their constructor function. For example,
    ```
    interface Padder {
      getPaddingString(): string;
    };

    class SpaceRepeatingPadder implements Padder {
      private numSpaces: number;
      constructor(n: number) {
        this.numSpaces = n;
      }

      getPaddingString() {
        return Array(this.numSpaces + 1).join(' ');
      }
    };

    class StringValuePadder implements Padder {
      private value: string;
      constructor(v: string) {
        this.value = v;
      }

      getPaddingString() {
        return this.value;
      }
    };

    function getPaddingRandom() {
      return Math.random() < 0.75
        ? new SpaceRepeatingPadder(4)
        : new StringValuePadder("Hello World");
    }

    const pad = getPaddingRandom();

    if (pad instanceof StringValuePadder) {
      console.log(pad.getPaddingString());    //const pad: StringValuePadder
    }
    if (pad instanceof SpaceRepeatingPadder) {
      console.log(pad.getPaddingString());    //const pad: SpaceRepeatingPadder
    }
    ```