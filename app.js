const searchButton = document.querySelector("[search-btn]");
let input = document.querySelector("input");
let modeBtn = document.querySelector(".color-mode");
let modeText = document.querySelector("[modeText]");
let modeImg = document.querySelector("[mode-img]");
let icon = document.querySelector(".icon");
let noresults = document.querySelector("#no-results");
let crossMark = document.querySelector(".fa-xmark");

let URL = "https://api.github.com/users/";
const root = document.documentElement.style;
noresults.style.display = "none";
crossMark.style.display = "none";

getUserdata(URL + "nwaliaez");
let dark = false;

crossMark.addEventListener("click", () => {
  input.value = "";
  crossMark.style.display = "none";
  noresults.style.display = "none";
});
input.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    if (input.value != "") {
      getUserdata(URL + input.value);
    }
  } else if(e.key == "Backspace") {
    crossMark.style.display = "none";
  }
});

input.addEventListener("input", function () {
  noresults.style.display = "none";
  crossMark.style.display = "block";
});
function mode() {
  if (dark == false) {
    lightmodeProperties();
    dark = true;
  } else {
    darkmodeproperties();
    dark = false;
  }
}

function darkmodeproperties() {
  root.setProperty("--bgcolor", "#141d2f");
  root.setProperty("--bgcolor1", " #1e2a47");
  root.setProperty("--text-color", "#ffff");
  root.setProperty("--number-color", "#ffff ");
  root.setProperty("--btn-color", " #0079ff");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  root.setProperty("--lm-icon", " brightness(1000%)");
  crossMark.style.color="white";
  modeText.innerText = "LIGHT";
  modeImg.src = "Assets/images/sun-icon.svg";
}

function lightmodeProperties() {
  root.setProperty("--bgcolor", "#f6f8ff");
  root.setProperty("--bgcolor1", "#fefefe");
  root.setProperty("--text-color", "#4b6a9b");
  root.setProperty("--number-color", " #141d2f ");
  root.setProperty("--btn-color", "#0079ff");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.25)");
  root.setProperty("--lm-icon", " brightness(100%)");
  modeText.innerText = "DARK";
  modeImg.src = "Assets/images/moon-icon.svg";
}

modeBtn.addEventListener("click", () => {
  console.log("CLicked Button");
  mode();
});

function renderInformation(userData) {
  let datesegment = [];
  let Profilepicture = document.querySelector("[user-image]");
  let username = document.querySelector("[user-name]");
  let Date = document.querySelector("[user-joined-date]");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let userId = document.querySelector("[userID]");
  let userBio = document.querySelector("[Bio-description]");
  let reponumber = document.querySelector("[repo-number]");
  let followerNumber = document.querySelector("[follower-number]");
  let followingNumber = document.querySelector("[following-number]");
  let userLocation = document.querySelector("[user-location]");
  let Blog = document.querySelector("[bio-link]");
  let TwitterId = document.querySelector("[twitter-Id]");
  let Company = document.querySelector("[company-details]");
  datesegment = userData?.created_at.split("T").shift().split("-");
  Date.innerText = `Joined ${datesegment[2]} ${months[datesegment[1] - 1]} ${
    datesegment[0]
  }`;

  username.innerText =
    userData?.name == null ? userData?.login : userData?.name;
  Profilepicture.src = userData?.avatar_url;
  userId.innerText = `@${userData?.login}`;
  userId.href = userData?.html_url;
  userBio.innerText = userData?.bio == null ? "Not Available" : userData?.bio;
  reponumber.innerText = userData?.public_repos;
  followerNumber.innerText = userData?.followers;
  followingNumber.innerText = userData?.following;
  userLocation.innerText =
    userData?.location == null ? "Not Available" : userData?.location;
  Blog.innerText = userData?.blog == "" ? "Not Available" : userData?.blog;
  Blog.href = userData?.blog == "" ? "#" : userData?.blog;
  TwitterId.innerText =
    userData?.twitter_username == null
      ? "Not Available"
      : userData?.twitter_username;
  TwitterId.href =
    userData?.twitter_username == null
      ? "#"
      : `https://twitter.com/${userData?.twitter_username}`;
  Company.innerText =
    userData?.company == null ? "Not Available" : userData?.company;
}
async function getUserdata(link) {
  try {
    let response = await fetch(link);
    let data = await response.json();
    console.log(data);
    renderInformation(data);
    noresults.style.display = "none";
    // crossMark.style.display = "block";
  } catch (error) {
    noresults.style.display = "block";
    crossMark.style.display = "block";
  }
  let response = await fetch(link);
  let data = await response.json();
  console.log(data);
  renderInformation(data);
}

searchButton.addEventListener("click", () => {
  getUserdata(URL + input.value);
});
