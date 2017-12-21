import './scss/main.scss';
import $ from "jquery";

$(document).ready(function () {
 
  addToTagList();

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
        var pair = vars[key].split(",");
        pair.pop();
        window.location.replace('#tags='.concat(pair));
        addToTagList();
      }
    } 
  });
});

function addToTagList() {
  $('ul.app-list').html('');
  let query = window.location.hash.substring(1);
  let vars = query.split("=");
  for (let key in vars) {
    if (key == 1) {
      var pair = vars[key].split(",");
      for (let val in pair) {
        $('ul.app-list').append("<li>" + pair[val] + "</li>").trigger("create");
      }
    }
  }
}
