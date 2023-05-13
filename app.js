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

const imageKeyword = document.getElementById("imageKeyword");

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

async function loadBackgroundImage(e) {
  e.preventDefault();
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${imageKeyword.value}&per_page=6`,
    {
      mode: "cors",
      headers: {
        Authorization:
          "YbKbHliM78OUoibK1Yyw57CFzT66yFoSDRXXZAQos9XHQ9XDoVeHNgY8",
        // 'Content-Type': 'application/x-www-form-urlencoded',
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

function populateAdFields() {
  adTitle.innerText = title.value;
  adTheme.innerText = theme.value;
  adSpeaker.innerText = speaker.value;
  adDate.innerText = date.value;
  adTime.innerText = time.value;

  if (registration.value) {
    registrationContainer.style.display = "block";
    adRegistration.innerText = registration.value;
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

createAdBtn.addEventListener("click", createAd);
bgImageBtn.addEventListener("click", loadBackgroundImage);

function capture() {
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

renderDefaultDesign();
downloadBtn.addEventListener("click", capture);
