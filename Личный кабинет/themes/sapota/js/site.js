$(function() {
    /*табы*/
    var tabContainers = $('div.tabs > div.bgInSerchFormWithTabs > div.innerSerchFormWithTabs > div'); // получаем массив контейнеров
    tabContainers.hide().filter(':first').show(); // прячем все, кроме первого
    // далее обрабатывается клик по вкладке
    $('div.tabs ul.tabNavigation a').click(function() {
        tabContainers.hide(); // прячем все табы
        tabContainers.filter(this.hash).show(); // показываем содержимое текущего
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

//центровка попапа при изменении размера окна браузера
$(window).resize(function(){
	sizeBody();
	sizeBodyClient();
});

window.onload = function(){
	sizeBody();
	sizeBodyClient();
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
			$('.registrationClientFormWrapper').show();
			sizeBodyClient();
		} else if($('.inputWithValue.master span.check').hasClass('checked')){
			$("body,html").animate({
				scrollTop:0
			}, 1);
			$('.registrationFormWrapper').show();
			sizeBody();
		}
	})
	
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
	$('.registrationFormWrapper .close_button').on('click', function(){
		$('.registrationFormWrapper').hide();
		$('.registrationForm').removeAttr('style');
	});
	
	$('.registrationClientFormWrapper .close_button').on('click', function(){
		$('.registrationClientFormWrapper').hide();
		$('.registrationClientForm').removeAttr('style');
	});
	
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
			$(this).next('.listServices').hide().removeClass('listServicesShow');;
			$(this).children().children().removeClass('openList');
		} else {
			$(this).next('.listServices').show().addClass('listServicesShow');
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
		
			$('.myServicesBlock').show().append('<div class="myServicesBlockChild"><span class="check redChecked close" onClick="$(this).parent(\'.myServicesBlockChild\').remove();"></span><div class="wrapperMyServ"><span class="textServ">' + mainParentTextLong + parentText + ':</span><br /><strong>Цена - ' + cost + ' pуб.</strong></div></div>');
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
			$(this).children().removeClass('openList');
			$(this).siblings('.selectBox').hide().removeClass('.selectBox');
			$(this).siblings('.listServices').hide();
		}else{
			$(this).addClass('active');
			$(this).children().addClass('openList');
			$(this).siblings('.selectBox').show().addClass('.selectBox');
		}
		
	})
/*----------END Прайс-лист----------*/	
})