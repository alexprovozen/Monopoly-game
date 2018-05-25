$(function() {

var cellWidth = $('.cell').width();
$('.cell-horizontal').css('height', cellWidth);
$('.cell-horizontal-big').css('height', cellWidth*1.5);

$(window).on('resize', function() {
	cellWidth = $('.cell').width();
	$('.cell-horizontal').css('height', cellWidth);
	$('.cell-horizontal-big').css('height', cellWidth*1.5);
});
});
