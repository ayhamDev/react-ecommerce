const CalculateAmount = (UserCart) => {
  let amount = 0;
  let prices = [];
  prices = UserCart?.products?.map((product) => {
    return (product.productId.price * product.quantity) / 100;
  });
  amount =
    prices?.length > 0
      ? prices?.reduce((val, nextValue) => {
          return val + nextValue;
        })
      : 0;
  return amount;
};
module.exports = CalculateAmount;
