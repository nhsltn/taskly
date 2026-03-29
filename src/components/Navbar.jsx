import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import { getDay, getShortDate } from "../utils/dateHelper";
import { FaRegCalendarAlt, FaBell } from "react-icons/fa";
import Logo from "/assets/images/taskly-logo.png";

function Navbar() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotification = () => {
    toast.info("Fitur notifikasi sedang dalam Development!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <nav className="navbar bg-[#F8F8FB] px-20 py-3 flex justify-between w-full h-20 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.07)] relative mb-10">
      <div className="logo flex items-center gap-3">
        <img src={Logo} alt="Taskly Logo" className="h-9.75 w-auto" />
        <p className="text-[32px] font-bold">
          <span className="text-[#FF6767]">Tas</span>kly
        </p>
      </div>
      <div className="nav-function flex gap-14 items-center">
        <div className="nav-button text-white flex gap-3 items-center relative">
          <button
            className="bg-[#FF6767] size-10 rounded-lg p-2 flex items-center justify-center"
            onClick={handleNotification}
          >
            <FaBell />
          </button>
          <button
            className="bg-[#FF6767] size-10 rounded-lg p-2 flex items-center justify-center"
            ref={buttonRef}
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <FaRegCalendarAlt />
          </button>

          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute top-12 left-1/2 -translate-x-1/2 z-50 rounded-xl overflow-hidden"
            >
              <Calendar onChange={setDate} value={date} />
            </div>
          )}
        </div>
        <div className="date flex flex-col gap-1 items-center text-base font-medium">
          <p className="days">{getDay()}</p>
          <p className="date text-[#3ABEFF]">{getShortDate()}</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
