import Container from "../../components/Container";
import UserLayout from "../../layouts/UserLayout";
import Dropzone from "../../components/inputs/Dropzone";

const Certificate = () => {
  return (
    <UserLayout>
      <Container>
        <h1 className="text-slate-700 text-2xl font-bold my-3">
          Xác nhận chứng chỉ
        </h1>
        <Dropzone className="p-16 mt-10 border border-neutral-200" />
      </Container>
    </UserLayout>
  );
};

export default Certificate;
