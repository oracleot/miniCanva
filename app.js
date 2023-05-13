const title = document.getElementById("title");
const adTitle = document.getElementById("ad-title");
const theme = document.getElementById("theme");
const adTheme = document.getElementById("ad-theme");
const speaker = document.getElementById("speaker");
const adSpeaker = document.getElementById("ad-speaker");
const date = document.getElementById("date");
const adDate = document.getElementById("ad-date");
const time = document.getElementById("time");
const adTime = document.getElementById("ad-time");
const registration = document.getElementById("registration");
const adRegistration = document.getElementById("ad-registration");
const venue = document.getElementById("venue");
const adVenue = document.getElementById("ad-venue");
const address = document.getElementById("address");
const adAddress = document.getElementById("ad-address");

const downloadBtn = document.getElementById("downloadBtn");
const bgImageBtn = document.getElementById("bgImageBtn");
const createAdBtn = document.getElementById("createAdBtn");

const adContainer = document.querySelector("#capture");
const registrationContainer = document.getElementById("registrationContainer");

const bgOptions = document.getElementsByClassName("bg-option");
for (let i = 0; i < bgOptions.length; i++) {
  bgOptions[i].addEventListener("click", () => {
    setAdBackground(bgOptions[i].src);
  });
}

renderDefaultDesign();

createAdBtn.addEventListener("click", createAd);
bgImageBtn.addEventListener("click", loadBackgroundImage);
downloadBtn.addEventListener("click", download);

async function loadBackgroundImage(e) {
  e.preventDefault();
  const query = document.getElementById("imageKeyword").value;
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=6`,
    {
      mode: "cors",
      headers: {
        Authorization:
          "YbKbHliM78OUoibK1Yyw57CFzT66yFoSDRXXZAQos9XHQ9XDoVeHNgY8",
      },
    }
  );
  const data = await response.json();
  const photos = await data.photos;
  for (let i = 0; i < photos.length; i++) {
    document.getElementById(`bg-option${i + 1}`).src = photos[i].src.original;
  }
}

function setAdBackground(imgUrl) {
  adContainer.style.background = `url(
          ${imgUrl}
        )`;
  adContainer.style.backgroundSize = "cover";
  adContainer.style.backgroundPosition = "center";
}

function trimString(str, length) {
  return str.substring(0, length);
}

function populateAdFields() {
  adTheme.innerText = trimString(theme.value, 36);
  adTitle.innerText = title.value = trimString(title.value, 44);
  adSpeaker.innerText = trimString(speaker.value, 40);
  adDate.innerText = trimString(date.value, 18);
  adTime.innerText = trimString(time.value, 16);
  adAddress.innerText = trimString(address.value, 40);
  adVenue.innerText = trimString(venue.value, 20);

  if (registration.value) {
    registrationContainer.style.display = "block";
    adRegistration.innerText = trimString(registration.value, 18);
  } else {
    registrationContainer.style.display = "none";
  }
}

function renderDefaultDesign() {
  populateAdFields();
}

function createAd(e) {
  e.preventDefault();
  populateAdFields();
}

function download() {
  html2canvas(document.querySelector("#capture"), {
    useCORS: true,
    width: 500,
    height: 500,
  })
    .then((canvas) => {
      return canvas;
    })
    .then((canvas) => {
      const image = canvas.toDataURL("image/jpg");
      const a = document.createElement("a");
      a.setAttribute("download", "my-image.png");
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
}
