import './scss/main.scss';
import $ from "jquery";

$(document).ready(function () {
  let elementHeader = $('#header');
  let elementContentHeader = $('#content_header');
  let headerOffset = elementHeader.offset();
  let headerHeight = elementHeader.outerHeight();
  let contentHeaderHeight = elementContentHeader.innerHeight();

  $(window).on('resize', function () {
    headerOffset = elementHeader.offset();
    headerHeight = elementHeader.outerHeight();
    contentHeaderHeight = elementContentHeader.innerHeight();
    // let contentHeaderWidth = elementHeader.css('width');
    addEventListener('scroll', function() {return onScroll(contentHeaderHeight);})
  }).resize();

  $(window).on('scroll', function() {return onScroll(contentHeaderHeight);});

  function onScroll(contentHeaderHeight) {
    let scrollPos = $(document).scrollTop();
    // if (scrollPos > headerOffset.top) {
    //  // elementHeader.css('position', 'fixed').css('width', '100%');
    //  // elementContentHeader.css('height', contentHeaderHeight);
    // } else {
    //  // elementHeader.css('position', 'relative');
    //   //elementContentHeader.css('height', '33px');
    // }
    $('ul#menu li a').each(function(){return defineMenuPosition($(this), scrollPos + contentHeaderHeight);});

     //smoothscroll
     $('ul#menu li a').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
      
      $('a').each(function () {
        $(this).parent().css('background', 'red');
      })
      $(this).parent().addClass('selected');
    
      let target = this.hash,
          menu = target;
      let $anchor = $(target);
      $('html, body').stop().animate({
          'scrollTop': $anchor.offset().top+contentHeaderHeight
      }, 300, 'swing', function () {
          window.location.hash = target;
          $(window).on("scroll", function(){return onScroll(contentHeaderHeight);});
      });
  });
  }

  function defineMenuPosition($t, changePosition) {
    var currLink = $t;
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= changePosition) {
      $('ul#menu li').removeClass("selected");
      currLink.parent().addClass("selected");
    }
    else {
      currLink.removeClass("selected");
    }
  }
});