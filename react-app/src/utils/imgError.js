import errorImage from '../images/default.png'

export default function imgError(image) {
    image.onerror = null;
    image.src = errorImage;
    return true;
}
