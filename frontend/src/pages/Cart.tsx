import { AiFillStar } from "react-icons/ai";
import Container from "../components/Container";
import UserLayout from "../layouts/UserLayout";
import { countdownDaysToEvent } from "../utils/countdownDaysToEvent";
import { formatPrice } from "../utils/formatPrice";
import SimilarCourses from "../components/listings/SimilarCourses";
import { Store } from "../context/Store";
import { useContext } from "react";
import { CartItem } from "../types";

export const CartItems: React.FC<CartItem> = ({
  _id,
  image,
  endDate,
  name,
  author,
  location,
  rating,
  total_student,
  price,
}) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const removeItemHandler = (_id) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: _id });
  };

  return (
    <div
      onClick={() => removeItemHandler(_id)}
      className="flex items-center space-x-10 cursor-pointer p-5 rounded-xl hover:bg-neutral-100"
    >
      <div className="w-[35px] border border-neutral-700" />
      <div className="flex space-x-5 justify-center items-center">
        <div className="relative w-full h-[160px]">
          {image && (
            <img
              className="relative h-[160px] rounded-xl object-cover"
              src={image}
              alt="course"
            />
          )}
          <div className="absolute bottom-0 rounded-bl-xl bg-red-500 px-3 py-1 text-sm text-white">
            {countdownDaysToEvent(endDate)}
          </div>
        </div>
        <div className="min-w-[350px] space-y-1">
          <h2 className="text-2xl font-semibold text-neutral-900">{name}</h2>
          <div className="text-zinc-400 text-sm font-normal">{author}</div>
          <div className="text-zinc-400 text-sm font-semibold">{location}</div>
          <div className="flex items-center text-zinc-400 text-sm font-normal space-x-3">
            {rating}
            <AiFillStar className="text-yellow-400 mx-1" size={15} />|
            <span>{total_student}</span>
          </div>
        </div>
      </div>
      <div className="text-slate-700 text-xl font-bold">
        {price && formatPrice(price)}
        <span className="text-emerald-500">đ</span>
      </div>
    </div>
  );
};

const Cart = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const total = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  return (
    <UserLayout>
      <Container>
        <div className="flex flex-col justify-between">
          <h1 className="mb-5 text-3xl font-semibold text-neutral-900">
            Giỏ hàng ({cartItems.length})
          </h1>
          <div className="flex justify-between">
            <div className="flex flex-col px-5">
              {cartItems.map((item) => (
                <CartItems
                  _id={item._id}
                  image={item.image}
                  endDate={item.endDate}
                  name={item.name}
                  author={item.author}
                  location={item.location}
                  rating={item.rating}
                  total_student={item.total_student}
                  price={item.price}
                />
              ))}
            </div>
            <div className="space-y-5">
              <div>
                <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
                  Tổng
                </h2>
                <div className="text-slate-700 text-3xl font-bold">
                  {formatPrice(total)}
                  <span className="text-emerald-500">đ</span>
                </div>
              </div>
              <div className="min-w-[300px] bg-neutral-700 text-white text-xl flex items-center justify-center px-5 py-3 cursor-pointer hover:bg-neutral-900">
                Thanh toán
              </div>
            </div>
          </div>
          <div className="py-10">
            <h1 className="text-neutral-700 text-lg font-semibold">
              Các khóa học liên quan:
            </h1>
            <SimilarCourses />
          </div>
        </div>
      </Container>
    </UserLayout>
  );
};

export default Cart;
