import CancelToken from '../../src/cancel/CancelToken';
import Cancel from '../../src/cancel/Cancel';
import { Canceler } from '../../src/types';

describe('cancel:CancelToken', () => {
  describe('reason', () => {
    test('token request a cancellation should return a Cancel object', () => {
      let cancel: Canceler;
      let token = new CancelToken(c => {
        cancel = c;
      });

      cancel!('Hello World.');
      cancel!('Hello World.');
        //Re-call so that the second time it will cover already exist case
      expect(token.reason).toEqual(expect.any(Cancel));
      expect(token.reason!.message).toBe('Hello World.');
    });

    test('no cancellation request should return undefined', () => {
      let token = new CancelToken(c => {});
      expect(token.reason).toBeUndefined();
    });
  });

  describe('promise', () => {
    test('pass Cancellation into resolve', done => {
      let cancel: Canceler;
      let token = new CancelToken(c => {
        cancel = c;
      });

      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel));
        expect(value.message).toBe('Hello World.');
        done();
      });

      cancel!('Hello World.');
    });
  });

  describe('throwIfRequested', () => {
    test('catch thrown exception', () => {
      let cancel: Canceler;
      let token = new CancelToken(c => {
        cancel = c;
      });

      cancel!('Hello World.');

      try {
        token.throwIfRequested();
        fail('Not throw');
      } catch (err) {
        if (!(err instanceof Cancel)) {
          fail('Not Cancel instance');
        }
        expect((err as Cancel).message).toBe('Hello World.');
      }
    });

    test('empty token not throw', () => {
      let token = new CancelToken(c => {});
      try {
        token.throwIfRequested();
      } catch (err) {
        fail('Not expect to throw');
      }
    });
  });

  describe('source', () => {
    test('should return source', () => {
      const source = CancelToken.source();
      expect(source.token).toEqual(expect.any(CancelToken));
      expect(source.cancel).toEqual(expect.any(Function));
      expect(source.token.reason).toBeUndefined();
      source.cancel!('Hello World.');
      expect(source.token.reason!.message).toBe('Hello World.');
    });
  })
});