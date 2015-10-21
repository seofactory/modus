<!doctype html>
<html>
<?php include ("blocks/head.html");?>
<body>
  <?php include ("blocks/header-main.html");?>
  <div class="layout layout-main-page"> 
    <!--ФОРМА ПОИСКА ПО ГОРОДУ И МАСТЕРУ--> 
    <div class="serch-short clear">
      <form class="form-search-short">
        <div class="box-select">
          <div class="title-select">Я ищу</div>
          <select>
            <option>Мастера/услугу</option>
            <option>Бла-бла</option>
          </select>
        </div>
        <div class="box-select">
          <div class="title-select">в городе</div>
          <select>
            <option>Выбрать город/страну</option>
            <option>Бла-бла</option>
          </select>
        </div>
        <button type="submit" class="str-btn">Найти!</button>
      </form>
    </div>
    <a href="#" class="serch-idea"><i></i>Поиск идеи</a> 
    <div class="horizon-form-main clear"> 
      <!--МАСТЕРА. ПРОБЛЕМЫ. УСЛУГИ--> 
      <form action="">
        <div class="tabs">
        <!--НАВИГАЦИЯ ПО ВКЛАДКАМ-->
        <ul class="tab-nav">
          <li><a class="" href="#master">Мастера</a></li>
          <li><a class="" href="#problems">Проблемы</a></li>
          <li><a class="" href="#serveses">Услуги</a></li>
        </ul>
        <div class="box-type-1 container-tabs red-check">
          <div class="search-tabs"> 
            <!--ВКЛАДКА ПЕРВАЯ. МАСТЕРА-->
            <div id="master" class="tab-conteiner"> 
              <ul class="list-cols-5">
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="name">Супер-специалист</span>
                </label>
                </li>
                <li>
                <label class="check"> 
                  <input type="checkbox">
                  <span class="check-name">Супер-специалист</span>
                </label>
                </li>
              </ul>
            </div>
            <!--ВКЛАДКА ВТОРАЯ. ПРОБЛЕМЫ-->
            <div id="problems" class="tab-conteiner"> Проблемы
              <div class="clear"></div>
              <!--/#problems--> 
            </div>
            <!--ВКЛАДКА ТРЕТЬЯ. УСЛУГИ-->
            <div id="serveses" class="tab-conteiner"> услуги
              <div class="clear"></div>
              <!--/#serveses--> 
            </div>
          </div>
          <div class="btn-right">
            <button type="submit" class="volume-btn"><span>Найти</span></button>
            <input type="reset" class="str-btn-2" value="Сброс всех фильтров">
          </div>
        </div>
        <!--/.tabs-->
      </form>
    </div>
    <div class="wrapper-link-map">
      <div class="txt-link-map">Искать<br>
        на карте</div>
      <div class="arrow-link-map"></div>
      <a class="link-map" href="#"></a> 
    </div>
  </div>
  <!--ДЛЯ КЛИЕНТОВ. ДЛЯ МАСТЕРОВ-->  
  <section class="client-master"> 
    <!--слева-->
    <div class="client-master-left">
      <p class="red txt-middle">Идеальный поиск идеального мастера</p>
      <ul>
        <li>Удобный поиск по ключевым критериям</li>
        <li>Быстрый поиск и связь с мастером без посредников</li>
        <li>Бесплатный поиск без регистрации</li>
      </ul>
      <p class="red txt14">Здесь вы найдете:</p>
      <ul>
        <li>Специалистов с опытом работы и рекомендациями</li>
        <li>Услуги в нужное время в нужном месте</li>
        <li>Всегда приятные цены</li>
      </ul>
      <a href="#" class="client-master-link h4">Стать клиентом</a> 
    </div>
    <!--справа-->
    <div class="client-master-right">
      <p class="red txt-middle">Безграничные возможности для поиска клиентов</p>
      <ul>
        <li>Бесплатная регистрация</li>
        <li>Быстрый поиск и связь с мастером без посредников</li>
        <li>Максимально эффективная подача информации о Ваших услугах</li>
      </ul>
      <a href="#" class="client-master-link h4">Предложить услуги</a> 
    </div>
  </section>
  <!----------------end block---------------->
  <!--МАСТЕРА-->   
  <section> 
    <!--мастер-->
    <div class="master-box-top"> <a href="#" class="master-link-img"><img src="/themes/sapota/img/ex/img01.jpg" alt="" /></a>
      <div class="master-info box-type-1"> 
        <!--видимая часть информации-->
        <div class="h5">Длинное длинное название длинное длиннющее</div>
        <div class="red-big">от <strong>9999</strong> р.</div>
        <div><strong>Вася Помидоркина</strong></div>

        <!--6 вариаций звездности задаются классами .star-0, star-1 и т.д.-->
        <div class="star star-5"></div>
        
      </div>
      <!--скрытая часть информации-->
      <div class="master-info-spoiler">
         Выезжает информация информациия 
      </div>
    </div>
    <!--мастер-->
    <div class="master-box-top"> <a href="#" class="master-link-img"><img src="/themes/sapota/img/ex/img01.jpg" alt="" /></a>
      <div class="master-info box-type-1"> 
        <!--видимая часть информации-->
        <div class="h5">Длинное длинное название длинное длиннющее</div>
        <div class="red-big">от <strong>9999</strong> р.</div>
        <div class="master-name">Вася Помидоркина</div>
        <span class="star"></span>
      </div>
      <!--скрытая часть информации-->
      <div class="master-info-spoiler">
         Выезжает информация информациия 
      </div>
    </div>
    <!--мастер-->
    <div class="master-box-top"> <a href="#" class="master-link-img"><img src="/themes/sapota/img/ex/img01.jpg" alt="" /></a>
      <div class="master-info box-type-1"> 
        <!--видимая часть информации-->
        <div class="h5">Длинное длинное название длинное длиннющее</div>
        <div class="red-big">от <strong>9999</strong> р.</div>
        <div class="master-name">Вася Помидоркина</div>
        <span class="star"></span>
      </div>
      <!--скрытая часть информации-->
      <div class="master-info-spoiler">
         Выезжает информация информациия 
      </div>
    </div>
    <!--мастер-->
    <div class="master-box-top"> <a href="#" class="master-link-img"><img src="/themes/sapota/img/ex/img01.jpg" alt="" /></a>
      <div class="master-info box-type-1"> 
        <!--видимая часть информации-->
        <div class="h5">Длинное длинное название длинное длиннющее</div>
        <div class="red-big">от <strong>9999</strong> р.</div>
        <div class="master-name">Вася Помидоркина</div>
        <span class="star"></span>
      </div>
      <!--скрытая часть информации-->
      <div class="master-info-spoiler">
         Выезжает информация информациия 
      </div>
    </div>
    <!--мастер-->
    <div class="master-box-top"> <a href="#" class="master-link-img"><img src="/themes/sapota/img/ex/img01.jpg" alt="" /></a>
      <div class="master-info box-type-1"> 
        <!--видимая часть информации-->
        <div class="h5">Длинное длинное название длинное длиннющее</div>
        <div class="red-big">от <strong>9999</strong> р.</div>
        <div class="master-name">Вася Помидоркина</div>
        <span class="star"></span>
      </div>
      <!--скрытая часть информации-->
      <div class="master-info-spoiler">
         Выезжает информация информациия 
      </div>
    </div>
    <!--мастер-->
    <div class="master-box-top"> <a href="#" class="master-link-img"><img src="/themes/sapota/img/ex/img01.jpg" alt="" /></a>
      <div class="master-info box-type-1"> 
        <!--видимая часть информации-->
        <div class="h5">Длинное длинное название длинное длиннющее</div>
        <div class="red-big">от <strong>9999</strong> р.</div>
        <div class="master-name">Вася Помидоркина</div>
        <span class="star"></span>
      </div>
      <!--скрытая часть информации-->
      <div class="master-info-spoiler">
         Выезжает информация информациия 
      </div>
    </div>
    <div class="link-more"><a href="#"><i></i> Показать еще</a></div>
    <!--/.master--> 
  </section>
  <!----------------end block---------------->
  <!--ПРЕИМУЩЕСТВА--> 
  <section class="advantage"> 
    <div class="advantage-box">
      <div class="advantage-img advantage-img-0"><i></i></div>
      <div class="advantage-title">Нужен мастер ближе к дому?</div>
      <p>Ищите мастеров, указав ближайшую станцию метро. Система подберет специалистов, работающих в вашем районе.</p>
    </div>
    <div class="advantage-box">
      <div class="advantage-img advantage-img-0"><i></i></div>
      <div class="advantage-title">Нужен мастер ближе к дому?</div>
      <p>Ищите мастеров, указав ближайшую станцию метро. Система подберет специалистов, работающих в вашем районе.</p>
    </div>
    <div class="advantage-box">
      <div class="advantage-img advantage-img-0"><i></i></div>
      <div class="advantage-title">Нужен мастер ближе к дому?</div>
      <p>Ищите мастеров, указав ближайшую станцию метро. Система подберет специалистов, работающих в вашем районе.</p>
    </div>
  <!--/.advantage-->
  </section>
</div>
<?php include ("blocks/footer.html");?>
</body>
</html>