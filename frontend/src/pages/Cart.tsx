import Container from "../components/Container";
import BackButton from "../components/buttons/BackButton";
import UserLayout from "../layouts/UserLayout";

const Cart = () => {
  return (
    <UserLayout>
      <Container>
        <BackButton />
        <h1>Giỏ hàng của bạn</h1>
      </Container>
    </UserLayout>
  );
};

export default Cart;
