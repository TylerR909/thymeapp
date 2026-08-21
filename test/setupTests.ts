import { resetLogging, toHaveLogged } from '@thymeapp/logging/testing';

expect.extend({ toHaveLogged });

afterEach(() => {
  resetLogging();
});
