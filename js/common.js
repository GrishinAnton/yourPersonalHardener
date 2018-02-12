// Toogle mnu
(function(){
	$(function(){
		$(".toggle-mnu").click(function() {
			$(this).addClass("on");
			$(".fixed-mnu").hide();
		});
	});
})();


//============
//Magnific popup
(function(){
	$(document).ready(function($) {
		$('.popup-search').magnificPopup({
		    type: 'inline'
		});
	});
})();

//=================




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
//===doIt
var inputName = $('.js-name')
var inputGoal = $('.js-input-goal')
var textName = $('.js-yourname')
var textGoal = $('.js-text-goal')
var goalItems = $('.goal-items')

//days
var todayDay = $('.js-button-today')
var tomorrowDay = $('.js-button-tomorrow')
var afterTomorrowDay = $('.js-button-after-tomorrow')
var inMondayDay = $('.js-button-in-monday')


if(localStorage.getItem('name')){
	inputName.val(localStorage.getItem('name'))
	$(textName).text(localStorage.getItem('name'))
}
inputName.on('input', function(){
	$(textName).text($(this).val())
	localStorage.setItem('name', $(this).val())
})


if(localStorage.getItem('goal')){
	inputGoal.val(localStorage.getItem('goal'))
	$(textGoal).text(localStorage.getItem('goal'))
}
inputGoal.on('input', function(){
	$(textGoal).text($(this).val())
	localStorage.setItem('goal', $(this).val())
})

todayDay.on('click', function(){
	goalItems.html('')
	var date = Date.now()
	var hour = 24; 
	for(var i = 0; i < 21; i++){
		var number = date + (1000 * 60 * 60 * hour)
		var currentDate = new Date(number)
		teamplateDate(currentDate.getDate(), getMonth(currentDate.getMonth()))
		hour+=24
	}
})


tomorrowDay.on('click', function(){
	goalItems.html('')
	var date = Date.now()
	var hour = 48; 
	for(var i = 0; i < 21; i++){
		var number = date + (1000 * 60 * 60 * hour)
		var currentDate = new Date(number)
		teamplateDate(currentDate.getDate(), getMonth(currentDate.getMonth()))
		hour+=24
	}
})

afterTomorrowDay.on('click', function(){
	goalItems.html('')
	var date = Date.now()
	var hour = 72; 
	for(var i = 0; i < 21; i++){
		var number = date + (1000 * 60 * 60 * hour)
		var currentDate = new Date(number)
		teamplateDate(currentDate.getDate(), getMonth(currentDate.getMonth()))
		hour+=24
	}
})

inMondayDay.on('click', function(){
	goalItems.html('')
	var date = new Date
	var daynow = date.getDay()
	var hour = 0; 
	
	switch(daynow){
		case 1: 
			hour = 168
			break
	}

	for(var i = 0; i < 21; i++){
		var number = Date.parse(date) + (1000 * 60 * 60 * hour)
		var currentDate = new Date(number)
		teamplateDate(currentDate.getDate(), getMonth(currentDate.getMonth()))
		hour+=24
	}
})

//обработчик на родителя с дилигированием
goalItems.on('click', function(e){
	$(e.target).closest('.goal-item').find('input').prop('disabled', false)

	if($(e.target).closest('.goal-item').find('input').prop('checked')){
		$(e.target).closest('.goal-item').addClass('active')
	}else{
		$(e.target).closest('.goal-item').removeClass('active')
	}
})


//шаблон вывода дат
function teamplateDate(date, month){
	var teamplate = `
		<div class="goal-item">
			<label>${date} <span>${month}</span>
				<input type="checkbox" disabled>
			</label>
		</div>`
	goalItems.append(teamplate)
}

//определение месяца по номерц
function getMonth(numberMonth){
	switch(numberMonth){
		case 0:
			return 'Января'
		case 1:
			return 'Февраля'
		case 2:
			return 'Марта'
	}
}

//localStorge