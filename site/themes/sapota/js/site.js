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

    /*табы*/
    var tabContainers = $('div.tabs .search-tabs > div');
    tabContainers.hide().filter(':first').show();
    $('div.tabs ul.tab-nav a').click(function() {
        tabContainers.hide();
        tabContainers.filter(this.hash).show();
        $('div.tabs ul.tab-nav li').removeClass('selected');
        $(this).parent('li').addClass('selected');
        return false;
    }).filter(':first').click();

    //стилизация элементов формы
    $('input, select').styler();
    
    //подключаем фэнсибокс
    $(".fancybox").fancybox();
    
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
    
    //В ФОРМАХ ПОИСКА
    
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

});