export default function isLatitudeValid(lat) {
  if (lat === "") {
    return false;
  }
  lat = Number(lat);
  if (isNaN(lat)) {
    return false;
  } else if (lat < -90 || lat > 90) {
    return false;
  } else {
    return true;
  }
}