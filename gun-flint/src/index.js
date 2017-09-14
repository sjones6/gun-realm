import KeyValAdapter from './Adapter/key-val-adapter';

// Utils
import Util from './util';

// Flint
const flint = {
  KeyValAdapter,
  Util
};

// Add circular reference for easier importing
flint.Flint = flint;

module.exports = flint;
