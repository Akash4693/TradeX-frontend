

/* 
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data, onEventOver }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    // Function to calculate the remaining time
    const calculateTimeLeft = () => {
      const difference = +new Date(data?.Finish_Date) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    // Calculate initial time left
    const newTimeLeft = calculateTimeLeft();
    setTimeLeft(newTimeLeft);

    // Handle event end if time has run out
    if (!Object.keys(newTimeLeft).length) {
      handleEventEnd();
      return;
    }

    // Set up countdown timer
    const timer = setTimeout(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      // Clear the event when countdown is complete
      if (!Object.keys(updatedTimeLeft).length) {
        handleEventEnd();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [data, timeLeft]); // Added `data` dependency

  // Function to handle when the event is over
  const handleEventEnd = async () => {
    try {
      await axios.delete(`${server}/event/delete-shop-event/${data?._id}`);
      setTimeLeft({}); // Clear the timer
      onEventOver && onEventOver(data?._id); // Notify parent component if callback is provided
    } catch (error) {
      console.error("Failed to delete the event:", error);
    }
  };

  // Rendering the countdown
  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
 */

import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { server } from "../../server";

// Function to calculate time left
const calculateTimeLeft = (finishDate) => {
  const finish = new Date(finishDate);
  if (isNaN(finish)) return {}; // Invalid date check

  const difference = finish - new Date();
  if (difference <= 0) return {}; // Event over

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountDown = ({ data, onEventOver }) => {
  const [timeLeft, setTimeLeft] = useState({});

  // Function to handle event end
  const handleEventEnd = useCallback(async () => {
    try {
      await axios.delete(`${server}/event/delete-shop-event/${data?._id}`, {
        withCredentials: true,
      });
      setTimeLeft({}); // Clear countdown when event ends
      if (onEventOver) onEventOver(data?._id); // Notify parent
    } catch (error) {
      console.error("Failed to delete the event:", error);
    }
  }, [data?._id, onEventOver]);

  useEffect(() => {
    // Initial calculation of time left
    const initialTimeLeft = calculateTimeLeft(data?.Finish_Date);
    setTimeLeft(initialTimeLeft);

    if (Object.keys(initialTimeLeft).length === 0) {
      handleEventEnd(); // If the event has already ended
      return;
    }

    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(data?.Finish_Date);

      if (Object.keys(updatedTimeLeft).length === 0) {
        clearInterval(timer);
        handleEventEnd();
      } else {
        setTimeLeft(updatedTimeLeft); // Update countdown each second
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [data, handleEventEnd]); // Dependencies

  const timerComponents = Object.keys(timeLeft).map((interval) =>
    timeLeft[interval] ? (
      <span className="text-[25px] text-[#475ad2]" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    ) : null
  );

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
