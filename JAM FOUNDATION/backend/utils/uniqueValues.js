const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  unique = unique.flat();
  const uniqueSet = new Set(unique);

  return [...uniqueSet];
};

module.exports = getUniqueValues;
