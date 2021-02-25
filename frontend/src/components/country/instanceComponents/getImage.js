import "../countryInstance.css";

function GetImage(url) {
  var image = document.createElement("img");
  image.src = url;
  document.body.appendChild(image);
}

export default GetImage;
