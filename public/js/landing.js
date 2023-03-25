document.addEventListener("DOMContentLoaded", function () {
  var homebtn = document.querySelector(".home-btn");

  if (homebtn) {
    homebtn.addEventListener("click", function (e) {
      window.location.href = "/signUp";
    });
  }
});
