"use client";

import { useEffect, useState } from "react";

// Live local time in India, so a recruiter instantly sees my time zone.
export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <span className="font-mono tabular-nums" suppressHydrationWarning>
      {time || "--:--:--"} IST
    </span>
  );
}
