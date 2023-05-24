import React = require('react');

type Setter<T> = (newValue: T) => void;

type Atom<T> = {
  get: () => T;
  set: Setter<T>;
  subscribe: (callback: Setter<T>) => () => void;
};

// Task 1
export const atom = <T>(initialValue: T): Atom<T> => {
  let value: T = initialValue;
  let subscribeCallbacks: Setter<T>[] = [];

  const get = () => value;

  const set: Setter<T> = (newValue: T) => {
    value = newValue;
    subscribeCallbacks.forEach((callback) => callback(value));
  };

  const subscribe = (callback: Setter<T>): (() => void) => {
    subscribeCallbacks.push(callback);
    return;
  };

  return { get, set, subscribe };
};

// Task 2
export const useAtom = <T>(atom: Atom<T>): [T, Setter<T>] => {
  const val = atom.get();
  const [newCount, setNewCount] = React.useState(val);

  React.useEffect(() => {
    atom.subscribe((newValue) => {
      setNewCount(newValue);
    });
  }, []);

  const setVal: Setter<T> = (newValue: T) => {
    atom.set(newValue);
    setNewCount(newValue);
  };

  return [newCount, setVal];
};

// Task 3
// type AtomReader<T> = (read: <V>(targetAtom: Atom<V>) => V) => T;
