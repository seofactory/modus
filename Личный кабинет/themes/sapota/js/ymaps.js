function init() {
    var map = new ymaps.Map(
        "map",
        {
            center: [55.70220077737955,37.69666899999996],                              //позиция на карте
            zoom: 16,                                                                   //масштаб карты
            controls: []                                                                //отключаем элементы управления по умолчанию
        }
        ),
        metka = new ymaps.Placemark(
            [55.70220077737955,37.69666899999996],                                      //координаты метки
            {
                hintContent: '<div class="map_metka">2-й Южнопортовый проезд, 18</div>' //подпись метки
            },
            {
                iconLayout: 'default#image',                                            //запрещаем метку по умолчанию
                iconImageHref: 'themes/sapota/img/map_metka.png',                       //адрес метки
                iconImageSize: [20, 38],                                                //размер метки
                iconImageOffset: [-20, -40]                                             //позиция метки
            }
        );

    map.geoObjects.add(metka);                                                          //подключаем метку
    map.behaviors.disable('scrollZoom')                                                 //запрет масштабирования карты мышью
    map.controls.add('zoomControl', {float:'none', position:{ left: 10, top: 10}})      //кнопки масштабирования карты
}

ymaps.ready(init);