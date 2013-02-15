// blocksEditScript.js v1.0
// 
// keep the wrapping function to use $ reference for jQuery
// as it has been removed/disabled within blocks
//===============================================================
(function($){
// Start blocks javascript
//===============================================================




	$('.choose_extras_option').change(function(){
		var myVal = $(this).find(':selected').val();
		if ( myVal === 'option_1' ) {
			$('.extra.pop').show();
			$('.extra.link').hide();
		}
		if ( myVal === 'option_2' ) {
			$('.extra.pop').hide();
			$('.extra.link').show();
		}
		if ( myVal === 'option_3' ) {
			$('.extra').hide();
		}
	});




// End blocks javascript
//===============================================================
}(jQuery));
//===============================================================