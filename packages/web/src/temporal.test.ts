test('Temporal is available in tests', () => {
  expect(typeof Temporal).toBe('object');
  expect(Temporal.Now.instant().epochMilliseconds).toBeGreaterThan(0);
});
