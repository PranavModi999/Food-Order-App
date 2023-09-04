import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingAddItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingAddItem = state.items[existingAddItemIndex];
      let updatedItems;
      if (existingAddItem) {
        const updatedItem = {
          ...existingAddItem,
          amount: existingAddItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingAddItemIndex] = updatedItem;
      } else {
        // const updatedItems = state.items.concat(action.item);
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE_ITEM":
      const existingRemoveItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingRemoveItem = state.items[existingRemoveItemIndex];
      const updatedTotalAmountRemove =
        state.totalAmount - existingRemoveItem.price;
      let updatedRemoveItems;
      if (existingRemoveItem.amount <= 1) {
        console.log(action.item);
        updatedRemoveItems = state.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        const updatedRemoveItem = {
          ...existingRemoveItem,
          amount: existingRemoveItem.amount - 1,
        };
        updatedRemoveItems = [...state.items];
        updatedRemoveItems[existingRemoveItemIndex] = updatedRemoveItem;
      }
      return {
        items: updatedRemoveItems,
        totalAmount: updatedTotalAmountRemove,
      };
    default:
      return;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    removeItem: removeItemFromCartHandler,
    addItem: addItemToCartHandler,
    totalAmount: cartState.totalAmount,
    items: cartState.items,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
