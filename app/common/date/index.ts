import moment from 'moment';

moment.locale('en');

export const getMonthNameByNumber = (monthNumber: string | number) => {
  return moment().month(monthNumber).format('MMMM');
};

export const getDaysInMonth = (month, year) => {
  const days = new Date(year, month + 1, 0).getDate();

  return Array(...Array(days)).map((item, index) => {
    return index + 1;
  });
};

export const getBirthData = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const days = getDaysInMonth(currentMonth, currentYear);

  const months = [];
  const years = [];

  for (let i = new Date().getFullYear(); i > 1900; i -= 1) {
    years.push(i);
  }

  for (let i = 1; i < 13; i += 1) {
    months.push(i);
  }

  return {
    current: {
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    },
    days,
    months,
    years,
  };
};
