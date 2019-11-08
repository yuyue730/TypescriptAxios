// numbers in different format
let decLiteral: number = 20;
let hexLiteral: number = 0x14;
let binaryLiteral: number = 0b10100;
let octalLiteral: number = 0o24;

console.log(`decLiteral = decLiteral ${decLiteral == hexLiteral}`)
console.log(`hexLiteral = binaryLiteral ${hexLiteral == binaryLiteral}`)
console.log(`binaryLiteral = octalLiteral ${binaryLiteral == octalLiteral}`)