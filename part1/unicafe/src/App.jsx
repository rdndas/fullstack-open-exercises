import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [posPer, setPosPer] = useState(0);

  const calcTotal = (good, bad, neutral) => good + bad + neutral;
  const calcAverage = (value, total) => value/total;
  const calcValue = (good, bad, neutral) => good * 1 + bad * -1 + neutral * 0;
  const positivePerc = (good, total) => (good/total)*100

  const setGoodFeedback = () => {
    const newGood = good + 1;
    setGood(newGood);
    const total = calcTotal(newGood, bad, neutral);
    setAll(total);
    const value = calcValue(newGood, bad, neutral);
    console.log("good value: ", value);
    const average = calcAverage(value, total);
    console.log("good ", average);
    setAvg(average);
    const positivePercentage = positivePerc(newGood, total)
    setPosPer(positivePercentage)
  };

  const setNeutralFeedback = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const total = calcTotal(good, bad, newNeutral);
    setAll(total);
    const neutralAverage = calcAverage(newNeutral, total);
    const value = calcValue(good, bad, newNeutral);
    console.log("neutral value: ", value);
    const average = calcAverage(value, total);
    console.log("neutral", average);
    setAvg(average);
    const positivePercentage = positivePerc(good, total)
    setPosPer(positivePercentage)
  };

  const setBadFeedback = () => {
    const newBad = bad + 1;
    setBad(newBad);
    const total = calcTotal(good, newBad, neutral);
    setAll(total);
    const badAverage = calcAverage(newBad, total);
    const value = calcValue(good, newBad, neutral);
    console.log("bad value: ", value);
    const average = calcAverage(value, total);
    console.log("bad ", average);
    setAvg(average);
    const positivePercentage = positivePerc(good, total)
    setPosPer(positivePercentage)
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={setGoodFeedback} text="good"></Button>
        <Button onClick={setNeutralFeedback} text="neutral"></Button>
        <Button onClick={setBadFeedback} text="bad"></Button>
      </div>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>avg {avg}</p>
        <p>positive% {posPer} %</p>
      </div>
    </div>
  );
};

export default App;
