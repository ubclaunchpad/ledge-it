import { getYear, getMonth } from './formatters';

/**
 * Enumeration of all sorting methods.
 */
export const METHODS = {
  OLD_TO_NEW: 1,
  NEW_TO_OLD: 2,
  HIGH_TO_LOW: 3,
  LOW_TO_HIGH: 4,
};

/**
 * Sort a list of transactions.
 *
 * TODO: this spaghetti-fied when I realized the field names differ (price, value; "date" versus month and year)
 *       we should resolve!
 *
 * @param {Date[]} list
 * @param {number} method from METHODS enum
 * @returns {Date[]}
 */
export const sortTransactions = (list, method = METHODS.LOW_TO_HIGH) => {
  switch (method) {
    case METHODS.OLD_TO_NEW:
      return list.sort((a, b) => {
        if ('year' in a && 'year' in b) {
          return a.year + a.month / 12 - (b.year + b.month / 12);
        } else {
          return (
            getYear(a.date) + getMonth(a.date) / 12 - (getYear(b.date) + getMonth(b.date) / 12)
          );
        }
      });
    case METHODS.HIGH_TO_LOW:
      return list.sort((a, b) => {
        if ('value' in a && 'value' in b) {
          return b.value - a.value;
        } else {
          // if ('price' in a && 'price' in b) {
          return b.price - a.price;
        }
      });
    case METHODS.LOW_TO_HIGH:
      return list.sort((a, b) => {
        if ('value' in a && 'value' in b) {
          return a.value - b.value;
        } else {
          // if ('price' in a && 'price' in b) {
          return a.price - b.price;
        }
      });
    default:
      // use NEW_TO_OLD by default
      return list.sort((a, b) => {
        if ('year' in a && 'year' in b) {
          return b.year + b.month / 12 - (a.year + a.month / 12);
        } else {
          return (
            getYear(b.date) + getMonth(b.date) / 12 - (getYear(a.date) + getMonth(a.date) / 12)
          );
        }
      });
  }
};
