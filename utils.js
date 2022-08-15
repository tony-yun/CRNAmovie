export const makeImgPath = (img, width = "w780") =>
  `https://image.tmdb.org/t/p/${width}${img}`;
//width = "w500"뜻은 w500이 default값
//에러해결:
//export const makeImgPath = (img, width = "w500") =>
// {`https://image.tmdb.org/t/p/${width}${img}`}
//이 형태로 불러왔더니 받아오는 쪽에서 undefined가 뜸. {}가 없어야함.
