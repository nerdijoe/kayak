
export const currencyWithNoDecimal = (number) => {
  return Number(parseFloat(number).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 0,
  });
};

export const currencyWithDecimal = (number) => {
  return Number(parseFloat(number).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2,
  });
};
