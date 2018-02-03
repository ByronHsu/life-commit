$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd =
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
      if (callback) {
        callback();
      }
    });
    return this;
  },
});

var arr = document.querySelectorAll('.timeline-content');
for (let i = 0; i < arr.length; i++) {
  if (i % 2 == 0) arr[i].className = 'timeline-content';
  else arr[i].className = 'timeline-content right';
}
