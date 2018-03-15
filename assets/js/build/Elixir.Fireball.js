'use strict';
import ElixirScript from './ElixirScript.Core.js';
function __info__(kind) {
    const __info__map__ = new Map([[Symbol.for('functions'), []], [Symbol.for('macros'), []], [Symbol.for('attributes'), [new ElixirScript.Core.Tuple(Symbol.for('vsn'), [48553342168452233236425389210054349842])]], [Symbol.for('compile'), [new ElixirScript.Core.Tuple(Symbol.for('options'), []), new ElixirScript.Core.Tuple(Symbol.for('version'), [55, 46, 49, 46, 52]), new ElixirScript.Core.Tuple(Symbol.for('source'), '/Users/craigread/src/fireball/lib/fireball.ex')]], [Symbol.for('md5'), new ElixirScript.Core.BitString(ElixirScript.Core.BitString.integer(36), ElixirScript.Core.BitString.integer(135), ElixirScript.Core.BitString.integer(8), ElixirScript.Core.BitString.integer(151), ElixirScript.Core.BitString.integer(69), ElixirScript.Core.BitString.integer(173), ElixirScript.Core.BitString.integer(17), ElixirScript.Core.BitString.integer(59), ElixirScript.Core.BitString.integer(23), ElixirScript.Core.BitString.integer(166), ElixirScript.Core.BitString.integer(46), ElixirScript.Core.BitString.integer(5), ElixirScript.Core.BitString.integer(136), ElixirScript.Core.BitString.integer(98), ElixirScript.Core.BitString.integer(212), ElixirScript.Core.BitString.integer(18))], [Symbol.for('module'), Symbol.for('Elixir.Fireball')]]);

    const value = __info__map__.get(kind);

    if (value !== null) {
        return value;
    }

    throw new ElixirScript.Core.Patterns.MatchError(kind);
}

export default {
    __MODULE__: Symbol.for('Elixir.Fireball'),
    __info__
};
