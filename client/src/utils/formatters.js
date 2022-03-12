export const formatString = (str) => str.trim().toLowerCase();

export const formatNumber = (num, digits = 2) => Math.abs(num).toFixed(digits);

/**
 * "30/12/2021" -> "2021-12-30"
 */
export const formatDateBE = (date) => {
  const dateList = date.split('/');

  if (dateList.length !== 3) return date;

  const day = dateList[0].length === 1 ? `0${dateList[0]}` : dateList[0];
  const month = dateList[1].length === 1 ? `0${dateList[1]}` : dateList[1];
  const year = dateList[2];

  return `${year}-${month}-${day}`;
};

/**
 * "2021-12-01" -> "12/1/2021"
 */
export const formatDateFE = (date) => {
  const dateList = date.split('-');

  if (dateList.length !== 3) return date;

  const year = dateList[0];
  const month = dateList[1].length === 1 ? `0${dateList[1]}` : dateList[1];
  const day = dateList[2].length === 1 ? `0${dateList[2]}` : dateList[2];

  return `${month}/${day}/${year}`;
};

/**
 * "2021-12-01" -> 2021
 */
export const getYear = (date) => Number.parseInt(date.slice(0, 4), 10);

/**
 * "2021-12-01" -> 12
 */
export const getMonth = (date) => Number.parseInt(date.slice(5, 7), 10);

/**
 * "2021-12-01" -> 1
 */
export const getDay = (date) => Number.parseInt(date.slice(8), 10);
