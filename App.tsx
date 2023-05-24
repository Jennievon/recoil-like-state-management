import * as React from 'react';
import { atom, useAtom } from './atom';

const countAtom = atom(1);
// const derivedCountAtom = atom(read => read(countAtom) * 100);

export default function App() {
  const [sharedCount1, setSharedCount1] = useAtom(countAtom);
  const [sharedCount2, setSharedCount2] = useAtom(countAtom);
  // const [derivedCount] = useAtom(derivedCountAtom);

  return (
    <div>
      <h1>Counter</h1>

      <p>Count1: {sharedCount1}</p>
      <p>Count2: {sharedCount2}</p>
      {/* <p>Derived Count: {derivedCount}</p> */}

      <button onClick={() => setSharedCount1(sharedCount1 + 1)}>
        Increment count1
      </button>
      <button onClick={() => setSharedCount2(sharedCount2 + 1)}>
        Increment count2
      </button>
    </div>
  );
}
