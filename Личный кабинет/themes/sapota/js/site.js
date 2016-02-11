$(function() {
    /*табы*/
    var tabContainers = $('div.tabs > div.bgInSerchFormWithTabs > div.innerSerchFormWithTabs > div'); // получаем массив контейнеров
    tabContainers.hide().filter(':first').show(); // прячем все, кроме первого
    // далее обрабатывается клик по вкладке
    $('div.tabs ul.tabNavigation a').click(function() {
        tabContainers.hide(); // прячем все табы
        var t = tabContainers.filter(this.hash).show(); // показываем содержимое текущего
        $('div.tabs ul.tabNavigation a').removeClass('selected'); // у всех убираем класс 'selected'
        $(this).addClass('selected'); // текушей вкладке добавляем класс 'selected'
        return false;
    }).filter(':first').click();

    //стилизация селектов
    $(function() {
        $('select').selectbox();
    })
	
    //открытие доп. информации при наведении на блок с мастерами
	$('.boxWithWizard').bind("mouseenter mouseleave", (function() {
        $(this).children('div.spoilerInfoAboutWizard').toggle();
        return false;
    }));
});

//функция на закрытие попапа "Информация сохранена"
function closeSavePopup(){
	$('.save_block_popup').fadeOut('slow');
}

//закрытие попапа выбора формы регистрации
function closeButtonRegistration(){
	$('.changeGetInto').fadeOut('slow');
}

//закрытия попапа о не выбранных услугах во вкладке Кошелек -> Услуги
function choose_service(){
	$('.buttonInfoPopup').fadeOut('slow');
}

//закрытия попапа о не выбранных услугах во вкладке Кошелек -> Пополнение
function choose_add_service(){
	$('.buttonInfoPopup').fadeOut('slow');
}

//функция определения размера экарана и центовки элемента
function sizeBody(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.registrationForm').width();
	var imageHeight = $('.registrationForm').height();
	
	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = windowHeight/2 - imageHeight/2;
	
	//присваиваем координаты картинке
	$('.registrationForm').offset({	
		top: positionY,
		left: positionX
	});
}

function sizeBodyClient(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.registrationClientForm').width();
	var imageHeight = $('.registrationClientForm').height();
	
	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = windowHeight/2 - imageHeight/2;
	
	//присваиваем координаты картинке
	$('.registrationClientForm').offset({	
		top: positionY,
		left: positionX
	});
}

//---------------------------------------------------------добавил после 14.10.15--------------------------------
//центровка формы входа
function sizeBodyInto(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.intoSiteFormWrapper').width();
	var imageHeight = $('.intoSiteFormWrapper').height();
	
	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = windowHeight/2 - imageHeight/2;
	
	//присваиваем координаты картинке
	$('.intoSiteFormWrapper').offset({	
		top: positionY,
		left: positionX
	});
}

//центровка большой картинки портфолио с описанием
function portfolioBigImg(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();
	
	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.portfolioPhotoPopUp').width();
	var imageHeight = $('.portfolioPhotoPopUp').height();
	
	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = (windowHeight/2 - imageHeight/2) + windowScroll;
	
	//присваиваем координаты картинке
	$('.portfolioPhotoPopUp').offset({	
		top: positionY,
		left: positionX
	});
}

//центровка попапа Оставить отзыв
function non_reg_user_opinion(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();

	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.non_reg_opinion_popup').width();
	var imageHeight = $('.non_reg_opinion_popup').height();

	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = (windowHeight/2 - imageHeight/2) + windowScroll;

	//присваиваем координаты картинке
	$('.non_reg_opinion_popup').offset({
		top: positionY,
		left: positionX
	});
}

//центровка попапа Отзыв зарегистрированного пользователя
function reg_user_opinion(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();

	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.reg_opinion_popup').width();
	var imageHeight = $('.reg_opinion_popup').height();

	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = (windowHeight/2 - imageHeight/2) + windowScroll;

	//присваиваем координаты картинке
	$('.reg_opinion_popup').offset({
		top: positionY,
		left: positionX
	});
}

//центровка попапа Спасибо за отзыв
function thank_you_from_opinion(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();

	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.thank_opinion_popup').width();
	var imageHeight = $('.thank_opinion_popup').height();

	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = (windowHeight/2 - imageHeight/2) + windowScroll;

	//присваиваем координаты картинке
	$('.thank_opinion_popup').offset({
		top: positionY,
		left: positionX
	});
}

//центровка попапа Записаться к мастеру
function writing_to_master_reg(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();

	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.writing_to_master_reg').width();
	var imageHeight = $('.writing_to_master_reg').height();

	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = (windowHeight/2 - imageHeight/2) + windowScroll;

	//присваиваем координаты картинке
	$('.writing_to_master_reg').offset({
		top: positionY,
		left: positionX
	});
}

//центровка попапа Записаться к мастеру без регистрации
function writing_to_master_non_reg(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();

	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.writing_to_master_non_reg').width();
	var imageHeight = $('.writing_to_master_non_reg').height();

	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = (windowHeight/2 - imageHeight/2) + windowScroll;

	//присваиваем координаты картинке
	$('.writing_to_master_non_reg').offset({
		top: positionY,
		left: positionX
	});
}

//попап забыли пароль
function forget_password(){
	//определяем размеры окна браузера
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();

	//определяем размеры картинки (бэкграунд)
	var imageWidth = $('.forget_password_popup').width();
	var imageHeight = $('.forget_password_popup').height();

	//вычисляем расстояние от краев окна браузера до центрального положения картинки
	var positionX = windowWidth/2 - imageWidth/2;
	var positionY = (windowHeight/2 - imageHeight/2) + windowScroll;

	//присваиваем координаты картинке
	$('.forget_password_popup').offset({
		top: positionY,
		left: positionX
	});
}

//окончание слова отзывы в отзывах салона
function ci(n,c){
	n=n.toString().substr(-2);
	return c[0]+((/^[0,2-9]?[1]$/.test(n))?c[2]:((/^[0,2-9]?[2-4]$/.test(n))?c[3]:c[1]));
}

//функция закрытия попапа "Пароль не верный"
function falsePassword(){
	$('.false_password').fadeOut(1000);
}

/*
function autoColumn(){
	$('.specialization_salon').addClass('two_columns').autocolumnlist({
		columns: 2,
		classname: 'grid-5'
	});
}*/
//---------------------------------------------------------END добавил после 14.10.15--------------------------------

//центровка попапа при изменении размера окна браузера
$(window).resize(function(){
	sizeBody();
	sizeBodyClient();
	sizeBodyInto();//---------------------------------------------------------добавил после 14.10.15--------------------------------
	portfolioBigImg();
	thank_you_from_opinion();
	non_reg_user_opinion();
	reg_user_opinion();
	writing_to_master_reg();
	writing_to_master_non_reg();
	forget_password();
});

window.onload = function(){
	sizeBody();
	sizeBodyClient();
	sizeBodyInto();//---------------------------------------------------------добавил после 14.10.15--------------------------------
	portfolioBigImg();
	non_reg_user_opinion();
	
	$('.opinionMasterWrapper').find('.opinionText').children().not( ':first-child' ).hide();//скрыть все отзывы кроме первого при загрузке страницы
	
	//сокращаем текст описания О себе
	var numberSymbols = 250;                                               //задаем количество символов в сокращенном тексте
	var textLength = $('.oneself').text();                                 //определяем количество символов в полном тексте
	if(textLength.length > numberSymbols){
		var shortText = textLength.slice(0, numberSymbols);                //укорачиваем текст описания до заданого количества
		var last_space = shortText.lastIndexOf(' ');                       //ищем позицию последнего пробела
		shortText = textLength.slice(0, last_space);                       //укорачиваем текст до последнего пробела
		$('.oneself').hide().after('<p class="onselfShort">' + shortText + '...</p>');
	}
}

//активируем попап "Информация сохранена"
$(document).ready(function(){
	
	$('.saveBtn').on('click', function(e){
		e.preventDefault();
		$('.save_block_popup').fadeIn('faster');
		
		setTimeout(closeSavePopup, 5000);
	});
	
	//попап при наведении мыши на статус
	$('.button.status_master').mouseover(function(){
		$('.popupWrapper').show().addClass('activePopUp');	
	});
	$('.button.status_master').mouseout(function(){
		$('.popupWrapper').hide().removeClass('activePopUp');	
	});
	
	//чекбоксы, потом перебросить в check.js
	$('.inputWithValue').on('click', function(){
		var checkdox = $(this).children('.check');

		if($(checkdox).hasClass('checked')){
				$(checkdox).removeClass('checked');
		} else {
				$(checkdox).addClass('checked');
		}
	});
	
	//активация вкладок Анкеты
	$('.personalInformation a').on('click', function(e){
		e.preventDefault();
		$('.personalInformation a').removeClass('active');
		$(this).addClass('active');
		var elemId = $(this).attr('href');
		//console.log(elemId);
		
		$('.wrapperBlocksData').children('div').hide();
		$('' + elemId + '').show();
	});
	
	//закрытие выбора района или города при клике по чекбосу с крестом
	$('.check.redChecked.close').on('click', function(){
		$(this).parents('.changeSelect').hide();
	});
	
	//активация регистрационной формы
	$('.goRegistration').on('click', function(e){
		e.preventDefault();
		$('.changeGetInto').show();
		setTimeout(closeButtonRegistration, 10000);
	});
	
	$('.continue').on('click', function(){
		if($('.inputWithValue.client span.check').hasClass('checked')){
			$("body,html").animate({
				scrollTop:0
			}, 1);
			$('.registrationClientForm_wrap').show();
			sizeBodyClient();
		} else if($('.inputWithValue.master span.check').hasClass('checked')){
			$("body,html").animate({
				scrollTop:0
			}, 1);
			$('.registrationForm_wrap').show();
			sizeBody();
		}
	})
	
//---------------------------------------------------------добавил после 14.10.15--------------------------------	
	//активация формы входа
	$('.getInto').on('click', function(){
		$('.intoSiteFormWrapper_wrap').show();
		sizeBodyInto();
	});
//---------------------------------------------------------END добавил после 14.10.15--------------------------------
	
	//переключение вкладок мастер, салон красоты
	$('.changeMasterSalon span').on('click', function(){
		$('.changeMasterSalon span.value').removeClass('red');
		$(this).siblings('.value').addClass('red');
	});
	
	//чекбоксы в форме регистрации
	$('.changeMasterSalon .inputWithValue').on('click', function(){
		var checkdox = $(this).children('.check');
		$('.changeMasterSalon .inputWithValue .check').removeClass('checked');
		
		if($(checkdox).hasClass('checked')){
				$(checkdox).removeClass('checked');
		} else {
				$(checkdox).addClass('checked');
				$(checkdox).siblings('.value').addClass('red');
				var textValue = $(checkdox).siblings('.value').text();
				console.log(textValue);
				
				if(textValue == 'мастер'){
					$('.master_salon_name').attr('placeholder','Ваше имя');
				} else {
					$('.master_salon_name').attr('placeholder','Название салона');
				}
		}
	});
	
	//закрытие формы регистрации
	/*$('.registrationForm .close_button, .registrationClientForm .close_button').on('click', function(){
		var elemClass = $(this).parent().attr('class');
		$('.' + elemClass + '_wrap').hide();
		$('.' + elemClass + '').removeAttr('style');
	});*/
	
	/*$('.portfolioPhotoPopUpWrapper .close_button').on('click', function(){
		$('.portfolioPhotoPopUpWrapper').hide();
		$('.portfolioPhotoPopUp').removeAttr('style');
	});*/
//---------------------------------------------------------END добавил после 14.10.15--------------------------------	
	
	//переключение вкладок Что мы предлагаем?, Как это работает?
	$('.whatWeOffered').on('click', function(){
		$('.descHeader span').removeClass('active');
		$(this).addClass('active');
		$('.descBody_offered').show();
		$('.descBody_work').hide();
	});
	$('.howThisWork').on('click', function(){
		$('.descHeader span').removeClass('active');
		$(this).addClass('active');
		$('.descBody_offered').hide();
		$('.descBody_work').show();
	});
	
	//переключение вкладок в попапе выбора формы регистрации
	$('.changeGetInto span').on('click', function(){
		$('.changeGetInto span.value').removeClass('red');
		$(this).siblings('.value').addClass('red');
	});
	
	//чекбоксы в попапе выбора формы регистрации
	$('.changeGetInto .inputWithValue').on('click', function(){
		var checkdox = $(this).children('.check');
		$('.changeGetInto .inputWithValue .check').removeClass('checked');
		
		if($(checkdox).hasClass('checked')){
				$(checkdox).removeClass('checked');
		} else {
				$(checkdox).addClass('checked');
				$(checkdox).siblings('.value').addClass('red');
		}
	});
	
	/*$('.readyRegBlock button').on('click', function(){
		var elem = $(this).parents('.form_block').find('.inputRegBlock input');
		if(elem.val() == ''){
			elem.text('Заполните данное поле!');
		}
	});*/
	
	$('.readyRegBlock button').on('click', function(e){
		e.preventDefault();
		$('#phoneRegSalon').parents('span').append('<div class="notReadyForm"><img src="/themes/sapota/img/corner_popup.png" alt="corner" />Заполните это поле!</div>');
	});

/*----------Прайс-лист----------*/	
	//открытие списка услуг
	$('.selectBox').on('click', function(){
		$(this).siblings('.listServicesShow').find('.addList').hide();
		if($(this).next('.listServices').hasClass('listServicesShow')){
			$(this).next('.listServices').slideUp().removeClass('listServicesShow');;
			$(this).children().children().removeClass('openList');
		} else {
			$(this).next('.listServices').slideDown().addClass('listServicesShow');
			$(this).children().children().addClass('openList');
		}	
	});
	
	//показ стоимости услуги при клике по чекбоксу
	$('.value').on('click', function(){	
		$(this).siblings('.checkk').addClass('checked');
		$(this).siblings('.addDottedBorder').show();
		if($(this).siblings('.addList').length > 0){
			$(this).siblings('.addDottedBorder').hide();
		}
		$(this).siblings('.costService').show();
		$(this).siblings('.costService').find('.showCostInput').show().val('');
		$(this).siblings('.costService').find('.activMyServButton').show();
		$(this).siblings('.costService').find('.textVal').hide();
		$(this).siblings('.addList').show().siblings('.checkk').addClass('checked');
	});
	$('.checkk').on('click', function(){
		if($(this).hasClass('checked')){
			$(this).removeClass('checked');
			$(this).siblings('.addDottedBorder').hide();
			$(this).siblings('.costService').hide();
			$(this).siblings('.costService').find('.showCostInput').hide();
			$(this).siblings('.costService').find('.activMyServButton').hide();
			$(this).siblings('.costService').find('.textVal').hide();
			$(this).siblings('.addList').hide();
		} else {
			$(this).addClass('checked');
			$(this).siblings('.addDottedBorder').show();
			if($(this).siblings('.addList').length > 0){
				$(this).siblings('.addDottedBorder').hide();
			}
			$(this).siblings('.costService').show();
			$(this).siblings('.costService').find('.showCostInput').show().val('');
			$(this).siblings('.costService').find('.activMyServButton').show();
			$(this).siblings('.costService').find('.textVal').hide();
			$(this).siblings('.addList').show();
		}
	});
	
	//показ стоимости услуги при клике на Enter и занесение данной информации в блок Мои услуги в меню слева
	$('.activMyServButton').on('click', function(e){
		e.preventDefault();
		$(this).siblings('.textVal').remove();
		var cost = $(this).siblings('.showCostInput').val();
		//console.log(cost);
		if(cost != ''){
			$(this).siblings('.showCostInput').hide();
			$(this).hide();
			var textCost = $(this).parents('.costService').append('<span class="textVal">' + cost + ' p.</span>');
			var parentText = $(this).parent('.costService').parent('.inputWithValue').find('.value').text();
			var mainParentText = $(this).parents('.addList').siblings('.value').text();
			if(mainParentText.length > 0){
				var mainParentTextLong = mainParentText + ', ';
			}else{
				var mainParentTextLong = '';
			}
		
			$('.myServicesBlock').show().append('<div class="myServicesBlockChild"><span class="check redChecked close" onClick="$(this).parent(\'.myServicesBlockChild\').remove(); var myServices = $(\'.myServicesBlock\').find(\'.myServicesBlockChild\').length; if(myServices == 0){$(\'.myServicesBlock\').hide();}"></span><div class="wrapperMyServ"><span class="textServ">' + mainParentTextLong + parentText + ':</span><br /><strong>Цена - ' + cost + ' pуб.</strong></div></div>');
		} else{
			$(this).hide();
			$(this).siblings('.showCostInput').hide();
			$(this).parents('.inputWithValue').find('.addDottedBorder').hide();
		}	
	});

	//
	$('.services > span').on('click', function(){
		if($(this).siblings('.selectBox').hasClass('.selectBox')){
			$(this).removeClass('active');
			$(this).children().removeClass('openList fa-caret-down').addClass('fa-caret-right');
			$(this).siblings('.selectBox').slideUp().removeClass('.selectBox');
			$(this).siblings('.listServices').hide();
		}else{
			$(this).addClass('active');
			$(this).children().addClass('openList fa-caret-down').removeClass('fa-caret-right');;
			$(this).siblings('.selectBox').slideDown().addClass('.selectBox');
		}
		
	})
/*----------END Прайс-лист----------*/	

/*----------скрипты для портфолио----------*/
	//закрашиваем звездочки рейтинга
	//проверяем наличие блока с рейтингом
	//var valueRating = +prompt('Значение рейтинга от 0 до 5:','');//убрать если ввод рейтинга из базы
	//if($('.ratingStarsColor').length != 0 && valueRating >=0 && valueRating <=5) {//убрать вместе с prompt, раскомментить ниже
	if($('.ratingStarsColor').length != 0) {

		$('.ratingMasterBox .ratingNumber').each(function(){
			var promptRating = $(this).data('rating');
			//var promptRating = valueRating;//убрать вместе с prompt, раскомментить выше
			var textRating = '' + promptRating + '';

			if (textRating.indexOf('.') != -1) {
				var a = textRating.replace(".", ",");
				$(this).text(a);
			}else{
				$(this).text(textRating);
			}

			if (textRating.indexOf(',') != -1) {
				var y = promptRating.replace(",", ".");
				var ratingNumber = parseFloat(y);
			}else{
				var ratingNumber = parseFloat(textRating);
			}

			var imgLength = $('.ratingStarsColorWrap').width();
			var imgOneStarLength = $('.ratingStarsOneStar').width();
			var ratingLength = (ratingNumber * imgLength) / 5;
			var ratingOneStarLength = ratingNumber * (imgOneStarLength / 5);
			if (ratingLength <= imgLength) {
				$(this).parents('.ratingMasterBox').find('.ratingStarsColor').width(ratingLength);
			} else {
				$(this).parents('.ratingMasterBox').find('.ratingStarsColor').width(imgLength);
			}

			$(this).parents('.ratingMasterBox').find('.ratingStarsOneStar').children('.ratingStarsColor').width(ratingOneStarLength);
		})
	}
	
	//закрашиваем звездочки оценки по отзыву (для всех отзывов)
	$('.opinionTextWrapper').each(function(){
		//var jobEvaluationText = $(this).find('.jobEvaluation').text(); //получаем текстовое значение оценки
		//var y = jobEvaluationText.replace(",", ".");                   //преобразуем запятую в точку
		//var evaluationNumber = parseFloat(y);                          //преобразуем текст в число

		var evaluationNumber = $(this).find('.jobEvaluation').data('evaluation');
		var imgLength = 100; //задал размер картинки принудительно, так как на момент загрузки, изображение имеет ширину = 0!!!
		var evaluationLength = (evaluationNumber * imgLength)/5;       //вычисляем длину закрашенного фона
		if(evaluationLength <= imgLength){
			$(this).find('.ratingStarsColor').width(evaluationLength);
		} else{
			$(this).find('.ratingStarsColor').width(imgLength);
		}
	});                                                 
	
	//показать полное описание О себе
	$('.showAllOnself').on('click',function(e){
		e.preventDefault();
		if($(this).text() == 'показать полностью'){
			$('.onselfShort').hide();
			$('.oneself').show();
			$(this).text('Скрыть текст');
		} else {
			$('.onselfShort').show();
			$('.oneself').hide();
			$(this).text('показать полностью');
		}
		
	});
	
	//показ стоимости дополнительных услуг
	$('.costAddServiceLink').on('click',function(e){
		e.preventDefault();
		if($('.costAddServiceBox').hasClass('showCostAddServiceBox')){
			$('.costAddServiceBox').slideUp('slow').removeClass('showCostAddServiceBox');
			$(this).text('стоимость дополнительных услуг');
		} else {
			$('.costAddServiceBox').slideDown('slow').addClass('showCostAddServiceBox');
			$(this).text('свернуть дополнительные услуги');
		}
		
	});

	//определяем количество мастеров для меню
	var defineBodyMasters = $('.salonMasterAllWrapper').find('.infoMasterWrapper.salonMaster').length;
	$('.menuSalonMasters span').text(defineBodyMasters);//подставляем полученное количество мастеров в меню

	//определяем количество фотографий в портфолио салона
	var defineSalonPortfolioPhotos = $('.salonPortfolioPhotos').find('.salonPortfolioPhotosBlock a').length;
	$('.salonPortfolioPhotosCount span').text(defineSalonPortfolioPhotos);//подставляем полученное количество

	//определяем количество фотографий в портфолио мастера салона
	var defineMasterSalonPortfolioPhotos = $('.mastersSalonPortfolioPhotos').find('.mastersSalonPortfolioPhotosBlock a').length;
	$('.mastersSalonPortfolioPhotosCount span').text(defineMasterSalonPortfolioPhotos);//подставляем полученное количество

	//подставляем полученное количество фотографий в портфолио салона и мастеров в меню
	$('.menuSalonPortfolio span').text(defineSalonPortfolioPhotos + defineMasterSalonPortfolioPhotos);
	
	//показ всех фотографий в портфолио мастера
	$('.portfolioMasterWrapper .photosPortfolio').each(function(){
		var count_photos = $(this).find('a').length;//считаем количество фотографий
		var ruCi={
			'photos':['работ','','а','ы']
		}

		$(this).parents('.portfolioMasterWrapper').find('.countPortfolioPhotosMaster').text(count_photos + ' ' + ci(count_photos,ruCi['photos']));

		for(var i = 6; i < count_photos; i++){
			$(this).find('a').eq(i).addClass('hide_photos_portfolio');
		}
		$(this).find('a.hide_photos_portfolio').wrapAll('<div class="hidePhotosBlock hidePhotosAll">');
		$('.hidePhotosBlock').hide();
	})
	$('.showAllPhotosPortfolio').on('click',function(e){
		e.preventDefault();

		var hideElement = $(this).parents('.portfolioMasterWrapper').find('.hidePhotosBlock');
		if(hideElement.hasClass('hidePhotosAll')){
			hideElement.slideDown('slow').removeClass('hidePhotosAll').addClass('allHidePhotos');
		}
		else if(hideElement.hasClass('allHidePhotos')){
			hideElement.slideUp('slow').removeClass('allHidePhotos').addClass('hidePhotosAll');
		}
	});
	
	
	//Показать все отзывы
	$('.showAllOpinion').on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('clickShowOpinion')){
			$(this).parent().siblings('.opinionText').children().not( ':first-child' ).slideUp('slow');
			$(this).text('Показать ещё');
			$(this).removeClass('clickShowOpinion');
			if($(this).siblings('span').length != 0){
				$(this).siblings('span').removeClass('clickShowOpinionArrow');
			}
		} else {
			$(this).parent().siblings('.opinionText').children().slideDown('slow');
			$(this).text('Свернуть отзывы');
			$(this).addClass('clickShowOpinion');
			if($(this).siblings('span').length != 0){
				$(this).siblings('span').addClass('clickShowOpinionArrow');
			}			
		}	
	});
	
	//Показать все районы выезда
	var showArea = false;
	$('.showAllArea').on('click', function(e){
		e.preventDefault();
		if(showArea == false){
			$(this).parent().find('.lastVisibleArea').nextAll().slideDown();
			$(this).text('Свернуть все');	
			showArea = true;
		} else {
			$(this).parent().find('.lastVisibleArea').nextAll().not($('.showAllArea')).slideUp();
			$(this).text('Показать все');
			showArea = false;
		}		
	});
	
	//Показать номер телефона
	$('.showPhoneNumberMaster').on('click', function(){
		$(this).hide();
		$(this).parents('.phoneBox').find('.phoneNumberMaster').show();
	});
/*----------END скрипты для портфолио----------*/

/*-------------анкета салона, как её видят клиенты------------------*/
	$('.menuSalonBlockPoints li').on('click', function(){
		$('.menuSalonBlockPoints li').removeClass('activePoits');
		$(this).addClass('activePoits');
	});
	
	//записаться к мастеру
	/*$('.signUpMasterButton').on('click', function(e){
		e.preventDefault();
		$('.viewAnketaMasterWrapper').show();
		$(this).parents('.viewAnketaMasterWrapper').hide();
	});*/
	
	//показать портфолио мастера салона
	$('.examplePortfolioMasterSalonWrapper').each(function(){
		var count_photos = $(this).find('a').length;//считаем количество фотографий
		var ruCi={
			'photos':['работ','','а','ы']
		}

		$(this).parents('.infoMasterWrapper').find('.countPhotosWork').text(count_photos + ' ' + ci(count_photos,ruCi['photos']));

		for(var i = 4; i < count_photos; i++){
			$(this).find('a').eq(i).addClass('hide_photos_portfolio');
		}
		$(this).find('a.hide_photos_portfolio').wrapAll('<div class="hidePhotosBlock hidePhotosAll">');
		$('.hidePhotosBlock').hide();
	});

	$('.countPortfolioMasterSalon a').on('click',function(e){
		e.preventDefault();

		var hideElement = $(this).parents('.salonMaster').find('.hidePhotosBlock');
		if(hideElement.hasClass('hidePhotosAll')){
			hideElement.slideDown('slow').removeClass('hidePhotosAll').addClass('allHidePhotos');
		}
		else if(hideElement.hasClass('allHidePhotos')){
			hideElement.slideUp('slow').removeClass('allHidePhotos').addClass('hidePhotosAll');
		}
	});
	
	//переключение вкладок меню салона
	$('.menuSalonBlockPoints li').on('click', function(){
		if($(this).hasClass('menuSalonPrice')){
			$('.salonDataMenuWrapper > div').hide();
			$('.salonPriceListWrapper').show();
		} else if($(this).hasClass('menuSalonMasters')){
			$('.salonDataMenuWrapper > div').hide();
			$('.salonMasterAllWrapper').show();
		} else if($(this).hasClass('menuSalonPortfolio')){
			$('.salonDataMenuWrapper > div').hide();
			$('.salonPortfolioWrapper').show();
		} else if($(this).hasClass('menuSalonOpinions')){
			$('.salonDataMenuWrapper > div').hide();
			$('.salonOpinionsWrapper').show();
		}
	});

	//показ стоимости услуг во вкладке прайс-лист салона
	$('.salonPriceList .costServiceBox h1').on('click', function(){
		if($(this).siblings('.costServiceMinBox').hasClass('active')){
			$(this).siblings('.costServiceMinBox').slideUp('slow');
			$(this).find('.arrow').removeClass('openList');
			$(this).siblings('.costServiceMinBox').removeClass('active');
			$(this).parents('.salonPriceList').find('.showAllPricesSalon').text('развернуть все').removeClass('activeLink');
		} else {
			$(this).siblings('.costServiceMinBox').slideDown('slow');
			$(this).find('.arrow').addClass('openList');
			$(this).siblings('.costServiceMinBox').addClass('active');
		}
	});

	//показ стоимости всех услуг во вкладке прайс-лист салона
	$('.showAllPricesSalon').on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('activeLink')){
			$(this).text('развернуть все');
			$(this).siblings('.costServiceBox').find('.costServiceMinBox').each(function(){
				$(this).slideDown('slow').removeClass('active').slideUp('slow');
			});
			$(this).siblings('.costServiceBox').find('.arrow').removeClass('openList');
			$(this).removeClass('activeLink');
		} else {
			$(this).text('свернуть все');
			$(this).siblings('.costServiceBox').find('.costServiceMinBox').each(function(){
				$(this).slideDown('slow').addClass('active');
			});
			$(this).siblings('.costServiceBox').find('.arrow').addClass('openList');
			$(this).addClass('activeLink');
		}	
	});

	//отзывы
	var reviewUserRaitingArrOne = [];
	var reviewUserRaitingArrTwo = [];
	var reviewUserRaitingArrThree = [];
	var reviewUserRaitingArrFour = [];
	var reviewUserRaitingArrFive = [];
	$('.jobEvaluation').each(function(){
		var reviewUserRaiting = $(this).data('evaluation');
		if(reviewUserRaiting == 1){
			reviewUserRaitingArrOne.push(reviewUserRaiting);
		} else if(reviewUserRaiting == 2){
			reviewUserRaitingArrTwo.push(reviewUserRaiting);
		} else if(reviewUserRaiting == 3){
			reviewUserRaitingArrThree.push(reviewUserRaiting);
		} else if(reviewUserRaiting == 4){
			reviewUserRaitingArrFour.push(reviewUserRaiting);
		} else if(reviewUserRaiting == 5){
			reviewUserRaitingArrFive.push(reviewUserRaiting);
		}
	})
	var raitingOneCount = reviewUserRaitingArrOne.length;
	var raitingTwoCount = reviewUserRaitingArrTwo.length;
	var raitingThreeCount = reviewUserRaitingArrThree.length;
	var raitingFourCount = reviewUserRaitingArrFour.length;
	var raitingFiveCount = reviewUserRaitingArrFive.length;

	$('.raitingOneCount').text(raitingOneCount);
	$('.raitingTwoCount').text(raitingTwoCount);
	$('.raitingThreeCount').text(raitingThreeCount);
	$('.raitingFourCount').text(raitingFourCount);
	$('.raitingFiveCount').text(raitingFiveCount);

	//оценка по отзывам о мастере
	$('.opinionMasterWrapper').find('.jobEvaluation').each(function(){
		var d = $(this).data('evaluation');
		$(this).text(d);
	});

	//средняя оценка по всем отзывам
	var allRatings = [];
	$('.menuSalonOpinions').on('click', function(){
		$(this).parents('.viewAnketaMasterWrapper.salon').find('.jobEvaluation').each(function(){
			var d = $(this).data('evaluation');
			$(this).text(d);
			allRatings.push(d);
		});
		var arrLength = allRatings.length;
		var zero = 0;
		for(var i = 0; i < allRatings.length; i++){
			zero += +allRatings[i];
		}
		var result = zero / arrLength;
		var resiltAround = result.toFixed(1);
		var resiltAroundLast = resiltAround.replace(".", ",");

		$('.middleRate').text(resiltAroundLast);

		var imgOneStarLength = $('.middleRateWrapper .ratingStarsOneStar').width();
		var ratingOneStarLength = resiltAround * (imgOneStarLength / 5);
		console.log(ratingOneStarLength);
		$('.middleRateWrapper').find('.ratingStarsColor').width(ratingOneStarLength);
	})

	//считаем количество отзывов
	var countOpinions = $('.opinionText').children('.opinionTextWrapper').length;
	var ruCi={
		'opinions':['отзыв','ов','','а']
	}

	$('.menuSalonOpinions span').text(countOpinions);
	$('.opinionCountText span').text(countOpinions + ' ' + ci(countOpinions,ruCi['opinions']));
	
/*-------------END анкета салона, как её видят клиенты------------------*/

/*----------сравнение мастеров-----------*/
	//выравниваем по высоте
	function sortNumber(a, b){
		return b - a;
	}

	var personal_arr = [];
	$('.compare_masterPersonalData').each(function(){
		var x = $(this).height();
		
		personal_arr.push(x);
	})
	personal_arr.sort(sortNumber)
	$('.compare_masterPersonalData').height(personal_arr[0]);
	
	//определяем и задаем высоту блокам после float для overflow:hidden
	var masterBlockHeight = $('.masterBlock').height();
	$('.chooseBlock').height(masterBlockHeight+30); //+30 завязано на значение padding .masterBlock
	$('.compareMasters').height(masterBlockHeight+30); //+30 завязано на значение padding .masterBlock
	
	//скрываем всех мастеров
	$('.compare_masterDeleteOrder a').on('click', function(e){
		e.preventDefault();
		$('.masterBlock').each(function(){
			$(this).hide();
		})
	})
	
	//скрываем мастера
	$('.compare_masterDelete').on('click', function(e){
		e.preventDefault();
		$(this).parents('.masterBlock').hide();
	})
	
	var masters_count_arr = [];
	
/*----------END сравнение мастеров-----------*/	

/*----------вкладка Кошелек----------*/
	//Пагинатор для таблицы во вкладке -> Кошелек -> История операций
	if($('#historyOperation').length != 0){
		$('#historyOperation').DataTable( {
			"pagingType": "full_numbers",
			"language": {
				"lengthMenu": "Показывать по _MENU_ позиций",
				"zeroRecords": "Извините, данных нет",
				"info": "Страница _PAGE_ из _PAGES_",
				"infoEmpty": "",
				"infoFiltered": "",
				"sSearch":"Поиск:",
				"bPaginate":"",
				"oPaginate":{
					"sFirst":"<<",
					"sLast":">>",
					"sNext":">",
					"sPrevious":"<"
				},
			}
		} );
	}


	//ставим галочки в чекбоксах и определяем сумму выбранных услуг
	var resultCostService = [];
	var resultSum = [];
	var dataResultSum = 0;
	$('.purseServiceWrap .checkService').click(function(){

		if($(this).find('.check').hasClass('checked')){
			$(this).find('.check').removeClass('checked');
			//стоимость выбранной услуги или услуг -
			var costServicesText = $(this).parents('.row').find('.descService > .serviceCost span').text();
			resultCostService.push(+(-costServicesText));
		}else{
			$(this).find('.check').addClass('checked');
			//стоимость выбранной услуги или услуг +
			var costServicesText = $(this).parents('.row').find('.descService > .serviceCost span').text();
			resultCostService.push(+costServicesText);
		}

		var result = 0;
		for(var i = 0; i < resultCostService.length; i++){
			result += resultCostService[i];
		}
		resultSum.push(result);

		var lastElem = resultSum[resultSum.length-1];

		dataResultSum = lastElem;
	})

	//количество денег в кошельке, когда данные будут тянуться из базы, убрать
	var moneyToPurseText = $('.moneyToPurse span').text();
	var moneyToPurse = +moneyToPurseText;

	//действия при клике на кнопку Продолжить во вкладке Услуги
	$(".purseServiceWrap .keepOnBtn").click(function(e){
		e.preventDefault();
		//если чекбоксы услуг пустые то выводим сообщение
		if($('.tablePurseService').find('.checked').length == 0){
			$('.purseServiceWrap .buttonInfoPopup').fadeIn('slow');
			setTimeout(choose_service, 5000);
		}
		//если сумма выбранных услуг больше суммы в кошельке сообщение о невозможности операции
		else if(dataResultSum > moneyToPurse){
			$('.tablePurseService').hide();
			$('.purseServiceWrap .buttonWrap').hide();
			$('.noMoneyPayService').show();
		}
		//иначе оплата из кошелька
		else {
			$('.tablePurseService').hide();
			$('.purseServiceWrap .buttonWrap').hide();
			$('.payChooseService').show();
			$('.valueSum').text(dataResultSum);

			//собираем названия выбранных услуг
			var nameServiceText = [];
			$(this).parents('.purseServiceWrap').find('.checked').parents('.row').find('.nameService').each(function(){
				var x = $(this).text();
				nameServiceText.push(x);
			})
			var y = nameServiceText.join(', ');
			$('.nameServicesText').text(y);
		}
	})

	//активация вкладок Кошелька
	$('.purseMenu a').on('click', function(e){
		e.preventDefault();
		$('.purseMenu a').removeClass('active');
		$(this).addClass('active');
		var elemId = $(this).attr('href');
		//console.log(elemId);
		
		$('.mainContentPurseWrapper').children('div').hide();
		$('' + elemId + '').show();
	});
	
	//кошелек, показ описания услуги
	$('.service_addDesc').each(function(){
		$(this).on('click',function(e){
			if($(this).hasClass('activeDesc')){
				e.preventDefault();
				$(this).removeClass('activeDesc').parents('.row').find('.fullDescService').hide();
				$(this).children('span').text('подробнее');
			} else {
				e.preventDefault();
				$(this).addClass('activeDesc').parents('.row').find('.fullDescService').show();
				$(this).children('span').text('свернуть');
			}
		})
	})

	//вызврат к выбору услуг, если не достаточно денег
	$('.returnChooseService a').on('click', function(e){
		e.preventDefault();
		$('.tablePurseService').show();
		$('.purseServiceWrap .buttonWrap').show();
		$('.noMoneyPayService').hide();
		$('.payChooseService').hide();
	})

	//
	$('.goAddMoney a').on('click', function(e){
		e.preventDefault();
		$('.purseMenuAddition').trigger('click');
	})

/*---------------------
вкладка Пополнение
-------------------- */
	//чекбоксы в разделе платежных систем
	$('.increasePurseWrapper .checkService').on('click', function(){
		$('.increasePurseWrapper .checkService').find('.check').removeClass('checked');
		$(this).find('.check').addClass('checked');
	})


	var resultCostService_add = [];
	var resultSum_add = [];
	var dataResultSum_add = 0;
	//чекбоксы в разделе Пополнение -> Оплатить услугу
	$('.increasePayServiceWrapper .checkService').click(function() {

		if ($(this).find('.check').hasClass('checked')) {
			$(this).find('.check').removeClass('checked');
			//стоимость выбранной услуги или услуг -
			var costServicesText = $(this).parents('.row').find('.descService > .serviceCost span').text();
			resultCostService_add.push(+(-costServicesText));
		} else {
			$(this).find('.check').addClass('checked');
			//стоимость выбранной услуги или услуг +
			var costServicesText = $(this).parents('.row').find('.descService > .serviceCost span').text();
			resultCostService_add.push(+costServicesText);
		}

		var result = 0;
		for(var i = 0; i < resultCostService_add.length; i++){
			result += resultCostService_add[i];
		}
		resultSum_add.push(result);

		var lastElem = resultSum_add[resultSum_add.length-1];

		dataResultSum_add = lastElem;
	})


	//платежные системы
	var yandex_sys = 'http://www.money.yandex.ru',
		webmoney_sys = 'http://www.webmoney.ru',
		qiwi_sys = 'http://www.qiwi.ru',
		paypal_sys = 'http://www.paypal.com',
		robokassa_sys = 'http://www.robokassa.ru',
		mastercard_sys = 'http://www.mastercard.com/ru',
		visa_sys = 'http://www.visa.com.ru';

	//действия при нажатии на кнопкку Продолжить
	$('.increasePayServiceWrapper .keepOnBtn').on('click', function(e){
		e.preventDefault();
		var textPaySys = $(this).parents('.increaseWrapper').find('.increasePurse').find('.checked').parents('.row').find('.namePaySystem').text();
		//если чекбоксы услуг пустые то выводим экран с предложением оплатить через выбранную платежную систему
		if($('.increasePurseWrapper').find('.checked').length == 0){
			$('.buttonInfoPopup').show();
			setTimeout(choose_add_service, 5000);
		}else if($('.increasePurseWrapper').find('.checked').length != 0 && $('.increasePayService').find('.checked').length != 0){
			$('.increasePayServiceWrapper').hide();
			$('.increasePurseWrapper').hide();
			$('.payService_paySystem').show();
			$('.namePaySys').text(textPaySys);
			$('.valueSum_paySystem').text(dataResultSum_add);

			if(textPaySys.indexOf('Яндекс') != -1){
				$('.namePaySystemLink').attr('href', yandex_sys);
			} else if(textPaySys.indexOf('WebMoney') != -1){
				$('.namePaySystemLink').attr('href', webmoney_sys);
			} else if(textPaySys.indexOf('QIWI') != -1){
				$('.namePaySystemLink').attr('href', qiwi_sys);
			} else if(textPaySys.indexOf('PayPal') != -1){
				$('.namePaySystemLink').attr('href', paypal_sys);
			} else if(textPaySys.indexOf('Robokassa') != -1){
				$('.namePaySystemLink').attr('href', robokassa_sys);
			} else if(textPaySys.indexOf('MasterCard') != -1){
				$('.namePaySystemLink').attr('href', mastercard_sys);
			} else if(textPaySys.indexOf('Visa') != -1){
				$('.namePaySystemLink').attr('href', visa_sys);
			}

			//собираем названия выбранных услуг
			var nameServiceText = [];
			$(this).parents('.increaseWrapper').find('.checked').parents('.row').find('.nameService').each(function(){
				var x = $(this).text();
				nameServiceText.push(x);
			})
			var y = nameServiceText.join(', ');
			$('.nameServicesText_paySystem').text(y);
		} else {
			$('.increasePayServiceWrapper').hide();
			$('.increasePurseWrapper').hide();
			$('.increasePayInfoText').show();
			$('.namePaySystemText').text(textPaySys);
			if(textPaySys.indexOf('Яндекс') != -1){
				$('.namePaySystemLink').attr('href', yandex_sys);
			} else if(textPaySys.indexOf('WebMoney') != -1){
				$('.namePaySystemLink').attr('href', webmoney_sys);
			} else if(textPaySys.indexOf('QIWI') != -1){
				$('.namePaySystemLink').attr('href', qiwi_sys);
			} else if(textPaySys.indexOf('PayPal') != -1){
				$('.namePaySystemLink').attr('href', paypal_sys);
			} else if(textPaySys.indexOf('Robokassa') != -1){
				$('.namePaySystemLink').attr('href', robokassa_sys);
			} else if(textPaySys.indexOf('MasterCard') != -1){
				$('.namePaySystemLink').attr('href', mastercard_sys);
			} else if(textPaySys.indexOf('Visa') != -1){
				$('.namePaySystemLink').attr('href', visa_sys);
			}
		}
	})

	//переход по ссылке на платежную систему при клике на кнопку Пополнить
	$('.addMoneyButton, .payOnBtn_paySystem').click(function(e){
		e.preventDefault();
		$('.namePaySystemText').trigger('click');
	})

	//вернуться к выбору платежной системы
	$('.returnChoosePaySystem a').on('click', function(e){
		e.preventDefault();
		$('.increasePayServiceWrapper').show();
		$('.increasePurseWrapper').show();
		$('.increasePayInfoText').hide();
		$('.payService_paySystem').hide();
		$('.sum_pay').val('');
	})
/*----------./вкладка Кошелек----------*/

	//открываем попап с формой для отзыва при клике по кнопке Оставить отзыв
	$('.opinionStayBtn').each(function(){
		$(this).on('click', function(e){
			e.preventDefault();
			$('.reg_opinion_popup_wrap').show();
			reg_user_opinion();
		})
	})

	//открываем Спасибо за отзыв после закрытия формы отправки отзыва
	$('.reg_opinion_popup .intoButtonBlock button').on('click', function(e){
		e.preventDefault();
		$(this).parents('.reg_opinion_popup_wrap').hide();
		$('.thank_opinion_popup_wrap').show();
		thank_you_from_opinion();
	})

	//записаться к мастеру, зарегистрированный пользователь
	$('.signUpMasterButton').each(function(){
		$(this).on('click', function(e){
			e.preventDefault();
			$('.writing_to_master_reg_wrap').show();  //.writing_to_master_non_reg_wrap - без регистрации
			writing_to_master_reg();                  //writing_to_master_non_reg(); - без регистрации
		})
	})

	//закрываем попапы
	$('.close_button').on('click',function(){
		var elemClass = $(this).parent().attr('class');
		$('.' + elemClass + '_wrap').hide();
		$('.' + elemClass + '').removeAttr('style');
	})

	//оценка качества обслуживания в попапе с отзывом зарегистрированного пользователя
	$('.rating_stars_block').mousemove(function(e){
		var x = e.offsetX==undefined?e.layerX:e.offsetX;     //получаем координату мыши по оси Х
		//var y = e.offsetY==undefined?e.layerY:e.offsetY;

		if(x < 5){
			$(this).css({
				'width':'0'
			}).attr('data-evaluation_service',0);
		} else if(x > 4 && x < 21){
			$(this).css({
				'width':'20px',
				'background-color':'#f14b00'
			}).attr('data-evaluation_service',1);
		} else if(x > 20 && x < 41){
			$(this).css({
				'width':'40px',
				'background-color':'#f14b00'
			}).attr('data-evaluation_service',2);
		} else if(x > 40 && x < 61){
			$(this).css({
				'width':'60px',
				'background-color':'#f14b00'
			}).attr('data-evaluation_service',3);
		} else if(x > 60 && x < 81){
			$(this).css({
				'width':'80px',
				'background-color':'#f14b00'
			}).attr('data-evaluation_service',4);
		} else if(x > 80){
			$(this).css({
				'width':'100px',
				'background-color':'#f14b00'
			}).attr('data-evaluation_service',5);
		}
	})
	//получаем значение оценки выставленной клиентом в отзыве
	$('.rating_stars_block').mouseout(function(){
		var evaluation_service = $(this).attr('data-evaluation_service');
		console.log(evaluation_service);
	})

	$("a[rel^='prettyPhoto']").prettyPhoto({
		animation_speed:'normal',  //скорость анимации
		theme:'design',            //тема оформления design
		slideshow:5000,            //время показа слайда
		autoplay_slideshow: false  //автоматический старт слайдшоу
	});

	//если пароль введен неправильно
	$('.intoSiteFormWrapper_wrap .intoButtonBlock button').on('click', function(){
		if($('.password_input').val() != '12345' || $('.password_input').val() != ''){  //тестовый пароль 12345
			$('.false_password').show();
			setTimeout(falsePassword, 2500);
		}
	})

	//открытие попапа Забыли пароль
	$('.forgotPassword, .false_password a').on('click', function(){
		$('.false_password').hide();
		$(this).parents('.intoSiteFormWrapper_wrap').hide();
		$('.password_input').val('');
		$('.forget_password_popup_wrap').show();
		forget_password();
	})

	//показываем, скрываем информацию о мастера во вкладке Мастера
	$('.show_full_short_info_master').on('click', function(e){
		e.preventDefault();
		if($(this).hasClass('active')){
			$(this).text('Развернуть').removeClass('active').parent().siblings().slideUp('slow');
		} else {
			$(this).text('Свернуть').addClass('active').parent().siblings().slideDown('slow');
		}
	})

	//удаляем мастера во вкладке Мастера
	$('.close_info_master').on('click', function(e){
		e.preventDefault();
		$(this).parents('.master_profile').hide();
	})

	//
	$('.list_master_salon_specializations .inputWithValue').on('click', function(){
		var add_list = $(this).siblings('ul');
		if(add_list.length != 0){
			if($(this).children('.redChecked').hasClass('checked')){
				add_list.slideDown('slow');
			} else{
				add_list.slideUp('slow');
			}
		}

	});

})
