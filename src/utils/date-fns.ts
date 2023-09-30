import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

export const relative = (date: Date, mini?: boolean) => {
  return timeAgo.format(date, mini ? "mini-now" : undefined);
};
