import React from "react";

const Calendar = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendar = () => {
    const calendar = [];
    let dayCounter = 1;

    // Render empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(<td key={`empty-${i}`} />);
    }

    // Render days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const className = day === currentDay ? "highlight" : "";
      calendar.push(
        <td key={day} className={className}>
          {day}
        </td>
      );
      dayCounter++;

      // Start a new row if it's the end of the week
      if (dayCounter > 7) {
        calendar.push(<tr key={dayCounter} />);
        dayCounter = 1;
      }
    }

    // Fill in any remaining empty cells
    while (dayCounter > 1 && dayCounter <= 7) {
      calendar.push(<td key={`empty-end-${dayCounter}`} />);
      dayCounter++;
    }

    return calendar;
  };

  return (
    <div className="calendar-container">
      <table className="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
