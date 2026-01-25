export interface CalendarDay {
  dayName: string; // S, M, T, etc.
  dayNumber: number; // 9, 10, 11
  fullDate: string; // To compare if it is today
  isToday: boolean;
}