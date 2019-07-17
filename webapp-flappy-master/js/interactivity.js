jQuery('#scoresbtn').on('click', function(){
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Scores'+'</p>'
  );
});

jQuery('#creditsbtn').on('click', function(){
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Credits : Alexandre Hébert'+'</p>'
  );
});


jQuery('#helpbtn').on('click', function(){
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Press SPACE to flap your wings. Avoid the pipes. If you crash, just try again!'+'</p>'
  );
});
