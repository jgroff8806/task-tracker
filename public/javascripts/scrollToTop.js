$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    // Fade in the arrow
    $("#return-to-top").fadeIn(200);
  } else {
    // Else fade out the arrow
    $("#return-to-top").fadeOut(200);
  }
});
$("#return-to-top").click(function() {
  // When arrow is clicked
  $("body,html").animate(
    {
      // Scroll to top of body
      scrollTop: 0
    },
    500
  );
});
