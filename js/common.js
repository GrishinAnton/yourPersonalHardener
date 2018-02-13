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
var goalItem = $('.goal-item')

//days
var todayDay = $('.js-button-today')
var tomorrowDay = $('.js-button-tomorrow')
var afterTomorrowDay = $('.js-button-after-tomorrow')
var inMondayDay = $('.js-button-in-monday')
var gogoButton = $('.js-go-go')
var cancelButton = $('.js-cancel')

//локалсторедж
var localSName = localStorage.getItem('name')
var localSGoal = localStorage.getItem('goal')
//проверка существующих данных. При загружке страницы
if(localSName){
	inputName.val(localSName)
	$(textName).text(localSName)
}
if(localSGoal){
	inputGoal.val(localSGoal)
	$(textGoal).text(localSGoal)
}

inputName.on('input', function(){
	$(textName).text($(this).val())
	localStorage.setItem('name', $(this).val())
})
inputGoal.on('input', function(){
	$(textGoal).text($(this).val())
	localStorage.setItem('goal', $(this).val())
})


//События на кнопки
todayDay.on('click', function(){	
	new Goal(1)
	gogoButton.addClass('active')
	cancelButton.addClass('active')
})

tomorrowDay.on('click', function(){
	new Goal(24)
	gogoButton.addClass('active')
	cancelButton.addClass('active')
})

afterTomorrowDay.on('click', function(){
	new Goal(48)
	gogoButton.addClass('active')
	cancelButton.addClass('active')
})

inMondayDay.on('click', function(){
	var date = new Date
	var daynow = date.getDay()
	var hour = 0; 
	
	switch(daynow){
		case 1: 
			hour = 168
			break
		case 2: 
			hour = 144
			break
		case 3: 
			hour = 120
			break
	}

	new Goal(hour)
	gogoButton.addClass('active')
	cancelButton.addClass('active')
})


//поехали
gogoButton.on('click', function(){
	todayDay.hide()
	tomorrowDay.hide()
	afterTomorrowDay.hide()
	inMondayDay.hide()
	gogoButton.removeClass('active')
	//запускаем
	goal.start()
	goal.saveProgress()
	goal.checkInputDay()
})

//отмена
cancelButton.on('click', function(){
	goalItems.html('')
	gogoButton.removeClass('active')
	cancelButton.removeClass('active')
	todayDay.show()
	tomorrowDay.show()
	afterTomorrowDay.show()
	inMondayDay.show()
	$(inputName).val('')
	$(inputGoal).val('')	
	localStorage.clear()
})

//обработчик на родителя с дилигированием
goalItems.on('click', function(e){
	if($(e.target).closest('.goal-item').find('input').prop('checked')){
		$(e.target).closest('.goal-item').addClass('active')
		goal.saveProgress()
	}else{
		$(e.target).closest('.goal-item').removeClass('active')
	}
})


function Goal(hourInDay){
	goalItems.html('')
	this.date = Date.now()

	if(hourInDay){
		for(var i = 0; i < 21; i++){
			var number = this.date + (1000 * 60 * 60 * hourInDay)
			var currentDate = new Date(number)
			this.teamplateDate(currentDate.getDate(), this.getMonth(currentDate.getMonth()))
			hourInDay+=24
		}
	}
}


//определяем каждый раз новое время при открывании страницы
Goal.TIME = Date.now()


//определение месяца
Goal.prototype.getMonth = function(numberMonth){
	switch(numberMonth){
		case 0:
			return 'Января'
		case 1:
			return 'Февраля'
		case 2:
			return 'Марта'
	}
}
//шаблон вывода дат
Goal.prototype.teamplateDate = function(date, month){
	var teamplate = `
		<div class="goal-item" data-date="${date}">
			<label>${date} <span>${month}</span>
				<input type="checkbox" disabled>
			</label>
		</div>`
	goalItems.append(teamplate)
}


Goal.prototype.start = function(){
	var localSTime = localStorage.getItem('startTime')

	//проверка существующих данных
	if(!localSTime){
		localStorage.setItem('startTime', this.date)
	}	

}

Goal.prototype.saveProgress = function(){
	localStorage.setItem('haveProgress', 'true')
	window.onunload = function() {
		var cloneGoals = $('.goal-items').html()
	  localStorage.setItem('progress', cloneGoals)
	};
}

Goal.prototype.checkProgress = function(){
	var localSHaveProgerss = localStorage.getItem('haveProgress')	
	if(localSHaveProgerss){
		this.progress()
	}
}

Goal.prototype.progress = function(){
	goalItems.html(localStorage.getItem('progress'))
	todayDay.hide()
	tomorrowDay.hide()
	afterTomorrowDay.hide()
	inMondayDay.hide()
	cancelButton.addClass('active')

}

Goal.prototype.checkInputDay = function(){
	var localSHaveProgerss = localStorage.getItem('haveProgress')	
	if(localSHaveProgerss){
		var currentDate = new Date(Goal.TIME)
		var currentDateNumber = currentDate.getDate()
		$('.goal-item[data-date=' + currentDateNumber + ']').find('input').prop('disabled', false)
	}
	
}

var goal = new Goal()
goal.checkProgress()
goal.checkInputDay()