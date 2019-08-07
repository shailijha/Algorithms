//enter the input month and year as two integers
const month = "11"
const year = "1950"

//get the current date
let today = new Date();
//month value returned is between 0-11
let today_month = today.getMonth();
let today_year = today.getFullYear();

function diffDate(month,year) {
  let year_diff = -1;
  let month_diff = -1;
  let date_diff = -1;
  if(month >=0 && month <= 11 && year >=1900 && year <= today_year) {
    if(year == today_year) {
      year_diff = 0;
      month_diff = (today_month - month)/12;
      date_diff = (year_diff+month_diff).toFixed(2);
      console.log(`The difference between the dates is ${date_diff}`);
    }
    else if(month==11 || month > today_month) {
      month_diff = [12-month+today_month]/12;
      year_diff = today_year - year - 1;
      date_diff = (year_diff+month_diff).toFixed(2);
      console.log(`The difference between the dates is ${date_diff}`);
    }
    else {
      year_diff = today_year - year;
      month_diff = (today_month - month)/12;
      date_diff = (year_diff + month_diff).toFixed(2);
      console.log('The difference between the dates is ',date_diff);
    }
  }
  else
    console.log('Please enter a valid date');
}

diffDate(month,year);
