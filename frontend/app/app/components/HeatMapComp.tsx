import HeatMap from "@uiw/react-heat-map";

import { useEffect } from "react";

const HeatMapComp = () => {
  const today = new Date();

  const shiftDate = (date: Date, numDay: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDay);
    return newDate;
  };

  useEffect(() => {
    console.log(shiftDate(today, -365));
    console.log(today);
  });

  return (
    <HeatMap
      rectProps={{ rx: 5 }}
      startDate={shiftDate(today, -365)}
      endDate={today}
      width={800}
    />
  );
};

export default HeatMapComp;
