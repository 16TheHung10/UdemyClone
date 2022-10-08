import { createSelector } from "@reduxjs/toolkit";
export const selectCartItems = (state) => {
  return state.cart.items;
};

export const selectTotalCartItems = (state) => {
  return state.cart.items.length;
};

export const selectTypeBuy = (state) => {
  return state.cart.typeBuy;
};

export const selectItemTypeBuy = (state) => {
  return state.cart.buyNowItem;
};

export const selectCheckedList = (state) => {
  return state.cart.checkedList;
};

export const selectCart = (state) => {
  return state.cart;
};

export const selectCheckoutItem = createSelector(selectCart, (cart) => {
  const result = cart.items.filter(
    (item) =>
      cart.checkedList.findIndex((checked) => checked.id === item.id) !== -1
  );
  return result;
});

export const selectTotalDiscountPrice = createSelector(selectCheckedList, (items) => {
  const totalPrice = items.reduce((total, item) => total + item.salePrice, 0);
  return totalPrice;
})

export const selectTotalPrice = createSelector(selectCheckedList, (items) => {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  return totalPrice;
});

export const selectTotalCartPrice = createSelector(selectCartItems, (items) => {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  return totalPrice;
});

export const selectTotalCartCheckout = createSelector(selectCheckedList, (items) => {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);
  const totalDiscountPrice = items.reduce((total, item) => total + item.salePrice, 0);
  return totalPrice - totalDiscountPrice;
})

export const getCart = createSelector(selectCartItems, (items) => {
  const cart = items.map((item) => item.id);
  return { courseIds: cart };
});
