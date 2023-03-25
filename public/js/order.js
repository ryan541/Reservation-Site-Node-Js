document.addEventListener("DOMContentLoaded",function(){

var kfc = document.querySelector(".kfc");

if (kfc) {
  kfc.addEventListener("click", function (e) {
    window.location.href = "/kfc";
  });
}

var chickenInn = document.querySelector(".chickenInn");

if (chickenInn) {
  chickenInn.addEventListener("click", function (e) {
    window.location.href = "/chickenInn";
  });
}
})


