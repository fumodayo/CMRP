export type Course = {
  _id: string;
  name: string;
  author: string;
  rating: number;
  image: string;
  thumbnail: string;
  author_image: string;
  status: string;
  price: number;
  startDate: string;
  endDate: string;
  category: string;
  location: string;
  address: [];
  description: string;
  requirement: string;
  syllabus: string;
  total_student: number;
  createdAt: string;
  total_review: number;
};

export type Review = {
  id: string;
  user_name: string;
  avatar: string;
  course_id: string;
  createdAt: string;
  comment: string;
  rating: number;
};

export type CartItem = {
  _id?: string;
  image: string;
  endDate: string;
  name: string;
  author: string;
  location: string;
  rating: number;
  total_student: number;
  price: number;
};

export type User = {
  id: string;
  user_name: string;
  password: string;
  role: string;
};
