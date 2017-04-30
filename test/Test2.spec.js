const Test2 = require('Test');

describe('should set id', () => {
  const foo = new Test2('foo');
  expect(foo.id).toBe('foo');
});
