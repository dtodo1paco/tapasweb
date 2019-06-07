const Moment = require('moment');

const fixUnderTen = string => {
  const intValue = parseInt(string);
  return intValue < 10 ? `0${intValue}` : string;
}

const parseToDate = stringTime => {
  const parts = stringTime.split(':');
  const st = `${fixUnderTen(parts[0])}:${fixUnderTen(parts[1])}`
  console.log("ST: " + st)
  if (st.length > 3) {
    console.log("ST: " + '1970-01-01T' + st.slice(0, 5) + ':00.000Z')
    var offset = new Date().getTimezoneOffset();
    return new Date('1970-01-01T' + st.slice(0, 5) + ':00.000Z');
  } else {
    return null;
  }
}

const parseToDate2 = stringTime => {
  try {
    return (stringTime.length > 5)
      ? Moment(stringTime, 'HH:mm:ss')
      : stringTime.length > 2
        ? Moment(stringTime, 'HH:mm')
        : Moment(stringTime, 'HH')
  } catch (e) {
    console.error("ERROR: parseToDate: Unable to convert ["+stringTime+"]");
    return null;
  }
}

module.exports = {
  parseToDate,
}