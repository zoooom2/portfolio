export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
};

export const getUniqueValues = () => {};
