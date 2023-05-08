document.addEventListener("DOMContentLoaded", function () {
  var order = document.querySelector(".order-btn btnHome");

  if (order) {
    order.addEventListener("cclick", function (e) {
      window.location.href = "/order";
    });
  }

  var signUp = document.querySelector(".signUp-btn btnHome");

  if (signUp) {
    signUp.addEventListener("click", function (e) {
      window.location.href = "/signUp";
    });
  }

  var login = document.querySelector(".login-homepage-btn btnHome");

  if (login) {
    login.addEventListener("click", function (e) {
      window.location.href = "/login";
    });
  }
});
