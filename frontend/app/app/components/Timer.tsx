import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface TimerProps {
  isPlay: boolean;
  duration: number;
  complete: () => void;
}

interface TimerRoleProps {
  isPlay: boolean;
  complete: () => void;
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

// タイマー雛形
const Timer = ({ isPlay, duration, complete }: TimerProps) => {
  return (
    <>
      <CountdownCircleTimer
        strokeWidth={5}
        isPlaying={isPlay}
        duration={duration}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 7, 4, 0]}
        onComplete={complete}
      >
        {({ remainingTime }) => convertTime(remainingTime)}
      </CountdownCircleTimer>
    </>
  );
};

// 25分タイマー（作業時間）
const WorkTimer = ({ isPlay, complete }: TimerRoleProps) => {
  return (
    <>
      <Timer isPlay={isPlay} duration={5} complete={complete} />
    </>
  );
};

// 5分タイマー（休憩時間）
const RestTimer = ({ isPlay, complete }: TimerRoleProps) => {
  return (
    <>
      <Timer isPlay={isPlay} duration={3} complete={complete} />
    </>
  );
};

// 15分〜30分タイマー（4周期に1回の休憩時間）
const LongRestTimer = ({ isPlay, complete }: TimerRoleProps) => {
  return (
    <>
      <Timer isPlay={isPlay} duration={10} complete={complete} />
    </>
  );
};

export { WorkTimer, RestTimer, LongRestTimer };
