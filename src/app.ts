import './scss/main.scss';
import * as $ from 'jquery';

 $(() => {
  let elementHeader = $('#header');
  let elementContentHeader = $('#content_header');
  $(window).on('resize', function() {
    let headerOffset = elementHeader.offset();
    let headerHeight = elementHeader.outerHeight();
    let contentHeaderHeight = headerHeight + elementContentHeader.innerHeight();
   // let contentHeaderWidth = elementHeader.css('width');
    $(window).on('scroll', function () {
      let scrollPos = $(document).scrollTop();
      if (scrollPos > headerOffset.top) {
        elementHeader.css('position', 'fixed').css('width', '100%');
        elementContentHeader.css('height', contentHeaderHeight);
      } else {
        elementHeader.css('position', 'relative');
        elementContentHeader.css('height', '33px');
      }
      $('ul#menu li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= (scrollPos + contentHeaderHeight)) {
          $('ul#menu li').removeClass("selected");
          currLink.parent().addClass("selected");
        }
        else{
              currLink.removeClass("selected");
        }
      });
    });
  }).resize();
 });