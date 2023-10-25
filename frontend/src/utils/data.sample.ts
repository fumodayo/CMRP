import { Course, Review } from "../types";

export const courses: Course[] = [
  {
    id: "1",
    name: "Học vẽ căn bản cho người mới",
    author: "Lê Thanh Vũ",
    rating: 4,
    image: "https://i.ytimg.com/vi/js0AUKZShAs/maxresdefault.jpg",
    thumbnail: "TzhDr1SQBr4",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 1500000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-10-27T00:00:00.000Z",
    endDate: "2023-12-15T00:00:00.000Z",
    category: "vẽ",
    location: "online",
    address: [],
    description: "Tiêu đề Mô tả Kết",
    requirement: "",
    total_student: 20,
    total_review: 21,
    syllabus: "",
  },
  {
    id: "2",
    name: "Thành thạo xử lí dữ liệu với Python từ số 0",
    author: "Ths. Lê Thanh Sang",
    rating: 4,
    image: "https://img-c.udemycdn.com/course/750x422/5437698_b59e_4.jpg",
    thumbnail: "rfscVS0vtbw",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 649000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-08-05T00:00:00.000Z",
    endDate: "2023-09-30T00:00:00.000Z",
    category: "CNTT & Phần mềm",
    location: "online",
    address: [],
    description: `<p>
    <h1>Thành thạo Xử Lý Dữ Liệu Lớn (Big Data) với Python cùng thầy Tâm</h1>
    <p>Nếu bạn đang có nhu cầu hoặc băn khoăn trong việc:</p>
    <ul>
        <li>Trang bị kiến thức xử lý dữ liệu lớn để làm các công việc Data Analyst, Data Scientist, Business Analyst,...</li>
        <li>Sinh viên hoặc người đi làm muốn xử lý dữ liệu để phục vụ cho các đồ án, dự án cá nhân.</li>
        <li>Lập trình viên, nhà phân tích hệ thống... muốn mở rộng kỹ năng phân tích dữ liệu bằng việc sử dụng Python.</li>
        <li>Người làm việc trong lĩnh vực kinh doanh, tài chính cần kiến thức kỹ năng dữ liệu, trực quan hóa dữ liệu bằng biểu đồ, xây dựng model để dự đoán trong ngữ cảnh về tài chính, kinh doanh.</li>
        <li>Hoặc bạn là bất cứ ai đang cần kiến thức về việc ứng dụng ngôn ngữ Python trong việc xử lý dữ liệu.</li>
    </ul>
    <p>Thì khóa học <strong>THÀNH THẠO XỬ LÝ DỮ LIỆU VỚI PYTHON TỪ SỐ 0</strong> chính là câu trả lời cho các câu hỏi trên. Đặc biệt, khóa học được thiết kế cho tất cả mọi người, mọi trình độ đều có thể đi vào hành trình chinh phục xử lý dữ liệu bằng Python một cách dễ dàng.</p>
    </p>
    `,
    requirement: `Tất cả mọi trình độ đều có thể tham gia.
    Không cần kiến thức lập trình từ trước.`,
    total_student: 20,
    total_review: 21,
    syllabus: `Xử lý dữ liệu CHUYÊN NGHIỆP như một Data Analyst, Business Analyst hay Data Scientist
    Xây dựng model MACHINE LEARNING với Scikit-Learn
    Thành thạo TRỰC QUAN HÓA dữ liệu để tìm INSIGHT với Matplotlib và Seaborn.
    Học và thực hành trên các data THỰC TẾ`,
  },
  {
    id: "3",
    name: "Khoá học Figma từ căn bản đến thực chiến",
    author: "Dương Văn Minh",
    rating: 4,
    image: "https://unica.vn/upload/images/2021/12/Cover_m_1638960888.jpg",
    thumbnail: "gYng2vywPTk",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 1049000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-08-15T00:00:00.000Z",
    endDate: "2023-09-01T00:00:00.000Z",
    category: "Thiết kế",
    location: "online",
    address: [],
    description: `<p>
    <h1>Những kiến thức nền tảng và chuyên sâu nhất về figma từ kinh nghiệm 2 năm giảng dạy của Telos Academy</h1>
    <p>
        Khóa học thiết kế giao diện bằng Figma dành cho những bạn có đam mê với ngành nghề UI/UX design. Khóa học tập trung vào những kỹ năng căn bản nhất, đồng thời cung cấp một cái nhìn tổng quát giúp học viên có thể tạo ra sản phẩm cụ thể sau khóa học.
    </p>
    <p>
        Bạn sẽ được tiếp kiến thức thực chiến từ đội ngũ TELOS, bao gồm các Developer và Designer cùng quản lý công việc và trao đổi trên một file làm việc Figma hơn 3 năm, bao gồm:
    </p>
    <ul>
        <li>Cách một dự án thiết kế giao diện UI/UX được thực thi</li>
        <li>Kiến thức căn bản về cách tận dụng Figma</li>
        <li>Các mẹo vặt để làm việc khoa học và tư duy theo lối lập trình</li>
        <li>Phương pháp nghiên cứu để luôn tìm ra câu trả lời cho cái mình chưa biết trong Figma</li>
        <li>Vun đắp mối quan hệ Designer - Developer với những sản phẩm ăn ước.</li>
    </ul>
    <p><strong>RỒI HỌC XONG ĐƯỢC GÌ?</strong></p>
    <ul>
        <li>Thuần thục cách sử dụng công cụ; hiểu rõ ngôn ngữ thiết kế; thấu hiểu tư duy bài bản</li>
        <li>Tự tin thực hiện hoá ý tưởng của mình trên các thiết kế</li>
        <li>Biết cách dùng phần mềm như một người làm UI/UX với lối tư duy hệ thống, nắm vững nền tảng cơ bản; sắp xếp và quản lý các công việc một cách khoa học</li>
        <li>Giảm đến hơn 60% thời gian cho các thao tác lặp đi lặp lại bằng việc tạo ra các component</li>
        <li>Tự tạo ra những thiết kế Website/App cực chất, sẵn sàng để trở thành một Designer ở các Agency chuyên xây dựng website.</li>
    </ul>
    <p>Đặc biệt, quà tặng Ebook Figma Design Notebook được gửi tặng ngay sau khóa học, được biên soạn với kiến thức bổ sung, được hệ thống lại và cập nhật từng đợt, đảm bảo chưa bao giờ bị lỗi nhịp với thời đại.</p>
    </p>
    `,
    requirement: `Học từ bước khởi đầu nên không đòi hỏi thêm kiến thức khác
    Cần có laptop
    Cần sự tập trung và kiên trì`,
    total_student: 20,
    total_review: 21,
    syllabus: `Sử dụng thành thục figma.
    Hình thành tư duy hệ thống hóa thiết kế với figma
    Nâng cao năng suất làm việc, nâng cao thu nhập.
    Quản lý mọi thành phần trong thiết kế một cách khoa học, giảm thiểu thao tác thừa.`,
  },
  {
    id: "4",
    name: "Excel cơ bản đến nâng cao",
    author: "Mai Công",
    rating: 4,
    image: "https://sieuthikhoahoc.vn/wp-content/uploads/2020/05/L%C3%A0m-ch%E1%BB%A7-excel-qua-100-chuy%C3%AAn-%C4%91%E1%BB%81-t%E1%BB%AB-c%C6%A1-b%E1%BA%A3n-%C4%91%E1%BA%BFn-n%C3%A2ng-cao-min.jpg",
    thumbnail: "OJW_Rm6upb8",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 1049000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-08-15T00:00:00.000Z",
    endDate: "2023-09-01T00:00:00.000Z",
    category: "CNTT & Phần mềm",
    location: "online",
    address: [],
    description: `
    <p>
    <h1>Tất cả kiến thức Excel cơ bản cần cho công việc được giảng dạy bởi Thầy Nguyễn Đức Thành</h1>
    <p>
        Đa số các bạn khi còn đang đi học không chú ý và dành nhiều thời gian cho việc học môn Excel trong trường vì các bạn chưa biết được chúng ta có thể áp dụng Excel vào việc xử lý công việc hàng ngày của chúng ta thế nào. Đến khi đi làm, bạn cảm thấy không sử dụng thành thạo Excel làm bạn tốn rất nhiều thời gian để xử lý công việc và không chắc chắn về những gì mình đang làm có đúng hay không.
    </p>
    <p>
        100% các doanh nghiệp từ nhỏ nhất đến lớn nhất đều cần đến kỹ năng Excel ở các ứng viên vào các vị trí kế toán, bán hàng, xử lý dữ liệu, nhân viên ngân hàng, quản lý. Ở mỗi cấp độ thì yêu cầu phải thành thạo Excel để xử lý công việc khác nhau. Sử dụng Excel hiệu quả sẽ giúp công việc được xử lý nhanh chóng, chính xác, đạt hiệu quả cao.
    </p>
    <p>
        Chính vì những lý do đó, khoá học này được tạo ra để giải quyết nhu cầu trau dồi kiến thức Excel cho các bạn mới bắt đầu và các bạn đã học qua Excel nhưng chưa thành thạo. Khoá học là nền tảng vững chắc để các bạn có thể tự nâng cao khả năng tự học và nghiên cứu các kiến thức nâng cao dưới sự hướng dẫn của giảng viên giàu kinh nghiệm trong lĩnh vực đào tạo và tư vấn cho cấp quản lý trong các doanh nghiệp trong và ngoài nước - anh Nguyễn Đức Thanh.
    </p>
    </p>`,
    requirement: `Kiến thức cơ bản về sử dụng máy tính
    Kiến thức cơ bản về sử dụng trình duyệt Web
    Máy tính có cài đặt sẵn Excel từ phiên bản 2010 trở lên`,
    total_student: 20,
    total_review: 21,
    syllabus: `Kiến thức Excel cơ bản
    Ứng dụng Excel vào việc xử lý nội dung công việc liên quan`,
  },
  {
    id: "5",
    name: "Trọn bộ Excel từ cơ bản đến nâng cao",
    author: "Thái Công",
    rating: 4,
    image: "https://unica.vn/upload/images/2020/04/thumb-Tr%E1%BB%8Dn%20b%E1%BB%99%20ki%E1%BA%BFn%20th%E1%BB%A9c%20v%E1%BB%81%20Excel_m_1587721222.jpg",
    thumbnail: "zlVq9bUpbyc",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 429000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-15-09T00:00:00.000Z",
    endDate: "2023-10-30T00:00:00.000Z",
    category: "CNTT & Phần mềm",
    location: "online",
    address: [],
    description: `
    <p>
    <h1>Làm chủ Excel từ cơ bản đến nâng cao</h1>
    <p>
        Hiểu rõ bản chất 1 ô tính, các hàm hay dùng, tool xử lý data, pivot tables, charts.
    </p>
    <p>
        Bạn có biết, Excel là một môn Kỹ năng. Chính vì vậy, yếu tố thực hành nhiều, thường xuyên đóng vai trò thiết yếu và quan trọng trong việc làm chủ kỹ năng này.
    </p>
    <p>
        Bạn chỉ cần nắm được 3000 từ vựng để có thể giao tiếp tiếng Anh thành thạo. Và với 100 thao tác Excel thực tế này, bạn có thể làm chủ và xử lý được hầu hết các vấn đề liên quan đến Excel.
    </p>
    <p>Hãy tham gia khoá học này để:</p>
    <ul>
        <li>Chỉ cần 13h học online, mọi lúc, mọi nơi, trên mọi thiết bị là có thể thành thạo các kỹ năng Excel từ cơ bản tới nâng cao.</li>
        <li>Các thao tác, thủ thuật áp dụng cho cả Excel 2007, 2010, 2013, 2016, 2019.</li>
        <li>Khóa học thiết kế theo phương pháp L.I.P.E, cung cấp đầy đủ giáo trình từ lý thuyết đến các bài thực hành sau mỗi bài, các bài kiểm tra sau từng chương và bài thi hết khóa học, giúp học viên trau dồi kỹ năng ngay sau khi học.</li>
        <li>Khóa học bao phủ toàn bộ các vấn đề trong Excel.</li>
        <li>Được tham gia cộng đồng học viên Excel, trao đổi thảo luận trực tiếp với giảng viên trên diễn đàn.</li>
        <li>Khóa học như một cuốn sách tra cứu các thủ thuật, cách giải quyết các vấn đề gặp phải trong excel.</li>
        <li>Đầu tư cho việc học luôn luôn sinh lời. Hãy đầu tư cho bản thân ngay hôm nay và làm chủ Kỹ năng Excel. Chúc bạn thành công!</li>
    </ul>
    </p>
    `,
    requirement: `Máy tính được kết nối với Internet và có thể sử dụng tai nghe
    Máy tính đã được cài đặt Office từ 2007 trở lên (khuyến khích sử dụng Excel 2013 trở lên)`,
    total_student: 20,
    total_review: 21,
    syllabus: `Hiểu được bản chất của cell (ô tính), thành phần quan trọng nhất của Excel, từ đó giúp bạn tự tin khi sử dụng excel.

    Thành thạo toàn bộ các hàm hay sử dụng và không còn lo ngại khi phải làm việc với các hàm khó nữa.
    
    Sử dụng được VBA, Record Macro trong Excel (căn bản).
    
    Hiểu rõ bản chất và áp dụng thành thạo các công cụ xử lý dữ liệu đến định dạng bảng tính (custom format, conditional formatting).
    
    Tạo ra được các báo cáo, biểu đồ động với Pivot Table, Slicer, Pivot Chart.`,
  },
  {
    id: "6",
    name: "Thực hành sống chánh niệm",
    author: "Ths. Lê Thanh Sang",
    rating: 4,
    image: "https://image.voh.com.vn/voh/thumbnail/2022/09/18/chanh-niem-la-gi-3.jpg",
    thumbnail: "Cf3GcmfVl84",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 899000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-09-01T00:00:00.000Z",
    endDate: "2023-11-10T00:00:00.000Z",
    category: "Phát triển bản thân",
    location: "online",
    address: [],
    description: `<p>
    <h1>Sống, ở đây, ngay lúc này.</h1>
    <p>
        Hơi tệ một chút là chúng ta thường sẽ chạy trốn sự cô đơn, đè nén sợ hãi, lạc lối với sự vô định. Tệ hơn nữa là chúng ta để cho suy nghĩ dẫn dắt bản thân, để rồi rơi vào những cái bẫy rằng mình là nạn nhân, mình thiếu may mắn, thế giới mạnh được yếu thua, mình sẽ mãi như vậy...
    </p>
    <p>
        Chúng ta sống mỗi ngày, mà không có bất kì sự hướng dẫn nào để có thể sống hài hòa với chính mình, để thả lỏng và tận hưởng cuộc sống. Chúng ta vẫn loay hoay dù đã thử cáhc này cách kia.
    </p>
    <p>
        Nhanh, vội, liền, ngay là những từ khóa có thể thể hiện lối sống hiện tại của đa phần chúng ta. Thế giới bên ngoài thì chuyển động, thay đổi chóng mặt. Còn chúng ta thì thấy mình vẫn dậm chân tại chỗ với chính mình.
    </p>
    <p>
        Nhưng nếu dậm chân tại chỗ mà có được niềm vui, sự bình an và hạnh phúc thì sao? Khóa học này có thể cùng bạn tạo ra những điều chỉnh nho nhỏ để giúp bạn yêu lại đời mình.
    </p>
</p>`,
    requirement: `Mong muốn một cuộc sống chậm rãi, bình an và có ý nghĩa.`,
    total_student: 20,
    total_review: 21,
    syllabus: `Hiểu rõ về bản chất, rào cản của thực hành lối sống chánh niệm.

    Vượt qua cảm xúc, suy nghĩ khó khăn bằng thực hành chánh niệm.
    
    Hiểu rõ chánh niệm từ góc nhìn tâm lý học.
    
    Đưa chánh niệm vào mọi khía cạnh của cuộc sống.`,
  },
  {
    id: "7",
    name: "Yêu thương chính mình",
    author: "Ths. Bùi Sơn Thái",
    rating: 4,
    image: "https://media.blogradio.vn/Upload/CMS/Nam_2018/Thang_5/Ngay_8/Images/DaDenLucHocCachYeuThuongChinhMinh1.jpg",
    thumbnail: "x-O234yB9CY",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 1099000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-09-01T00:00:00.000Z",
    endDate: "2023-11-10T00:00:00.000Z",
    category: "Phát triển bản thân",
    location: "online",
    address: [],
    description: `<p>
    <h1>Học cách làm bạn và yêu thương bản thân.</h1>
    <p>
        Chúng ta được dạy phải cư xử đúng chuẩn mực để người khác không đánh giá, để người thân không cảm thấy phiền lòng, nhưng không được dạy cách trân trọng chính mình.
    </p>
    <p>
        Chúng ta biết, hiểu và thấy mỗi một con đường duy nhất. Rằng ta phải yêu một ai đó, kết hôn với một ai đó thì đời ta mới có ý nghĩa, mới trọn vẹn. Ta không thấy ý nghĩa với sự tồn tại của mình.
    </p>
    <p>
        Ta tưởng rằng phần lớn những khó khăn, mệt mỏi hằng ngày mà ta phải đối diện là do người xung quanh, là do áp lực cuộc sống mà không nhận ra rằng ta đã và đang mời gọi những khó khăn ấy tới với cuộc sống của mình. Và đau khổ vẫn mỗi ngày tiếp diễn.
    </p>
    <p>
        Sau những năm tháng gồng mình, trốn mình, ta dần xa lạ với chính mình. Ta cần một ai đó để nghe mình, để hiểu mình, để thương mình. Vậy mà, ta chưa từng dừng lại để hỏi "Mình có đang yêu mình hay không?"
    </p>
    <p>
        Và đôi khi hỏi xong, chúng ta cũng lại bị cuốn vào những vòng xoáy khác nhau, để rồi quên luôn cả câu hỏi. Thật là trớ trêu.
    </p>
    <p>
        Vậy nên, khóa học này mới hiện diện trong cuộc đời bạn. Chọn nó hay không là do bạn đó.
    </p>
</p>
    
    `,
    requirement: `Người thường xuyên để những lời nói, hành động của người khác ảnh hưởng tiêu cực tới cuộc sống.

    Người đã nhiều lần thất bại, mệt mỏi với các mối quan hệ trong công việc, gia đình, tình cảm.
    
    Người muốn thấu hiểu, kết nối với chính mình nhưng không có công cụ phù hợp.`,
    total_student: 20,
    total_review: 21,
    syllabus: `Hiểu được nguyên nhân của những tổn thương, khó khăn mà ta phải đối diện trong suốt những năm tháng qua.

    Đối diện với khó khăn và thực hành chuyển hóa những cảm xúc khó khăn ngay trong lớp học.
    
    Biết cách nhìn lại mình, chấp nhận, chữa lành và đối xử từ bi với chính mình.
    
    Biết cách tạo ra những hoạt động hằng ngày để có thể kết nối sâu sắc với chính mình.`,
  },
  {
    id: "8",
    name: "Phân tích chuỗi thời gian trong kinh tế - tài chính",
    author: "Ths. Ngô Bảo Châu",
    rating: 4,
    image: "https://tailieuhust.com/wp-content/uploads/2023/07/Khoa-hoc-Phan-tich-chuoi-thoi-gian-trong-kinh-te-tai-chinh-1.png",
    thumbnail: "J9jZ6PuqgY8",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 599000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-08-08T00:00:00.000Z",
    endDate: "2023-08-30T00:00:00.000Z",
    category: "Tài chính & Kế toán",
    location: "offline",
    address: [],
    description: `<p>
    <h1>Các kỹ năng phân tích chuỗi thời gian và xây dựng mô hình dự báo chuỗi thời gian trong kinh tế - tài chính.</h1>
    <p>
        Dữ liệu chuỗi thời gian là một loại dữ liệu thường gặp trong kinh tế - tài chính. Đó là dữ liệu của các biến số thay đổi theo thời gian, chẳng hạn như GDP của một nước theo thời gian, chuỗi giá chứng khoán của một loại cổ phiếu, doanh thu của một công ty theo thời gian.
    </p>
    <p>
        Việc phân tích chuỗi thời gian sẽ giúp tìm ra những hình thái, từ đó có thể sử dụng để xây dựng các mô hình dự báo chuỗi thời gian.
    </p>
    <p>
        Khóa học này cung cấp các mô hình cơ bản để phân tích và dự báo chuỗi thời gian. Bạn sẽ có được những công cụ định lượng mạnh mẽ để ứng dụng trong phân tích - dự báo kinh tế vĩ mô, phân tích tài chính. Mô hình chuỗi thời gian cũng có thể ứng dụng trong kinh doanh, bằng cách dự báo nhu cầu sản phẩm, doanh thu và chi phí trong tương lai.
    </p>
    <p>
        Các nội dung sẽ được đề cập trong khóa học:
    </p>
    <ul>
        <li>Phân tích tính xu hướng (trend)</li>
        <li>Phân tích tính mùa vụ (seasonality)</li>
        <li>Phân tích tính chu kỳ - mô hình ARIMA</li>
        <li>Mô hình GARCH cho chuỗi thời gian có phương sai thay đổi</li>
        <li>Minh họa chuỗi thời gian và thực hành phân tích trên Microsoft Excel</li>
    </ul>
</p>
    `,
    requirement: `Kiến thức cơ bản về xác suất thống kê
    Kiến thức về mô hình hồi quy tuyến tính
    `,
    total_student: 20,
    total_review: 21,
    syllabus: `Kỹ năng phân tích chuỗi thời gian thống kê.

    Xây dựng các mô hình dự báo chuỗi thời gian thống kê.`,
  },
  {
    id: "9",
    name: "Chứng khoán cho người mới bắt đầu",
    author: "Ths. Vũ Nhôm",
    rating: 4,
    image: "https://www.ssi.com.vn/upload/images/Tin-tuc/dau%20tu%20chung%20khoan%20cho%20nguoi%20moi%20bat%20dau.png",
    thumbnail: "oLS4tVHclP0",
    author_image:
      "https://media.techz.vn/resize_x355x/media2019/upload2019/2023/06/01/screenshot-836-1685605867.jpg",
    status: "",
    price: 749000,
    createdAt: "2023-10-12T00:00:00.000Z",
    startDate: "2023-10-10T00:00:00.000Z",
    endDate: "2023-11-31T00:00:00.000Z",
    category: "Tài chính & Kế toán",
    location: "online",
    address: [],
    description: `<p>
    <h1>Khóa học Chứng khoán cho người mới bắt đầu</h1>
    <p>
        Đây là một chuyên đề online bạn có thể có được nó, bạn có thể học đi học lại nhiều lần, học bất cứ ở đâu.
    </p>
    <p>
        Chúng ta sẽ bắt đầu từ việc mở một tài khoản chứng khoán, đây là điều tất nhiên vì nhà đầu tư cần tài khoản để giao dịch, mua bán các loại chứng khoán. Hiện nay, các bạn có thể mở tài khoản chứng khoán hoàn toàn miễn phí ở các công ty chứng khoán trên khắp cả nước. Thủ tục đăng ký chỉ đơn giản là các thông tin cá nhân từ căn cước công dân (nhà đầu tư phải trên 18 tuổi). Hầu hết công ty hiện nay đã hỗ trợ dịch vụ mở tài khoản online (trực tuyến), bạn chỉ cần một thiết bị có kết nối mạng internet như điện thoại, máy tính bảng, laptop là có thể thực hiện ngay tại nhà. Sau khi đã có một tài khoản, các bạn có thể nộp tiền hoặc lưu ký chứng khoán và bắt đầu giao dịch.
    </p>
    <p>
        Đến đây, nhiều bạn sẽ lo lắng không biết nộp bao nhiêu tiền là đủ và mức quy định tiền gửi tối thiểu là bao nhiêu. Bên cạnh đó, là người mới bắt đầu, bạn còn nhiều lo lắng khác. Khoá học Chứng khoán cho người mới bắt đầu hứa hẹn sẽ là người hỗ trợ, đồng hành cùng các bạn.
    </p>
    </p>
    `,
    requirement: `Máy tính/thiết bị có kết nối Internet.
    Giấy và bút viết để theo dõi bài giảng.
    Không gian thỏa mái, không bị ảnh hưởng bởi những yếu tố xung quanh
    `,
    total_student: 20,
    total_review: 21,
    syllabus: `Những chiến lược, công thức, vũ khí đơn giản, một quy trình hành động từng bước rõ ràng, hiệu quả và thực chiến nhất.

    Có tư duy và kỹ năng đầu tư bài bản chuyên nghiệp ngay từ đầu và phát triển bền vững.
    
    Các công thức kỳ diệu nhằm đầu tư đúng đắn và tạo thu nhập thu động cho bản thân.
    
    Giải Pháp về phương pháp đầu tư chứng khoán giá trị sẽ diễn ra theo hướng tích hợp & chọn lọc những gì mạnh sẽ nhất của sự tăng trưởng.
    
    Cách nhận diện cổ phiếu đang tăng trưởng.`,
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    user_name: "user1",
    avatar: "/images/avatar.png",
    course_id: "1",
    createdAt: "2023-08-08T00:00:00.000Z",
    comment: "Tốt",
    rating: 5,
  },
  {
    id: "2",
    user_name: "user1",
    avatar: "/images/avatar.png",
    course_id: "2",
    createdAt: "2023-08-18T00:00:00.000Z",
    comment: "Không như mong đợi",
    rating: 4,
  },
  {
    id: "3",
    user_name: "user2",
    avatar: "/images/avatar.png",
    course_id: "2",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment:
      "Anh truyền đạt rất dễ hiểu, bài giảng hữu ích. Mong anh có nhiều khoá học hơn nữa trên CMRP.",
    rating: 5,
  },
  {
    id: "4",
    user_name: "user3",
    avatar: "/images/avatar.png",
    course_id: "2",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment:
      "Its content is good but the background turning arround make me feel dizzy :(",
    rating: 3,
  },
  {
    id: "5",
    user_name: "user4",
    avatar: "/images/avatar.png",
    course_id: "3",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment:
      "Khóa học rất chi tiết và dễ hiểu, kiến thức được cung cấp rất đầy đủ. Tuy nhiên vì nhiều kiến thức nên là cần học kĩ để nắm được hết kiến thức.",
    rating: 5,
  },
  {
    id: "6",
    user_name: "user5",
    avatar: "/images/avatar.png",
    course_id: "4",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment: `Khóa học chất lượng, phù hợp cho người mới bắt đầu???
    Hands-on nhiều thật sự đỉnh của chóp.`,
    rating: 5,
  },
  {
    id: "7",
    user_name: "user6",
    avatar: "/images/avatar.png",
    course_id: "5",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment: `Lý thuyết cô đọng ... đặc biệt là lab rất nhiều ... hơn các khóa ở trung tâm mà mình từng học`,
    rating: 4,
  },
  {
    id: "8",
    user_name: "user7",
    avatar: "/images/avatar.png",
    course_id: "6",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment: `Khá chi tiết, nhiều bài lab hơn các khoá học cùng nội dung ở thời điểm này`,
    rating: 4,
  },
  {
    id: "9",
    user_name: "user8",
    avatar: "/images/avatar.png",
    course_id: "1",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment: `đã lỗi thời không còn phù hợp nữa`,
    rating: 1,
  },
  {
    id: "10",
    user_name: "user9",
    avatar: "/images/avatar.png",
    course_id: "1",
    createdAt: "2023-01-11T00:00:00.000Z",
    comment: `Khoá học rất vô nghĩa, rất tốn thời gian, chả đọng lại được bao nhiêu. 
    chắc rất nhiều người giống mình :((`,
    rating: 1,
  },
];
