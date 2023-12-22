import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Divider } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import UserLayout from "../layouts/UserLayout";
import Container from "../components/Container";
import { Store } from "../context/Store";
import { formatPrice } from "../utils/formatPrice";
import BackButton from "../components/buttons/BackButton";

const Checkout = () => {
  const navigator = useNavigate();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  console.log(userInfo);
  console.log(cartItems);

  const total = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  const isCourseInvalid = cartItems.some((item) => {
    const isUserEnrolled = userInfo && item.student_Ids.includes(userInfo._id);

    return isUserEnrolled;
  });

  useEffect(() => {
    if (paidFor) {
      const body = { cartItems };
      axios.post(`http://localhost:8080/api/cart`, body, {
        withCredentials: true,
      });
      ctxDispatch({ type: "CART_CLEAR" });
      navigator(`/`);
    }
  }, [paidFor, cartItems, userInfo, ctxDispatch, navigator]);

  if (error) {
    toast.error(error);
  }

  return (
    <UserLayout>
      <Container>
        <BackButton />
        <div>
          <section className="mx-6 py-5 space-y-5 flex flex-col h-screen justify-center items-center">
            <div className="flex flex-col space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="ml-5 text-xl font-medium text-emerald-500">
                    {formatPrice(item.price)} <span>đ</span>
                  </div>
                </div>
              ))}
              <Divider sx={{ border: 1 }} />
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Tổng
                </h2>
                <div className="text-3xl font-bold text-emerald-600">
                  {formatPrice(total)}
                  <span className="text-lg">đ</span>
                </div>
              </div>
            </div>
            <PayPalButtons
              style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill",
              }}
              onClick={(data, actions) => {
                if (!userInfo) {
                  navigator("/signin");
                  return actions.reject();
                }
                const hasAlreadyBoughtCourse = isCourseInvalid;
                console.log(hasAlreadyBoughtCourse);

                if (hasAlreadyBoughtCourse) {
                  toast.error("Khóa học này đang học");
                  ctxDispatch({ type: "CART_CLEAR" });
                  navigator(`/`);
                  return actions.reject();
                } else {
                  return actions.resolve();
                }
              }}
              createOrder={(data, actions) => {
                const items = cartItems.map((item) => ({
                  name: item.name,
                  unit_amount: {
                    currency_code: "USD", // Đổi sang đơn vị tiền tệ mong muốn
                    value: (item.price / 23000).toFixed(2), // Đổi giá về đơn vị tiền tệ mong muốn
                  },
                  quantity: "1", // Số lượng sản phẩm (1 sản phẩm mỗi item)
                }));

                return actions.order.create({
                  purchase_units: [
                    {
                      description: "Purchase from your website",
                      amount: {
                        currency_code: "USD", // Đổi sang đơn vị tiền tệ mong muốn
                        value: (total / 23000).toFixed(2), // Đổi tổng giá về đơn vị tiền tệ mong muốn
                        breakdown: {
                          item_total: {
                            currency_code: "USD", // Đổi sang đơn vị tiền tệ mong muốn
                            value: (total / 23000).toFixed(2), // Đổi tổng giá về đơn vị tiền tệ mong muốn
                          },
                        },
                      },
                      items,
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                // const order = await actions.order.capture();
                setPaidFor(true);
                toast.success("Thanh toán thành công");
              }}
              onCancel={() => {}}
              onError={(err: any) => {
                setError(err);
                console.error("Checkout error", err);
              }}
            />
          </section>
        </div>
      </Container>
    </UserLayout>
  );
};

export default Checkout;
