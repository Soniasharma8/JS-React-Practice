import React, { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date()); // har second time update hoga
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">
        {time.toLocaleTimeString()}
      </h1>
    </div>
  );
}
