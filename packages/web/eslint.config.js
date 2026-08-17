import { defineConfig } from 'eslint/config';
import { reactConfig } from '../../eslint.react.js';
import { shared } from '../../eslint.shared.js';

export default defineConfig(shared, reactConfig);
