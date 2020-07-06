function init() {
  var $timeline_block = $(".timeline__block");

  //hide timeline blocks which are outside the viewport
  $timeline_block.each(function () {
    if (
      $(this).offset().top >
      $(window).scrollTop() + $(window).height() * 0.75
    ) {
      $(this)
        .find(".timeline__img, .cd-timeline-content")
        .addClass("is-hidden");
    }
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on("scroll", function () {
    $timeline_block.each(function () {
      if (
        $(this).offset().top <=
          $(window).scrollTop() + $(window).height() * 0.75 &&
        $(this).find(".timeline__img").hasClass("is-hidden")
      ) {
        $(this)
          .find(".timeline__img, .cd-timeline-content")
          .removeClass("is-hidden")
          .addClass("bounce-in");
      }
    });
  });
}

window.addEventListener("load", init);
