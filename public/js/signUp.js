document.addEventListener("DOMContentLoaded", function () {
  var loginbtn = document.querySelector(".login-btn");
  loginbtn.addEventListener("click", function (e) {
    window.location.href = "/login";
  });
});
