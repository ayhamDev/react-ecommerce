const CalculateAmount = (UserCart: any) => {
  let amount = 0;
  let prices = [];

  prices = UserCart?.products?.map((product: any) => {
    return (product.productId.price * product.quantity) / 100;
  });
  amount =
    prices?.length > 0
      ? prices?.reduce((val: any, nextValue: any) => {
          return val + nextValue;
        })
      : 0;
  return amount;
};
export default CalculateAmount;
