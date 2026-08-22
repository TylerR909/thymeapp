// organize-imports-ignore — Temporal must exist before tests import app code
import 'temporal-polyfill/global';
import { resetLogging, toHaveLogged } from '@thymeapp/logging/testing';

expect.extend({ toHaveLogged });

afterEach(() => {
  resetLogging();
});
