$(document).ready(function(){
   //чекбоксовые деревья
   $(".ul-dropfree").find(" > li:has(ul)").addClass('first-category');
   var category = $(".ul-dropfree").find("li:has(ul)");
       drop = category.find(' > span');
   category.addClass('category');
   drop.append('<i class="arrow"></i>').prepend('<i class="drop"></i>');
   $(drop).click(function() {
         if ($(this).nextAll("ul").css('display')=='none') {
            $(this).nextAll("ul").slideDown(400);
            $(this).parent('li').addClass('open');
         } else {
            $(this).nextAll("ul").slideUp(400);
            $(this).parent('li').removeClass('open');
         }
	   });
	$(".ul-dropfree li:not(:has(strong))").children("ul").slideUp(400);
	$(".ul-dropfree li:not(:has(strong))").removeClass('open');
   });

$(function() {
   
     //фиксируем левый столбец в таблице
     $('#tableComparison').fixedTblHdrLftCol({
       scroll: {
         height: '100%',
         width: '770px'
       }
     });
        
    //прокручиваем таблицу    
    var maxNext = 0, step = 154, visiblePlace = 770, widthTable = $('#tableComparison').width(), maxPrev = widthTable - visiblePlace, actual, cap = $(".comparison-nav > i");
    $(".comparison-nav > .next").addClass('noactive'); 
    $(".comparison-nav > .next").click(function (){
         actual = parseFloat($('#tableComparison').css('margin-left'), 10);
         if(actual < maxNext) {
            cap.css('z-index', '99');
            $(this).removeClass('noactive');
            $(".comparison-nav > .prev").removeClass('noactive');
            $('#tableComparison').animate({"margin-left": actual + step}, 700);
         }
         else {
         $(this).addClass('noactive');
         }
       setTimeout(function() { cap.css('z-index', '0'); }, 710);
       return false;
    });
    $(".comparison-nav > .prev").click(function (){
         actual = parseFloat($('#tableComparison').css('margin-left'), 10);
         if(actual > -maxPrev) {
            cap.css('z-index', '99');
            $(this).removeClass('noactive');
            $(".comparison-nav > .next").removeClass('noactive');
            $('#tableComparison').animate({"margin-left": actual + -step}, 700);
         }
         else {
         $(this).addClass('noactive');
         }
         setTimeout(function() { cap.css('z-index', '0'); }, 710);
       return false;
    });

    //табы - вот через этот js только на главной, дальше везде табы формируются через ui tabs, на главной не факт что они вообще будут, поэтому не трогаю пока
    var tabContainers = $('div.tabs .search-tabs > div');
    tabContainers.hide().filter(':first').show();
    $('div.tabs ul.tab-nav a').click(function() {
        tabContainers.hide();
        tabContainers.filter(this.hash).show();
        $('div.tabs ul.tab-nav li').removeClass('selected');
        $(this).parent('li').addClass('selected');
        return false;
    }).filter(':first').click();

    $("#tabs").tabs();
    
    //тоггл
    $('.toggler-title').click(function(){
    var $this = $(this),
        content = $this.closest('.toggler').find('.toggler-content');
        content.toggle();
        if (content.css('display') === 'none') {
          $this.addClass('close');
        }
        else {
          $this.removeClass('close');
        }
        return false;
    }); 
    
    //типовой тогглер
    $('.toggler-simple').find('.toggler-content').hide();
    $('.toggler-simple').addClass('close');
    $('.toggler-simple .toggler-link').each(function() {
      $(this).attr('title', $(this).html());
    });
    $('.toggler-simple .toggler-link').click(function(){
    var $this = $(this),
        html = $this.attr('title'),
        parent = $this.closest('.toggler-simple'),
        content = parent.find('.toggler-content');
        if (content.css('display') === 'none') {
            parent.removeClass('close');          
            if(content.hasClass('no-animation')) {
              content.slideDown(0);  
            }
            else {
              content.slideDown(300);  
            }
            $this.empty().html('Скрыть');
        }
        else {
            parent.addClass('close');
            if(content.hasClass('no-animation')) {
              content.slideUp(0);
            }
            else {
              content.slideUp(300);
            }
            $this.empty().html(html);
        }
        return false;
    }); 
    
    //во вкладке 'прайс' в 'салоне' сворачиваем все, кроме первых дпвух
    $('#salon-price').find('.toggler').not('.toggler:lt(2)').find('.toggler-content').hide();
    //обработка кнопки 'развернуть все'
    $('.all-toggler').click(function(){
      var $this = $(this),
          togglerTitle = $('.toggler-title');
      $this.toggleClass('open');
      if($this.hasClass('open')) {
        $('.toggler-content').show();
        $this.empty().html('Свернуть все');
        togglerTitle.removeClass('close');
      }
      else {
        $('.toggler-content').hide();
        $this.empty().html('Развернуть все');
        togglerTitle.addClass('close');
      }
      return false;
    });
    
    //стилизация элементов формы
    $('input, select').styler();
    
    //маски в форме
    $('input.phone').mask('+7 (999) 999-99-99');
    
    //подключаем фэнсибокс
    $(".fancybox").fancybox();
    
    //попапы
    var popupParams = {
            closeBtn: true, 
            autoSize: false,
            fitToView: false,
            margin: 0,
            padding: 0,
            width: 'auto',
            height: "inherit",
            autoHeight: true
    };
    
    //оставить отзыв
    $('.send-review').click(function() {
      $.fancybox($('#popupReview'), popupParams);
    return false;
    });
    //записаться
    $('.send-request').click(function() {
      $.fancybox($('#popupRequest'), popupParams);
    return false;
    });
    //записаться из сравнения
    $('.send-request-compare').click(function() {
      $.fancybox($('#popupRequestCompare'), popupParams);
    return false;
    });
    
    //подсвечиваем название у чекбокса при его выборке
    $("input[type=checkbox]").change(function() {
        var $this = $(this),
            label = $(this).closest('.check');
        if ($this.prop('checked') == true) {
          label.addClass('selected');
        }
        else {
          label.removeClass('selected');  
        }
     });
     $('input:reset').click(function(){
       $(this).closest('form').find('.check').removeClass('selected');
     });
	
    //открытие доп. информации при наведении на блок с мастерами
	  $('.master-box-top').bind("mouseenter mouseleave", (function() {
        $(this).children('.master-info-spoiler').toggle();
        return false;
    }));
    
    //класс .active в меню
    $('.nav-top a').each(function() {
      var location = window.location.href;
      var link = this.href;
      if (location == link) {
          $(this).parent('li').addClass('active');
      }
    });
    
    //показать номер телефона
    $('.show-phone-number').on('click', function(){
      $(this).hide();
      $(this).parents('.phone-box').find('.phone-number').show();
      return false;
    });

   //РЕЙТИНГ 
   $(".rating-box").each(function() {         
      var $this = $(this);
          ratingNumber = $this.attr("data-rating"),
          ratingNumber = parseFloat(ratingNumber),
          ratingNumber = ratingNumber.toFixed(1),
          lengthI = $this.find(".rating-stars-color").width(),
          ratingLength = (ratingNumber * lengthI)/5,
          redStars = $this.find(".stars-red"),
          ratingText = $this.find(".rating-number");
      if (ratingLength <= lengthI) {
          redStars.width(ratingLength);
      } else {
          redStars.width(lengthI);
      }
      if(ratingText) {
         ratingText.append(ratingNumber)
      }
   });
   
    //РЕЙТИНГ В ФОРМЕ ДЛЯ ОТЗЫВА
    //если мышка в блоке со звездами, меняем ширину заполненных звезд за мышкой
    $(".rating-stars-color-link").mousemove(function(e){
       var $this = $(this),
           fullStars = $this.find(".stars-red"), 
           left = Math.round(e.pageX - $this.offset().left);
           fullStars.width(left);
       return false;
    });
    //при клике перезаписываем значение рейтинга
    $(".rating-stars-color-link").click(function(e){
       var $this = $(this),
           fullStars = $this.find(".stars-red"),   
           length = $this.width(),
           left = Math.round(e.pageX - $this.offset().left),
           ratingNumber = parseFloat(left / (length / 5)),
           ratingNumber = ratingNumber.toFixed(1);
           fullStars.width(left);
           $this.closest('.rating-box').attr('data-rating', ratingNumber);
       return false;
    });
    //при выходе мышки, выставляем значение рейтинга
    $(".rating-stars-color-link").mouseleave(function(){
       var $this = $(this),
           ratingNumber = parseFloat($this.closest('.rating-box').attr("data-rating")),
           ratingNumber = ratingNumber.toFixed(1),
           length = $this.width(),
           ratingLength = Math.round((ratingNumber * length)/5),
           fullStars = $this.find(".stars-red");
           fullStars.width(ratingLength);
       return false;  
    });
        
    //В ФОРМАХ 

    //в группе only-one-checked выбор чекбокса ограничиваем до одного
    $(".only-one-checked input[type=checkbox]").change(function() {
      var thisLabel = $(this).closest('.check'),
          thisOnlyOneCheked = $(this).closest(".only-one-checked");
          thisLabel.addClass('selected');
          thisOnlyOneCheked.find(".check").not(thisLabel).removeClass('selected');
          thisOnlyOneCheked.find("input[type=checkbox]").not(this).prop('checked', false).trigger('refresh');
    });
     
    //окончание подстраиваем при выводе количества мастеров и салонов
    function declOfNum(selector, titles) {  
      var number = selector.find('i').html();
      cases = [2, 0, 1, 1, 1, 2];    
      selector.append(titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]);
    }
    declOfNum($('#amountMaster'), [' мастер', ' мастера', ' мастеров']);
    declOfNum($('#amountSalon'), [' салон', ' салона', ' салонов']);
    declOfNum($('#amountPortfolio'), [' работа', ' работы', ' работ']);
    
    //автозаполнение
    var city = ["массив с городами", "массив с городами", "массив с городами"];
    $('#cityField').autocomplete({
        source: city
    });
    
    //диапозон цены
    var maxValueSlider = 5000, slider = $("#slider");
    slider.slider({
      min: 0,
      max: maxValueSlider,
      values: [0, maxValueSlider],
      range: true,
      tooltip: true,
      tooltipDisplay: true,
      position: {
          left: [-23,-23],
          top: [15,15]
      },
      tooltipClass: 'slider-custom',
        stop: function(event, ui) {
            $("input#minCost").val(slider.slider("values", 0));
            $("input#maxCost").val(slider.slider("values", 1));
          },
        slide: function(event, ui){  
            $("input#minCost").val(slider.slider("values", 0));
            $("input#maxCost").val(slider.slider("values", 1));
        },
        content: [
                function() {
                        return $(this).attr("data-values-0");
                },
                function() {
                        return $(this).attr("data-values-1");
                }
        ]
    });
    $("input#minCost").change(function(){
      var value1 = $("input#minCost").val(), value2 = $("input#maxCost").val();
        if(parseInt(value1) > parseInt(value2)){
        value1 = value2;
        $("input#minCost").val(value1);
      }
      $("#slider").slider("values", 0, value1);	
    });
    $("input#maxCost").change(function(){
      var value1 = $("input#minCost").val(), value2 = $("input#maxCost").val();
      if (value2 > maxValueSlider) { value2 = maxValueSlider; $("input#maxCost").val(maxValueSlider)}
      if(parseInt(value1) > parseInt(value2)){
        value2 = value1;
        $("input#maxCost").val(value2);
      }
      $("#slider").slider("values", 1, value2);
    });
    
    //обработка кнопки сброса в боковом фильтре (сбрасываем диапозон цен)
    $('.vertical-form').click(function(){
      slider.slider({
        min: 0,
        max: maxValueSlider,
        values: [0, maxValueSlider]
      });
    $('#ui-tooltip-0').css('left', -30);
    $('#ui-tooltip-1').css('left', 169);
    $('#ui-tooltip-0 .ui-tooltip-content').html(0);
    $('#ui-tooltip-1 .ui-tooltip-content').html(maxValueSlider);
    $('.sorting-prompt').removeClass('active'); 
    });

    //всплывашка в боковом фильтре
    $('.vertical-form input:checkbox').change(function(){
      if($('.vertical-form input:checkbox:checked').length >= 1){
        var top = $(this).offset().top - $('.vertical-form').offset().top,
            sortingPrompt = $('.sorting-prompt');
        sortingPrompt.addClass('active').css('top', top);
        sortingPrompt.find('button').click(function(){
          $('.sorting-prompt').removeClass('active'); 
          return false;
        });
      }
      else {
        $('.sorting-prompt').removeClass('active'); 
      }
    });
    
});