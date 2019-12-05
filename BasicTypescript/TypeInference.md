# Type Inference

## Basics
  * Basic Scenarios of type inference include: (1), Initialize variables and members; (2), set parameter default values; (3), determine function return types.

## Best Common Types
  * The best common type algorithm considers each candidate type and picks the type that is compatible with all the other candidates.
    ```
    class Apple extends Fruit { ... }
    class Banana extends Fruit { ... }

    const arr = [new Apple(), new Banana()];  // We cannot infer arr to be an array of `Fruit`, because no member of the array is a strict fruit type variable.
    const arr: Fruit[] = [new Apple(), new Banana()]; // To fix this, we need to explicitly tell Typescript compiler arr is an array of `Fruit`
    ```

## Contextual Typing
  * Common use cases include function calls, right hand sides of assignments, type assertions, members of object and array literals, and return statements. For example
    ```
    interface WindowInterface {
      onMouseDown(mouseEvent: {click: any}): void
    }

    class WindowObj implements WindowInterface {
      constructor() {}
      onMouseDown(mouseEvent: {click: any}) {}
    };

    let win = new WindowObj();
    win.onMouseDown = function (event) {  // TS compiler is able to infer the type of event to be `{click: any}`
      console.log(event.click)  //Okay
      console.log(event.scroll) //Error Message: Property 'scroll' does not exist on type '{ click: any; }'.(2339)
    }
    ```