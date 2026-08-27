import assert from 'node:assert/strict';
import test from 'node:test';
import { freedomPlusOrbitTypeForLevel } from '../src/config/freedomPlusProgram.js';

test('maps all Freedom-Plus levels to their canonical orbit engine', () => {
  assert.deepEqual(
    Array.from({ length: 7 }, (_, index) => freedomPlusOrbitTypeForLevel(index + 1)),
    ['P39', 'P14', 'P12', 'P6', 'P4', 'P4', 'P3']
  );
  assert.equal(freedomPlusOrbitTypeForLevel(0), '');
  assert.equal(freedomPlusOrbitTypeForLevel(8), '');
});
