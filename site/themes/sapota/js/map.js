ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
            center: [55.755773, 37.617761],
            zoom: 16,
            controls: []
        }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter());

    myMap.geoObjects.add(myPlacemark);

}