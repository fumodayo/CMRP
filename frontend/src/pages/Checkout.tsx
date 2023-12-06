import UserLayout from "../layouts/UserLayout";
import Container from "../components/Container";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useContext } from "react";
import { Store } from "../context/Store";
import { formatPrice } from "../utils/formatPrice";
import BackButton from "../components/buttons/BackButton";
import { Divider } from "@mui/material";

const Checkout = () => {
  const course = {
    description: "test description",
    price: "5000",
  };

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const total = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };

  if (paidFor) {
    alert("Thanh toan thanh cong");
  }

  if (error) {
    alert(error);
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
                const hasAlreadyBoughtCourse = false;

                if (hasAlreadyBoughtCourse) {
                  setError("You already buy this course");

                  return actions.reject();
                } else {
                  return actions.resolve();
                }
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: course.description,
                      amount: {
                        value: course.price,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("order", order);

                handleApprove(data.orderID);
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
