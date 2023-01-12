export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
};

export const getUniqueValues = (data = [], type) => {
  let unique = data.map((item) => item[type]);

  unique = unique.flat();
  let uniqueSet = new Set(unique);

  return ['all', ...uniqueSet];
};
