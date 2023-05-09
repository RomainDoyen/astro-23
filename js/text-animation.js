$(document).ready(function(){

  var $titres = $('#content-box-text h2'),
      $paragraphes = $('#content-box-text p'),
      index_titre = $titres.length,
      index_paragraphe = $paragraphes.length,
      i = -1,
      i2 = -1;

  function afficher(){
    if (i < index_titre -1){
      i++;
    }
    else if (i == index_titre -1){
      i = 0;
    }
    $titres[i].style.display = "block";
    $paragraphes[i].style.display = "block";
  }

  function cacher(){
    if (i2 < index_titre -1){
      i2++;
    }
    else if (i2 == index_titre -1){
      i2 = 0;
    }
    $titres[i2].style.display = "none";
    $paragraphes[i2].style.display = "none";
  }
  
  //De 0 à 8s pour combler les 8 première secondes de  setInterval//
  setTimeout(function(){
    setTimeout(afficher,0);
    setTimeout(cacher, 8000);
  }, 0);
  
  //Interval régulier de 8s//
  setInterval(function(){
    setTimeout(afficher, 0);
    setTimeout(cacher, 8000);
  }, 8000);

});

