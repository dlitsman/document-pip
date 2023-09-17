type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function Counter({ count, setCount }: Props) {
  return (
    <button onClick={() => setCount((count) => count + 1)}>
      Clicks count is {count}
    </button>
  );
}

export default Counter;
