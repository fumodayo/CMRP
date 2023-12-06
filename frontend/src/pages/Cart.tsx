import { AiFillStar } from "react-icons/ai";
import Container from "../components/Container";
import UserLayout from "../layouts/UserLayout";
import { countdownDaysToEvent } from "../utils/countdownDaysToEvent";
import { formatPrice } from "../utils/formatPrice";
import SimilarCourses from "../components/listings/SimilarCourses";
import { Store } from "../context/Store";
import { useContext } from "react";
import { CartItem } from "../types";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const CartItems: React.FC<CartItem> = ({
  _id,
  image,
  endDate,
  name,
  author,
  type,
  rating,
  total_student,
  price,
}) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const removeItemHandler = (_id) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: _id });
  };

  return (
    <div className="flex items-center space-x-10 cursor-pointer p-5 rounded-xl hover:bg-gray-100 transition-colors duration-300">
      <div className="hover:bg-red-200 p-1 rounded-2xl">
        <HighlightOffIcon
          color="error"
          onClick={() => removeItemHandler(_id)}
        />
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative w-72 h-42">
          {image && (
            <img
              className="h-full w-full rounded-md object-cover"
              src={image}
              alt="course"
            />
          )}
          <div className="absolute bottom-0 rounded-b-md bg-red-500 px-3 py-1 text-sm text-white">
            {countdownDaysToEvent(endDate)}
          </div>
        </div>
        <div className="flex flex-col min-w-[350px]">
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <div className="text-gray-500 text-sm">{author}</div>
          <div className="text-gray-500 text-sm font-semibold">
            {type?.toUpperCase()}
          </div>
          <div className="flex items-center text-gray-500 text-sm space-x-1">
            {rating}
            <AiFillStar className="text-yellow-400" size={15} />
            <span className="mx-1">|</span>
            <span>{total_student}</span>
          </div>
        </div>
      </div>
      <div className="text-gray-700 text-lg font-bold">
        {price && formatPrice(price)}
        <span className="text-green-500">đ</span>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigator = useNavigate();
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
        <BackButton />
        <section className="flex flex-col justify-between mx-6 py-5">
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
                  type={item.type}
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
              <div
                onClick={() => navigator("/checkout")}
                className="min-w-[300px] bg-neutral-700 text-white text-xl flex items-center justify-center px-5 py-3 cursor-pointer hover:bg-neutral-900"
              >
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
        </section>
      </Container>
    </UserLayout>
  );
};

export default Cart;
