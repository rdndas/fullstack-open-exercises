import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  );
};

const Statistics = ({ good, bad, neutral, all, avg, posPer }) => {
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="avg" value={avg} />
      <StatisticsLine text="positive" value={posPer + "%"} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [posPer, setPosPer] = useState(0);

  const calcTotal = (good, bad, neutral) => good + bad + neutral;
  const calcAverage = (value, total) => value / total;
  const calcValue = (good, bad, neutral) => good * 1 + bad * -1 + neutral * 0;
  const positivePerc = (good, total) => (good / total) * 100;

  const setGoodFeedback = () => {
    const newGood = good + 1;
    setGood(newGood);
    const total = calcTotal(newGood, bad, neutral);
    setAll(total);
    const value = calcValue(newGood, bad, neutral);

    const average = calcAverage(value, total);

    setAvg(average);
    const positivePercentage = positivePerc(newGood, total);
    setPosPer(positivePercentage);
  };

  const setNeutralFeedback = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const total = calcTotal(good, bad, newNeutral);
    setAll(total);

    const value = calcValue(good, bad, newNeutral);
    const average = calcAverage(value, total);

    setAvg(average);
    const positivePercentage = positivePerc(good, total);
    setPosPer(positivePercentage);
  };

  const setBadFeedback = () => {
    const newBad = bad + 1;
    setBad(newBad);
    const total = calcTotal(good, newBad, neutral);
    setAll(total);

    const value = calcValue(good, newBad, neutral);
    const average = calcAverage(value, total);

    setAvg(average);
    const positivePercentage = positivePerc(good, total);
    setPosPer(positivePercentage);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={setGoodFeedback} text="good"></Button>
        <Button onClick={setNeutralFeedback} text="neutral"></Button>
        <Button onClick={setBadFeedback} text="bad"></Button>
      </div>
      <h1>statistcs</h1>
      <div>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          avg={avg}
          posPer={posPer}
        />
      </div>
    </div>
  );
};

export default App;
