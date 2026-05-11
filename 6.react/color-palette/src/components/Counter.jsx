import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  console.log(count);

  const increment = () => {
    setCount((count) => count + 1);
  };
  const decrement = () => {
    setCount((count) => count - 1);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
}
