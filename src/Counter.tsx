type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function Counter({ count, setCount }: Props) {
  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
}

export default Counter;
