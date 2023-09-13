"use client"; // Client Componentを書く場合、この宣言が必要（React18から）

import { Suspense, useState, useEffect } from "react";

import { YoutubePlayer } from "components/MusicPlayer";
import { WorkTimer, RestTimer, LongRestTimer } from "components/Timer";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-regular-svg-icons";

const Timer = () => {
  const [isClient, setIsClient] = useState(false);

  // 各タイマーの再生状態
  const [isWorkPlaying, setIsWorkPlaying] = useState(false);
  const [isRestPlaying, setIsRestPlaying] = useState(false);
  const [isLongRestPlaying, setIsLongRestPlaying] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // 作業モード or 休憩モード
  const [isWorkMode, setIsWorkMode] = useState(true);

  // Pomodoroタイマー完了回数
  const [completeCount, setCompleteCount] = useState(0);

  const incrementCompleteCount = () => setCompleteCount((prev) => prev + 1);

  // いずれかのタイマーが起動していれば、trueを返す
  const isPlayed = isWorkPlaying || isRestPlaying || isLongRestPlaying;

  // Pomodoro４周期にtrueを返す
  const isFourthCycle = completeCount % 4 === 0 && completeCount !== 0;

  // 作業タイマーと作業BGMをスタート
  const workTimerStart = () => {
    setIsMusicPlaying(true);
    setIsWorkPlaying(true);
  };

  // 作業タイマーと作業BGMをストップ
  const workTimerStop = () => {
    setIsMusicPlaying(false);
    setIsWorkPlaying(false);
  };

  // Restタイマーと休憩BGMをスタート
  const restTimerStart = () => {
    setIsRestPlaying(true);
    // 休憩BGM スタート処理
  };

  // Restタイマーと休憩BGMをストップ
  const restTimerStop = () => {
    setIsRestPlaying(false);
    // 休憩BGM ストップ処理
  };

  // LongRestタイマーと長休憩BGMをスタート
  const longRestTimerStart = () => {
    setIsLongRestPlaying(true);
    // 長休憩BGM スタート処理
  };

  // Work完了
  const workCompleted = () => {
    incrementCompleteCount();
    setIsWorkMode(false);
    workTimerStop();
    createPomodoro();

    // CompleteCount 再評価
    const currentCycle = completeCount + 1;
    const isFourthCycle = currentCycle % 4 === 0;

    if (isFourthCycle) {
      longRestTimerStart();
    } else {
      restTimerStart();
    }
  };

  // Rest完了
  const restCompleted = () => {
    setIsWorkMode(true);
    workTimerStart();
    restTimerStop();
  };

  // LongRest完了
  const LongRestCompleted = () => {
    setIsWorkMode(true);
    workTimerStart();
    setIsLongRestPlaying(false);
  };

  // 一時停止
  const pauseTimer = () => {
    workTimerStop();
    restTimerStop();
    setIsLongRestPlaying(false);
  };

  // タイマースタート
  const startTimer = () => {
    if (isWorkMode) {
      workTimerStart();
    } else if (isFourthCycle) {
      longRestTimerStart();
    } else {
      restTimerStart();
    }
  };

  useEffect(() => {
    setIsClient(true);
    console.log(`longRestPlaying ${isLongRestPlaying}`);
    console.log(`completeCount: ${completeCount}`);
    console.log(completeCount % 4 === 0 && completeCount !== 0);
  }, [completeCount, isLongRestPlaying]);

  const today = new Date();

  const createPomodoro = async () => {
    const formData = new FormData();
    formData.append("pomodoro[date]", today.toISOString());
    const response = await fetch("http://localhost:3000/api/v1/pomodoros", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      {isClient && (
        <>
          {isWorkMode ? (
            <WorkTimer isPlay={isWorkPlaying} complete={workCompleted} />
          ) : isFourthCycle ? (
            <LongRestTimer
              isPlay={isLongRestPlaying}
              complete={LongRestCompleted}
            />
          ) : (
            <RestTimer isPlay={isRestPlaying} complete={restCompleted} />
          )}

          <YoutubePlayer isPlay={isMusicPlaying} />

          <div>
            {isPlayed ? (
              <button onClick={() => pauseTimer()}>
                <FontAwesomeIcon icon={faCircleStop} size="3x" />
              </button>
            ) : (
              <button onClick={() => startTimer()}>
                <FontAwesomeIcon icon={faCirclePlay} size="3x" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Timer;
