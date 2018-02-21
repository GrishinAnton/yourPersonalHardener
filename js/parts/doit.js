//===doIt
var inputNameElem = $('.js-name')
var inputGoalElem = $('.js-input-goal')
var textNameElem = $('.js-yourname')
var textGoalElem = $('.js-text-goal')
var goalItemsElem = $('.goal-items')
var whenStartElem = $('.forms-button > p')
var meetElem = $('.meet-block')
var meetHideElem = $('.meet-block__button a')
var congratulationsElem = $('.goal-block--h3')



//days
var buttonToday = $('.js-button-today')
var buttonTomorrow = $('.js-button-tomorrow')
var buttonAfterTomorrow = $('.js-button-after-tomorrow')
var buttonInMonday = $('.js-button-in-monday')
var buttonGo = $('.js-go-go')
var buttonCancel = $('.js-cancel')

//локалсторедж
var localSName = localStorage.getItem('name')
var localSGoal = localStorage.getItem('goal')


//проверка существующих данных. При загружке страницы
if(localSName){
	inputNameElem.val(localSName)
	$(textNameElem).text(localSName)
}
if(localSGoal){
	inputGoalElem.val(localSGoal)
	$(textGoalElem).text(localSGoal)
}

inputNameElem.on('input', function(){
	$(textNameElem).text($(this).val())
	localStorage.setItem('name', $(this).val())
})
inputGoalElem.on('input', function(){
	$(textGoalElem).text($(this).val())
	localStorage.setItem('goal', $(this).val())
})


//События на кнопки

function onButtonClick(hour){
	return function(e){
		e.preventDefault()
		new Goal(hour)
		buttonGo.addClass('active')
		buttonCancel.addClass('active')
	}
}

var hoursToMonday = {
	'1': 168,
	'2': 144,
	'3': 120,
	'4': 96,
	'5': 72,
	'6': 48,
	'0': 24,
}

buttonToday.on('click', onButtonClick(1))
buttonTomorrow.on('click', onButtonClick(24))
buttonAfterTomorrow.on('click', onButtonClick(48))

buttonInMonday.on('click', function(e){
	e.preventDefault()
	var date = new Date
	var daynow = date.getDay()
	var hour = hoursToMonday[daynow]; 

	new Goal(hour)
	buttonGo.addClass('active')
	buttonCancel.addClass('active')
})



//поехали
buttonGo.on('click', function(e){
	e.preventDefault()
	buttonToday.hide()
	buttonTomorrow.hide()
	buttonAfterTomorrow.hide()
	buttonInMonday.hide()
	buttonGo.removeClass('active')
	whenStartElem.hide()
	//запускаем
	goal.start()
	goal.saveProgress()
	goal.checkInputDay()
})

//отмена
buttonCancel.on('click', function(e){
	e.preventDefault()
	goalItemsElem.html('')
	buttonGo.removeClass('active')
	buttonCancel.removeClass('active')
	buttonToday.show()
	buttonTomorrow.show()
	buttonAfterTomorrow.show()
	buttonInMonday.show()
	textGoalElem.text('')
	congratulationsElem.removeClass('active')
	$(inputNameElem).val('')
	$(inputGoalElem).val('')	
	localStorage.clear()
})



meetHideElem.on('click', function(e){
	e.preventDefault()
	meetElem.toggle()
	if($(this).text() == 'Скрыть'){
		$(this).text('Показать')
		localStorage.setItem('meet', 'hide')
	}else{
		$(this).text('Скрыть')
		localStorage.removeItem('meet')
	}	
})







//обработчик на родителя с дилигированием
goalItemsElem.on('change', function(e){
	if($(e.target).prop('checked')){
		$(e.target).closest('.goal-item').addClass('active')
		goal.saveProgress()
		goal.checkDoit()
	}else{
		$(e.target).closest('.goal-item').removeClass('active')
	}
})


function Goal(hourInDay){
	goalItemsElem.html('')
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
//Посмотреть (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
Goal.prototype.getMonth = function(numberMonth){
	switch(numberMonth){
		case 0:
			return 'Января'
		case 1:
			return 'Февраля'
		case 2:
			return 'Марта'
		case 3:
			return 'Апреля'
		case 4:
			return 'Мая'
		case 5:
			return 'Июня'
		case 6:
			return 'Июля'
		case 7:
			return 'Августа'
		case 8:
			return 'Сентября'
		case 9:
			return 'Октября'
		case 10:
			return 'Ноября'
		case 11:
			return 'Декабря'
		case 0:
			return 'Января'
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
	goalItemsElem.append(teamplate)
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
	goalItemsElem.html(localStorage.getItem('progress'))
	buttonToday.hide()
	buttonTomorrow.hide()
	buttonAfterTomorrow.hide()
	buttonInMonday.hide()
	whenStartElem.hide()
	buttonCancel.addClass('active')

}

Goal.prototype.checkInputDay = function(){
	var localSHaveProgerss = localStorage.getItem('haveProgress')	
	if(localSHaveProgerss){
		var currentDate = new Date(Goal.TIME)
		var currentDateNumber = currentDate.getDate()
		$('.goal-item[data-date=' + currentDateNumber + ']').find('input').prop('disabled', false)
	}
	
}

Goal.prototype.checkMeet = function(){
	var localSHaveProgerss = localStorage.getItem('meet')	
	if(localSHaveProgerss){
			meetElem.hide()
			meetHideElem.html('Показать')
	}	
}

Goal.prototype.checkDoit = function(){
	var activeItemLength = $('.goal-item.active').length
	if(activeItemLength == 21){
		congratulationsElem.addClass('active')
	}
}

var goal = new Goal()
goal.checkProgress()
goal.checkInputDay()
goal.checkMeet()
goal.checkDoit()