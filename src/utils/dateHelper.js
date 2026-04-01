const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getDay = (date = new Date()) => {
  return DAYS[date.getDay()];
};

export const getShortDate = (date = new Date()) => {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const getLongDate = (date = new Date()) => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
};

export const getDateLabel = (dateStr) => {
  const today = new Date().toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  if (dateStr === today) return "• Today";
  if (dateStr === yesterdayStr) return "• Yesterday";
  if (dateStr === tomorrowStr) return "• Tomorrow";
  return `• ${DAYS[new Date(dateStr).getDay()]}`;
};
