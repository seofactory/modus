<!doctype html>
<html>
<?php include ("blocks/head.html");?>
<body>
<?php include ("blocks/header.html");?>
<div class="layout">
  <form action="" method="">
    <!--LEFT-SIDE-->
    <div class="left-side"> 
      <!------------------------------------------------------------> 
      <!---------------ГОРИЗОНТАЛЬНАЯ ЧАСТЬ ФОРМЫ---------------> 
      <!------------------------------------------------------------>
      <div class="horizon-form clear">
        <div class="wrapper-link-map">
          <div class="txt-link-map">Искать<br>
            на карте</div>
          <div class="arrow-link-map"></div>
          <a class="link-map" href="#"></a> </div>
        <div class="tab-nav-one"> <span class="tab-title">Мастера</span>
          <div class="amount-master-salon"> Всего: 
            <!--чего всего подставляется через js, site.js--> 
            <span id="amountMaster"><i>2</i></span>, <span id="amountSalon"><i>666</i></span> </div>
        </div>
        <div class="tabs">
          <div class="box-type-1 container-tabs red-check">
            <div class="search-tabs">
              <div id="master" class="tab-conteiner">
                <ul class="list-cols-4">
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">Супер-специалист <span class="check-amount">(666)</span></span> </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="btn-right">
              <button type="submit" class="volume-btn"><span>Найти</span></button>
              <input type="reset" class="str-btn-2" value="Сброс всех фильтров">
            </div>
          </div>
        </div>
      </div>
      <!------------------------------------------------------------> 
      <!----------------------МАСТЕРА В ФИЛЬТРЕ---------------------> 
      <!------------------------------------------------------------>
      <section>
        <div class="wrapper-h">
          <h1>Мастер красоты</h1>
        </div>
        <!--сортировка-->
        <div class="sorting"> <span class="sorting-title">Сортировать</span>
          <ul>
            <!--добавляем класс .active, к параметру по которому сортируем и класс .top или .bottom-->
            <li><a class="active top" href="#">По цене <i></i></a></li>
            <li><a href="#">По опыту <i></i></a></li>
            <li><a href="#">По рейтингу <i></i></a></li>
            <li class="refresh"><a href="#">Обновить результаты</a></li>
          </ul>
        </div>
        <div class="filter-result"> 
          <!--МАСТЕР В ФИЛЬТРЕ-->
          <div class="master-box-filter container"> 
            <!--инфа о мастере слева-->
            <div class="grid-210 master-box-filter-left"> <a class="master-name" href="page-master.php">Тумбочкин Василий</a>
              <div class="master-avatar clear"> <a href="page-master.php"><img src="/php/pic.php?w=80&h=80&file=/themes/sapota/img/ex/img02.jpg" alt="" /></a>
                <ul>
                  <li>опыт: <span>5 лет</span></li>
                  <li>
                   <div class="rating-box" data-rating="3">
                       <span>рейтинг: <span class="bold rating-number"></span></span>
                       <div class="rating-stars-color stars-type-one">
                         <span class="stars-beige"></span>
                         <span class="stars-red"></span>
                       </div>
                   </div>
                  </li>
                  <li>отзывы: <span>7</span></li>
                </ul>
              </div>
              <div class="master-adds clear"> 
               <span>Россия, Москва</span> 
               <span class="subway icon"><i></i>Южная</span> 
               <span>выезд: <strong>возможен</strong></span> 
              </div>
              <div class="master-clock icon"> <i></i>
                <ul>
                  <li>пн-пт <span>09:00-18:00</span></li>
                  <li>сб-вс <span>06:00-22:00</span></li>
                </ul>
              </div>
              <div class="master-portfolio"><span>Портфолио:</span> <a id="amountPortfolio" href="page-master.php">35</a></div>
              <!--/.master-box-filter-left--> 
            </div>
            <!--инфа справа-->
            <div class="grid-350">
              <div class="master-profile">Визажист</div>
              <table class="master-services">
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
              </table>
            </div>
            <div class="grid-160 master-box-filter-links"> <a href="#" class="red-btn entry-link send-request">Записаться</a> 
              <!--под вопросом--> 
              <a href="#">Добавить к сравнению</a> <a href="#">Добавить в избранное</a> </div>
            <div class="grid-510">
              <ul class="master-box-filter-work">
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
              </ul>
            </div>
          </div>
          <!--END МАСТЕР В ФИЛЬТРЕ--> 
          <!--МАСТЕР В ФИЛЬТРЕ-->
          <div class="master-box-filter container"> 
            <!--инфа о мастере слева-->
            <div class="grid-210 master-box-filter-left"> <a class="master-name" href="page-master.php">Тумбочкин Василий</a>
              <div class="master-avatar clear"> <a href="page-master.php"><img src="/php/pic.php?w=80&h=80&file=/themes/sapota/img/ex/img02.jpg" alt="" /></a>
                <ul>
                  <li>опыт: <span>5 лет</span></li>
                  <li>
                   <div class="rating-box" data-rating="3">
                       <span>рейтинг: <span class="bold rating-number"></span></span>
                       <div class="rating-stars-color stars-type-one">
                         <span class="stars-beige"></span>
                         <span class="stars-red"></span>
                       </div>
                   </div>
                  </li>
                  <li>отзывы: <span>7</span></li>
                </ul>
              </div>              
              <div class="master-adds clear"> 
               <span>Россия, Москва</span> 
               <span class="subway icon"><i></i>Южная</span> 
               <span>выезд: <strong>возможен</strong></span> 
              </div>
              <div class="master-clock icon"> <i></i>
                <ul>
                  <li>пн-пт <span>09:00-18:00</span></li>
                  <li>сб-вс <span>06:00-22:00</span></li>
                </ul>
              </div>
              <div class="master-portfolio"><span>Портфолио:</span> <a id="amountPortfolio" href="page-master.php">35</a></div>
              <!--/.master-box-filter-left--> 
            </div>
            <!--инфа справа-->
            <div class="grid-350">
              <div class="master-profile">Визажист</div>
              <table class="master-services">
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
              </table>
            </div>
            <div class="grid-160 master-box-filter-links"> <a href="#" class="red-btn entry-link send-request">Записаться</a> 
              <!--под вопросом--> 
              <a href="#">Добавить к сравнению</a> <a href="#">Добавить в избранное</a> </div>
            <div class="grid-510">
              <ul class="master-box-filter-work">
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
              </ul>
            </div>
          </div>
          <!--END МАСТЕР В ФИЛЬТРЕ--> 
          <!--МАСТЕР В ФИЛЬТРЕ-->
          <div class="master-box-filter container"> 
            <!--инфа о мастере слева-->
            <div class="grid-210 master-box-filter-left"> <a class="master-name" href="page-master.php">Тумбочкин Василий</a>
              <div class="master-avatar clear"> <a href="page-master.php"><img src="/php/pic.php?w=80&h=80&file=/themes/sapota/img/ex/img02.jpg" alt="" /></a>
                <ul>
                  <li>опыт: <span>5 лет</span></li>
                  <li>
                   <div class="rating-box" data-rating="3">
                       <span>рейтинг: <span class="bold rating-number"></span></span>
                       <div class="rating-stars-color stars-type-one">
                         <span class="stars-beige"></span>
                         <span class="stars-red"></span>
                       </div>
                   </div>
                  </li>
                  <li>отзывы: <span>7</span></li>
                </ul>
              </div>              
              <div class="master-adds clear"> 
               <span>Россия, Москва</span> 
               <span class="subway icon"><i></i>Южная</span> 
               <span>выезд: <strong>возможен</strong></span> 
              </div>
              <div class="master-clock icon"> <i></i>
                <ul>
                  <li>пн-пт <span>09:00-18:00</span></li>
                  <li>сб-вс <span>06:00-22:00</span></li>
                </ul>
              </div>
              <div class="master-portfolio"><span>Портфолио:</span> <a id="amountPortfolio" href="page-master.php">35</a></div>
              <!--/.master-box-filter-left--> 
            </div>
            <!--инфа справа-->
            <div class="grid-350">
              <div class="master-profile">Визажист</div>
              <table class="master-services">
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
              </table>
            </div>
            <div class="grid-160 master-box-filter-links"> <a href="#" class="red-btn entry-link send-request">Записаться</a> 
              <!--под вопросом--> 
              <a href="#">Добавить к сравнению</a> <a href="#">Добавить в избранное</a> </div>
            <div class="grid-510">
              <ul class="master-box-filter-work">
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
              </ul>
            </div>
          </div>
          <!--END МАСТЕР В ФИЛЬТРЕ--> 
          <!--МАСТЕР В ФИЛЬТРЕ-->
          <div class="master-box-filter container"> 
            <!--инфа о мастере слева-->
            <div class="grid-210 master-box-filter-left"> <a class="master-name" href="page-master.php">Тумбочкин Василий</a>
              <div class="master-avatar clear"> <a href="page-master.php"><img src="/php/pic.php?w=80&h=80&file=/themes/sapota/img/ex/img02.jpg" alt="" /></a>
                <ul>
                  <li>опыт: <span>5 лет</span></li>
                  <li>
                   <div class="rating-box" data-rating="3">
                       <span>рейтинг: <span class="bold rating-number"></span></span>
                       <div class="rating-stars-color stars-type-one">
                         <span class="stars-beige"></span>
                         <span class="stars-red"></span>
                       </div>
                   </div>
                  </li>
                  <li>отзывы: <span>7</span></li>
                </ul>
              </div>              
              <div class="master-adds clear"> 
               <span>Россия, Москва</span> 
               <span class="subway icon"><i></i>Южная</span> 
               <span>выезд: <strong>возможен</strong></span> 
              </div>
              <div class="master-clock icon"> <i></i>
                <ul>
                  <li>пн-пт <span>09:00-18:00</span></li>
                  <li>сб-вс <span>06:00-22:00</span></li>
                </ul>
              </div>
              <div class="master-portfolio"><span>Портфолио:</span> <a id="amountPortfolio" href="page-master.php">35</a></div>
              <!--/.master-box-filter-left--> 
            </div>
            <!--инфа справа-->
            <div class="grid-350">
              <div class="master-profile">Визажист</div>
              <table class="master-services">
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>макияж</td>
                  <td>1000</td>
                </tr>
              </table>
            </div>
            <div class="grid-160 master-box-filter-links"> <a href="#" class="red-btn entry-link send-request">Записаться</a> 
              <!--под вопросом--> 
              <a href="#">Добавить к сравнению</a> <a href="#">Добавить в избранное</a> </div>
            <div class="grid-510">
              <ul class="master-box-filter-work">
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
                <li> <a class="fancybox" rel="group" href="/themes/sapota/img/ex/img03.jpg"><img src="/php/pic.php?w=116&h=104&file=/themes/sapota/img/ex/img03.jpg" alt="" width="116" height="104" /></a> </li>
              </ul>
            </div>
          </div>
          <!--END МАСТЕР В ФИЛЬТРЕ--> 
        </div>
        <!--показать еще-->
        <div class="link-more"><a href="#"><i></i> Показать еще</a></div>
      </section>
      <!--/.left-side--> 
    </div>
    <!--RIGHT-SIDE-->
    <div class="right-side"> 
      <!------------------------------------------------------------> 
      <!------------------ВЕРТИКАЛЬНАЯ ЧАСТЬ ФОРМЫ------------------> 
      <!------------------------------------------------------------>
      <div class="vertical-form clear box-type-2">
        <div class="vertical-form-inner">
          <div class="vertical-form-title">Вы ищете</div>
          <!--город-->
          <div class="ui-widget autocomplete form-block form-block-type-1"> 
            <!--для автозаполнения используется Autocomplete iQuery UI, подключение в site.js--> 
            <span class="for-input">Город</span>
            <label class="city-field">
              <input id="cityField"/>
              <i></i> </label>
          </div>
          <!--метро-->
          <div class="form-block form-block-type-2"> <span class="for-input">Метро</span>
            <select>
              <option>- не выбрано -</option>
              <option>станция такая-то</option>
            </select>
          </div>
          <!--выезд-->
          <div class="form-block form-block-type-2"> <span class="for-input">Выезд</span>
            <select>
              <option>Я к мастеру</option>
              <option>бла-бла</option>
            </select>
          </div>
          <!--диапозон цены-->
          <div class="form-block form-block-type-1">
            <input class="hide" type="text" id="minCost" value="0"/>
            <input class="hide" type="text" id="maxCost" value="1000"/>
            <!--для ползунка использется Slider JQuery UI, подключение в site.js--> 
            <span class="for-input">Цена, руб.</span>
            <div class="slider-mark">
              <ul class="clear">
                <li><span>0</span></li>
                <li><span>1250</span></li>
                <li><span>2500</span></li>
                <li><span>3750</span></li>
                <li><span>5000</span></li>
              </ul>
            </div>
            <div class="wrapper-slider">
              <div id="slider"></div>
            </div>
          </div>
          <!--чекбоксовое дерево-->
          <div class="checkbox-tree">
            <ul class="ul-treefree ul-dropfree">
              <li><span>Категория</span>
                <ul>
                  <li><span>Подкатегория</span>
                    <ul>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li><span>Подподкатегория</span>
                        <ul>
                          <li>
                            <label class="check">
                              <input type="checkbox">
                              <span class="check-name">пункт</span> </label>
                          </li>
                          <li>
                            <label class="check">
                              <input type="checkbox">
                              <span class="check-name">пункт</span> </label>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><span>Подкатегория</span>
                    <ul>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                    </ul>
                  </li>
                  <li><span>Подкатегория</span>
                    <ul>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">пункт</span> </label>
                  </li>
                </ul>
              </li>
              <li><span>Категория</span>
                <ul>
                  <li><span>Подкатегория</span>
                    <ul>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li><span>Подподкатегория</span>
                        <ul>
                          <li>
                            <label class="check">
                              <input type="checkbox">
                              <span class="check-name">пункт</span> </label>
                          </li>
                          <li>
                            <label class="check">
                              <input type="checkbox">
                              <span class="check-name">пункт</span> </label>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><span>Подкатегория</span>
                    <ul>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                    </ul>
                  </li>
                  <li><span>Подкатегория</span>
                    <ul>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                      <li>
                        <label class="check">
                          <input type="checkbox">
                          <span class="check-name">пункт</span> </label>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <label class="check">
                      <input type="checkbox">
                      <span class="check-name">пункт</span> </label>
                  </li>
                </ul>
              </li>
            </ul>
            <!--/.checkbox-tree--> 
          </div>
          <div class="wrapper-btn align-center">
            <button type="submit" class="volume-btn"><span>Найти</span></button>
            <input type="reset" class="str-btn-2" value="Сброс всех фильтров">
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
<?php include ("blocks/footer.html");?>
<?php include ("blocks/popup.html");?>
</body>
</html>
