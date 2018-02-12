



//Fixed mnu

// $(window).scroll(function(){
// 	var scrollTop = $(window).scrollTop(),
// 	stickyBlock = $(".breadcrambs"),
// 	position = stickyBlock.offset().top;
	
// 		$(window).on('resize', function() {
// 			position = stickyBlock.offset().top;
// 		});

// 	if(scrollTop >= position){
// 		$(".wrapper--main_mnu").css('top', '0').addClass('fixed-mnu');
// 	}
// 	if(scrollTop <= position){
// 		$(".wrapper--main_mnu").css('top', '').removeClass('fixed-mnu'); 
// 	}
// });



//Scroll
$(function(){

	//scrollToTop
	var 
		scrolllink = $('.scrolltop'),
		scrollToTop = $('.scrolltop a')

	$(window).scroll(function(){
		var scroll = $(window).scrollTop();

		if (scroll > 300){
			scrolllink.show()
		} if (scroll < 300){
			scrolllink.hide()
		}

		$('.scrolltop a').on('click', function(event){
		event.preventDefault();

		var id  = $(this).attr('href'),
		top = $(id).offset().top;
	
		$('body,html').stop(true).animate({scrollTop: top}, 1000);		

	});	

});

	//Anchor
	$('.scroll').on('click', function(event){
		event.preventDefault();

		var id  = $(this).attr('href'),
		top = $(id).offset().top;
	
	$('body,html').stop(true).animate({scrollTop: top}, 1500);

	});	
});










