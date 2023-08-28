import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
  isPlay: boolean;
  duration?: number;
  complete?: () => void;
}

// フォーマット変換（分:秒）
const convertTime = (remainingTime: number) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  return (
    <div className="text-3xl">
      {minutes}:{seconds}
    </div>
  );
};

// 25分タイマー（作業時間）
const PomodoroTimer = ({ isPlay, duration, complete }: Props) => {
  return (
    <>
      <CountdownCircleTimer
        strokeWidth={5}
        isPlaying={isPlay}
        duration={3}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 7, 4, 0]}
        onComplete={complete}
      >
        {({ remainingTime }) => convertTime(remainingTime)}
      </CountdownCircleTimer>
    </>
  );
};

// 5分タイマー（休憩時間）
const RestTimer = ({ isPlay, duration, complete }: Props) => {
  return (
    <>
      <CountdownCircleTimer
        strokeWidth={5}
        isPlaying={isPlay}
        duration={2}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 7, 4, 0]}
        onComplete={complete}
      >
        {({ remainingTime }) => convertTime(remainingTime)}
      </CountdownCircleTimer>
    </>
  );
};

// 15分〜30分タイマー（4周期に1回の休憩時間）
const LongRestTimer = ({ isPlay, duration, complete }: Props) => {
  return (
    <>
      <CountdownCircleTimer
        strokeWidth={5}
        isPlaying={isPlay}
        duration={10}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 7, 4, 0]}
        onComplete={complete}
      >
        {({ remainingTime }) => convertTime(remainingTime)}
      </CountdownCircleTimer>
    </>
  );
};

export { PomodoroTimer, RestTimer, LongRestTimer };
