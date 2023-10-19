const Detail = () => {
  return (
    <section className="text-slate-500 font-medium space-y-2">
      <p>
        Trong mỗi video bài giảng, Thầy Ngọc thường đi từ bản chất của vấn đề,
        nhắc lại các kiến thức liên quan khi chữa các câu hỏi, giúp học sinh
        hiểu rõ bản chất, dễ dàng xử lí các dạng bài có trong đề thi. Ngoài ra
        thầy còn tự tổng kết một số phương pháp giải nhanh kết hợp với các đề
        thi thử, chắc chắn sẽ làm cho quá trình ôn thi của các em học sinh đạt
        hiệu quả cao nhất.
      </p>
      <div>
        <h2 className="pb-2">Gồm 2 thành phần:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Video bài giảng: Đề thi và bài giảng chữa đề
            <ul className="list-disc list-inside px-4">
              <li>
                20 đề thi phủ toàn bộ nội dung có trong đề:
                <ul className="list-disc list-inside px-4">
                  <li>
                    10 đề tiêu chuẩn: bám sát chuẩn theo cấu trúc của đề thi năm
                    trước (có tỉ lệ NB-TH-VD-VDC tương đương).
                  </li>
                  <li>
                    5 đề nâng cao: đảm bảo phủ đủ 4 cấp độ, độ khó tăng thêm
                    khoảng 10% so với đề tiêu chuẩn.
                  </li>
                  <li>
                    5 đề thực chiến: bám sát theo cấu trúc đề tham khảo do Bộ
                    GD-ĐT ban hành (nếu có).
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            Phòng luyện:
            <ul className="list-disc list-inside px-4 space-y-1">
              <li>
                Hơn 5000 câu hỏi trắc nghiệm trực tuyến rèn phương pháp và kĩ
                năng làm bài
              </li>
              <li>
                Gồm phần tự luyện và phần kiểm tra. Đối với phần tự luyện, học
                sinh sẽ có cơ hội ôn tập, củng cố lại các kiến thức theo từng
                chuyên đề. Đối với phần kiểm tra, học sinh sẽ được tiếp cận với
                hệ thống đề thi thử tốt nghiệp THPT chuẩn hóa, có thời gian làm
                bài. Đây là cơ hội để các bạn được tham gia thi thử độc lập,
                giúp các bạn có cơ hội áp dụng các phương pháp mà giáo viên đã
                giảng dạy vào việc luyện tập đề thi. Thông qua đó, học sinh có
                thể rèn kĩ năng xử lí các dạng bài, và biết cách tối ưu hóa thời
                gian trong phòng thi.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default Detail;
