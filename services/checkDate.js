const daysArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', 
'14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
'30', '31'];

const monthsArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const checkDate = (date) => {
  const splitDate = date.split('/');
  const currentDate = new Date();
  const checkDay = daysArray.includes(splitDate[0]);
  const checkMonth = monthsArray.includes(splitDate[1]);
  const checkYear = splitDate[2] > 1900 && splitDate[2] <= currentDate.getFullYear();
  return checkDay + checkMonth + checkYear;
};

module.exports = checkDate;
