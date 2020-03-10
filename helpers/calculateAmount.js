module.exports = function(items) {
  return (
    items.reduce((count, el) => {
      return count + el;
    }, 0) * 100
  );
};
