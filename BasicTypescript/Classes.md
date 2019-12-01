# Classes

## Introductory example and Inheritance
  * Example of Animal and its subclasses
    ```
    class Animal {
      name: string
      constructor(theName: string) { this.name = theName; }
      move(distance: number) {
        console.log(`${name} moves ${distance} meters.`);
      }
    }

    class Snake extends Animal{
      constructor(theName: string) { super(theName); }
      move(distance: number = 10) {
        console.log(`Snake Moves.`)
        super.move(distance);
      }
    }

    class Horse extends Animal{
      constructor(theName: string) { super(theName); }
      move(distance: number = 20) {
        console.log(`Horse Moves.`)
        super.move(distance);
      }
    }

    let s = new Snake('Python')
    let h: Animal = new Horse('Bronco')
    s.move()
    h.move(40)
    ```
  * Classes can inherit properties and methods from its base class by using `extends` keyword.
  * We call derived classes as `subclasses` and base class as `superclasses`.
  * Derived class constructor must call `super()` that will execute the constructor of the base class. This is enforced by Typescript compiler.

## Public, private and protected modifiers
  * Each class member is **Public by default** in Typescript.
  * When a member is marked `private`, it cannot be accessed from outside of its containing class.
  * The `protected` modifiers act like `private` except that members declared `protected` can be accessed within derived classes.
  * A `constructor` may also be marked `protected` and it cannot be instantiated outside of its containing class. For example
    ```
    class Person {
      protected name: string;
      protected constructor(theName: string) { this.name = theName; }
    }

    class Employee extends Person {
      protected department: string;
      constructor(theName: string, theDepart: string) {
        super(name);
        this.department = theDepart;
      }
    }

    let p: Person = new Person("Alice");  //Error Message: Constructor of class 'Person' is protected and only accessible within the class declaration.(2674)
    let e: Employee = new Employee("Mike", "Engineering");  //Okay
    ```

## Readonly Modifiers
  * Readonly properties must only be initialized at their declaration or in the constructor. For example
    ```
    class Frog {
      readonly numOfLegs: number = 4;
      name: string;
      constructor(theName: string) { this.name = theName; }
    }

    let f: Frog = new Frog("Mike");
    f.numOfLegs = 6;  //Error Message: Cannot assign to 'numOfLegs' because it is a read-only property.(2540)
    ```

## Accessors
  * As a way of having finer-grained control over how a member is accessed on each object.
    ```
    class EmployeeSetGet {
      constructor() { this._name = ""; }

      private _name: string;
      set name(theName: string) { this._name = theName; }
      get name(): string {
        if (this._name.length > 10) {
          throw new Error("name leng > 10")
        }
        else return this._name;
      }
    }

    let Mike: EmployeeSetGet = new EmployeeSetGet();
    Mike.name = "Mike Bloomberg";
    console.log(Mike.name); //Error Caught: name leng > 10
    ```

## Static Properties
  * Visible on class itself instead of on the instances.
    ```
    class Grid {
      static origin = {x: 0, y: 0};
      constructor() {}
      calculateDistance(point: {x: number, y: number}) {
        return Math.sqrt((point.x - x) * (point.x - x) + (point.y - y) * (point.y - y));
      }
    }
    ```

## Abstract Classes
  * Base classes which other classes may be derived, they may not be instantiated directly. Abstract may contain implementations for its members.
  * Methods with in an abstract class that are marked as abstract does not include an implementation in base (abstract) class and must be implemented in derived classes. 
  * Example:
    ```
    abstract class Department {
      public name: string
      constructor(theName: string) {
        this.name = theName;
      }
      public printName(): void {
        console.log(`Name is ${this.name}`);
      }
      abstract printMeeting(): void;  // Must be implemented in derived class
    }

    class Engineering extends Department {
      constructor() {
        super("Enigneering");
      }
      printMeeting() {
        console.log("Engineering meets at 10 AM.");
      }
      printNumEmployee() {
        console.log("5 team members");
      }
    }

    let depart1: Department;
    depart1 = new Engineering();    //Okay
    depart2 = new Department(); //Error: Cannot create an instance of an abstract class.(2511)

    depart1.printName();    //Okay
    depart1.printMeeting(); //Okay
    depart1.printNumEmployee(); //Error: Department class does not have printNumEmployee method
    ```