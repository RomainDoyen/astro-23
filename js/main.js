// Menu en accordéon //

$(document).ready(function() {
  $('.accordion-toggle').on('click', function(event){
    event.preventDefault();

    var accordion = $(this),
        accordionContent = accordion.next('.accordion-content'),
        accordionToggleIcon = $(this).children('.toggle-icon');

    accordion.toggleClass("open");

    accordionContent.slideToggle(250);

    if (accordion.hasClass("open")) {
      accordionToggleIcon.html("<i class='fa fa-minus-circle'></i>");
    } 
    else {
      accordionToggleIcon.html("<i class='fa fa-plus-circle'></i>");
    }
  });
});


// btn_up //

$(function(){
  $('#btn_up').click(function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
  });

  $(window).scroll(function(){
    if ($(window).scrollTop()<200) {
      $('#btn_up').fadeOut();
    } 
    else {
      $('#btn_up').fadeIn();
    }
  });
});


// Formulaire de contact //

(function() {

//----------------------Fenêtre modal-------------------- //

  
  var trigger = document.getElementById('contact'),
      modal = document.getElementById('modal'),
      btn = document.getElementById('close-modal');

  function afficher(element) {
    element.classList.add('is-visible');
  }

  function masquer(element) {
    element.classList.remove('is-visible');
  }

  trigger.addEventListener('click', function() {
    afficher(modal);
  });

  btn.addEventListener('click', function() {
    masquer(modal);
  });


//---------------------Variable pour la vérification du formulaire--------------//

  
  var $nom = $('#nom'),
      $prenom = $('#prenom'),
      $area = $('#area'),
      $email = $('#email'),
      $envoyer = $('#envoyer'),
      $reset = $('#rafraichir'),
      $formulaire = $('.formu'),
      boucle = 0,
      boucle_éclairage = 0,
      str2 = "@",
      index,
      debut_slice,
      decoupe_string,
      chaine_caracteres1 = 'gmail.com',//entrer un de ces 4 apres @ //
      chaine_caracteres2 = 'outlook.fr',
      chaine_caracteres3 = 'sfr.fr',
      chaine_caracteres4 = 'yahoo.fr';
 

//----------------Méthode-écoute-du-clavier-----------------------------------------------------------//


  $formulaire.keyup(function(){
    if ($(this).val().replace(/ /g,"").length < 3){ 
      $(this).css({
        borderColor : 'red',
        color : 'red'
      });
	  }
    else {
      $(this).css({
        borderColor: 'green',
        color: 'green'
      });
    }
  });
  
  $email.keyup(function(){
    if($(this).val().indexOf(str2) == -1){
  		$(this).css({
  			borderColor : 'red',
  			color : 'red'
  		});
  	} 
  });


//-----------L'éclairage-du-bouton-envoyer--------------------------------------------------------// 


  function eclairage_envoyer(formulaire){
    if ((formulaire.val() == "") || (formulaire.val().replace(/ /g,"").length < 3)){ 
      boucle_éclairage -= 1;
    } 
    else {
    	boucle_éclairage += 1;
    }
  }

  function eclairage_envoyer_verifier_email_signe(email){
	  if (email.val().indexOf(str2) == -1){
  	  boucle_éclairage -= 1;
  	}
  	else {
  		boucle_éclairage += 1;
  	}
  }
  
  function eclairage_envoyer_apres_signe_email(){
	  var index = $email.val().search("@");
	  var debut_slice = index + 1;
    var decoupe_string = $email.val().slice(debut_slice);
	  switch (decoupe_string) 
    {
		  case chaine_caracteres1:
			  boucle_éclairage += 1;
	    break;
		  
      case chaine_caracteres2:
		    boucle_éclairage += 1;
		  break;
		
      case chaine_caracteres3:
		    boucle_éclairage += 1;
		  break;
		
      case chaine_caracteres4:
		    boucle_éclairage += 1;
		  break;
		  
      default:
			  boucle_éclairage -= 1;
			  $email.css("color", "red");
      break;
		}
  }

  function execution_eclairage_envoyer(){
  	eclairage_envoyer($nom);
  	eclairage_envoyer($prenom);
  	eclairage_envoyer($email);
  	eclairage_envoyer_verifier_email_signe($email);
  	eclairage_envoyer($area);
  	eclairage_envoyer_apres_signe_email();//Extensions:gmail.com....//
  	if (boucle_éclairage == 6){
  		$envoyer.css({
  			color : 'green',
  			transition : '2s'
		  });
  	} 
  	else {
  		$envoyer.css("color", "red");
  	}
  	boucle_éclairage = 0;
  }
  setInterval(execution_eclairage_envoyer, 0.1);


//------------------Vérification-du-formulaire------------------------------------------------------------//


  function verifier(formulaire){
    if ((formulaire.val() == "") || (formulaire.val().replace(/ /g,"").length < 3)){ // 2x car si on oublie de remplire un champ la couleur va rester neutre(noire) et l'orsque on click sur envoyer la couleur deviendra rouge pour indiquer le champ vide
    	boucle -= 1;
    	formulaire.css({ 
          borderColor : 'red',
          color : 'red'
      });
    } 
    else {
    	boucle += 1;
    }
  }

  function verifier_email_signe(email){
  	if(email.val().indexOf(str2) == -1){
  		boucle -= 1;
  		email.css({
  			borderColor : 'red',
  			color : 'red'
  		});
  	} 
  	else {
  		boucle += 1;
  	}
  }

  function verifier_extension_apres_signe_email(){
	  var index = $email.val().search("@");
	  var debut_slice = index + 1;
    var decoupe_string = $email.val().slice(debut_slice);
	  switch (decoupe_string) 
    {
		  case chaine_caracteres1:
			  boucle += 1;
		  break;
		  
      case chaine_caracteres2:
			  boucle += 1;
		  break;
		  
      case chaine_caracteres3:
			  boucle += 1;
		  break;
		
      case chaine_caracteres4:
			  boucle += 1;
		  break;
		 
      default:
			  boucle -= 1;
			  $email.css({
  				borderColor : 'red',
  				color : 'red'
  		  });
	    break;
    }
  }

  $envoyer.click(function(event){
    event.preventDefault(); 
   	verifier($nom);
    verifier($prenom);
    verifier($email);
    verifier_email_signe($email);
    verifier($area);
    verifier_extension_apres_signe_email();
    if (boucle == 6){
    	alert("Envoi réussi");
    } 
    else {
    	alert("Erreur d'envoi vous avez mal remplie le formulaire");
    }
    boucle = 0;
  });


//--------------Reset-du-formulaire---------------//


  $reset.click(function(){
    $formulaire.css({ 
    	borderColor : '#000',
    	color : '#555'
    });
  });

})();


// Mentions légales liens //

(function() {

//----------------------Fenêtre modal-------------------- //

  
  var trigger = document.getElementById('legale'),
      modal = document.getElementById('modal_2'),
      btn = document.getElementById('close-modal_2');

  function afficher(element) {
    element.classList.add('is-visible');
  }

  function masquer(element) {
    element.classList.remove('is-visible');
  }

  trigger.addEventListener('click', function() {
    afficher(modal);
  });

  btn.addEventListener('click', function() {
    masquer(modal);
  });

})();
