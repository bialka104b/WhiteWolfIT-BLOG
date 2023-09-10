const productCountRequest = (user_id, id, product_variant_id, count) => {
  return {
    user_id,
    product: {
      id,
      product_variant_id,
      count,
    },
  };
};
const productToOrderRequest = (
  user_id,
  order_id,
  product_id,
  product_variant_id,
  count
) => {
  return {
    user_id,
    order_id,
    product_id,
    product_variant_id,
    count,
  };
};
export default { productCountRequest, productToOrderRequest };
