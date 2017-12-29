import './scss/main.scss';
import $ from "jquery";

$(document).ready(function () {
  let elementHeader = $('#header');
  let elementContentHeader = $('#content_header');
  let headerOffset = elementHeader.offset();
  let headerHeight = elementHeader.outerHeight();
  let contentHeaderHeight = elementContentHeader.innerHeight();

  if ("onhashchange" in window) {
    console.log("The browser supports the hashchange event!");
  }
  else {
    console.log("The browseris not supports the hashchange event!");
    //keepTrackOfHashChanges();
  }

  $(window).on('hashchange', function () {
    let target = location.hash;
    if (target) {
       return goToSection(target, event);
    }
    //  console.log(target);
    //   console.log($('ul#menu li a'));
    //  console.log($('ul#menu li a[href="'+target+'"]'));//
   // $('ul#menu li a[href="'+target+'"]').trigger('click');
  });

  $(window).on('resize', function () {
    headerOffset = elementHeader.offset();
    headerHeight = elementHeader.outerHeight();
    contentHeaderHeight = elementContentHeader.innerHeight();
    // let contentHeaderWidth = elementHeader.css('width');
    addEventListener('scroll', function () { return onScroll(contentHeaderHeight); })
  }).resize();

  $(window).on('scroll', function () {return onScroll(contentHeaderHeight);});

  $('ul#menu li a').on('click', function () {return goToSection(this.hash, event) });
});

function onScroll(contentHeaderHeight) {
  let scrollPos = $(document).scrollTop();
  // if (scrollPos > headerOffset.top) {
  //  // elementHeader.css('position', 'fixed').css('width', '100%');
  //  // elementContentHeader.css('height', contentHeaderHeight);
  // } else {
  //  // elementHeader.css('position', 'relative');
  //   //elementContentHeader.css('height', '33px');
  // }
  $('ul#menu li a').each(function () {
    return defineMenuPosition($(this), scrollPos + contentHeaderHeight);
  });
}

//smoothscroll
function goToSection(target, e) {
  e.preventDefault();
  console.log(e);
  $(document).off("scroll");
  // let target = this.hash;
  let menu = target;
  let $anchor = $(target);
  $('html, body').stop().animate({ 'scrollTop': $anchor.offset().top - 210 }, 500, 'swing', function () {
    $(window).on("scroll", function () { return onScroll(210); });
  });
}

function defineMenuPosition($this, changePosition) {
  var refElement = $($this.attr("href"));
  if (changePosition < refElement.position().top && refElement.attr('id') === 'section_1') {
    $this.parent().addClass("selected");
  }
  else if (refElement.position().top <= changePosition && refElement.position().top + refElement.height() > changePosition) {
    $('ul#menu li').removeClass("selected");
    $this.parent().addClass("selected");
  }
  else {
    $this.parent().removeClass("selected");
  }
}

function locationHashChanged() {
  console.log('lalalalas');
}