import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://http-request-b6341-default-rtdb.firebaseio.com/cart.json",
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const resData = await res.json();
      return resData;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async(dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://http-request-b6341-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Sending cart data failed");
      }
      const resData = await res.json();
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "Success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
