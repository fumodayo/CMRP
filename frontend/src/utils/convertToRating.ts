export const convertToRating = (scores: number[]): number => {
  const [negative, positive, neutral] = scores;
  const totalScore = negative + positive + neutral;

  // Chuyển đổi các chỉ số thành phần trăm
  const negativePercentage = negative / totalScore;
  const neutralPercentage = neutral / totalScore;
  const positivePercentage = positive / totalScore;

  // Sử dụng công thức tuyến tính để tính toán rating từ 0 đến 5
  const rating =
    5 * positivePercentage + 3 * neutralPercentage + 0 * negativePercentage;

  // Làm tròn rating đến 2 chữ số thập phân và chuyển về dạng số
  return Number(rating.toFixed(1));
};
