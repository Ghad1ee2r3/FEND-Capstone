const datepicker = require("js-datepicker");

// This is a function that display a calender on the input for date
export const picker = datepicker("#date", {
  showAllDates: true,
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString();
    input.value = value; // Displays the current date as a string ex - '21/2/2010'
  },
});
