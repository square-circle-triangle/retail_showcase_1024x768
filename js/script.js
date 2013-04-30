// -------------------------- //
// WINDOW LOAD (ALL LOADED)
// -------------------------- //
$(window).load(function() {

	// ----------------------------------------
	// PRELOADER CLASS REMOVAL
	setTimeout(function(){
		if ( screensaver_bool === false ) {
			$('html').removeClass('preload'); // otherwise done in screensaver callback
		}
  	},800);
  	// timeout should be a fraction longer than css transitions
  	// or other timing event using the preload class trigger.
  	// ----------------------------------------

  	

});





// ----------------------------------- //
// SCREENSAVER HIDE CALLBACK
// ----------------------------------- //
if ( typeof screensaver !== 'undefined' ) {
	screensaver.on('hide', function() {
	 app.init();
	 setTimeout(function() {
	  	screensaver.hideLoader();
		window.location.hash = "screensaver_touched";
		$('html').removeClass('preload');
	 }, 250);
	});
}





// ----------------------------------- //
// SET EVENT TYPE (eventType_global)
// ----------------------------------- //
// we set this global variable to save
// having to do it in every function set
var eventType_global = 'click';

if ( Modernizr.touch ) {
	eventType_global = 'touchstart';
}
//------------------------------------

$('.logo_div').on (eventType_global, function(){
	window.location.href = '';
});




// ----------------------------------- //
// FORWARD LOGGING
// ----------------------------------- //
// forward is an object inserted by screener
if (typeof forward !== "undefined"){
  forward.setListener(function(id, resultCode) {
     console.error('HTTP Store and Forward completed with result: '+resultCode);
  });
}









// -------------------------- //
// MAIN APP
// -------------------------- //
if ( screensaver_bool === false ) {
	$(function(){
		app.init(); // otherwise done in screensaver callback
	});
}

var app = (function(){
	
	var _self = {};
	var reloadTimeoutRequired = false;


	function init(){
		app.preventLinks.init();
		app.main_navigation.init();
		app.top_navigation.init();
		app.swipe_gallery.init();
		app.form_navigation.init();
		app.form.init();

		// disable blanketReload if you need individual user timeout triggers
		blanketReload();
	}


	function alterAddressForReload() {
		if ( reloadTimeoutRequired === false ) {
			var myHref = window.location.href;
			if ( myHref.indexOf(('#' + eventType_global)) > -1 ) {
				reloadTimeoutRequired = true;
			} else {
				window.location = ( window.location.href + '#' + eventType_global );
				reloadTimeoutRequired = true;
			}
		}
	}


	function blanketReload() {
		// add a one off listener to indicate interaction
		// add individual calls elsewhere instead if a specific pattern is required
		$('body').one(eventType_global, function(){
			alterAddressForReload();
		});
	}



	_self = {
		init : init,
		alterAddressForReload: alterAddressForReload
	};
	return _self;
})();


// ====================================================================================

















































// ----------------------------------------------------- //
// MAIN NAVIGATION
// ----------------------------------------------------- //

app.main_navigation = (function(){
	
	var _self = {};

	// reference the top nav bar and all gallery text boxes for animation during menu reveal
	var animateItems = $('#bottom_nav_content, .bottom_nav');
	var baseBar = $('.bottom_nav_base_bar');
	var adjustmentHeight;
	var closeNavDelay = 15000;
	var closeNavTimeout;

	var navTrigger = $('#bottom_nav_trigger');
	var topNav = $('#top_nav_trigger');

	function init(){
		assessAdjustmentHeight();
		bindEvents();
	} // end init


	function assessAdjustmentHeight() {
		adjustmentHeight = '123';
		if (  $('#bottom_nav_content .menu_item').length > 3  ) {
			adjustmentHeight = '217';
		}
	}


	function bindEvents() {
		navTrigger.on(eventType_global, function() {
			var _this = $(this);
			app.feedback.go(_this);
			if ( ! _this.hasClass('open') ) {
				_this.addClass('open');
				animateItems.css('-webkit-transform', ('rotate(0deg) translate(0px, -'+adjustmentHeight+'px) scale(1) translateZ(0px)'));
				baseBar.css('-webkit-transform', ('rotate(0deg) translate(0px, -5px) scale(1) translateZ(0px)'));
				if (topNav.hasClass('open')) {
					topNav.trigger(eventType_global);
				}
				closeNavTimeout = setTimeout(function(){
					_this.trigger(eventType_global);
				},closeNavDelay);
			} else {
				clearTimeout(closeNavTimeout);
				_this.removeClass('open');
				animateItems.css('-webkit-transform', 'rotate(0deg) translate(0px, 0px) scale(1) translateZ(0px)');
				baseBar.css('-webkit-transform', ('rotate(0deg) translate(0px, 0px) scale(1) translateZ(0px)'));
			}
		});

		$('#bottom_nav_content').on(eventType_global, 'a', function(e){
			e.preventDefault();
	        var _this = $(this);
	        app.feedback.go( _this.parent() );
	        $('html').addClass('preunload');
	        var myLink = _this.attr('href');
	        setTimeout(function(){
	             window.location.href = myLink;
	        },1500);
		});

			
	
	}


	
	
	_self = {
		init : init
	};
	return _self;
})();
















// ----------------------------------------------------- //
// TOP NAVIGATION
// ----------------------------------------------------- //

app.top_navigation = (function(){
	
	var _self = {};

	// reference the top nav bar and all gallery text boxes for animation during menu reveal
	var animateItems = $('#top_nav_content, .top_nav, .text_panel');
	var adjustmentHeight;
	var closeNavDelay = 15000;
	var closeNavTimeout;

	var navTrigger = $('#top_nav_trigger');
	var bottomNav = $('#bottom_nav_trigger');


	function init(){
		assessAdjustmentHeight();
		bindEvents();
	} // end init


	function assessAdjustmentHeight() {
		adjustmentHeight = '118';
		if (  $('#top_nav_content .menu_item').length > 3  ) {
			adjustmentHeight = '212';
		}
	}


	function bindEvents() {
		navTrigger.on(eventType_global, function() {
			var _this = $(this);
			app.feedback.go(_this);
			if ( ! _this.hasClass('open') ) {
				_this.addClass('open');
				animateItems.css('-webkit-transform', ('rotate(0deg) translate(0px, '+adjustmentHeight+'px) scale(1) translateZ(0px)'));
				if (bottomNav.hasClass('open')) {
					bottomNav.trigger(eventType_global);
				}
				closeNavTimeout = setTimeout(function(){
					_this.trigger(eventType_global);
				},closeNavDelay);
			} else {
				clearTimeout(closeNavTimeout);
				_this.removeClass('open');
				animateItems.css('-webkit-transform', 'rotate(0deg) translate(0px, 0px) scale(1) translateZ(0px)');
			}
			
		});


		$('#top_nav_content').on(eventType_global, 'a', function(e){
			e.preventDefault();
	        var _this = $(this);
	        app.feedback.go( _this.parent() );
	        var myLink = _this.attr('href');
	        setTimeout(function(){
	             window.location.href = myLink;
	        },200);
		});
	}


	
	
	_self = {
		init : init
	};
	return _self;
})();

















// ----------------------------------------------------- //
// FORM NAVIGATION
// ----------------------------------------------------- //

app.form_navigation = (function(){
	
	var _self = {};

	var formTrigger	= $('#email'); // the element to trigger focus 
	var formField = $('#email'); // the field to focus
	var footerPanel = $('.footer_panel');
	var exitTriggers = $('.fade, .cancel_form_indicator');
	var formIsFocus = false;


	var adjustmentHeight;


	var topNav = $('#top_nav_trigger');
	var bottomNav = $('#bottom_nav_trigger');


	function init(){
		assessAdjustmentHeight();
		bindEvents();
	} // end init


	function assessAdjustmentHeight() {
		// adjustmentHeight = footerPanel.height();
		adjustmentHeight = 200; // The height of the android keyboard
	}


	function bindEvents() {
		formTrigger.on(eventType_global, function() {
			formIsFocus = true;

			// hide the trigger panel
			// formTrigger.hide();

			//close all the navigation menus
			if (topNav.hasClass('open')) {
				topNav.trigger(eventType_global);
			}
			if (bottomNav.hasClass('open')) {
				bottomNav.trigger(eventType_global);
			}

			// animate the panel up to avoid overlapping the android keyboard
			footerPanel.css({
				'-webkit-transform' : ('rotate(0deg) translate(0px, -'+adjustmentHeight+'px) scale(1) translateZ(0px)'),
				'height': '700px',
				'z-index': '80'
			});
			$('.fade, .cancel_form_indicator').addClass('show');
			setTimeout(function(){
				formField.focus();
			}, 900);
			
		});


		exitTriggers.on(eventType_global, function() {
			if (formIsFocus === true) {
				// show the trigger panel
				// formTrigger.show();

				// animate the panel back to its propper position
				footerPanel.css({
					'-webkit-transform' : 'rotate(0deg) translate(0px, 0px) scale(1) translateZ(0px)',
					'z-index' : '20'
				});
				$('.fade, .cancel_form_indicator').removeClass('show');
				formIsFocus = false;
				//clear the form
				formTrigger.val('');
			}
		});

	}


	
	
	_self = {
		init : init
	};
	return _self;
})();




















// ----------------------------------------------------- //
// A FAKE HOVER ACTIVE FEEDBACK 
// ----------------------------------------------------- //

app.feedback = (function(){
	
	var _self = {};


	function init(){
	
	} // end init



	function feedback(element) {
		
		element.addClass('active');
		setTimeout( function(){
			element.removeClass('active');
		}, 400 );
	}


	
	
	_self = {
		init : init,
		go : feedback
	};
	return _self;
})();














// ----------------------------------------------------- //
// PREVENT LINKING VIA CLASS
// ----------------------------------------------------- //

app.preventLinks = (function(){
	
	var _self = {};


	function init(){
		bindEvents();
	} // end init


	function bindEvents() {
		
		$('body').on(eventType_global, '.no_linking a, a.no_linking', function(event) {
			event.preventDefault();
			return;
		});

	}


	_self = {
		init : init
	};
	return _self;
})();





















// ----------------------------------------------------- //
// MAIN SWIPE GALLERY
// ----------------------------------------------------- //
app.swipe_gallery = (function(){

	var _self = {},
		gallery,
		scroller,
		current       = 0,
		max           = 0,
		autoPlayMode  = true,
		autoPlayDelay = 9000,
		autoPlayTimeout,
		restartAutoPlayTimer,
		restartAfter  = 19000,
		scrollSpeed   = 800,
		hScrollbar    = false,
		popupFocus    = false,
		infoPanel     = $('#info_panel');


	function init(){

		gallery = $('.gallery');
		
		if( gallery.length === 1 ){

			wrap  = gallery.find('.slide_wrap');
			items = gallery.find('.gallery_item');
			
			max = items.length;

			if( max > 1 ){
				wrap.css({
					width : items.length * 768 + 'px'
				});

				startIScroll();
				bindEvents();
				autoPlayTimeout = setTimeout(autoPlayer,autoPlayDelay);
			}

			setupExtraButtons();
		}
	}



	function setupExtraButtons() {
		gallery.find('.extra').each(function(i){
			var _this = $(this);
			if ( _this.find('a').attr('href') === '#' ) {
				_this.addClass('no_actions');
			}
		});
	}
	



	function bindEvents(){

		gallery.on('touchstart mousedown', function(){
			// console.log('AUTO PLAY OFF');
			autoPlayMode = false;
			clearTimeout(autoPlayTimeout);
			clearTimeout(restartAutoPlayTimer);
		}).on('touchend mouseup', function(){
			// console.log('RESTART TIMEER');
			// restartAutoPlayTimer = setTimeout(restartAutoPlay,restartAfter);
		});

		// close popup info panel event
		$('.info_panel .close, .fade').on(eventType_global, function(){
			if (popupFocus === true) {
				$('.fade').removeClass('show');
				$('.info_panel').removeClass('show').addClass('hide');
			}
		});

		gallery.on('click', '.extra.pop', function(){
			var _this = $(this);
			app.feedback.go(_this);
			popupFocus = true;
			var _this = $(this);
			populatePopup(_this);
		});


		gallery.on('click', '.left_control', function(){
			current = ( current-1 > -1 ) ? current-1 : max-1;
			scrollToPage(current);
		});

		gallery.on('click', '.right_control', function(){
			current = ( current+1 < max ) ? current+1 : 0;
			scrollToPage(current);
		});

	}


	function populatePopup(extraButtonElement) {

		var heading = extraButtonElement.find('.heading').html();
		var sub_heading = extraButtonElement.find('.sub_heading').html();
		var copy = extraButtonElement.find('.copy').html();
		var thisImg = extraButtonElement.find('img');
		var imageSrc = thisImg.attr('src');
		var imageWidth = thisImg.attr('width');
		var imageHeight = thisImg.attr('height');

		// set the info panel contents (rather slow way but should be ok)
		infoPanel.find('.heading').html(heading);
		infoPanel.find('.sub_heading').html(sub_heading);
		infoPanel.find('.copy').html(copy);
        infoPanel.find('.image_content').html(('<img src="' + imageSrc + '" width="' + imageWidth + '" height="' + imageHeight + '"/>'));

		setTimeout(function(){
			infoPanel.addClass('show').removeClass('hide');
			$('.fade').addClass('show');
		},100);
	}


	function scrollToPage(x){

		scroller.scrollToPage(x,0,scrollSpeed);
	}


	function startIScroll(){
		scroller = new iScroll(gallery[0],{
			snap       : '.gallery_item',
			momentum   : false,
			vScroll    : false,
			hScrollbar : hScrollbar
		});
	}


	function autoPlayer(){
		if( autoPlayMode ){
			// console.log('AUTOPLAYING');
			current = ( current+1 < max ) ? current+1 : 0;
			scrollToPage(current);
			autoPlayTimeout = setTimeout(autoPlayer,autoPlayDelay);
		}
	}

	function restartAutoPlay(){
		// console.log('RESTARTING AUTO PLAY');
		if( !autoPlayMode ){
			clearTimeout(restartAutoPlayTimer);
			current = $.inArray(scroller.x,scroller.pagesX) || 0;
			// console.log('starting at: '+current);
			autoPlayMode = true;
			autoPlayer();
		}
	}


	_self = {
		init : init,
		scroller : function(){ return scroller; }
	};

	return _self;

}());
































// -------------------------- //
// FORM
// -------------------------- //

app.form = (function(){

	var _self = {};
	var $form;
	var current_id;
	var eventType = 'click';

	function init(){

		//Form Validation
		$form = $("#standard_form");
		var fa = $form.find('.form_action').text();
		$form.attr('action', fa);
		fauxCheckboxes();
		fauxSelects();


		$form.find(":input").focus(function () {
		     current_id = this.id;
		});


		if($form.length === 1){
			$form.validate({
				/*
				submitHandler: function(form) {
			     $(form).ajaxSubmit();
			    },
			    */

		    	// setting this makes validation non-lazy
		        onkeyup: function(element) { $(element).valid(); },

				// Change the default error element to <em> for easy hiding with CSS if not required
				errorElement: "em",
				
				//Adds "error" class to input label
				highlight: function(element, errorClass, validClass) {
					toggleHighlight(element,errorClass,validClass,false);
					$('#submit_email').removeClass('ok');
				},
			
				//Removes "error" class to input label
				unhighlight: function(element, errorClass, validClass) {
					toggleHighlight(element,errorClass,validClass,true);
					$('#submit_email').addClass('ok');
				},

				errorPlacement: function(error, element) {
					if(element.attr('type')=='checkbox'){
						error.appendTo( element.closest('fieldset') );
					}else if(element.type=='select'){
						error.appendTo(element.parent());
					}else{
						error.appendTo(element.parent());
					}
				}

			});
		}

		$form.on('submit', function(e) {
            e.preventDefault(); // <-- important
            if ( $form.find(':input.error').length < 1 ) {
            	
              	if (typeof forward === "undefined"){
	              $(this).ajaxSubmit({
	              	dataType: 'jsonp',
	              	clearForm: true,
	              	beforeSubmit: function() {
	         		    },	
	                success: formSuccess
	              });
             }else{
                forward.send('POST', fa, $form.serialize(), '', '');
                formSuccess();
	          }
        }
      });

  } // end init
 

  function formSuccess(){
	  var thanksDiv = '<div id="thanksDiv"><div class="custom_background_color"><span>' +
	  	  					thank_you_statement +
	  	  					'</span></div></div>';

	 	$('.small_form_div').append(thanksDiv);
	 	//app.logging_stats.log('signup', $form, '');
	 
		setTimeout( function(){
		  $('#thanksDiv').remove();
		}, 3700 );
  }

	function tabToNextCapture() {
		$form.on('keydown', function(e) { 

			var code = (e.keyCode ? e.keyCode : e.which);
			if(code === 13) { //Enter keycode
			   //Do something
			}
			if(code === 9) { //Tab keycode
			   	e.preventDefault();
			   	// if ( current_id === 'first_name' ) {
			   	// 	$('#email').focus();
			   	// } else if ( current_id === 'email' ) {
			   	// 	$('#postcode').focus();
			   	// }	
			}
		});
	}



	function fauxSelects(){
		$('select.custom').not('.applied').each(function(i){
			$(this).addClass('applied').customStyle(200,20,('select_num_' + i));
		});
	}

	function fauxCheckboxes(){
		// $('.standard_form input[type="checkbox"]').each(function(i){

		// 	var c = $(this);
		// 	var cp = c.parent();
			
		// 	cp.click(function(){
		// 		if ( c.is(':checked') ) {
		// 			c.removeAttr('checked');
		// 			cp.removeClass('active');
		// 		} else {
		// 			c.attr('checked', true);
		// 			cp.addClass('active');
		// 		}
		// 	});
		// });
	}


	function toggleHighlight(element,errorClass,validClass,isValid){
		
		var type = $(element).attr('type');
		
		var classToAdd = isValid?validClass:errorClass;
		var classToRemove = isValid?errorClass:validClass;
		
		if(type === "checkbox"){
			$(element).closest("fieldset").find(".ez-checkbox").removeClass(classToRemove).addClass(classToAdd);
			$(element).closest("fieldset").find("label").removeClass(classToRemove).addClass(classToAdd);
			return;
		}
		
		if(type === "radio"){
			$(element).closest("fieldset").find(".ez-radio").removeClass(classToRemove).addClass(classToAdd);
			$(element).closest("fieldset").find("label").removeClass(classToRemove).addClass(classToAdd);
			return;
		}
		
		$(element).removeClass(classToRemove).addClass(classToAdd);
		$(element.form).find("label[for=" + element.id + "]").removeClass(classToRemove).addClass(classToAdd);
	}





	_self = {
		init            : init,
    eventType       : eventType
	};
	
	return _self;
	
})();






















// ADD CUSTOM SELECT STYLING TO JQUERY
// THIS IS MODIFIED TO AVOID USING SELECTS ON ANDROID !!!

(function($){
    $.fn.extend({
    customStyle : function(width_px, height_px, extraClass) {
        if(!$.browser.msie || ($.browser.msie&&$.browser.version>8)) {
            return this.each(function() {
                var currentSelected = $(this).find(':selected');
                var textSpan = ('<span class="customStyleSelectBoxInner">' + currentSelected.text() + '</span><div class="select_ui_element"></div>');

                var wrapElement = '<span class="customStyleSelectBox ' + extraClass + '"></span>';
                
              
                $(this).wrap(wrapElement).animate({
                	'position':'absolute',
                	'opacity': 0,
                	'filter' : 'alpha(opacity=0)',
                	'z-index' : 9
                }, 0, function(){
                	$(this).parent().prepend(textSpan);
                });

           		$(this).hide();

         });
        }
    }
    });
})(jQuery);
















// ===========================================================================================
// STATS
// ===========================================================================================



// ----------------------------------------------------- //
// LOGGING STATS
// ----------------------------------------------------- //

// app.logging_stats = (function(){
	
// 	var _self = {};


// 	function init(){
		
// 	} // end init


// 	function logDetail(detail) {
// 		sendStatsy(detail);

// 		var GA_detail = detail.replace(/\./g,'/');
// 		_gaq.push(['_trackPageview', '/' + GA_detail]);
		
// 		//_gaq.push(['_trackEvent', 'Videos', 'Play', 'Baby\'s First Birthday']);
// 	}


// 	function logStats(scope, element_1, element_2) {
// 		var data_1 = element_1.attr('data-stats');
// 		var myData = scope + '.' + data_1;
// 		if ( element_2 !== '' ) {
// 			myData += '.' + element_2.attr('data-stats');
// 		} 
// 		logDetail(myData);
// 	}

	
// 	_self = {
// 		init : init,
// 		log : logStats
// 	};
// 	return _self;
// })();
	
// app.logging_stats.log(element);





//STATSY SEND FUNCTION
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// function sendStatsy(stream) {
// 	var timenow = new Date().getTime() / 1000;
//     var statsy = 	"timestamp=" + timenow +
//     			 	"&api_key=" + statsyData.api_key +
//     				"&expires=" + statsyData.expires +
//     				"&signature=" + statsyData.signature +
//     				"&stream_prefix=" + statsyData.stream_prefix +
//     				"\=&events[][stream]=" + stream ;

//     if (typeof forward === "undefined"){
//     	// send data from browser
//     	var statsy = {"api_key":statsyData.api_key,"expires":statsyData.expires,"signature":statsyData.signature,"stream_prefix":statsyData.stream_prefix,"events":[]};
//     	statsy.events.push({stream:stream});
//      	statsy.events.push({timestamp:timenow});
//      	var site_name_filter = site_name;
// 	    if (site_name === 'firstchoicewineselectorv1' ) {
// 	    	site_name_filter = 'BurwoodEast';
// 	    }
//     	statsy.events.push({stream:('locations.' + site_name_filter + '.' + stream)});
// 	    // site_name is global variable set in head of master page
// 	    jQuery.ajax('http://statsyapp.com/api/v1/multiple_event', {data: JSON.stringify(statsy), dataType: 'json', type: 'POST', contentType: 'application/json'});
//     } else {
//     	// use screener app object to send even if offline (delayed until next online)
//     	forward.send('POST', 'http://statsyapp.com/api/v1/multiple_event', statsy, '', '');
//     }
// }







//GOOGLE ANALYTICS
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// var ga_account_string = 'UA-xxxxxxxx-x';


// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', ga_account_string]);
// _gaq.push(['_setSessionCookieTimeout', 60000]);

// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();

