import { useEffect, useState, useRef } from "react";
import jsQR from "jsqr";
import ReactCrop, { Crop, PixelCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../../utils/canvasPreview";
import { useDebounceEffect } from "../../hooks/useDebounceEffect";
import { Button, Input } from "antd";

const CCCDStep = ({ onCCCDData }) => {
  const [result, setResult] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | undefined>(
    undefined
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (selectedImage) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const image = new Image();
      image.src = URL.createObjectURL(selectedImage);

      if (!context) {
        console.log("Can not create");
        return;
      }

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        const imageData = context.getImageData(0, 0, image.width, image.height);
        const code = jsQR(imageData.data, image.width, image.height);

        if (code) {
          setResult(code.data);
        } else {
          setResult("Không tìm thấy mã QR");
        }
      };
    }
  }, [selectedImage]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setSelectedImage(selectedFile); // Cập nhật selectedImage với tệp đã chọn
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(selectedFile);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (e.currentTarget && e.currentTarget.width && e.currentTarget.height) {
      const { width, height } = e.currentTarget;
      const aspect = 1;
      setCrop(makeAspectCrop({ unit: "%", width: 90 }, aspect, width, height)); // Cập nhật crop với tỷ lệ khung hình.
    }
  }

  async function scanQRCodeFromCroppedImage(croppedImageBlob: Blob) {
    const croppedImage = new Image();
    croppedImage.src = URL.createObjectURL(croppedImageBlob);

    croppedImage.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = croppedImage.width;
      canvas.height = croppedImage.height;
      const context = canvas.getContext("2d");

      if (!context) {
        console.log("Can not create");
        return;
      }

      context.drawImage(
        croppedImage,
        0,
        0,
        croppedImage.width,
        croppedImage.height
      );

      const imageData = context.getImageData(
        0,
        0,
        croppedImage.width,
        croppedImage.height
      );
      const code = jsQR(
        imageData.data,
        croppedImage.width,
        croppedImage.height
      );

      console.log("code", code);
      if (code) {
        setResult(code.data);
      } else {
        setResult("Không tìm thấy mã QR");
      }
    };
  }

  function onImageCropConfirm() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    if (completedCrop && imgRef.current && previewCanvasRef.current) {
      canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      previewCanvasRef.current.toBlob((blob) => {
        if (blob) {
          console.log(blob);
          scanQRCodeFromCroppedImage(blob);
        }
      });
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  const [cccd, setCccd] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [dob, setDob] = useState<string>("");

  useEffect(() => {
    const values = result.split("|");
    if (values.length === 7) {
      const cccdValue = values[1];
      const fullNameValue = values[2];
      const dobValue = values[3];

      setCccd(cccdValue);
      setFullName(fullNameValue);
      setDob(dobValue);

      onCCCDData({
        cccd_number: Number(cccdValue),
        real_name: fullNameValue,
        dateOfBirth: new Date(
          `${dobValue.substring(4, 8)}-${dobValue.substring(
            2,
            4
          )}-${dobValue.substring(0, 2)}T00:00:00.000Z`
        ).toISOString(),
      });
    }
    console.log("code", result);
  }, [result]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Button onClick={onImageCropConfirm}>Xác nhận cắt ảnh</Button>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          minHeight={200}
        >
          <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
        </>
      )}
      <div>
        <label>Số CCCD</label>
        <Input
          type="text"
          placeholder="CCCD"
          value={cccd}
          onChange={(e) => setCccd(e.target.value)}
        />
        <label>Tên người dùng</label>
        <Input
          type="text"
          placeholder="Tên người dùng"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Ngày/tháng/năm sinh</label>
        <Input
          type="text"
          placeholder="Ngày/tháng/năm sinh"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CCCDStep;
