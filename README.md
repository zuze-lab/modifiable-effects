# modifiable-effects

[![npm version](https://img.shields.io/npm/v/@zuze/modifiable-effects.svg)](https://npmjs.org/package/@zuze/modifiable-effects)
[![Coverage Status](https://coveralls.io/repos/github/zuze-lab/modifiable/badge.svg)](https://coveralls.io/github/zuze-lab/modifiable-effects)
[![Build Status](https://travis-ci.com/zuze-lab/modifiable-effects.svg)](https://travis-ci.com/zuze-lab/modifiable-effects)
[![Bundle Phobia](https://badgen.net/bundlephobia/minzip/@zuze/modifiable-effects)](https://bundlephobia.com/result?p=@zuze/modifiable-effects)

## Side Effects

Simple side-effects implementation for a [modifiable](https://github.com/zuze-lab/modifiable).

Given a `modifiable`, an `effect` is just a plain modifier that returns the `identity` function, so you can do this:

```js
import { effect } from '@zuze/modiable-effects',
import { modifiable } from '@zuze/modifiable';

const myEffect1 = async (context,setContext,getState) => { ... }
const myEffect2 = async (context,setContext,getState) => { ... }

const m = modifiable(initialState,{
    modifiers:[
        effect(myEffect1),
        [ effect(myEffect2), 'dep1', 'dep2', ({dep3}) => dep3[0] ],
        ...otherModifiers
    ]
});
```

Or you can use the default export function that accepts a 

```js
import withEffects from '@zuze/modifiable-effects';
import { modifiable } from '@zuze/modifiable';

const m = modifiable(...);

const myEffect = async => (context,setContext,getState) => {
    try {
        await someAsyncCall();
        setContext({...})
    } catch(err) {
        setContext({...})
    }
};

const myEffect2 = async => ...

const removeEffect = withEffects(modifiable, myEffect, myEffect2, ...otherEffects);

// returns a function that accepts a function reference and removes a side effect
removeEffect(myEffect);
```

## With Dependencies

```js
import withEffects from '@zuze/modifiable-effects';
import { modifiable } from '@zuze/modifiable';

const m = modifiable(...);

const myEffect = [async (context,setContext,getState) => {
    try {
        await someAsyncCall();
        setContext({...})
    } catch(err) {
        setContext({...})
    }
// this effect will run only when context changes 
}, ['dep1', 'dep2', ({dep3}) => dep3[0] ]

withEffects(modifiable,myEffect);
```