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
const productRemoveRequest = (user_id, id, product_variant_id) => {
  return {
    user_id,
    products: [
      {
        id,
        product_variant_id,
      },
    ],
  };
};
const orderSendRequest = (userId, investmentId, message, receiversId, date) => {
  return {
    user_id: userId,
    investment_id: investmentId,
    message,
    order_receivers: receiversId,
    proposed_date: date,
  };
};
export default { productCountRequest, productRemoveRequest, orderSendRequest };
