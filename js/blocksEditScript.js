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
			alert(1);
		}
		if ( myVal === 'option_2' ) {
			alert(2);
		}
		if ( myVal === 'option_3' ) {
			alert(3);
		}
	});




// End blocks javascript
//===============================================================
}(jQuery));
//===============================================================