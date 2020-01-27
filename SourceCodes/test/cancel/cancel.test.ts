import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:Cancel', () => {
  test('test cancel message', () => {
    const cancelObj = new Cancel('Hello World');
    expect(cancelObj.message).toBe('Hello World');
  });

  test('test isCancel', () => {
    expect(isCancel(new Cancel())).toBeTruthy();
    expect(isCancel({foo: 'bar'})).toBeFalsy();
  })
});