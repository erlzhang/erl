export function getImgCover(img) {
  return {
    backgroundImage: `url(https://erl.im${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  }
}