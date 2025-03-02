import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h2 className="time">
      {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
    </h2>
  );
}
