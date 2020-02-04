import axios from '../src/index';

describe('static', () => {
  test('should support all', done => {
    let result: number = 0;
    axios.all([1, 2, 3]).then(arg => {
      result = arg[0] + arg[2];
    });

    setTimeout(() => {
      expect(result).toBe(4);
      done()
    }, 100);
  });

  test('should support spread', done => {
    let sum: number = 0;
    let result: string;

    axios.all([1, 2, 3]).then(
      axios.spread((a, b, c) => {
        sum = a + b + c;
        return "HelloWorld";
      })
    ).then(res => {
      result = res;
    });

    setTimeout(() => {
      expect(sum).toBe(6);
      expect(result).toBe("HelloWorld");
      done();
    }, 100)
  });
});