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
  total_student?: number; // Tổng của học viên theo yêu cầu
  student_Ids?: string[]; // Mảng chứa tổng những học viên đã đăng ký
  total_enroll?: number; // Tổng của số lượng học viên đăng ký hiện tại
  /* 
    PENDING (Đang chờ được duyệt)
    REJECTED (Bị từ chối)
    PUBLIC (Duyệt xong và bắt đầu cho học viên đăng ký)
    NONPUBLIC (Đã duyệt xong mà instructor không muốn PUBLIC)
    IN_PROGRESS (Bắt đầu dạy và không còn có thể đăng ký)
    COMPLETED (Được phép review)
    */
  status?: string;

  author?: string;
  feedbacks?: any[];
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
  sentiment?: number[];
  // Mảng này lần lượt chứa:[ NEG, POS, NEU]
  // NEU: Tiêu cực
  // POS: Tích cực
  // NEU: Trung lập
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
  course_details?: any;
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
  createdAt?: string;
  /* */
  real_name?: string;
  cccd_number?: string;
  dateOfBirth?: string;
  /* */
  income?: number; // Tổng số tiền kiếm được
  pending_money?: number; // Số tiền được phép rút
  status?: string; // Trạng thái của user: ACTIVE và INACTIVE

  feedbacks?: any[];
};

export type Certificate = {
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
  createdAt?: string;

  realName?: string;
};

export type FeedBack = {
  _id?: string;
  user_id?: string;
  course_id?: string;
  createdAt?: string;
  content?: string;
  /*
    PENDING
    COMPLETED
  */
  status?: string;
};
