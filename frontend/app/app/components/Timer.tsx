import {
  CountdownCircleTimer,
  type ColorFormat,
} from "react-countdown-circle-timer";

interface TimerProps {
  isPlay: boolean;
  duration: number;
  colors: ColorFormat;
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
const Timer = ({ isPlay, duration, complete, colors }: TimerProps) => {
  return (
    <>
      <CountdownCircleTimer
        strokeWidth={3}
        isPlaying={isPlay}
        duration={duration}
        colors={colors}
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
      <Timer
        isPlay={isPlay}
        duration={5}
        complete={complete}
        colors={"#6658A6"}
      />
    </>
  );
};

// 5分タイマー（休憩時間）
const RestTimer = ({ isPlay, complete }: TimerRoleProps) => {
  return (
    <>
      <Timer
        isPlay={isPlay}
        duration={3}
        complete={complete}
        colors={"#1A4472"}
      />
    </>
  );
};

// 15分〜30分タイマー（4周期に1回の休憩時間）
const LongRestTimer = ({ isPlay, complete }: TimerRoleProps) => {
  return (
    <>
      <Timer
        isPlay={isPlay}
        duration={10}
        complete={complete}
        colors={"#007C8A"}
      />
    </>
  );
};

export { WorkTimer, RestTimer, LongRestTimer };
