import './scss/main.scss';
import $ from "jquery";

$(document).ready(function() {
      let query = window.location.hash.substring(1);
      let vars = query.split("=");
      for (let key in vars) {
          if(key == 1){
            var pair = vars[key].split(",");
            for(let val in pair){
              $('ul.app-list').append("<li>"+pair[val]+"</li>").trigger( "create" );
            }
          }
       }
});
