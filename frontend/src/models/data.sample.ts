import {
  Category,
  Course,
  Review,
  User,
  Certificate,
  FeedBack,
} from "./../types/index";

export const categories: Category[] = [
  {
    _id: "cat_1",
    name: "kinh doanh",
    value: "kinh doanh",
  },
  {
    _id: "cat_2",
    name: "marketing",
    value: "marketing",
  },
  {
    _id: "cat_3",
    name: "tài chính",
    value: "tài chính",
  },
  {
    _id: "cat_4",
    name: "phát triển bản thân",
    value: "phát triển bản thân",
  },
  {
    _id: "cat_5",
    name: "cntt",
    value: "cntt",
  },
  {
    _id: "cat_6",
    name: "python",
    value: "python",
  },
  {
    _id: "cat_7",
    name: "tâm lý",
    value: "tâm lý",
  },
  {
    _id: "cat_8",
    name: "phong cách sống",
    value: "phong cách sống",
  },
  {
    _id: "cat_9",
    name: "thiết kế",
    value: "thiết kế",
  },
];

export const courses: Course[] = [
  {
    _id: "course_1",
    name: "Xây dựng chiến lược và vận hành B2B marketing",
    user_id: "user_1",
    image:
      "https://www.cask.vn/wwwroot/resources/img/product/11-2023/2-ngang%20d%C6%B0%E1%BB%9Bi%201mb.png",
    thumbnail: "",
    price: 5600000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-11-20T00:00:00.000Z",
    endDate: "2023-12-11T00:00:00.000Z",
    category: ["kinh doanh", "marketing"],
    type: "offline",
    address: {
      name: "238 Đ. Nam Kỳ Khởi Nghĩa, HCM",
      lat: 10.787979437710913,
      lng: 106.6855432232891,
    },
    short_description: "",
    description: `
    <ul>
    <li>6 ĐIỀU CẦM VỀ
      <ol>
        <li>PHƯƠNG PHÁP XÁC ĐỊNH PHÂN KHÚC NGÀNH HÀNG & THẤU HIỂU KHÁCH HÀNG B2B<br>Thấu hiểu hành vi, xu hướng khách hàng trong từng phân khúc ngành hàng để đánh giá tiềm năng, xác định thứ tự ưu tiên & lựa chọn phân khúc phù hợp.</li>
        <li>NẮM VỮNG CÁC BƯỚC THIẾT KẾ & XÂY DỰNG CHIẾN LƯỢC SẢN PHẨM CẠNH TRANH<br>Nắm vững trình tự nghiên cứu và phương pháp xác định giá trị khác biệt so với đối thủ trong cùng phân khúc. Từ đó dễ dàng xây dựng chiến lược Offering & Product Portfolio hiệu quả.</li>
        <li>LÀM CHỦ NGHỆ THUẬT TRUYỀN THÔNG VỚI QUY TRÌNH XÂY DỰNG KẾ HOẠCH MARKETING BÀI BẢN, CHUYÊN SÂU<br>Dựa trên sự thấu hiểu đặc thù về Inbound Marketing và các kênh truyền thông, định hướng nên những hoạt động truyền thông phù hợp dựa với đặc điểm từng phân khúc ngành hàng.</li>
        <li>HIỂU & SỬ DỤNG CÁC CÔNG CỤ HỖ TRỢ QUẢN LÝ LEAD THEO FUNNEL VÀ CRM DATABASE<br>Biết cách sử dụng các công cụ hỗ trợ quản lý LEAD theo Funnel và CRM Database để tối ưu được hiệu quả mang lại, đồng thời tránh rủi ro thất thoát thông tin.</li>
        <li>'CẦM VỀ' CÁC MARKETING FRAMEWORK & TOOLKIT THỰC TIỄN<br>Nắm vững cách sử dụng thuần thục các framework & toolkit để xây dựng các B2B Marketing Campaign, Media Plan, Launch Plan... một cách đồng nhất và hiệu quả.</li>
        <li>TỰ TAY XÂY DỰNG MỘT B2B MARKETING PLAN HOÀN CHỈNH TỪ CHIẾN LƯỢC ĐẾN THỰC THI<br>Được tự tay xây dựng 1 B2B Marketing Plan hoàn chỉnh dưới sự hướng dẫn trực tiếp từ chuyên gia.</li>
      </ol>
    </li>
  </ul>
  `,
    requirement: "",
    schedule: [
      {
        id: "85287",
        title: "Xây dựng chiến lược và vận hành B2B marketing",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Xây dựng chiến lược và vận hành B2B marketing",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Xây dựng chiến lược và vận hành B2B marketing",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 10,
    student_Ids: [
      "user_2",
      "user_3",
      "user_4",
      "user_5",
      "user_6",
      "user_7",
      "user_8",
    ],
    status: "COMPLETED",
  },
  {
    _id: "course_2",
    name: "Sống trong ngân sách",
    user_id: "user_2",
    image:
      "https://anvest.vn/wp-content/uploads/2023/05/240523-Lop-3.6-1200x628-1.jpg",
    thumbnail: "",
    price: 500000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["tài chính", "phát triển bản thân"],
    type: "hybrid",
    address: {
      name: "238 Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3, Tp.HCM",
      lat: 10.784699838715778,
      lng: 106.68917392159419,
    },
    short_description: `Sau khóa học, bạn sẽ có cái nhìn khác về vấn đề tiền bạc, biết cách làm chủ tiền bạc và có thể bắt đầu xây dựng cuộc sống mà mình mơ ước.`,
    description: `
    <ul>
  <li>Hiểu về bản thân và cách ra các quyết định tài chính</li>
  <li>Nhận diện được các thói quen, hành vi quản lý tài chính cản trở việc sống trong ngân sách</li>
  <li>Lập kế hoạch chi tiêu trong 6 đến 12 tháng</li>
</ul>
  `,
    requirement: "",
    schedule: [
      {
        id: "85287",
        title: "Sống trong ngân sách",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Sống trong ngân sách",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Sống trong ngân sách",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_3",
    name: "Lập trình Python",
    user_id: "user_3",
    image:
      "https://cdn-skill.kynaenglish.vn/uploads/courses/1167/img/image_url-1603443876.jpg",
    thumbnail: "https://www.youtube.com/watch?v=NZj6LI5a9vc",
    price: 799000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["cntt", "python"],
    type: "online",
    address: {},
    short_description: `Cung cấp các kiến thức về Python: Kiều kiện, vòng lặp, list, hàm, hướng đối tượng, exception, regular expression, file`,
    description: `
    <ul>
    <li>Kiến thức cơ bản bao gồm:
      <ul>
        <li>in ấn</li>
        <li>nhập liệu</li>
        <li>điều kiện</li>
        <li>vòng lặp</li>
        <li>list</li>
        <li>tupble</li>
        <li>dictionary</li>
        <li>hàm</li>
      </ul>
    </li>
    <li>Kiến thức về Exception:
      <ul>
        <li>try-except</li>
        <li>đối của ngoại lệ</li>
        <li>kích hoạt ngoại lệ</li>
        <li>tự định nghĩa ngoại lệ</li>
      </ul>
    </li>
    <li>Kiến thức về I/O File:
      <ul>
        <li>Đọc file</li>
        <li>Ghi file</li>
        <li>Bổ sung dữ liệu cho file</li>
        <li>Đọc + ghi file</li>
        <li>Ghi + đọc file</li>
        <li>Bổ sung + đọc file</li>
        <li>Làm việc với thư mục</li>
      </ul>
    </li>
    <li>Kiến thức về lập trình OOP:
      <ul>
        <li>Lớp</li>
        <li>đối tượng</li>
        <li>hàm tạo</li>
        <li>Getter và Setter</li>
        <li>thừa kế</li>
      </ul>
    </li>
  </ul>
  `,
    requirement: `Không cần kinh nghiệm lập trình`,
    schedule: [
      {
        id: "85287",
        title: "Lập trình Python",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Lập trình Python",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Lập trình Python",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_4",
    name: "Đánh Thức Năng Lực Giao Tiếp Trong Bạn",
    user_id: "user_4",
    image: "https://i.ytimg.com/vi/8HzkwzkfR1k/maxresdefault.jpg",
    thumbnail: "https://www.youtube.com/watch?v=8HzkwzkfR1k",
    price: 789000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["tâm lý", "phát triển bản thân"],
    type: "online",
    address: {},
    short_description: `Chào mừng bạn đến với khóa học "Đánh Thức Năng Lực Giao Tiếp Trong Bạn". Đây là khóa học dành cho những người can đảm, muốn làm chủ kỹ năng giao tiếp.`,
    description: `
    <ul>
  <li>Trị Tận Gốc những trở ngại trong giao tiếp của bạn</li>
  <li>Đánh Thức nguồn năng lượng bên trong của bản thân</li>
  <li>Cởi Mở Tư Duy</li>
  <li>Nắm Được Chìa Khóa của việc giao tiếp</li>
  <li>Trở thành một người hoàn toàn mới</li>
</ul>
  `,
    requirement: `<ul>
    <li>Giám đốc kinh doanh, trưởng bộ phận kinh doanh, nhân viên kinh doanh</li>
    <li>Giám đốc đối ngoại, trưởng bộ phận đối ngoại, nhân viên đối ngoại</li>
    <li>Những người muốn vượt qua rào cản giao tiếp</li>
    <li>Những người muốn làm chủ kỹ năng giao tiếp</li>
  </ul>`,
    schedule: [
      {
        id: "85287",
        title: "Đánh Thức Năng Lực Giao Tiếp Trong Bạn",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Đánh Thức Năng Lực Giao Tiếp Trong Bạn",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Đánh Thức Năng Lực Giao Tiếp Trong Bạn",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_5",
    name: "Trở Thành Quý Cô Thanh Lịch cùng Tác Giả Sách Maggie Maggie",
    user_id: "user_5",
    image: "https://i.ytimg.com/vi/HJWHdzUzvpA/maxresdefault.jpg",
    thumbnail: "https://www.youtube.com/watch?app=desktop&v=HJWHdzUzvpA",
    price: 1099000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["phát triển bản thân", "phong cách sống"],
    type: "online",
    address: {},
    short_description: `Quý Cô Thanh Lịch - Hành trình trở thành một phiên bản rực rỡ tuy không quá khó và đòi hỏi đầu tư nhiều về tiền bạc, nhưng việc thông tin có sẵn trên internet thường không áp dụng được vào thực tiễn cho thị trường Việt Nam khiến chị em phụ nữ dễ bối rối trước những nguồn thông tin này.`,
    description: `
    <ul>
  <li>Maggie Maggie - Tác giả 2 quyển sách đã xuất bản bởi Bachviet Books và Bloom Books.</li>
  <li>Với kinh nghiệm hơn 10 năm làm việc ở vị trí quản lý cấp cao tại những ngành nghề phong cách sống cao cấp, Maggie sẽ hướng dẫn các bạn những những kiến thức thực tiễn để giúp bạn tiến bước tiếp theo trong hành trình trở thành quý cô thanh lịch, trí thức và hiện đại được đồng nghiệp, khách hàng và những người xung quanh yêu mến. Từ đó mở ra những cơ hội mới trong công việc và cuộc sống cho tương lai của bạn.</li>
  <li>Khóa học này được biên soạn dựa trên kinh nghiệm thực tiễn và sắp xếp theo nhu cầu thực tế. Bạn chỉ cần dành ra 30 phút thực hành trong 15 ngày để những bài tập này trở thành một phần trong đời sống giao tiếp xã hội của bạn.</li>
</ul>
  `,
    requirement: `<ul>
    <li>Sinh viên mới ra trường hoặc những người mới đi làm chưa nắm vững những quy tắc giao tiếp, ứng xử xã hội.</li>
    <li>Những chị em phụ nữ mong muốn thay đổi bản thân để tiếp cận những công việc tốt hơn đòi hỏi kỹ năng giao tiếp.</li>
    <li>Những chị em mong muốn có một cuộc sống xã hội vui vẻ và tích cực, tạo được mối quan hệ tốt đẹp với những người xung quanh.</li>
    <li>Những chị em vừa thay đổi môi trường sống – những nơi đòi hỏi sự tinh tế về ngoại hình và kỹ năng giao tiếp.</li>
  </ul>`,
    schedule: [
      {
        id: "85287",
        title: "Trở Thành Quý Cô Thanh Lịch cùng Tác Giả Sách Maggie Maggie",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Trở Thành Quý Cô Thanh Lịch cùng Tác Giả Sách Maggie Maggie",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Trở Thành Quý Cô Thanh Lịch cùng Tác Giả Sách Maggie Maggie",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_6",
    name: "Chỉnh sửa ảnh, cắt ghép ảnh với Photoshop",
    user_id: "user_6",
    image: "https://i.ytimg.com/vi/B_kfBjEF9ko/maxresdefault.jpg",
    thumbnail: "https://www.youtube.com/watch?v=RTBCj0bImF0",
    price: 439000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["thiết kế"],
    type: "online",
    address: {},
    short_description: `Khóa học Chỉnh sửa ảnh, cắt ghép ảnh với Photoshop sẽ hướng dẫn bạn chỉnh sửa ảnh chân dung và một số thể loại khác như chụp phong cảnh, chụp ảnh động vật, chụp ảnh đám cưới, chụp thể thao… Ngoài ra khóa học sẽ cung cấp cho các bạn những kỹ năng về cắt ghép ảnh chuyên nghiệp với phần mềm Photoshop.`,
    description: `
    <ul>
  <li>Khóa học này được thiết kế để làm việc trên phiên bản Photoshop mới nhất, nhưng các kỹ năng bạn học được cũng sẽ áp dụng được trên các phiên bản cũ hơn của Photoshop.</li>
  <li>Điểm khác biệt của khóa học này là chúng tôi cung cấp cho các bạn những kỹ năng từ những công việc thực tế, không đi sâu vào giới thiệu vào các công cụ, chức năng trong photoshop mà thông qua các bài thực hành cụ thể giúp các bạn làm chủ các công cụ và chức năng trong phần mềm chuyên nghiệp này.</li>
  <li>Trong khóa học, bạn sẽ được hướng dẫn các kỹ năng sau:</li>
  <ul>
    <li>Cách sử dụng các công cụ cơ bản của Photoshop để chỉnh sửa ảnh, bao gồm công cụ crop, resize, brightness/contrast, và levels và nhiều công cụ khác.</li>
    <li>Cách tạo lớp và sử dụng các công cụ chọn trong Photoshop để cắt ghép ảnh.</li>
    <li>Cách sử dụng công cụ trong Photoshop để sửa chữa các vết bẩn, trầy xước và các khuyết điểm khác trên ảnh.</li>
    <li>Cách tạo hiệu ứng màu sắc và ánh sáng cho ảnh.</li>
    <li>Cách cắt ghép ảnh chuyên nghiệp với các công cụ có sẵn trong Photoshop.</li>
    <li>Các cách ghép ảnh chân thực trong thực tế.</li>
    <li>Cách tạo một số hiệu ứng ảnh đẹp mắt.</li>
  </ul>
</ul>
  `,
    requirement: `Những bạn thích chụp ảnh, thích chỉnh sửa ảnh và đam mê về nhiếp ảnh`,
    schedule: [
      {
        id: "85287",
        title: "Chỉnh sửa ảnh, cắt ghép ảnh với Photoshop",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Chỉnh sửa ảnh, cắt ghép ảnh với Photoshop",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Chỉnh sửa ảnh, cắt ghép ảnh với Photoshop",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_7",
    name: "Dòng tiền (cashflow) và tài chính cá nhân",
    user_id: "user_2",
    image:
      "https://anvest.vn/wp-content/uploads/2023/05/Feature-Image_Cashflow-trong-tai-chinh-ca-nhan_1200x628.png",
    thumbnail: "",
    price: 500000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["tài chính", "phát triển bản thân"],
    type: "online",
    address: {},
    short_description: `Quản lý dòng tiền là khái niệm ta thường gặp đối với một doanh nghiệp. Tuy nhiên, mỗi người cũng có thể quản lý dòng tiền cá nhân của mình sao cho hiệu quả để dòng tiền phát huy giá trị cao nhất.`,
    description: ``,
    requirement: ``,
    schedule: [
      {
        id: "85287",
        title: "Dòng tiền (cashflow) và tài chính cá nhân",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Dòng tiền (cashflow) và tài chính cá nhân",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Dòng tiền (cashflow) và tài chính cá nhân",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_8",
    name: "Trái phiếu là gì? Những điều cần biết trước khi đầu tư trái phiếu",
    user_id: "user_2",
    image:
      "https://anvest.vn/wp-content/uploads/2023/05/Feature-Image_Bond-Trai-phieu_1200x628.png",
    thumbnail: "",
    price: 500000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["tài chính", "phát triển bản thân"],
    type: "online",
    address: {},
    short_description: `Đầu tư trái phiếu dạo gần đây là kênh được các nhà đầu tư tin tưởng để “giao phó” khoản tiền của mình. Dù vậy, không hẳn ai trong chúng ta cũng đều hiểu đúng và đủ về trái phiếu và những lợi ích, rủi ro khi đầu tư trái phiếu.`,
    description: ``,
    requirement: ``,
    schedule: [
      {
        id: "85287",
        title:
          "Trái phiếu là gì? Những điều cần biết trước khi đầu tư trái phiếu",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title:
          "Trái phiếu là gì? Những điều cần biết trước khi đầu tư trái phiếu",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title:
          "Trái phiếu là gì? Những điều cần biết trước khi đầu tư trái phiếu",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_9",
    name: "Tài chính cá nhân",
    user_id: "user_2",
    image:
      "https://anvest.vn/wp-content/uploads/2023/05/Feature-Image_Tai-chinh-ca-nhan-la-gi_1200x628.png",
    thumbnail: "",
    price: 500000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-23T00:00:00.000Z",
    endDate: "2024-01-23T00:00:00.000Z",
    category: ["tài chính", "phát triển bản thân"],
    type: "online",
    address: {},
    short_description: `Tài chính cá nhân là vấn đề được nhiều người quan tâm. Trên hành trình đến với thành công một trong những điều bạn cần làm và làm một cách tốt nhất là quản lý tài chính của bản thân hiệu quả. `,
    description: ``,
    requirement: ``,
    schedule: [
      {
        id: "85287",
        title: "Tài chính cá nhân",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Tài chính cá nhân",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Tài chính cá nhân",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
  {
    _id: "course_10",
    name: "Nền tảng An tâm tài chính cá nhân",
    user_id: "user_2",
    image:
      "https://anvest.vn/wp-content/uploads/2023/03/workshop-enjoy-money-game.webp",
    thumbnail: "",
    price: 500000,
    createdAt: "2023-04-23T00:00:00.000Z",
    startDate: "2023-05-23T00:00:00.000Z",
    endDate: "2023-06-23T00:00:00.000Z",
    category: ["tài chính", "phát triển bản thân"],
    type: "online",
    address: {},
    short_description: `Tài chính cá nhân là vấn đề được nhiều người quan tâm. Trên hành trình đến với thành công một trong những điều bạn cần làm và làm một cách tốt nhất là quản lý tài chính của bản thân hiệu quả. `,
    description: ``,
    requirement: ``,
    schedule: [
      {
        id: "85287",
        title: "Nền tảng An tâm tài chính cá nhân",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Nền tảng An tâm tài chính cá nhân",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Nền tảng An tâm tài chính cá nhân",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [
      "user_1",
      "user_3",
      "user_4",
      "user_5",
      "user_6",
      "user_7",
      "user_8",
    ],
    status: "COMPELETD",
  },
  {
    _id: "course_11",
    name: "Xây dựng chiến lược và vận hành B2B marketing",
    user_id: "user_1",
    image:
      "https://www.cask.vn/wwwroot/resources/img/product/11-2023/2-ngang%20d%C6%B0%E1%BB%9Bi%201mb.png",
    thumbnail: "",
    price: 5600000,
    createdAt: "2023-09-20T00:00:00.000Z",
    startDate: "2023-12-24T00:00:00.000Z",
    endDate: "2024-01-11T00:00:00.000Z",
    category: ["kinh doanh", "marketing"],
    type: "offline",
    address: {
      name: "238 Đ. Nam Kỳ Khởi Nghĩa, HCM",
      lat: 10.787979437710913,
      lng: 106.6855432232891,
    },
    short_description: "",
    description: `
    <ul>
    <li>6 ĐIỀU CẦM VỀ
      <ol>
        <li>PHƯƠNG PHÁP XÁC ĐỊNH PHÂN KHÚC NGÀNH HÀNG & THẤU HIỂU KHÁCH HÀNG B2B<br>Thấu hiểu hành vi, xu hướng khách hàng trong từng phân khúc ngành hàng để đánh giá tiềm năng, xác định thứ tự ưu tiên & lựa chọn phân khúc phù hợp.</li>
        <li>NẮM VỮNG CÁC BƯỚC THIẾT KẾ & XÂY DỰNG CHIẾN LƯỢC SẢN PHẨM CẠNH TRANH<br>Nắm vững trình tự nghiên cứu và phương pháp xác định giá trị khác biệt so với đối thủ trong cùng phân khúc. Từ đó dễ dàng xây dựng chiến lược Offering & Product Portfolio hiệu quả.</li>
        <li>LÀM CHỦ NGHỆ THUẬT TRUYỀN THÔNG VỚI QUY TRÌNH XÂY DỰNG KẾ HOẠCH MARKETING BÀI BẢN, CHUYÊN SÂU<br>Dựa trên sự thấu hiểu đặc thù về Inbound Marketing và các kênh truyền thông, định hướng nên những hoạt động truyền thông phù hợp dựa với đặc điểm từng phân khúc ngành hàng.</li>
        <li>HIỂU & SỬ DỤNG CÁC CÔNG CỤ HỖ TRỢ QUẢN LÝ LEAD THEO FUNNEL VÀ CRM DATABASE<br>Biết cách sử dụng các công cụ hỗ trợ quản lý LEAD theo Funnel và CRM Database để tối ưu được hiệu quả mang lại, đồng thời tránh rủi ro thất thoát thông tin.</li>
        <li>'CẦM VỀ' CÁC MARKETING FRAMEWORK & TOOLKIT THỰC TIỄN<br>Nắm vững cách sử dụng thuần thục các framework & toolkit để xây dựng các B2B Marketing Campaign, Media Plan, Launch Plan... một cách đồng nhất và hiệu quả.</li>
        <li>TỰ TAY XÂY DỰNG MỘT B2B MARKETING PLAN HOÀN CHỈNH TỪ CHIẾN LƯỢC ĐẾN THỰC THI<br>Được tự tay xây dựng 1 B2B Marketing Plan hoàn chỉnh dưới sự hướng dẫn trực tiếp từ chuyên gia.</li>
      </ol>
    </li>
  </ul>
  `,
    requirement: "",
    schedule: [
      {
        id: "85287",
        title: "Xây dựng chiến lược và vận hành B2B marketing",
        start: "2023-11-26T10:00:00.000Z",
        end: "2023-11-26T11:30:00.000Z",
      },
      {
        id: "22254",
        title: "Xây dựng chiến lược và vận hành B2B marketing",
        start: "2023-12-03T10:00:00.000Z",
        end: "2023-12-03T11:30:00.000Z",
      },
      {
        id: "30200",
        title: "Xây dựng chiến lược và vận hành B2B marketing",
        start: "2023-12-10T10:00:00.000Z",
        end: "2023-12-10T11:30:00.000Z",
      },
    ],
    total_rating: 0,
    total_student: 10,
    total_enroll: 0,
    student_Ids: [],
    status: "PUBLIC",
  },
];

export const reviews: Review[] = [
  {
    _id: "review_1",
    isUnnamed: false,
    user_id: "user_2",
    course_id: "course_1",
    createdAt: "2023-12-14T14:00:20.444Z",
    content:
      "Khoá học mang đến góc nhìn mới về nhóm đối tượng B2B, khả năng tiếp cận, thấu hiểu và những phương án để thay đổi hành vi, quyết định của họ. Những kiến thức học được giúp mình phân khúc khách hàng hiệu quả hơn, cung cấp nhiều ý tưởng để khai thác những nhóm khách hàng mới, từ đó xây dựng chiến lược phù hợp cho từng phân khúc.",
    rating: 5,
    sentiment: [0.004077334888279438, 0.988004744052887, 0.007917926646769047],
  },
  {
    _id: "review_2",
    isUnnamed: false,
    user_id: "user_3",
    course_id: "course_1",
    createdAt: "2023-12-14T00:00:20.444Z",
    content:
      "Kiến thức khóa học thực tế,mình có thể ứng dụng được ngay vào doanh nghiệp. Giảng nhiệt tình, giải đáp mọi thắc mắc theo cách thực tiễn, đi thẳng trọng tâm chứ không chỉ là lý thuyết suông. Nội dung bài giảng được biên soạn theo trình tự rõ ràng, tích hợp được nhiều nội dung quan trọng.",
    rating: 5,
    sentiment: [0.013725182972848415, 0.9684061408042908, 0.017868727445602417],
  },
  {
    _id: "review_3",
    isUnnamed: false,
    user_id: "user_4",
    course_id: "course_1",
    createdAt: "2023-12-12T01:00:20.444Z",
    content:
      "Khóa học đi sâu vào kiến thức, các bài tập có tính thực tiễn cao, giải quyết trực tiếp bài toán của thương hiệu. Khi tham gia khóa học, Thủy cùng team đã có cơ hội nhìn nhận lại một cách rõ nét về portfolio sản phẩm và chuỗi giá trị cũng như những phân khúc khách hàng mà thương hiệu Kompa đang nhắm đến. Đối với Thủy, kiến thức về phân khúc khách hàng, CVP & FAB thật sự rất đắt giá vì nó là bộ ba công cụ nồng cốt giúp thương hiệu xây dựng kế hoạch và thực thi B2B Marketing hiệu quả.",
    rating: 5,
    sentiment: [
      0.0032907428685575724, 0.9895110726356506, 0.007198183331638575,
    ],
  },
  {
    _id: "review_4",
    isUnnamed: false,
    user_id: "user_5",
    course_id: "course_1",
    createdAt: "2023-12-12T01:00:20.444Z",
    content:
      "Giảng viên rất có tâm, bài giảng thiết kế chuyên sâu, rất hữu ích cho những bạn muốn đào sâu kiến thức chuyên môn về marketing từ kinh nghiệm những anh chị senior trong ngành !",
    rating: 5,
    sentiment: [0.001929483376443386, 0.9926538467407227, 0.005416760221123695],
  },
  {
    _id: "review_5",
    isUnnamed: false,
    user_id: "user_6",
    course_id: "course_1",
    createdAt: "2023-12-12T09:00:20.444Z",
    content: "Thời gian ít, thông tin quá nhiều",
    rating: 3,
    sentiment: [0.07322478294372559, 0.3151547312736511, 0.6116204261779785],
  },
  {
    _id: "review_6",
    isUnnamed: false,
    user_id: "user_7",
    course_id: "course_1",
    createdAt: "2023-12-12T08:00:20.444Z",
    content: "Không đúng nhu cầu",
    rating: 2,
    sentiment: [0.9502519965171814, 0.007324289996176958, 0.04242374375462532],
  },
  {
    _id: "review_7",
    isUnnamed: false,
    user_id: "user_8",
    course_id: "course_1",
    createdAt: "2023-12-12T07:00:20.444Z",
    content: "Tạm được",
    rating: 3,
    sentiment: [0.026447631418704987, 0.11868280172348022, 0.8548696041107178],
  },
];

export const users: User[] = [
  {
    _id: "user_100",
    name: "Admin",
    avatar: "",
    email: "admin@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user", "instructor", "admin"],
    bio: "",
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: [],
    real_name: "admin",
    cccd_number: "",
    dateOfBirth: "",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_1",
    name: "Nguyễn Quốc Tiến",
    avatar:
      "https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/149486507_2482220638751776_873662942947716934_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7a1959&_nc_ohc=LOaoIifl6gQAX992mii&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBthRQYaEwK7SQylwSzg5A-HJJgd8knvZn8-iDoKsJP2g&oe=65ACA4CF",
    email: "nguyenquoctien@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user", "instructor"],
    bio: "ENFJ - A lifelong learner",
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: ["kinh doanh", "marketing"],
    real_name: "Nguyễn Quốc Tiến",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_2",
    name: "Nguyễn Minh Thanh",
    avatar:
      "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/329411646_218196587440070_3697113240746437353_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=NAdq-09kXoUAX8lJ2d0&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBcSz-6w4raOE_xdqBRFCNGCPFGRuwyxo_f2NFqPkXeiA&oe=65899F4A",
    email: "minhthanh@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user", "instructor"],
    bio: "Giáo dục tài chính • Rõ Chi, Đa Thu • thong thả khi thịnh, thảnh thơi khi suy",
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: true,
    category: ["tài chính", "phát triển bản thân"],
    real_name: "Nguyễn Minh Thanh",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_3",
    name: "Đặng Trần Long",
    avatar:
      "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/329411646_218196587440070_3697113240746437353_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=NAdq-09kXoUAX8lJ2d0&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBcSz-6w4raOE_xdqBRFCNGCPFGRuwyxo_f2NFqPkXeiA&oe=65899F4A",
    email: "user3@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user", "instructor"],
    bio: `Data Scientist tại Ví điện tử VNPAY
    Giảng Viên các bộ môn Phân tích Dữ liệu tại Học viện Công Nghệ MCI
    Với những kinh nghiệm, trải nghiệm trong nhiều dự án liên quan đến việc ứng dụng sức mạnh của Xử lý và Phân tích dữ liệu lớn (Big Data) trong môi trường doanh nghiệp bằng các công cụ như: Python, SQL, BI tools,... Kèm với kinh nghiệm giảng dạy nhiều lớp online và offline tại Học Viện Công Nghệ MCI, những yếu tố này đảm bảo cho giáo trình, bài giảng của giảng viên Tâm luôn sát thực tiễn công việc nhất, các kiến thức phức tạp sẽ được diễn giải một cách đơn giản và dễ hiểu nhất cho học viên.`,
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: ["cntt", "python"],
    real_name: "Đặng Trần Long",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_4",
    name: "Jessica Thảo Nguyễn",
    avatar:
      "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/329411646_218196587440070_3697113240746437353_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=NAdq-09kXoUAX8lJ2d0&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBcSz-6w4raOE_xdqBRFCNGCPFGRuwyxo_f2NFqPkXeiA&oe=65899F4A",
    email: "user4@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user", "instructor"],
    bio: `Tôi tên là Nguyễn Thị Thảo (nick name Jessica Thảo Nguyễn) là founder của Ý Nghĩa Sống - chuyên về phát triển bản thân, truyền cảm hứng và chữa lành.`,
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: ["tâm lý", "phát triển bản thân"],
    real_name: "Jessica Thảo Nguyễn",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_5",
    name: "Maggie Maggie",
    avatar: "https://img-c.udemycdn.com/user/200_H/141816232_0983.jpg",
    email: "user5@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user", "instructor"],
    bio: `- Tác giả sách, người sáng tạo nội dung về phong cách sống thanh lịch của phụ nữ thành thị.
    - Sách đã xuất bản: Phụ nữ đâu chỉ có tình yêu (Bachviet Books - 2017); Quý cô thanh lịch (Bloom Books - T2/2022)
    - Hơn 10 năm kinh nghiệm làm việc tại các vị trí quản lý bộ phận kinh doanh, tiếp thị, chăm sóc khách hàng trong những tập đoàn quốc tế hàng đầu thuộc các lĩnh vực khách sạn, giải trí và bất động sản cao cấp như SwanCity, Diageo, AB Inbev, Six Senses Côn Đảo Resort...
    - Host kênh Podcast Maggie Maggie Live Talk là chuỗi chương trình giao lưu với những nhân vật nữ giới thành đạt và có phong cách sống thanh lịch, trí thức và hiện đại.
    - Founder cộng đồng "Phụ Nữ Thanh Lịch" với 8,000 thành viên.`,
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: ["phát triển bản thân", "phong cách sống"],
    real_name: "Maggie Maggie",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_6",
    name: "Đỗ Trung Thành",
    avatar: "https://img-c.udemycdn.com/user/200_H/141816232_0983.jpg",
    email: "user6@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user", "instructor"],
    bio: `Kinh nghiệm 10 năm trong lĩnh vực thiết kế`,
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: ["thiết kế"],
    real_name: "Đỗ Trung Thành",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_7",
    name: "Toan Bill",
    avatar: "https://img-c.udemycdn.com/user/200_H/141816232_0983.jpg",
    email: "user7@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user"],
    bio: ``,
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: [],
    real_name: "Toan Bill",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
  {
    _id: "user_8",
    name: "Trình Nguyễn",
    avatar: "https://img-c.udemycdn.com/user/200_H/141816232_0983.jpg",
    email: "user8@gmail.com",
    password: "$2b$10$aVOznr8hHsB45XAyULQPkebRK5sRahP7NdeEY21PUZ7eQxDwy51za",
    role: ["user"],
    bio: ``,
    createdAt: "2021-01-11T00:00:00.000Z",
    isCertificate: false,
    category: [],
    real_name: "Trình Nguyễn",
    cccd_number: "20186738913",
    dateOfBirth: "1997-01-11T00:00:00.000Z",
    income: 0,
    pending_money: 0,
    status: "ACTIVE",
  },
];

export const certificates: Certificate[] = [
  {
    _id: "ce_1",
    user_id: "user_2",
    images: [
      "https://onesecond.vn/image/about-us/certificate-1.jpeg",
      "https://onesecond.vn/image/about-us/certificate-2.jpeg",
    ],
    status: "COMPLETED",
    category: ["tài chính", "phát triển bản thân"],
  },
];

export const feedbacks: FeedBack[] = [];
