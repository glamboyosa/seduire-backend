module.exports = function(items) {
  return (
    items
      .map(item => item)
      .reduce((count, el) => {
        return count + el;
      }, 0) * 100
  );
};
