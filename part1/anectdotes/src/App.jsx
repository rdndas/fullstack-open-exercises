import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const getMaxVotes = (currentVotes) => {
  const values = Object.values(currentVotes);
  const keys = Object.keys(currentVotes);
  const maxValue = Math.max(...values);
  const indexOfMaxValue = values.indexOf(maxValue);
  const maxVotedIndex = keys[indexOfMaxValue];

  // Return the index and the count
  return { maxVotedIndex, maxValue };
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const [maxVotes, setMaxVotes] = useState(0);
  const [maxVotedIndex, setMaxVotedIndex] = useState(0);

  const getNextAnecdote = () => {
    let max = anecdotes.length;
    let randomInt = Math.floor(Math.random() * max);
    setSelected(randomInt);
  };

  const addVotes = () => {
    const newVotes = { ...votes };
    newVotes[selected] += 1;
    setVotes(newVotes);

    const { maxVotedIndex: newMaxIndex, maxValue: newMaxVotes } =
      getMaxVotes(newVotes);

    setMaxVotedIndex(newMaxIndex);
    setMaxVotes(newMaxVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{votes[selected]}</p>
      <div>
        <Button onClick={addVotes} text="vote"></Button>
        <Button onClick={getNextAnecdote} text="next anecdote"></Button>
      </div>
      <h1>Anecdote with most votes</h1>"{anecdotes[maxVotedIndex]}" has{" "}
      {maxVotes} votes.
    </div>
  );
};

export default App;
