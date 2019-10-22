import React from "react";
import Statistic from "./Statistics/Statistic";

export default function Statistics({ stats }) {
  const good = stats[0];
  const neutral = stats[1];
  const bad = stats[2];
  const all = stats.reduce((a, b) => a + b, 0);
  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  if (all === 0) return <p>No feedback given</p>;
  else
    return (
      <table>
        <tbody>
          <Statistic title="good">{good}</Statistic>
          <Statistic title="neutral">{neutral}</Statistic>
          <Statistic title="bad">{bad}</Statistic>
          <Statistic title="all">{all}</Statistic>
          <Statistic title="average">{average}</Statistic>
          <Statistic title="positive">{positive}%</Statistic>
        </tbody>
      </table>
    );
}
