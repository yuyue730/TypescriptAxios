interface Person {
  firstName: string,
  lastName: string 
}

class User {
  firstName: string
  lastName: string
  fullName: string

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName + ' ' + lastName;
  }
}

function greet(person: Person) {
  return "Hello " + person.firstName + ' ' + person.lastName;
}

console.log(greet(new User('Yue', 'Yu')));