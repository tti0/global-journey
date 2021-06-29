export default function isLongitudeValid(lng) {
  if (lng === "") {
    return false;
  }
  lng = Number(lng);
  if (isNaN(lng)) {
    return false;
  } else if (lng < -180 || lng > 180) {
    return false;
  } else {
    return true;
  }
}