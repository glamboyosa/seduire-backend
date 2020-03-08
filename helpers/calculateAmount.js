module.exports = function(items) {
  return (
    items
      .map(item => {
        return {
          amount: item.amount
        };
      })
      .reduce((count, el) => {
        return count + el.amount;
      }, 0) * 100
  );
};
