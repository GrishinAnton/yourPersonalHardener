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


inputName.on('input', function(){
	$(textName).text($(this).val())
	localStorage.setItem('name', $(this).val())
})

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
		goalItems.append('<li>' + currentDate.getDate()  + '</li>')
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
		goalItems.append('<li>' + currentDate.getDate()  + '</li>')
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
		goalItems.append('<li>' + currentDate.getDate()  + '</li>')
		hour+=24
	}
})



/*
1. Нам нужно определить день
2. Создать 21 разметку
  кол-во дней в месяце миинус начальная дата
	2.1 Если с начальной даты до конца месяца меньше дней,
	 то остаток надо взять в следующем месяце получается
3. Заполнить датами начиная с выбранного дня
*/
