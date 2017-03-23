/* Nike Mens - Prototype
 *
 *	Base JS functionality
 *	
 */


/* 	Add swipe support for all mobile devices.
	This could have been done better, possibly using hammer.js for finer control. 
	But this illustrates basic functionality, and also makes the site fully responsive
*/
$(document).ready(function() {
    $("#nke-carousel").swiperight(function() {
        $(this).carousel('prev');
    });
    $("#nke-carousel").swipeleft(function() {
        $(this).carousel('next');
    });
});
