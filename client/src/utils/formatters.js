export const formatNumber = (num, digits = 2) =>
  Math.abs(num).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

/**
 * "12/1/2021" -> "2021-12-01"
 */
export const formatDateBE = (date) => {
  const dateList = date.split('/');

  if (dateList.length !== 3) return date;

  const month = dateList[0].length === 1 ? `0${dateList[0]}` : dateList[0];
  const day = dateList[1].length === 1 ? `0${dateList[1]}` : dateList[1];
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
export const getYear = (date) => Number.parseInt(date.slice(0, 4));

/**
 * "2021-12-01" -> 12
 */
export const getMonth = (date) => Number.parseInt(date.slice(5, 7));

/**
 * "2021-12-01" -> 1
 */
export const getDay = (date) => Number.parseInt(date.slice(8));
