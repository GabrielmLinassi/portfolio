function getQueryVariable(t){for(var c=window.location.search.substring(1).split("&"),n=0;n<c.length;n++){var e=c[n].split("=");if(e[0]==t)return e[1]}return!1}const featureTypes={new_contact:{html:"new_contact.html",css:"new_contact.css"},contact:{html:"contact.html",css:"contact.css"}},optInContact=()=>"new_contact"===getQueryVariable("ff")?"new_contact":"contact";export{optInContact,featureTypes};