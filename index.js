import { identity } from '@zuze/modifiable';

export const effect = fn => (...args) => (fn(...args), identity);

export default (api, ...effects) => {
  const map = new Map();
  effects.forEach(e => {
    const [fn, ...deps] = Array.isArray(e) ? e : [e];
    map.set(e, api.modify(effect(fn), ...deps));
  });
  return (...toRemove) => {
    toRemove.forEach(r => {
      const fn = map.get(r);
      fn && fn();
    });
  };
};
