# Functions

## Functions
  * Typescript functions can be created as a named function or an unanonymous function.
  * Functions can refer to (**capture**) variables outside of the function body.
    ```
    let z = 100;
    const addToZ = (x: number, y: number): number => {
      return x + y + z;
    }
    ```
## Function Types
  * Two parts: the type of the arguments and the return type. For example
    ```
    let myAdd: (a: number, b: number) => number = (a, b) => {return a + b;}
    ```
  
## Optional and Default Parameters
  * The number of arguments given to a function has to match the number of parameters the function expects.
  * Add a `?` to the end of the parameters we want to be optional. **Any optional parameters must follow required parameters.** For example
    ```
    function printName(first: string, last?: string) {
      console.log(`${first}${last ? (" " + last) : ""}`)
    }

    printName("Bob")  //Okay
    printName("Bob", "Lee") //Okay
    printName("Bob", "Lee", "Mike") //Error: Expected 1-2 arguments, but got 3.(2554)
    ```
  * We can also set a default value for the parameter if user does not provide one, or user passes `undefined` in place. 
    ```
    function printName2(first: string, last = "Lee") {
      console.log(`${first}${last ? (" " + last) : ""}`)
    }

    printName2("Bob")
    printName2("Bob", undefined);

    function printName3(first = "Bob", last: string) {
      console.log(`${first}${last ? (" " + last) : ""}`)
    }

    printName3("Bob") //Error: Expected 2 arguments, but got 1.(2554)
    printName3(undefined, "Lee");
    ```

## Rest Parameters
  * A boundless number of optional parameters. With name given after ellipsis (`...`). For example
    ```
    function printAllName(first: string, ...rest: string[]) {
      console.log(`${first} ${rest.join(' ')}`)
    }

    printAllName('Jay', 'Mike', 'Bloomberg', 'Chris')   //Output: Jay Mike Bloomberg Chris
    ```

## `this`
  * Use **Arrow Functions (`=>`)** to capture the `this` where the function is created rather than where it is invoked. 
  * Provide explicit `this` parameter to enforce a contract on the Type of `this`. For example,
    ```
    interface Card { suit: string, card: number };
    interface Deck {
      suits: string[], cards: number[], createCard(this: Deck): () => Card
    }

    let Deck: Deck = {
      suits: ["hears", "spades", "clubs", "diamonds"],
      cards: Array(52),

      createCard: function(this: Deck) {
        return () => {
          // Arrow function allows to capture this (suits and cards here when invoked)
          const cardsNum = Math.floor(Math.random() * 52);
          const pickedSuit = Math.floor(cardsNum / 13);

          return {
            suit: this.suits[pickedSuit],
            card: cardsNum % 13
          }
        }
      }
    };

    const pickCardFunc = Deck.createCard();
    const pickedCard = pickCardFunc();

    console.log(pickedCard)
    ```
  * Pay attention to `this` parameters in callbacks. For example,
    ```
    class Handle {
      constructor() { this.info = "";}
      info: string;
      onClickBad(this: void, e: any) {
        // oops, used `this` here. using this callback would crash at runtime
      }
    }
    ```
    We may change to **Arrow Functions (`=>`)** to capture the `this`. For example,
    ```
    class Handle {
      constructor() { this.info = "";}
      info: string;
      onClickBad = (e: any) => {
        this.info = e.message;
      }
    }
    ``` 

## Overloads
  * Supply multiple function types for the same function as a list of overloads. For example,
    ```
    function pickCard(x: {suit: string; card: number; }[]): number;
    function pickCard(x: number): {suit: string; card: number; };
    function pickCard(x): any
    ```