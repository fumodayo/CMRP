export type Category = {
  _id?: string;
  name?: string;
  value?: string;
};

export type Schedule = {
  id?: string;
  title?: string;
  start?: string;
  end?: string;
};

export type Course = {
  _id?: string;
  name?: string;
  user_id?: string;
  author?: string;
  isCertificate?: boolean;
  image?: string;
  thumbnail?: string; // Link youtube
  price?: number;
  createdAt?: string; // Thời gian tạo khóa học (Thời gian được phép đăng ký)
  startDate?: string;
  endDate?: string;
  category?: string[];
  /**
   * Online
   * Offline / Hybrid (Phải có address)
   */
  type?: string;
  address?: {
    name?: string;
    lat?: number;
    lng?: number;
  };
  short_description?: string;
  description?: string;
  requirement?: string;
  schedule?: Schedule[];
  total_rating?: number; // Tổng rating
  total_review?: number; // Tổng của reviewIds
  total_student?: number; // Tổng của học viên theo yêu cầu
  total_lesson?: number; // Tổng của schedule
  total_enroll?: number; // Tổng của số lượng học viên đăng ký hiện tại
  /* 
    AWAITING (Đang chờ thanh toán tiền)
    REJECTED (Bị từ chối)
    PENDING (Đang chờ được duyệt)
    OPEN (Duyệt xong và bắt đầu cho học viên đăng ký) 
    IN_PROGRESS 
    COMPLETED (Được phép review)
  */
  status?: string;
  student_Ids?: string[];
  reviews_Ids?: string[];
};

export type Review = {
  _id?: string;
  isUnnamed?: boolean;
  user_id?: string;
  avatar?: string;
  name?: string;
  course_id?: string;
  createdAt?: string;
  content?: string;
  rating?: number;
};

export type CartItem = {
  _id?: string;
  image?: string;
  endDate?: string;
  name?: string;
  author?: string;
  type?: string;
  rating?: number;
  total_student?: number;
  price?: number;
  /* 
    PENDING (Chưa thanh toán)
    COMPLETED (Đã thanh toán)
  */
  status?: string;
};

export type User = {
  _id?: string;
  name?: string;
  avatar?: string;
  email?: string;
  password?: string;
  role?: string[];
  bio?: string;
  isCertificate?: boolean;
  category?: string[];
  total_course_created?: number;
  total_review_created?: number;
  total_course?: number;
  total_review?: number;
  course_Ids?: string[];
  review_Ids?: string[];
  course_created_Ids?: string[];
  review_created_Ids?: string[];
  real_name?: string;
  cccd_number?: number;
  dateOfBirth?: string;
  createdAt?: string;
};

export type CertificateTypes = {
  _id?: string;
  user_id?: string;
  category?: string[];
  images?: string[];
  /*
    PENDING
    COMPLETED
    REJECTED
  */
  status?: string;
};
