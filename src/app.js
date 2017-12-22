import './scss/main.scss';
import $ from "jquery";

$(document).ready(function () {
  addToTagList();

  if ("onhashchange" in window) {
    console.log("The browser supports the hashchange event!");
  }
  else{
      console.log("The browseris not supports the hashchange event!");
    keepTrackOfHashChanges();
  }

  window.onhashchange = locationHashChanged;
  $('.add_tag input').keyup(function () {
    let empty = false;
    $('.add_tag input').each(function () {
      if ($(this).val().length == 0) {
        empty = true;
      }
    });
    if (empty) {
      $('.add_tag button').attr('disabled', 'true');
    } else {
      $('.add_tag button').removeAttr('disabled');
    }
  });

  $(".add_tag button").click(function () {
    let p = window.location.hash;
    let s = '';
    if(p.length === 0){
      p="#tags=";
    }
    if(p.slice().split("=")[1]) {
      s = ',';
    }
    let newTag = $('.add_tag input').val();
    window.location.replace(p.concat(s).concat(newTag));
    addToTagList();
  });

  $(".remove_tag button").click(function () {
    let query = window.location.hash.substring(1);
    let vars = query.split("=");
    for (let key in vars) {
      if (key == 1) {
        let pair = vars[key].split(",");
        pair.pop();
        window.location.replace('#tags='.concat(pair));
        addToTagList();
      }
    }
  });
});
function locationHashChanged() {
        addToTagList();
}
// this is function if browser is not supported onhashchange event
function keepTrackOfHashChanges () {
  let location = window.location,
    oldURL = location.href,
    oldHash = location.hash;

  setInterval(function() {
   let newURL = location.href,
     newHash = location.hash;

   if (newHash != oldHash && typeof window.onhashchange === "function") {
     window.onhashchange({
       type: "hashchange",
       oldURL: oldURL,
       newURL: newURL
     });

     oldURL = newURL;
     oldHash = newHash;
   }
 }, 100);
}
function addToTagList() {
  $('ul.app-list').html('');
  let query = window.location.hash.substring(1);
  let vars = query.split("=");
  for (let key in vars) {
    if (key == 1) {
      let pair = vars[key].split(",");
      for (let val in pair) {
        $('ul.app-list').append("<li>" + pair[val] + "</li>").trigger("create");
      }
    }
  }
}
