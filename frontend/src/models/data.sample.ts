import { Course, Review, User } from "./../types/index";

export const courses: Course[] = [
  // COMPLETE / ONLINE
  {
    _id: "course_1",
    name: "Bí Mật Đàm Phán",
    author: "Thảo Nguyễn",
    author_image:
      "https://ynghiasong.vn/wp-content/uploads/2023/05/Jessica-2-1024x899.jpg",
    image: "https://img-c.udemycdn.com/course/750x422/5539676_d154_10.jpg",
    thumbnail: "https://www.youtube.com/watch?v=uKVKjLPOMzk",
    price: 729000,
    createdAt: "2023-07-12T00:00:00.000Z",
    startDate: "2023-08-01T00:00:00.000Z",
    endDate: "2023-09-01T00:00:00.000Z",
    category: ["kinh doanh", "marketing", "phát triển bản thân"],
    type: "online",
    address: {},
    short_description:
      "Đây là khóa học toàn diện dành cho những người muốn nắm bắt, thành thạo và làm chủ Nghệ Thuật Đàm Phán",
    description: `
        <p>Chào mừng bạn đến với khóa học Bí Mật Đàm Phán của Jessica Thảo Nguyễn. Đây là khóa học toàn diện dành cho những người muốn nắm bắt, thành thạo và làm chủ Nghệ Thuật Đàm Phán.</p>
        <p>Đây là khóa học duy nhất mà bạn cần học để:</p>
        <ul>
            <li>Nhận diện và vượt qua những trở ngại trong Đàm Phán</li>
            <li>Khơi dậy năng lực Đàm Phán trong bạn</li>
            <li>Thúc đẩy sự linh hoạt trong Tư Duy Đàm Phán của bạn</li>
            <li>Mở ra những Chiến Lược Đàm Phán đỉnh cao cho bạn</li>
            <li>Chuyển hóa và nâng tầm Kỹ Năng Đàm Phán của bạn</li>
        </ul>
        
        <p>Khóa học này sẽ cung cấp cho bạn Bộ Kỹ Năng Đàm Phán đỉnh cao, bao gồm:</p>
        <ul>
            <li>Kỹ Năng Thấu Hiểu Đối Tác</li>
            <li>Chìa Khóa Thuyết Phục Đối Tác</li>
            <li>Kỹ Thuật Thao Túng Tâm Lý Đối Tác</li>
            <li>Kỹ Thuật Thiên Biến Vạn Hóa Trong Đàm Phán</li>
            <li>60 Nguyên Tắc Đàm Phán Đỉnh Cao</li>
            <li>Phương Pháp Thiết Lập Mối Quan Hệ Chiến Lược Với Đối Tác</li>
        </ul>
        
        <p>Việc đàm phán, thương lượng, thuyết phục rất quan trọng trong công việc và cuộc sống của chúng ta. Tuy nhiên không phải ai cũng sẵn sàng và không phải ai cũng thực hiện tốt những thương vụ đàm phán trong cuộc đời mình.</p>
        
        <p>Nếu bạn muốn tìm hiểu bí mật thành công của các nhà đàm phán, hãy đăng ký ngay khóa học này...</p>
    `,
    requirement: `
        <ul>
            <li>Những nhà lãnh đạo, doanh nhân, người quản lý</li>
            <li>Các chuyên gia hoặc cá nhân tham gia trong lĩnh vực ngoại giao, đàm phán</li>
            <li>Giám đốc kinh doanh, trưởng phòng kinh doanh, nhân viên kinh doanh...</li>
            <li>Những người mong muốn vượt qua các rào cản trong Đàm Phán</li>
            <li>Những người muốn hiểu sâu hơn về kiến thức, rèn luyện kỹ năng và trở thành chuyên gia trong Nghệ Thuật Đàm Phán.</li>
        </ul>
    `,
    schedule: [],
    total_lesson: 8,
    total_rating: 3,
    total_review: 5,
    total_student: 5,
    total_enroll: 5,
    status: "COMPLETED",
    student_Ids: ["user_1", "user_2", "user_3", "user_4", "user_5"],
    reviews_Ids: ["review_1", "review_2", "review_3", "review_4", "review_5"],
  },
  // OPEN / HYBRID
  {
    _id: "course_2",
    name: "Đánh Thức Năng Lực Giao Tiếp Trong Bạn",
    author: "Thảo Nguyễn",
    author_image:
      "https://ynghiasong.vn/wp-content/uploads/2023/05/Jessica-2-1024x899.jpg",
    image: "https://i.ytimg.com/vi/8HzkwzkfR1k/maxresdefault.jpg",
    thumbnail: "https://www.youtube.com/watch?v=8HzkwzkfR1k",
    price: 789000,
    createdAt: "2023-20-11T00:00:00.000Z",
    startDate: "2023-01-12T00:00:00.000Z",
    endDate: "2024-01-01T00:00:00.000Z",
    category: ["kinh doanh", "marketing", "phát triển bản thân"],
    type: "hybrid",
    address: {
      name: "82 Núi Thành, Đà Nẵng",
      lat: 16.051916860603978,
      lng: 108.22024247689545,
    },
    short_description:
      "Đây là khóa học dành cho những người can đảm, muốn làm chủ kỹ năng giao tiếp.",
    description: `
        <p>Chào mừng bạn đến với khóa học "Đánh Thức Năng Lực Giao Tiếp Trong Bạn". Đây là khóa học dành cho những người can đảm, muốn làm chủ kỹ năng giao tiếp.</p>
        <p>Đây là khóa học duy nhất mà bạn cần học để:</p>
        <ul>
        <li>Trị Tận Gốc những trở ngại trong giao tiếp của bạn</li>
        <li>Đánh Thức nguồn năng lượng bên trong của bản thân</li>
        <li>Cởi Mở Tư Duy</li>
        <li>Nắm Được Chìa Khóa của việc giao tiếp</li>
        <li>Trở thành một người hoàn toàn mới</li>
        </ul>
        <p>Với 9 học phần, 62 bài giảng chi tiết, 3,5 giờ khóa học này sẽ cung cấp cho bạn những kiến thức và kỹ năng vô cùng hữu ích để bạn có thể áp dụng ngay vào công việc và cuộc sống của mình.</p>
        <p>Khóa học này cung cấp cho bạn những Bộ Kỹ Năng Đỉnh Cao trong nghệ thuật giao tiếp như sau:</p>
        <ul>
        <li>3 bước giúp bạn chuyển hóa thành Con Người Tự Tin.</li>
        <li>10 Bí Quyết Tạo Thiện Cảm.</li>
        <li>5 Bí Quyết Hiểu Ý Đối Phương.</li>
        <li>15 Bí Quyết Tạo Ấn Tượng Trong Giao Tiếp.</li>
        <li>10 Bí Quyết Làm Chủ Ngôn Từ.</li>
        <li>5 Bí Quyết Làm Chủ Cảm Xúc.</li>
        </ul>
        <p>Đồng thời bạn sẽ được cung cấp 28 tài nguyên (25 bài thực hành, 2 mẫu thư chào hàng cùng File tóm lược bài giảng).</p>
        <p>Trong khóa học, bạn còn được cung cấp rất nhiều hình ảnh/video minh họa dễ hiểu để Có Thể Vận Dụng Thực Hành Ngay.</p>
        <p>Nếu nói tri thức là chìa khóa thành công thì nghệ thuật giao tiếp chính là phương tiện giúp cho con người đến với hạnh phúc và thành công nhanh hơn.</p>
        <p>Giao tiếp giúp con người kết nối với con người trong muôn mặt của cuộc sống và định hình nên các mối quan hệ. Chẳng những trong công việc mà ngay cả trong chuyện tình yêu, hôn nhân, gia đình, bạn bè đều là hệ quả của việc giao tiếp. Có câu “giao tiếp kém thì đụng đâu hỏng đó, giao tiếp khéo thì có cả thiên hạ”. Chất lượng giao tiếp sẽ quyết định đến thành bại của đời người.</p>
        <p>Do đó người muốn thành công và hạnh phúc thì nhất định phải có kỹ năng giao tiếp.</p>
        <p>Hãy nhìn vào những gương thành công như tỷ phú bất động sản Donald Trump, ông trùm chứng khoán huyền thoại Warren Buffett, tỷ phú công nghệ vũ trụ Elon Musk, tỷ phú phần mềm máy tính Bill Gates,… thật ngạc nhiên khi tiểu sử của họ đều là người hướng nội, nhưng họ đã không ngừng học hỏi, rèn luyện kỹ năng, lột xác trở thành những bậc thầy giao tiếp. Giờ đây họ đã trở thành những tấm gương thành công tiêu biểu của thế giới.</p>
        <p>Khóa học “Đánh thức năng lực giao tiếp trong bạn” của Jessica Thảo Nguyễn là một khóa học giao tiếp rất quan trọng giúp bạn lấy lại phong độ tự tin, khai phá tiềm năng ẩn giấu trong bạn bấy lâu nay. Khóa học này của tôi sẽ giúp bạn thắp sáng ngọn lửa bên trong của bạn, giúp bạn chẳng những giàu có về tư duy mà còn điêu luyện trong các kỹ năng giao tiếp.</p>
        <p>Với kinh nghiệm nhiều năm điều hành, quản lý trong các công ty đa ngành nghề, từng là chủ tịch và phó chủ tịch điều hành của các cộng đồng doanh nhân và cộng đồng hỗ trợ Start-up, đã tiếp xúc và thương thảo với các công ty đa quốc gia trên thế giới, tôi tự tin và vinh dự được đồng hành cùng bạn trong khóa học đặc biệt này.</p>
    `,
    requirement: `
        <p>Giám đốc kinh doanh, trưởng bộ phận kinh doanh, nhân viên kinh doanh</p>
        <p>Giám đốc đối ngoại, trưởng bộ phận đối ngoại, nhân viên đối ngoại</p>
        <p>Những người muốn vượt qua rào cản giao tiếp</p>
        <p>Những người muốn làm chủ kỹ năng giao tiếp</p>
    `,
    schedule: [],
    total_rating: 5,
    total_review: 5,
    total_student: 12,
    total_lesson: 8,
    total_enroll: 1,
    status: "OPEN",
    student_Ids: [],
    reviews_Ids: [],
  },
  // IN_PROGRESS / OFFLINE
  {
    _id: "course_3",
    name: "Khoá học kiếm tiền với Facebook adbreak",
    author: "Thảo Nguyễn",
    author_image:
      "https://ynghiasong.vn/wp-content/uploads/2023/05/Jessica-2-1024x899.jpg",
    image: "https://img-c.udemycdn.com/course/750x422/2650482_dc40.jpg",
    thumbnail: "https://www.youtube.com/watch?v=SZwmUgugqhA",
    price: 1099000,
    createdAt: "2023-20-09T00:00:00.000Z",
    startDate: "2023-01-11T00:00:00.000Z",
    endDate: "2024-01-01T00:00:00.000Z",
    category: ["kinh doanh", "marketing", "CNTT & Phần mềm"],
    type: "offline",
    address: {
      name: "17 Nguyễn Văn Linh, Đà Nẵng",
      lat: 16.060679821989453,
      lng: 108.22167915007859,
    },
    short_description:
      "Bạn sẽ biết cách làm thế nào biến video thành tiền trên facebook",
    description: `
        <p>Ad Break là người sáng tạo video trên Facebook đủ điều kiện có thể kiếm tiền bằng cách đưa những quảng cáo ngắn vào trước hoặc trong khi phát video đủ điều kiện.</p>
        <p>Người tạo video sẽ nhận được một phần doanh thu từ quảng cáo video hiển thị cho người xem.</p>
        <p>Khán giả phải xem hết quảng cáo thì mới có thể xem tiếp video.</p>
        <p>Vì mỗi nhà quảng cáo lại nhắm mục tiêu đến một loại đối tượng riêng, nên mỗi người xem có thể nhìn thấy một quảng cáo khác nhau trong cùng một thời gian nghỉ để quảng cáo.</p>
    `,
    requirement: `
        <p>Chỉ cần máy tính và điện thoại di động là bạn đã có thể bắt đầu.</p>
    `,
    schedule: [],
    total_rating: 5,
    total_review: 5,
    total_student: 1,
    total_lesson: 8,
    total_enroll: 1,
    status: "IN_PROGRESS",
    student_Ids: [],
    reviews_Ids: [],
  },
  // AWAITING
  {
    _id: "course_4",
    name: "Tự do tài chính cho người dưới 30 tuổi",
    author: "Thảo Nguyễn",
    author_image:
      "https://ynghiasong.vn/wp-content/uploads/2023/05/Jessica-2-1024x899.jpg",
    image: "https://img-c.udemycdn.com/course/750x422/5282940_57ad_3.jpg",
    thumbnail: "https://www.youtube.com/watch?v=-JbekOg--Sw",
    price: 1299000,
    createdAt: "2023-20-11T00:00:00.000Z",
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-01-02T00:00:00.000Z",
    category: ["tài chính", "kế toán", "phát triển bản thân"],
    type: "hybrid",
    address: {
      name: "258 Trần Hưng Đạo, Hồ Chí Minh",
      lat: 10.76049901630255,
      lng: 106.68844066285736,
    },
    short_description:
      "Khóa học được xây dựng để các bạn có cái nhìn đúng về tự do tài chính.",
    description: `
        <p>Khóa học được xây dựng để các bạn có cái nhìn đúng về tự do tài chính. Qua quá trình hơn 10 năm chia sẻ và giúp đỡ hàng chục nghìn người, tôi sẽ giúp các bạn:</p>
        <ol>
        <li><strong>THAY ĐỔI TƯ DUY:</strong> hiểu đúng về cốt lõi của tự do tài chính</li>
        <li><strong>LÊN KẾ HOẠCH MỤC TIÊU VÀ DÒNG TIỀN:</strong> Lên kế hoạch đa mục tiêu để không bao giờ bị kẹt vào bất kỳ hoàn cảnh tài chính nào. Lên mục tiêu cho: nghỉ hưu sớm, mua nhà, mua xe, trả nợ, phòng vệ và sắp xếp thứ tự ưu tiên tùy thuộc vào thời hạn đầu tư và rủi ro của sản phẩm.</li>
        <li><strong>HIỂU VỀ CÁC SẢN PHẨM ĐẦU TƯ:</strong> chọn sản phẩm đầu tư đúng và phù hợp với bạn. Chọn càng đơn giản càng dễ thành công! Bạn sẽ hiểu về những sản phẩm đầu tư chính như: cổ phiếu, trái phiếu, chứng chỉ quỹ và cốt lõi để hiểu tất cả các sản phẩm đầu tư khác để không bao giờ đầu tư sai hay mất quá nhiều tiền vào những thương vụ sai lầm.</li>
        <li><strong>KẾ HOẠCH CỦA CÁ NHÂN TÔI:</strong> chia sẻ thật lòng về kế hoạch của riêng tôi để các bạn thấy được cách tôi xây dựng sức khỏe tài chính cho bản thân. Tôi sẽ chia sẻ lựa chọn của bản thân để (1) Gia tăng thu nhập, (2) Phân bổ dòng tiền, (3) Lên kế hoạch đầu tư để nghỉ hưu sớm, cho con đi du học.</li>
        </ol>
    `,
    requirement: `
        <p>Dành cho những bạn chưa có nhiều kinh nghiệm trong đầu tư, đang làm công việc chuyên môn toàn thời gian nhưng muốn hiểu về đầu tư để đạt được tự do tài chính.</p>
    `,
    schedule: [],
    total_rating: 0,
    total_review: 0,
    total_student: 50,
    total_lesson: 8,
    total_enroll: 0,
    status: "AWAITING",
    student_Ids: [],
    reviews_Ids: [],
  },
  // REJECTED
  {
    _id: "course_5",
    name: "JavaScript cho người mới bắt đầu",
    author: "Thảo Nguyễn",
    author_image:
      "https://img-c.udemycdn.com/course/750x422/5282940_57ad_3.jpg",
    image:
      "https://khokhoahoc.co/wp-content/uploads/2022/06/Share-Khoa-hoc-Hau-Nguyen-Javascript-cho-nguoi-moi-bat-dau-cua-giang-vien-Hau-Nguyen.png",
    thumbnail: "https://www.youtube.com/watch?v=iALsr9GzJJ8",
    price: 1599000,
    createdAt: "2023-20-11T00:00:00.000Z",
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-01-02T00:00:00.000Z",
    category: ["CNTT", "phẩn mềm", "phát triển bản thân"],
    type: "online",
    address: {},
    short_description:
      "Hỗ trợ các bạn bước đầu vào ngành lập trình một cách đơn giản và dễ hiểu nhất.",
    description: `
        <p>Hỗ trợ các bạn bước đầu vào ngành lập trình một cách đơn giản và dễ hiểu nhất.</p>
        <p>Xin chào mọi người, mình là Hậu - Founder kênh youtube Easy Frontend (hiện đã hơn 12000 subscribers)</p>
        <p>Sau thành công của khoá học ReactJS cho người mới bắt đầu, mình nhận được rất nhiều phản hồi tích cực từ mọi người, nó là nguồn động lực rất lớn để mình làm tiếp những khoá học tiếp theo.</p>
        <p>Với mong muốn được hỗ trợ mọi người từ những bước đầu tiên vào ngành lập trình, mình đã cho ra mắt khoá học Javascript cho người mới bắt đầu này. Vì nội dung nhắm tới những bạn chưa biết gì cũng có thể học được, nên nội dung được chuẩn bị rất kĩ lưỡng về các thuật ngữ, cũng như từng chi tiết lập trình nhỏ, để mọi người có thể tiếp thu một cách dễ dàng, nhanh chóng.</p>
        <p>Ngoài việc tập trung vào kiến thức của ngôn ngữ Javascript, mình cũng có đan xen vào phần giải thuật cơ bản, giúp các bạn vừa có được kiến thức về Javascript vừa có kiến thức về lập trình cơ bản, để có thể tự tin hơn ở những chặng đường tiếp theo.</p>
        <p>Nếu các bạn chưa học hoặc đang học mà chưa nắm vững được javascript thì mình tin chắc khoá học này sẽ giúp bạn đạt được điều đó.</p>
        <p>Hẹn gặp các bạn trong khoá học nhé!</p>
        `,
    requirement: `
        <ul>
            <li>Người mới học lập trình, đặc biệt là mảng Frontend.</li>
            <li>Người mới chuyển từ ngành khác sang lập trình.</li>
            <li>Người đã và đang học javascript nhưng chưa thể nắm vững được javascript.</li>
            <li>Người muốn học javascript để tiếp tục nghiên cứu NodeJS làm mảng backend.</li>
        </ul>
        `,
    schedule: [],
    total_rating: 0,
    total_review: 0,
    total_student: 20,
    total_lesson: 8,
    total_enroll: 0,
    status: "REJECTED",
    student_Ids: [],
    reviews_Ids: [],
  },
  // PENDING
  {
    _id: "course_6",
    name: "AWS Cloud cơ bản (Tiếng Việt)",
    author: "Thảo Nguyễn",
    author_image:
      "https://img-c.udemycdn.com/course/750x422/5282940_57ad_3.jpg",
    image: "https://img-c.udemycdn.com/course/750x422/4598418_af4b_7.jpg",
    thumbnail: "https://www.youtube.com/watch?v=H3QQzNndCrs",
    price: 1099000,
    createdAt: "2023-20-11T00:00:00.000Z",
    startDate: "2024-01-02T00:00:00.000Z",
    endDate: "2024-01-03T00:00:00.000Z",
    category: ["CNTT", "phẩn mềm"],
    type: "online",
    address: {},
    short_description: "Khoá học AWS Cloud cơ bản cho người mới bắt đầu",
    description: `
        <p>Khóa học giúp cho những bạn Engineer mới nghiên cứu về AWS có được những khái niệm cơ bản nhất về AWS thông qua các kiến thức và các thực hành Lab.</p>
        <p>Khoá học cung cấp góc nhìn đa chiều, giúp cho các bạn đang muốn triển khai hạ tầng của Công ty, doanh nghiệp đang vận hành lên trên Cloud AWS, hướng dẫn các bạn các thiết kế hạ tầng dịch vụ trên AWS đảm bảo những tiêu chí như Tính có sẵn cao (High Availability), Tính co giãn (Scalability), Tính tự khắc phục lỗi (Fault-Tolerance).</p>
        <p>Khoá học giúp cho các bạn có định hướng ôn thi chứng chỉ AWS SAA-C03 có sự chuẩn bị tốt nhất nhờ việc cung cấp hệ thống kiến thức bài bản, các bài Practice Test được tổng hợp, các kinh nghiệm ôn thi, luyện thi.</p>
        <p>Điều đặc biệt khoá học được xây dựng dựa trên ngôn ngữ Tiếng việt, được việt hoá bởi Cloudnut team, với mong muốn lan toả mạnh mẽ kiến thức chuyên ngành IT đặc biệt là Cloud AWS - Xu thế mới cho hạ tầng ngành IT cho toàn bộ những bạn kỹ sư IT, các bạn sinh viên học chuyên ngành IT, các cán bộ quản lý IT...</p>
        <p>Cuối cùng, khoá học là tâm huyết của đội ngũ Trainer đến từ Cloudnut team hi vọng các bạn sẽ có được nhiều kiến thức bổ ích sau khi hoàn thành khoá học này.</p>
        <p>Thay mặt đội ngũ Trainer của Cloudnut. Xin chân thành cảm ơn các bạn!</p>
    `,
    requirement: `
        <p>Khóa học giúp cho những bạn Engineer mới nghiên cứu về AWS có được những khái niệm cơ bản nhất về AWS thông qua các kiến thức và các thực hành Lab.</p>
        <p>Khoá học cung cấp góc nhìn đa chiều, giúp cho các bạn đang muốn triển khai hạ tầng của Công ty, doanh nghiệp đang vận hành lên trên Cloud AWS, hướng dẫn các bạn các thiết kế hạ tầng dịch vụ trên AWS đảm bảo những tiêu chí như Tính có sẵn cao (High Availability), Tính co giãn (Scalability), Tính tự khắc phục lỗi (Fault-Tolerance).</p>
        <p>Khoá học giúp cho các bạn có định hướng ôn thi chứng chỉ AWS SAA-C03 có sự chuẩn bị tốt nhất nhờ việc cung cấp hệ thống kiến thức bài bản, các bài Practice Test được tổng hợp, các kinh nghiệm ôn thi, luyện thi.</p>
        <p>Điều đặc biệt khoá học được xây dựng dựa trên ngôn ngữ Tiếng việt, được việt hoá bời Cloudnut team, với mong muốn lan toả mạnh mẽ kiến thức chuyên ngành IT đặc biệt là Cloud AWS - Xu thế mới cho hạ tầng ngành IT cho toàn bộ những bạn kỹ sư IT, các bạn sinh viên học chuyên ngành IT, các cán bộ quản lý IT...</p>
        <p>Cuối cùng, khoá học là tâm huyết của đội ngũ Trainer đến từ Cloudnut team hi vọng các bạn sẽ có được nhiều kiến thức bổ ích sau khi hoàn thành khoá học này.</p>
        <p>Thay mặt đội ngũ Trainer của Cloudnut. Xin chân thành cảm ơn các bạn!</p>
    `,
    schedule: [],
    total_rating: 0,
    total_review: 0,
    total_student: 24,
    total_lesson: 8,
    total_enroll: 0,
    status: "PENDING",
    student_Ids: [],
    reviews_Ids: [],
  },
];

export const reviews: Review[] = [
  {
    _id: "review_1",
    isUnnamed: false,
    author: "user_1",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    course_id: "course_1",
    createdAt: "2023-09-24T15:28:14.202Z",
    content:
      "Hay quá đi, cô vừa xinh tươi mà giọng còn dễ thương nữa, nghe cuốn hút và có động lực học thật sự",
    rating: 5,
  },
  {
    _id: "review_2",
    isUnnamed: false,
    author: "user_2",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    course_id: "course_1",
    createdAt: "2023-09-05T12:49:30.202Z",
    content: "A very great course, I learned a lot of new things. Thank you.",
    rating: 4,
  },
  {
    _id: "review_3",
    isUnnamed: false,
    author: "user_3",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    course_id: "course_1",
    createdAt: "2023-09-12T20:06:22.202Z",
    content: "Âm thanh không được tốt",
    rating: 3,
  },
  {
    _id: "review_4",
    isUnnamed: false,
    author: "user_4",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    course_id: "course_1",
    createdAt: "2023-11-06T06:18:53.202Z",
    content: "Explain clearly and highly practically implicate",
    rating: 2,
  },
  {
    _id: "review_5",
    isUnnamed: false,
    author: "user_5",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    course_id: "course_1",
    createdAt: "2023-09-17T17:05:47.202Z",
    content: "Đã lỗi thời không còn phù hợp nữa",
    rating: 1,
  },
];

export const users: User[] = [
  {
    _id: "user_1",
    name: "Bùi Sơn Thái",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "buisonthai@gmail.com",
    password: "123",
    role: ["user"],
    description: "Nhiệt huyết và ham học hỏi",
    isCertificate: false,
    category: [],
    total_course: 1,
    total_review: 1,
    course_Ids: ["course_1"],
    review_Ids: ["review_1"],
  },
  {
    _id: "user_2",
    name: "Trần Thị Mai",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "tranthimai@gmail.com",
    password: "123",
    role: ["user"],
    description: "Chân thành và trách nhiệm",
    isCertificate: false,
    category: [],
    total_course: 1,
    total_review: 1,
    course_Ids: ["course_1"],
    review_Ids: ["review_2"],
  },
  {
    _id: "user_3",
    name: "Lê Minh Hoàng",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "leminhhoang@gmail.com",
    password: "123",
    role: ["user"],
    description: "Tự tin và sáng tạo",
    isCertificate: false,
    category: [],
    total_course: 1,
    total_review: 1,
    course_Ids: ["course_1"],
    review_Ids: ["review_3"],
  },
  {
    _id: "user_4",
    name: "Nguyễn Hồng Thanh",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "nguyenhongthanh@gmail.com",
    password: "123",
    role: ["user"],
    description: "Nhiệt huyết và sáng tạo",
    isCertificate: false,
    category: [],
    total_course: 1,
    total_review: 1,
    course_Ids: ["course_1"],
    review_Ids: ["review_4"],
  },
  {
    _id: "user_5",
    name: "Phạm Thị Ngọc Anh",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "phamthingocanh@gmail.com",
    password: "123",
    role: ["user"],
    description: "Tự tin và trách nhiệm",
    isCertificate: false,
    category: [],
    total_course: 1,
    total_review: 1,
    course_Ids: ["course_1"],
    review_Ids: ["review_5"],
  },
  {
    _id: "user_6",
    name: "Vũ Minh Tuấn",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "vuminhtuan@gmail.com",
    password: "123",
    role: ["user"],
    description: "Năng động và thân thiện",
    isCertificate: false,
    category: [],
    total_course: 0,
    total_review: 0,
    course_Ids: [],
    review_Ids: [],
  },
  {
    _id: "user_7",
    name: "Đặng Thị Thu Hương",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "dangthithuhuong@gmail.com",
    password: "123",
    role: ["user"],
    description: "Tinh thần trách nhiệm và sáng tạo",
    isCertificate: false,
    category: [],
    total_course: 0,
    total_review: 0,
    course_Ids: [],
    review_Ids: [],
  },
  {
    _id: "user_8",
    name: "Lý Thị Hương Giang",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "lythihuonggiang@gmail.com",
    password: "123",
    role: ["user"],
    description: "Nhiệt huyết và sáng tạo",
    isCertificate: false,
    category: [],
    total_course: 0,
    total_review: 0,
    course_Ids: [],
    review_Ids: [],
  },
  {
    _id: "user_9",
    name: "Hoàng Văn Hùng",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "hoangvanhung@gmail.com",
    password: "123",
    role: ["user"],
    description: "Trách nhiệm và thân thiện",
    isCertificate: false,
    category: [],
    total_course: 0,
    total_review: 0,
    course_Ids: [],
    review_Ids: [],
  },
  {
    _id: "user_10",
    name: "Nguyễn Thị Hồng",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "nguyenthihong@gmail.com",
    password: "123",
    role: ["user"],
    description: "Tự tin và nhiệt huyết",
    isCertificate: false,
    category: [],
    total_course: 0,
    total_review: 0,
    course_Ids: [],
    review_Ids: [],
  },
  {
    _id: "user_11",
    name: "Trần Văn Quân",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "tranvanquan@gmail.com",
    password: "123",
    role: ["user"],
    description: "Ham học hỏi và thân thiện",
    isCertificate: false,
    category: [],
    total_course: 0,
    total_review: 0,
    course_Ids: [],
    review_Ids: [],
  },
  {
    _id: "user_12",
    name: "Phạm Thị Kim Anh",
    avatar: "https://blog.hubspot.com/hubfs/image8-2.jpg",
    email: "phamthikimanh@gmail.com",
    password: "123",
    role: ["user"],
    description: "Sáng tạo và trách nhiệm",
    isCertificate: false,
    category: [],
    total_course: 0,
    total_review: 0,
    course_Ids: [],
    review_Ids: [],
  },
];
