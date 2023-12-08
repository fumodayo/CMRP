import Container from "../../components/Container";
import UserLayout from "../../layouts/UserLayout";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CCCDStep from "../../components/steps/CCCDStep";
import CertificateStep from "../../components/steps/CertificateStep";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(6, 183, 56) 0%, rgb(8, 126, 18) 50%, rgb(35, 138, 61) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <BadgeIcon />,
    2: <WorkspacePremiumIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ["Xác minh bản thân", "Xác minh chứng chỉ"];

const Certificate = () => {
  const navigator = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cccdData, setCccdData] = useState({
    cccd_number: 0,
    real_name: "",
    dateOfBirth: "",
  });

  const [authentic, setAuthentic] = useState({
    category: [],
    images: [],
  });

  const [allCertificateData, setAllCertificateData] = useState<any[]>([]);

  // Thêm danh sách các chứng chỉ đã tạo
  const [certificateSteps, setCertificateSteps] = useState<JSX.Element[]>([]);

  // Thêm hàm để tạo mới bước chứng chỉ
  const addCertificateStep = () => {
    const newCertificateStep = (
      <CertificateStep
        key={certificateSteps.length}
        onAuthentic={setAuthentic}
      />
    );
    setCertificateSteps([...certificateSteps, newCertificateStep]);
  };

  useEffect(() => {
    if (authentic.images.length > 0) {
      setAllCertificateData((prevData) => [...prevData, authentic]);
    }
  }, [authentic]);

  // Thêm hàm để xóa bước chứng chỉ đã tạo
  const removeCertificateStep = (index: number) => {
    const updatedSteps = certificateSteps.filter((_, i) => i !== index);
    setCertificateSteps(updatedSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      console.log("cccd", cccdData);
    } else {
      // const { images, category } = authentic;
      // const formData = new FormData();
      // images.forEach((image) => formData.append("file", image));
      // formData.append("upload_preset", "friendsbook");

      // const { data } = await axios.post(
      //   `http://localhost:8080/api/upload/multi`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      console.log(allCertificateData);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      navigator("/");
    }
  }, [activeStep, navigator]);

  return (
    <UserLayout>
      <Container>
        <h1 className="text-slate-700 text-2xl font-bold my-3">
          Xác nhận chứng chỉ
        </h1>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === 0 ? (
            <CCCDStep onCCCDData={setCccdData} />
          ) : (
            <div>
              <CertificateStep onAuthentic={setAuthentic} />
              {certificateSteps.map((step, index) => (
                <div key={index}>
                  {step}
                  <Button onClick={() => removeCertificateStep(index)}>
                    Xóa
                  </Button>
                </div>
              ))}
              <Button onClick={addCertificateStep}>Thêm chứng chỉ</Button>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Trở lại
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Hoàn thành" : "Tiếp theo"}
          </Button>
        </div>
      </Container>
    </UserLayout>
  );
};

export default Certificate;
