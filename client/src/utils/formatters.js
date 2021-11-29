export const formatNumber = (num, digits = 2) =>
  Math.abs(num).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const formatDate = () => undefined;
