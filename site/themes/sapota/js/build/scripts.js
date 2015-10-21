$.extend($.ui.slider.prototype, {
    options: {
        animate: false,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: false,
        step: 1,
        value: 0,
        values: null,
        content: [
            function() {
                return $(this).attr("data-values-0");
            },
            function() {
                return $(this).attr("data-values-1");
            }
        ],
        position: {
            left: [0,0],
            top: [15,15]
        },
        tooltip: false,
        tooltipDisplay: false,
        tooltipClass: ''
    },
    _widthHalfHandle : function(){
        var o = this.options,
            self = this;
        return Math.round(this.element.find( ".ui-slider-handle").width()/2);
    },
    _heightHalfHandle : function(){
        var o = this.options,
            self = this;
        return Math.round(this.element.find( ".ui-slider-handle").height()/2);
    },
    _create: function() {
        var self = this,
            o = this.options,
            existingHandles = this.element.find( ".ui-slider-handle" ).addClass( "ui-state-default ui-corner-all" ),
            handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
            handleCount = ( o.values && o.values.length ) || 1,
            handles = [];
        this.tooltip = [];
        this._keySliding = false;
        this._mouseSliding = false;
        this._animateOff = true;
        this._handleIndex = null;
        this._detectOrientation();
        this._mouseInit();

        this.element
            .addClass( "ui-slider" +
            " ui-slider-" + this.orientation +
            " ui-widget" +
            " ui-widget-content" +
            " ui-corner-all" +
            ( o.disabled ? " ui-slider-disabled ui-disabled" : "" ) );

        this.range = $([]);



        if ( o.range ) {
            if ( o.range === true ) {
                if ( !o.values ) {
                    o.values = [ this._valueMin(), this._valueMin() ];
                }
                if ( o.values.length && o.values.length !== 2 ) {
                    o.values = [ o.values[0], o.values[0] ];
                }
            }

            this.range = $( "<div></div>" )
                .appendTo( this.element )
                .addClass( "ui-slider-range" +
                // note: this isn't the most fittingly semantic framework class for this element,
                // but worked best visually with a variety of themes
                " ui-widget-header" +
                ( ( o.range === "min" || o.range === "max" ) ? " ui-slider-range-" + o.range : "" ) );
        }

        for ( var i = existingHandles.length; i < handleCount; i += 1 ) {
            handles.push( handle );
        }

        this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( self.element ) );

        this.handle = this.handles.eq( 0 );

        this.handles.add( this.range ).filter( "a" )
            .click(function( event ) {
                event.preventDefault();
            })
            .hover(function() {
                if ( !o.disabled ) {
                    $( this ).addClass( "ui-state-hover" );
                }
            }, function() {
                $( this ).removeClass( "ui-state-hover" );
            })
            .focus(function() {
                if ( !o.disabled ) {
                    $( ".ui-slider .ui-state-focus" ).removeClass( "ui-state-focus" );
                    $( this ).addClass( "ui-state-focus" );
                } else {
                    $( this ).blur();
                }
            })
            .blur(function() {
                $( this ).removeClass( "ui-state-focus" );
            });

        this.handles.each(function( i ) {
            if (i == 0)
                $(this).addClass("first-handle");
            else
                $(this).addClass("second-handle");

            $( this ).data( "index.ui-slider-handle", i );
            if ( self.options.tooltip )
                self.element.attr("data-values-"+i, self.options.values[i]);
        });

        this.handles
            .keydown(function( event ) {
                var ret = true,
                    index = $( this ).data( "index.ui-slider-handle" ),
                    allowed,
                    curVal,
                    newVal,
                    step;

                if ( self.options.disabled ) {
                    return;
                }

                switch ( event.keyCode ) {
                    case $.ui.keyCode.HOME:
                    case $.ui.keyCode.END:
                    case $.ui.keyCode.PAGE_UP:
                    case $.ui.keyCode.PAGE_DOWN:
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.RIGHT:
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.LEFT:
                        ret = false;
                        if ( !self._keySliding ) {
                            self._keySliding = true;
                            $( this ).addClass( "ui-state-active" );
                            if (!self.options.tooltipDisplay)
                                self._tooltipOpen(self.handles[index], index);
                            allowed = self._start( event, index );
                            if ( allowed === false ) {
                                return;
                            }
                        }
                        break;
                }

                step = self.options.step;
                if ( self.options.values && self.options.values.length ) {
                    curVal = newVal = self.values( index );
                } else {
                    curVal = newVal = self.value();
                }

                switch ( event.keyCode ) {
                    case $.ui.keyCode.HOME:
                        newVal = self._valueMin();
                        break;
                    case $.ui.keyCode.END:
                        newVal = self._valueMax();
                        break;
                    case $.ui.keyCode.PAGE_UP:
                        newVal = self._trimAlignValue( curVal + ( (self._valueMax() - self._valueMin()) / numPages ) );
                        break;
                    case $.ui.keyCode.PAGE_DOWN:
                        newVal = self._trimAlignValue( curVal - ( (self._valueMax() - self._valueMin()) / numPages ) );
                        break;
                    case $.ui.keyCode.UP:
                    case $.ui.keyCode.RIGHT:
                        if ( curVal === self._valueMax() ) {
                            return;
                        }
                        newVal = self._trimAlignValue( curVal + step );
                        break;
                    case $.ui.keyCode.DOWN:
                    case $.ui.keyCode.LEFT:
                        if ( curVal === self._valueMin() ) {
                            return;
                        }
                        newVal = self._trimAlignValue( curVal - step );
                        break;
                }

                self._slide( event, index, newVal );
                return ret;

            })
            .keyup(function( event ) {
                var index = $( this ).data( "index.ui-slider-handle" );

                if ( self._keySliding ) {
                    self._keySliding = false;
                    self._stop( event, index );
                    self._change( event, index );
                    $( this ).removeClass( "ui-state-active" );

                    if (!self.options.tooltipDisplay)
                        self._removeTooltip(self.tooltip[self._getHandleIndex($(self.handles[index]))]);
                }
            });

        this._refreshValue();
        this._animateOff = false;

        if (this.options.tooltipDisplay) {
            this._tooltipOpen(this.handles[0], 0);
            this._tooltipOpen(this.handles[1], 1);
        }
    },
    _refreshValue: function() {
        var oRange = this.options.range,
            o = this.options,
            self = this,
            animate = ( !this._animateOff ) ? o.animate : false,
            valPercent,
            _set = {},
            lastValPercent,
            value,
            valueMin,
            valueMax;

        if (o.orientation === 'horizontal')
            var k = self._widthHalfHandle()*100/self.element.width();
        else
            var k = self._heightHalfHandle()*100/self.element.height();
        if ( this.options.values && this.options.values.length ) {
            this.handles.each(function( i, j ) {
                valPercent = ( self.values(i) - self._valueMin() ) / ( self._valueMax() - self._valueMin() ) * 100;

                if (i == 0)
                    valPercent = valPercent - k;
                else
                    valPercent = valPercent + k;

                _set[ self.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
                $( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
                if ( self.options.range === true ) {
                    if ( self.orientation === "horizontal" ) {
                        if ( i === 0 ) {
                            self.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { left: valPercent + "%" }, o.animate );
                        }
                        if ( i === 1 ) {
                            self.range[ animate ? "animate" : "css" ]( { width: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
                        }
                    } else {
                        if ( i === 0 ) {
                            self.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { bottom: ( valPercent ) + "%" }, o.animate );
                        }
                        if ( i === 1 ) {
                            self.range[ animate ? "animate" : "css" ]( { height: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
                        }
                    }
                }
                lastValPercent = valPercent;
            });
        } else {
            value = this.value();
            valueMin = this._valueMin();
            valueMax = this._valueMax();
            valPercent = ( valueMax !== valueMin ) ?
                ( value - valueMin ) / ( valueMax - valueMin ) * 100 :
                0;
            _set[ self.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
            this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );

            if ( oRange === "min" && this.orientation === "horizontal" ) {
                this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { width: valPercent + "%" }, o.animate );
            }
            if ( oRange === "max" && this.orientation === "horizontal" ) {
                this.range[ animate ? "animate" : "css" ]( { width: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
            }
            if ( oRange === "min" && this.orientation === "vertical" ) {
                this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { height: valPercent + "%" }, o.animate );
            }
            if ( oRange === "max" && this.orientation === "vertical" ) {
                this.range[ animate ? "animate" : "css" ]( { height: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
            }
        }
    },
    _slide: function( event, index, newVal ) {
        var otherVal,
            newValues,
            allowed;

        if ( this.options.values && this.options.values.length ) {
            otherVal = this.values( index ? 0 : 1 );

            if ( ( this.options.values.length === 2 && this.options.range === true ) &&
                ( ( index === 0 && newVal > otherVal) || ( index === 1 && newVal < otherVal ) )
                ) {
                newVal = otherVal;
            }

            if ( newVal !== this.values( index ) ) {
                newValues = this.values();
                newValues[ index ] = newVal;
                // A slide can be canceled by returning false from the slide callback
                allowed = this._trigger( "slide", event, {
                    handle: this.handles[ index ],
                    value: newVal,
                    values: newValues
                } );
                otherVal = this.values( index ? 0 : 1 );
                if ( allowed !== false ) {
                    this.values( index, newVal, true );
                }
            }
        } else {
            if ( newVal !== this.value() ) {
                // A slide can be canceled by returning false from the slide callback
                allowed = this._trigger( "slide", event, {
                    handle: this.handles[ index ],
                    value: newVal
                } );
                if ( allowed !== false ) {
                    this.value( newVal );
                }
            }
        }
        if (this.options.tooltip) {
            this.element.attr("data-values-"+index, this.options.values[index]);
            var content = this.options.content[index].call(this.element);
            if ( this.tooltip[this._getHandleIndex(this.handles[index])].length ) {
                //console.log($(this.handles[index]).css("top"));
                //console.log($(this.handles[index]).position().top);
                this.tooltip[this._getHandleIndex(this.handles[index])].find( ".ui-tooltip-content" ).html( content );
                if (this.options.orientation == 'horizontal')
                    this.tooltip[this._getHandleIndex(this.handles[index])].css({left: ($(this.handles[index]).css("left").replace("px","")*1+this.options.position.left[index])+'px', top: this.options.position.top[index] + 'px', marginLeft: $(this.handles[index]).css("margin-left")});
                else
                    this.tooltip[this._getHandleIndex(this.handles[index])].css({left: this.options.position.left[index]+'px', top: ($(this.handles[index]).position().top+this.options.position.top[index]) + 'px', marginLeft: $(this.handles[index]).css("margin-left")});

                //$(this.handles[index]).css("top").replace("px","")*1
            }
        }
    },
    _normValueFromMouse: function( position ) {
        var pixelTotal,
            pixelMouse,
            percentMouse,
            valueTotal,
            valueMouse;
        var o = this.options,
            self = this;
        if ( this.orientation === "horizontal" ) {
            pixelTotal = this.elementSize.width;
            pixelMouse = position.x - this.elementOffset.left - ( this._clickOffset ? this._clickOffset.left : 0 );
        } else {
            pixelTotal = this.elementSize.height;
            pixelMouse = position.y - this.elementOffset.top - ( this._clickOffset ? this._clickOffset.top : 0 );
        }
        if (this.orientation === "horizontal") {
            //РµСЃР»Рё Р»РµРІС‹Р№ РїРѕР»Р·СѓРЅРѕРє С‚Рѕ РїСЂРёР±Р°РІР»СЏРµРј РїРѕР»РѕРІРёРЅСѓ, РёРЅР°С‡Рµ РІС‹С‡РёС‚Р°РµРј РїРѕР»РѕРІРёРЅСѓ С€РёСЂРёРЅС‹ РїРѕР»СѓР·РЅРєР°
            if ($('.first-handle').hasClass('ui-state-active')) {
                pixelMouse = pixelMouse + self._widthHalfHandle();
            }
            if ($('.second-handle').hasClass('ui-state-active')) {
                pixelMouse = pixelMouse - self._widthHalfHandle();
            }
        } else {
            if ($('.first-handle').hasClass('ui-state-active')) {
                pixelMouse = pixelMouse - self._heightHalfHandle();
            }
            if ($('.second-handle').hasClass('ui-state-active')) {
                pixelMouse = pixelMouse + self._heightHalfHandle();
            }
        }
        percentMouse = ( pixelMouse / pixelTotal );
        if ( percentMouse > 1 ) {
            percentMouse = 1;
        }
        if ( percentMouse < 0 ) {
            percentMouse = 0;
        }
        if ( this.orientation === "vertical" ) {
            percentMouse = 1 - percentMouse;
        }

        valueTotal = this._valueMax() - this._valueMin();
        valueMouse = this._valueMin() + percentMouse * valueTotal;
        return this._trimAlignValue( valueMouse );
    },
    _mouseCapture: function( event ) {
        var o = this.options,
            position,
            normValue,
            distance,
            closestHandle,
            self,
            index,
            allowed,
            offset,
            mouseOverHandle;

        if ( o.disabled ) {
            return false;
        }

        this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight()
        };
        this.elementOffset = this.element.offset();

        position = { x: event.pageX, y: event.pageY };
        normValue = this._normValueFromMouse( position );
        distance = this._valueMax() - this._valueMin() + 1;
        self = this;
        this.handles.each(function( i ) {
            var thisDistance = Math.abs( normValue - self.values(i) );
            if ( distance > thisDistance ) {
                distance = thisDistance;
                closestHandle = $( this );
                index = i;
            }
        });

        // workaround for bug #3736 (if both handles of a range are at 0,
        // the first is always used as the one with least distance,
        // and moving it is obviously prevented by preventing negative ranges)
        if( o.range === true && this.values(1) === o.min ) {
            index += 1;
            closestHandle = $( this.handles[index] );
        }
        if (this.values(0) == this.values(1) && $(this.handles[1]).hasClass("ui-state-hover") && index == 0) {
            index = 1;
        } else if(this.values(0) == this.values(1) && $(this.handles[0]).hasClass("ui-state-hover") && index == 1) {
            index = 0;
        }
        closestHandle = $( this.handles[index] );

        allowed = this._start( event, index );
        if ( allowed === false ) {
            return false;
        }
        this._mouseSliding = true;

        self._handleIndex = index;
        closestHandle
            .addClass( "ui-state-active" )
            .focus();
        //РµСЃР»Рё РѕС‚РѕР±СЂР°Р¶Р°РµС‚СЃСЏ РІСЃРµРіРґР°, С‚Рѕ РЅРµ РЅР°РґРѕ РїРѕРІС‚РѕСЂРЅРѕ РѕС‚РєСЂС‹РІР°С‚СЊ tooltip
        if (!self.options.tooltipDisplay)
            self._tooltipOpen(this.handles[index], index);
        offset = closestHandle.offset();
        mouseOverHandle = !$( event.target ).parents().andSelf().is( ".ui-slider-handle" );
        this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
            left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
            top: event.pageY - offset.top -
                ( closestHandle.height() / 2 ) -
                ( parseInt( closestHandle.css("borderTopWidth"), 10 ) || 0 ) -
                ( parseInt( closestHandle.css("borderBottomWidth"), 10 ) || 0) +
                ( parseInt( closestHandle.css("marginTop"), 10 ) || 0)
        };

        if ( !this.handles.hasClass( "ui-state-hover" ) ) {
            this._slide( event, index, normValue );
        }
        this._animateOff = true;
        return true;
    },
    _mouseStop: function( event ) {
        this.handles.removeClass( "ui-state-active" );
        if (!this.options.tooltipDisplay)
            this._removeTooltip(this.tooltip[this._getHandleIndex(this.handles[this._handleIndex])]);
        this._mouseSliding = false;

        this._stop( event, this._handleIndex );
        this._change( event, this._handleIndex );

        this._handleIndex = null;
        this._clickOffset = null;
        this._animateOff = false;
        return false;
    },
    _tooltipOpen: function(element, index) {
        var self = this
        if (!this.options.tooltip)
            return '';

        var id = "ui-tooltip-"+this._getHandleIndex(element),
            tooltip = $( "<div>" )
                .attr({
                    id: id,
                    role: "tooltip"
                })
                .addClass( "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
                ( this.options.tooltipClass || "" ) );
        $( "<div>" )
            .addClass( "ui-tooltip-content" )
            .appendTo( tooltip );
        tooltip.css("display", "none");
        tooltip.appendTo( this.element);
        tooltip.fadeIn("fast");
        var content = this.options.content[index].call(this.element);
        tooltip.find( ".ui-tooltip-content" ).html( content );

        if (this.options.orientation == 'horizontal')
            tooltip.css({left: ($(element).css("left").replace("px","")*1+this.options.position.left[index])+'px', top: this.options.position.top[index] + 'px', marginLeft: $(element).css("margin-left")});
        else
            tooltip.css({left: this.options.position.left[index]+'px', top: ($(element).position().top+this.options.position.top[index]) + 'px', marginLeft: $(element).css("margin-left")});
        this.tooltip[this._getHandleIndex(element)] = tooltip;
    },
    _removeTooltip: function( tooltip ) {
        if ($(tooltip).length){
            tooltip.fadeOut("fast", function() {$(tooltip).remove();});
        }
    },
    _getHandleIndex : function(element) {
        var handles = $(".ui-slider-handle");
        return handles.index(element);
    }
});
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
(function($) {
  $.fn.extend({
    fixedTblHdrLftCol: function(options) {
      var cfg = $.extend(true, {
        scroll: {
          height: null,
          width: null,
          headRow: {
            className: 'fTHLC-head-row',
            enabled: true,
            overflow: 'auto'
          },
          leftCol : {
            className: 'fTHLC-left-col',
            enabled: true,
            overflow: 'auto',
            fixedSpan: 1
          },
          syncWith: null
        },
        wrapper: {
          outer: {
            idName: null,
            className: 'fTHLC-outer-wrapper'
          },
          inner: {
            idName: null,
            className: 'fTHLC-inner-wrapper'
          }
        },
        corner: {
          append: true,
          deepClone: false,
          outer: {
            idName: null,
            className: 'fTHLC-outer-corner'
          },
          inner: {
            idName: null,
            className: 'fTHLC-inner-corner'
          }
        }
      }, options);

      var scrollWidth = cfg.scroll.width;
      var scrollHeight = cfg.scroll.height;
      var fixedLeftWidth = null;
      var fixedHeadHeight = null;

      function getScrollWidth(table) {
        var width = scrollWidth;
        
        if(!width)
          width = table.outerWidth(true) - getFixedLeftWidth(table);
        
        return width;
      }
      
      function getScrollHeight(table) {
        var height = scrollHeight;
        
        if(!height)
          height = table.outerHeight(true) - getFixedHeadHeight(table);
        
        return height;
      }
      
      function getHeadRowCount(table) {
        return table.find('thead tr').length;
      }
        
      function getFixedHeadRows(table) {
         var rows = $([]);

        for(var i = 0; i < getHeadRowCount(table); i++) {
          var row = $([]);

          for(var j = 0; j < cfg.scroll.leftCol.fixedSpan; j++) {
            row.push(table.find('thead tr:nth-child('+(i + 1)+') th:nth-child('+(j + 1)+')'));
          }

          rows.push(row);
        }

        return rows;
      }

      function getHeadFirstRows(table) {
        var rows = $([]);

        for(var i = 0; i < getHeadRowCount(table); i++) {
          rows.push(table.find('thead tr:nth-child('+(i + 1)+') th:first-child'));
        }

        return rows;
      }
      
      function getHeadCols(table, n) {
        return  table.find('thead tr:nth-child('+(n + 1)+') th');
      }

      function getFixedHeadHeight(table) {
        var height = fixedHeadHeight;

        if(!height) {
          var rows = getHeadFirstRows(table);

          rows.each(function() {
            height += $(this).outerHeight(true);
          });

          fixedHeadHeight = height;
        }

        return height;
      }

      function getFixedLeftCols(table) {
        var cols =$([]);

        for(var i = 0; i < cfg.scroll.leftCol.fixedSpan; i++) {
          cols.push(table.find('tbody tr:first-child td:nth-child('+(i + 1)+')'));
        }

        return cols;
      }

      function getFixedLeftWidth(table) {
        var width = fixedLeftWidth;

        if(!width) {
          var cols = getFixedLeftCols(table);

          cols.each(function() {
            width += $(this).outerWidth(true);
          });

          fixedLeftWidth = width;
        }

        return width;
      }
      
      function getTableWidth(table) {
        var width = 0;
        
        table.find('tbody tr:first-child td').each(function() {
          width += $(this).outerWidth(true);
        });
        
        return width;
      }
      
      function createOuter(table) {
        table
          .wrap($(document.createElement('div'))
          .attr('id', cfg.wrapper.outer.idName)
          .addClass(cfg.wrapper.outer.className)
          .css('width', getScrollWidth(table))
          .css('height', getScrollHeight(table))
          .css('position', 'relative')
          .css('padding-left', getFixedLeftWidth(table)+'px')
          .css('padding-top', getFixedHeadHeight(table)+'px')
          .css('overflow', 'hidden'));
      }
      
      function createInner(table) {
        table
          .wrap($(document.createElement('div'))
          .attr('id', cfg.wrapper.inner.idName)
          .addClass(cfg.wrapper.inner.className)
          .css('overflow-x', cfg.scroll.headRow.overflow)
          .css('overflow-y', cfg.scroll.leftCol.overflow)
          .css('width', getScrollWidth(table))
          .css('height', getScrollHeight(table)));
      }
      
      function setTableCSS(table) {
        var leftCornerWidth = getFixedLeftWidth(table);
        var tableWidth = getTableWidth(table);

        table
          .css('border-collapse', 'collapse')
          .css('width', (tableWidth - leftCornerWidth)+'px');
      }
      
      function setTheadCSS(table) {
        var rows = getHeadFirstRows(table);
        var totalHeight = 0;
        
        rows.each(function(i) {
          var cols = getHeadCols(table, i);
          var totalWidth = 0;
          
          cols.each(function(j) {
            var width = $(this).outerWidth(true);
            var height = $(this).outerHeight(true);

            totalWidth += width;

            if(j == 0)
              totalHeight += height;

            $(this)
              .addClass(cfg.scroll.headRow.className)
              .css('position', 'absolute')
              .css('top', (totalHeight - height)+'px')
              .css('left', (totalWidth - width)+'px');
          });
        });
      }
      
      function setTbodyCSS(table) {
        var leftCornerWidth = getFixedLeftWidth(table);
        var tableWidth = getTableWidth(table);

        table.find('tbody tr').each(function() {
          $(this).css('width', (tableWidth - leftCornerWidth)+'px');
        });
      }

      function setLeftColumnCSS(table) {
        var total = 0;
        var cols = getFixedLeftCols(table);

        cols.each(function(i) {
          var width = $(this).outerWidth(true); 
          
          total += width;
          table
            .find('tbody tr td:nth-child('+(i + 1)+')')
            .addClass(cfg.scroll.leftCol.className)
            .css('position', 'absolute')
            .css('left', (total - width)+'px');
        });
      }
      
      function recalHeight(table) {
        table.find('tbody tr').each(function() {
          var maxHeight = 0;

          for(var i = 0; i < cfg.scroll.leftCol.fixedSpan; i++) {
            var h = $(this).find('td:nth-child('+(i + 1)+')').height();

            if(h > maxHeight)
              maxHeight = h;
          }

          $(this)
            .find('td:nth-child('+(cfg.scroll.leftCol.fixedSpan + 1)+')')
            .height(maxHeight);
          $(this).hide().fadeIn(0);
        });
      }

      function appendCorner(table) {
        var corner = $('<div></div>')
                       .attr('id', cfg.corner.outer.idName)
                       .addClass(cfg.corner.outer.className)
                       .css('position', 'absolute')
                       .css('left', '0px')
                       .css('top',  '0px')
                       .css('margin', '0')
                       .css('padding', '0')
                       .css('width', getFixedLeftWidth(table)+'px')
                       .css('height', getFixedHeadHeight(table)+'px');
        var innerTable = $('<table></table>')
                           .attr('id', cfg.corner.inner.idName)
                           .addClass(cfg.corner.inner.className)
                           .css('border-collapse', 'collapse');
        var thead = $('<thead></thead>');
        var rows = getFixedHeadRows(table);

        rows.each(function() {
          var tr = $('<tr></tr>');

          $(this).each(function() {
            var th = $(this).clone(cfg.corner.deepClone);
            
            $(this).removeAttr('id');
            $(this).unbind();
            th.appendTo(tr);
          });

          tr.appendTo(thead);
        });

        thead.appendTo(innerTable);
        innerTable.appendTo(corner);
        corner.appendTo(table.parent());
      }

      function recalHeaderPosition(table) {
        var leftPosition = [];

        table.find('tbody tr:first').each(function() {
          $(this).find('td').each(function() {
            var position = $(this).position();
            leftPosition.push(position.left);
          });
        });

        table.find('thead tr').each(function() {
          $(this).find('th').each(function(i) {
            $(this).css('left', leftPosition[i]+'px');
          });
        });
      }
      
      function init(table) {
        setLeftColumnCSS(table);
        setTbodyCSS(table);
        setTheadCSS(table);
        setTableCSS(table);
        
        createOuter(table);
        createInner(table);
        
        recalHeight(table);
        
        if(cfg.corner.append)
          appendCorner(table);

        recalHeaderPosition(table);
      }
      
      function scrollCols(table) {
        table.find('tbody tr').each(function() {
          for(var i = 0; i < cfg.scroll.leftCol.fixedSpan; i++) {
            $(this)
             .find('td:nth-child('+(i + 1)+')')
             .css('top', $(this)
                           .find('td:nth-child('+(cfg.scroll.leftCol.fixedSpan + 1)+')')
                           .position()
                           .top+'px');
          }
        });
      }
      
      function scrollRows(table) {
        table.find('thead tr').each(function(i) {
          if(i < getHeadRowCount(table)) {
            $(this).find('th').each(function(j) {
              $(this)
                .css('left', table
                               .find('tbody tr:first-child td:nth-child('+(j + 1)+')')
                               .position()
                               .left+'px');
            });
          }
        });
      }
      
      function scrollOther(table, other) {
        other.scrollTop(table.scrollTop());
        other.scrollLeft(table.scrollLeft());
      }
      
      function syncTables(table) {
        var syncWith = cfg.scroll.syncWith;
        
        if($.isArray(syncWith)) {
          $.each(syncWith, function() {
            scrollOther(table, $(this.toString()).parent());
          });
        } else
          scrollOther(table, $(syncWith).parent());
      }
      
      return this.each(function() {
        if($(this)[0].tagName.toLowerCase() != "table")
          return true;
        
        init($(this)); 
        
        if(cfg.scroll.leftCol.enabled || cfg.scroll.headRow.enabled) {
          $(this).parent().scroll(function() {
            if(cfg.scroll.headRow.enabled)
              scrollRows($(this));

            if(cfg.scroll.leftCol.enabled)
              scrollCols($(this));
            
            if(cfg.scroll.syncWith)
              syncTables($(this));
          });
        }
      });
    }
  });
})(jQuery);

/*
 * jQuery Form Styler v1.7.1
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2015 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2015.07.12
 *
 */

;(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {

	'use strict';

	var pluginName = 'styler',
			defaults = {
				wrapper: 'form',
				idSuffix: '-styler',
				filePlaceholder: 'Файл не выбран',
				fileBrowse: 'Обзор...',
				selectPlaceholder: 'Выберите...',
				selectSearch: false,
				selectSearchLimit: 10,
				selectSearchNotFound: 'Совпадений не найдено',
				selectSearchPlaceholder: 'Поиск...',
				selectVisibleOptions: 0,
				singleSelectzIndex: '100',
				selectSmartPositioning: true,
				onSelectOpened: function() {},
				onSelectClosed: function() {},
				onFormStyled: function() {}
			};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Plugin.prototype = {

		// инициализация
		init: function() {

			var el = $(this.element);
			var opt = this.options;

			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

			function Attributes() {
				var id = '',
						title = '',
						classes = '',
						dataList = '';
				if (el.attr('id') !== undefined && el.attr('id') !== '') id = ' id="' + el.attr('id') + opt.idSuffix + '"';
				if (el.attr('title') !== undefined && el.attr('title') !== '') title = ' title="' + el.attr('title') + '"';
				if (el.attr('class') !== undefined && el.attr('class') !== '') classes = ' ' + el.attr('class');
				var data = el.data();
				for (var i in data) {
					if (data[i] !== '') dataList += ' data-' + i + '="' + data[i] + '"';
				}
				id += dataList;
				this.id = id;
				this.title = title;
				this.classes = classes;
			}

			// checkbox
			if (el.is(':checkbox')) {

				var checkboxOutput = function() {

					var att = new Attributes();
					var checkbox = $('<div' + att.id + ' class="jq-checkbox' + att.classes + '"' + att.title + '><div class="jq-checkbox__div"></div></div>');

					// прячем оригинальный чекбокс
					el.css({
						position: 'absolute',
						zIndex: '-1',
						opacity: 0,
						margin: 0,
						padding: 0
					}).after(checkbox).prependTo(checkbox);

					checkbox.attr('unselectable', 'on').css({
						'-webkit-user-select': 'none',
						'-moz-user-select': 'none',
						'-ms-user-select': 'none',
						'-o-user-select': 'none',
						'user-select': 'none',
						display: 'inline-block',
						position: 'relative',
						overflow: 'hidden'
					});

					if (el.is(':checked')) checkbox.addClass('checked');
					if (el.is(':disabled')) checkbox.addClass('disabled');

					// клик на псевдочекбокс
					checkbox.on('click.styler', function() {
						if (!checkbox.is('.disabled')) {
							if (el.is(':checked')) {
								el.prop('checked', false);
								checkbox.removeClass('checked');
							} else {
								el.prop('checked', true);
								checkbox.addClass('checked');
							}
							el.change();
							return false;
						} else {
							return false;
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a')) {
							checkbox.click();
							e.preventDefault();
						}
					});
					// переключение по Space или Enter
					el.on('change.styler', function() {
						if (el.is(':checked')) checkbox.addClass('checked');
						else checkbox.removeClass('checked');
					})
					// чтобы переключался чекбокс, который находится в теге label
					.on('keydown.styler', function(e) {
						if (e.which == 32) checkbox.click();
					})
					.on('focus.styler', function() {
						if (!checkbox.is('.disabled')) checkbox.addClass('focused');
					})
					.on('blur.styler', function() {
						checkbox.removeClass('focused');
					});

				}; // end checkboxOutput()

				checkboxOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					checkboxOutput();
				});

			// end checkbox

			// radio
			} else if (el.is(':radio')) {

				var radioOutput = function() {

					var att = new Attributes();
					var radio = $('<div' + att.id + ' class="jq-radio' + att.classes + '"' + att.title + '><div class="jq-radio__div"></div></div>');

					// прячем оригинальную радиокнопку
					el.css({
						position: 'absolute',
						zIndex: '-1',
						opacity: 0,
						margin: 0,
						padding: 0
					}).after(radio).prependTo(radio);

					radio.attr('unselectable', 'on').css({
						'-webkit-user-select': 'none',
						'-moz-user-select': 'none',
						'-ms-user-select': 'none',
						'-o-user-select': 'none',
						'user-select': 'none',
						display: 'inline-block',
						position: 'relative'
					});

					if (el.is(':checked')) radio.addClass('checked');
					if (el.is(':disabled')) radio.addClass('disabled');

					// клик на псевдорадиокнопке
					radio.on('click.styler', function() {
						if (!radio.is('.disabled')) {
							radio.closest(opt.wrapper).find('input[name="' + el.attr('name') + '"]').prop('checked', false).parent().removeClass('checked');
							el.prop('checked', true).parent().addClass('checked');
							el.change();
							return false;
						} else {
							return false;
						}
					});
					// клик на label
					el.closest('label').add('label[for="' + el.attr('id') + '"]').on('click.styler', function(e) {
						if (!$(e.target).is('a')) {
							radio.click();
							e.preventDefault();
						}
					});
					// переключение стрелками
					el.on('change.styler', function() {
						el.parent().addClass('checked');
					})
					.on('focus.styler', function() {
						if (!radio.is('.disabled')) radio.addClass('focused');
					})
					.on('blur.styler', function() {
						radio.removeClass('focused');
					});

				}; // end radioOutput()

				radioOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					radioOutput();
				});

			// end radio

			// file
			} else if (el.is(':file')) {

				// прячем оригинальное поле
				el.css({
					position: 'absolute',
					top: 0,
					right: 0,
					width: '100%',
					height: '100%',
					opacity: 0,
					margin: 0,
					padding: 0
				});

				var fileOutput = function() {

					var att = new Attributes();
					var placeholder = el.data('placeholder');
					if (placeholder === undefined) placeholder = opt.filePlaceholder;
					var browse = el.data('browse');
					if (browse === undefined || browse === '') browse = opt.fileBrowse;
					var file = $('<div' + att.id + ' class="jq-file' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative; overflow: hidden"></div>');
					var name = $('<div class="jq-file__name">' + placeholder + '</div>').appendTo(file);
					$('<div class="jq-file__browse">' + browse + '</div>').appendTo(file);
					el.after(file);
					file.append(el);
					if (el.is(':disabled')) file.addClass('disabled');
					el.on('change.styler', function() {
						var value = el.val();
						if (el.is('[multiple]')) {
							value = '';
							var files = el[0].files;
							for (var i = 0; i < files.length; i++) {
								value += ( (i > 0) ? ', ' : '' ) + files[i].name;
							}
						}
						name.text(value.replace(/.+[\\\/]/, ''));
						if (value === '') {
							name.text(placeholder);
							file.removeClass('changed');
						} else {
							file.addClass('changed');
						}
					})
					.on('focus.styler', function() {
						file.addClass('focused');
					})
					.on('blur.styler', function() {
						file.removeClass('focused');
					})
					.on('click.styler', function() {
						file.removeClass('focused');
					});

				}; // end fileOutput()

				fileOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					fileOutput();
				});

			// end file

			// select
			} else if (el.is('select')) {

				var selectboxOutput = function() {

					// запрещаем прокрутку страницы при прокрутке селекта
					function preventScrolling(selector) {
						selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
							var scrollTo = null;
							if (e.type == 'mousewheel') { scrollTo = (e.originalEvent.wheelDelta * -1); }
							else if (e.type == 'DOMMouseScroll') { scrollTo = 40 * e.originalEvent.detail; }
							if (scrollTo) {
								e.stopPropagation();
								e.preventDefault();
								$(this).scrollTop(scrollTo + $(this).scrollTop());
							}
						});
					}

					var option = $('option', el);
					var list = '';
					// формируем список селекта
					function makeList() {
						for (var i = 0; i < option.length; i++) {
							var op = option.eq(i);
							var li = '',
									liClass = '',
									liClasses = '',
									id = '',
									title = '',
									dataList = '',
									optionClass = '',
									optgroupClass = '',
									dataJqfsClass = '';
							var disabled = 'disabled';
							var selDis = 'selected sel disabled';
							if (op.prop('selected')) liClass = 'selected sel';
							if (op.is(':disabled')) liClass = disabled;
							if (op.is(':selected:disabled')) liClass = selDis;
							if (op.attr('id') !== undefined && op.attr('id') !== '') id = ' id="' + op.attr('id') + opt.idSuffix + '"';
							if (op.attr('title') !== undefined && option.attr('title') !== '') title = ' title="' + op.attr('title') + '"';
							if (op.attr('class') !== undefined) {
								optionClass = ' ' + op.attr('class');
								dataJqfsClass = ' data-jqfs-class="' + op.attr('class') + '"';
							}

							var data = op.data();
							for (var k in data) {
								if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
							}

							if ( (liClass + optionClass) !== '' )   liClasses = ' class="' + liClass + optionClass + '"';
							li = '<li' + dataJqfsClass + dataList + liClasses + title + id + '>'+ op.html() +'</li>';

							// если есть optgroup
							if (op.parent().is('optgroup')) {
								if (op.parent().attr('class') !== undefined) optgroupClass = ' ' + op.parent().attr('class');
								li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '"' + title + id + '>'+ op.html() +'</li>';
								if (op.is(':first-child')) {
									li = '<li class="optgroup' + optgroupClass + '">' + op.parent().attr('label') + '</li>' + li;
								}
							}

							list += li;
						}
					} // end makeList()

					// одиночный селект
					function doSelect() {
						var att = new Attributes();

						var searchHTML = '';
						var selectPlaceholder = el.data('placeholder');
						var selectSearch = el.data('search');
						var selectSearchLimit = el.data('search-limit');
						var selectSearchNotFound = el.data('search-not-found');
						var selectSearchPlaceholder = el.data('search-placeholder');
						var singleSelectzIndex = el.data('z-index');
						var selectSmartPositioning = el.data('smart-positioning');

						if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
						if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
						if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
						if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
						if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
						if (singleSelectzIndex === undefined || singleSelectzIndex === '') singleSelectzIndex = opt.singleSelectzIndex;
						if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

						var selectbox =
							$('<div' + att.id + ' class="jq-selectbox jqselect' + att.classes + '" style="display: inline-block; position: relative; z-index:' + singleSelectzIndex + '">' +
									'<div class="jq-selectbox__select"' + att.title + ' style="position: relative">' +
										'<div class="jq-selectbox__select-text"></div>' +
										'<div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div>' +
									'</div>' +
								'</div>');

						el.css({margin: 0, padding: 0}).after(selectbox).prependTo(selectbox);

						var divSelect = $('div.jq-selectbox__select', selectbox);
						var divText = $('div.jq-selectbox__select-text', selectbox);
						var optionSelected = option.filter(':selected');

						makeList();

						if (selectSearch) searchHTML =
							'<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
							'<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
						var dropdown =
							$('<div class="jq-selectbox__dropdown" style="position: absolute">' +
									searchHTML +
									'<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' + list + '</ul>' +
								'</div>');
						selectbox.append(dropdown);
						var ul = $('ul', dropdown);
						var li = $('li', dropdown);
						var search = $('input', dropdown);
						var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
						if (li.length < selectSearchLimit) search.parent().hide();

						// показываем опцию по умолчанию
						// если 1-я опция пустая и выбрана по умолчанию, то показываем плейсхолдер
						if (el.val() === '') {
							divText.text(selectPlaceholder).addClass('placeholder');
						} else {
							divText.text(optionSelected.text());
						}

						// определяем самый широкий пункт селекта
						var liWidthInner = 0,
								liWidth = 0;
						li.each(function() {
							var l = $(this);
							l.css({'display': 'inline-block'});
							if (l.innerWidth() > liWidthInner) {
								liWidthInner = l.innerWidth();
								liWidth = l.width();
							}
							l.css({'display': ''});
						});

						// подстраиваем ширину свернутого селекта в зависимости
						// от ширины плейсхолдера или самого широкого пункта
						if (divText.is('.placeholder') && (divText.width() > liWidthInner)) {
							divText.width(divText.width());
						} else {
							var selClone = selectbox.clone().appendTo('body').width('auto');
							var selCloneWidth = selClone.outerWidth();
							selClone.remove();
							if (selCloneWidth == selectbox.outerWidth()) {
								divText.width(liWidth);
							}
						}

						// подстраиваем ширину выпадающего списка в зависимости от самого широкого пункта
						if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

						// прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
						// если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
						if (option.first().text() === '' && el.data('placeholder') !== '') {
							li.first().hide();
						}

						// прячем оригинальный селект
						el.css({
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
							opacity: 0
						});

						var selectHeight = selectbox.outerHeight();
						var searchHeight = search.outerHeight();
						var isMaxHeight = ul.css('max-height');
						var liSelected = li.filter('.selected');
						if (liSelected.length < 1) li.first().addClass('selected sel');
						if (li.data('li-height') === undefined) li.data('li-height', li.outerHeight());
						var position = dropdown.css('top');
						if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
						if (dropdown.css('top') == 'auto') dropdown.css({top: selectHeight});
						dropdown.hide();

						// если выбран не дефолтный пункт
						if (liSelected.length) {
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != optionSelected.text()) {
								selectbox.addClass('changed');
							}
							// передаем селекту класс выбранного пункта
							selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
							selectbox.addClass(liSelected.data('jqfs-class'));
						}

						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							return false;
						}

						// при клике на псевдоселекте
						divSelect.click(function() {

							// колбек при закрытии селекта
							if ($('div.jq-selectbox').filter('.opened').length) {
								opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
							}

							el.focus();

							// если iOS, то не показываем выпадающий список,
							// т.к. отображается нативный и неизвестно, как его спрятать
							if (iOS) return;

							// умное позиционирование
							var win = $(window);
							var liHeight = li.data('li-height');
							var topOffset = selectbox.offset().top;
							var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
							var visible = el.data('visible-options');
							if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
							var minHeight = liHeight * 5;
							var newHeight = liHeight * visible;
							if (visible > 0 && visible < 6) minHeight = newHeight;
							if (visible === 0) newHeight = 'auto';

							var dropDown = function() {
								dropdown.height('auto').css({bottom: 'auto', top: position});
								var maxHeightBottom = function() {
									ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightBottom();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if (bottomOffset < (dropdown.outerHeight() + 20)) {
									maxHeightBottom();
								}
							};

							var dropUp = function() {
								dropdown.height('auto').css({top: 'auto', bottom: position});
								var maxHeightTop = function() {
									ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
								};
								maxHeightTop();
								ul.css('max-height', newHeight);
								if (isMaxHeight != 'none') {
									ul.css('max-height', isMaxHeight);
								}
								if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
									maxHeightTop();
								}
							};

							if (selectSmartPositioning === true || selectSmartPositioning === 1) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								// раскрытие вверх
								} else {
									dropUp();
									selectbox.removeClass('dropdown').addClass('dropup');
								}
							} else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
								// раскрытие вниз
								if (bottomOffset > (minHeight + searchHeight + 20)) {
									dropDown();
									selectbox.removeClass('dropup').addClass('dropdown');
								}
							}

							// если выпадающий список выходит за правый край окна браузера,
							// то меняем позиционирование с левого на правое
							if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
								dropdown.css({left: 'auto', right: 0});
							}
							// конец умного позиционирования

							$('div.jqselect').css({zIndex: (singleSelectzIndex - 1)}).removeClass('opened');
							selectbox.css({zIndex: singleSelectzIndex});
							if (dropdown.is(':hidden')) {
								$('div.jq-selectbox__dropdown:visible').hide();
								dropdown.show();
								selectbox.addClass('opened focused');
								// колбек при открытии селекта
								opt.onSelectOpened.call(selectbox);
							} else {
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								if ($('div.jq-selectbox').filter('.opened').length) {
									opt.onSelectClosed.call(selectbox);
								}
							}

							// поисковое поле
							if (search.length) {
								search.val('').keyup();
								notFound.hide();
								search.keyup(function() {
									var query = $(this).val();
									li.each(function() {
										if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
											$(this).hide();
										} else {
											$(this).show();
										}
									});
									// прячем 1-ю пустую опцию
									if (option.first().text() === '' && el.data('placeholder') !== '') {
										li.first().hide();
									}
									if (li.filter(':visible').length < 1) {
										notFound.show();
									} else {
										notFound.hide();
									}
								});
							}

							// прокручиваем до выбранного пункта при открытии списка
							if (li.filter('.selected').length) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									// если нечетное количество видимых пунктов,
									// то высоту пункта делим пополам для последующего расчета
									if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
								}
							}

							preventScrolling(ul);
							return false;

						}); // end divSelect.click()

						// при наведении курсора на пункт списка
						li.hover(function() {
							$(this).siblings().removeClass('selected');
						});
						var selectedText = li.filter('.selected').text();

						// при клике на пункт списка
						li.filter(':not(.disabled):not(.optgroup)').click(function() {
							el.focus();
							var t = $(this);
							var liText = t.text();
							if (!t.is('.selected')) {
								var index = t.index();
								index -= t.prevAll('.optgroup').length;
								t.addClass('selected sel').siblings().removeClass('selected sel');
								option.prop('selected', false).eq(index).prop('selected', true);
								selectedText = liText;
								divText.text(liText);

								// передаем селекту класс выбранного пункта
								if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
								selectbox.data('jqfs-class', t.data('jqfs-class'));
								selectbox.addClass(t.data('jqfs-class'));

								el.change();
							}
							dropdown.hide();
							selectbox.removeClass('opened dropup dropdown');
							// колбек при закрытии селекта
							opt.onSelectClosed.call(selectbox);

						});
						dropdown.mouseout(function() {
							$('li.sel', dropdown).addClass('selected');
						});

						// изменение селекта
						el.on('change.styler', function() {
							divText.text(option.filter(':selected').text()).removeClass('placeholder');
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// добавляем класс, показывающий изменение селекта
							if (option.first().text() != li.filter('.selected').text()) {
								selectbox.addClass('changed');
							} else {
								selectbox.removeClass('changed');
							}
						})
						.on('focus.styler', function() {
							selectbox.addClass('focused');
							$('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
						})
						.on('blur.styler', function() {
							selectbox.removeClass('focused');
						})
						// изменение селекта с клавиатуры
						.on('keydown.styler keyup.styler', function(e) {
							var liHeight = li.data('li-height');
							if (el.val() === '') {
								divText.text(selectPlaceholder).addClass('placeholder');
							} else {
								divText.text(option.filter(':selected').text());
							}
							li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
							// вверх, влево, Page Up, Home
							if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
								if (el.val() === '') {
									ul.scrollTop(0);
								} else {
									ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
								}
							}
							// вниз, вправо, Page Down, End
							if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
							}
							// закрываем выпадающий список при нажатии Enter
							if (e.which == 13) {
								e.preventDefault();
								dropdown.hide();
								selectbox.removeClass('opened dropup dropdown');
								// колбек при закрытии селекта
								opt.onSelectClosed.call(selectbox);
							}
						}).on('keydown.styler', function(e) {
							// открываем выпадающий список при нажатии Space
							if (e.which == 32) {
								e.preventDefault();
								divSelect.click();
							}
						});

						// прячем выпадающий список при клике за пределами селекта
						if (!onDocumentClick.registered) {
							$(document).on('click', onDocumentClick);
							onDocumentClick.registered = true;
						}

					} // end doSelect()

					// мультиселект
					function doMultipleSelect() {
						var att = new Attributes();
						var selectbox = $('<div' + att.id + ' class="jq-select-multiple jqselect' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative"></div>');

						el.css({margin: 0, padding: 0}).after(selectbox);

						makeList();
						selectbox.append('<ul>' + list + '</ul>');
						var ul = $('ul', selectbox).css({
							'position': 'relative',
							'overflow-x': 'hidden',
							'-webkit-overflow-scrolling': 'touch'
						});
						var li = $('li', selectbox).attr('unselectable', 'on');
						var size = el.attr('size');
						var ulHeight = ul.outerHeight();
						var liHeight = li.outerHeight();
						if (size !== undefined && size > 0) {
							ul.css({'height': liHeight * size});
						} else {
							ul.css({'height': liHeight * 4});
						}
						if (ulHeight > selectbox.height()) {
							ul.css('overflowY', 'scroll');
							preventScrolling(ul);
							// прокручиваем до выбранного пункта
							if (li.filter('.selected').length) {
								ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
							}
						}

						// прячем оригинальный селект
						el.prependTo(selectbox).css({
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
							opacity: 0
						});

						// если селект неактивный
						if (el.is(':disabled')) {
							selectbox.addClass('disabled');
							option.each(function() {
								if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
							});

						// если селект активный
						} else {

							// при клике на пункт списка
							li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
								el.focus();
								var clkd = $(this);
								if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
								if(!e.shiftKey) clkd.addClass('first');
								if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

								// выделение пунктов при зажатом Ctrl
								if(e.ctrlKey || e.metaKey) {
									if (clkd.is('.selected')) clkd.removeClass('selected first');
										else clkd.addClass('selected first');
									clkd.siblings().removeClass('first');
								}

								// выделение пунктов при зажатом Shift
								if(e.shiftKey) {
									var prev = false,
											next = false;
									clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
									clkd.prevAll().each(function() {
										if ($(this).is('.first')) prev = true;
									});
									clkd.nextAll().each(function() {
										if ($(this).is('.first')) next = true;
									});
									if (prev) {
										clkd.prevAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (next) {
										clkd.nextAll().each(function() {
											if ($(this).is('.selected')) return false;
												else $(this).not('.disabled, .optgroup').addClass('selected');
										});
									}
									if (li.filter('.selected').length == 1) clkd.addClass('first');
								}

								// отмечаем выбранные мышью
								option.prop('selected', false);
								li.filter('.selected').each(function() {
									var t = $(this);
									var index = t.index();
									if (t.is('.option')) index -= t.prevAll('.optgroup').length;
									option.eq(index).prop('selected', true);
								});
								el.change();

							});

							// отмечаем выбранные с клавиатуры
							option.each(function(i) {
								$(this).data('optionIndex', i);
							});
							el.on('change.styler', function() {
								li.removeClass('selected');
								var arrIndexes = [];
								option.filter(':selected').each(function() {
									arrIndexes.push($(this).data('optionIndex'));
								});
								li.not('.optgroup').filter(function(i) {
									return $.inArray(i, arrIndexes) > -1;
								}).addClass('selected');
							})
							.on('focus.styler', function() {
								selectbox.addClass('focused');
							})
							.on('blur.styler', function() {
								selectbox.removeClass('focused');
							});

							// прокручиваем с клавиатуры
							if (ulHeight > selectbox.height()) {
								el.on('keydown.styler', function(e) {
									// вверх, влево, PageUp
									if (e.which == 38 || e.which == 37 || e.which == 33) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
									}
									// вниз, вправо, PageDown
									if (e.which == 40 || e.which == 39 || e.which == 34) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
									}
								});
							}

						}
					} // end doMultipleSelect()

					if (el.is('[multiple]')) {

						// если Android или iOS, то мультиселект не стилизуем
						// причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
						// причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
						if (Android || iOS) return;

						doMultipleSelect();
					} else {
						doSelect();
					}

				}; // end selectboxOutput()

				selectboxOutput();

				// обновление при динамическом изменении
				el.on('refresh', function() {
					el.off('.styler').parent().before(el).remove();
					selectboxOutput();
				});

			// end select

			// reset
			} else if (el.is(':reset')) {
				el.on('click', function() {
					setTimeout(function() {
						el.closest(opt.wrapper).find('input, select').trigger('refresh');
					}, 1);
				});
			} // end reset

		}, // init: function()

		// деструктор
		destroy: function() {

			var el = $(this.element);

			if (el.is(':checkbox') || el.is(':radio')) {
				el.removeData().off('.styler').removeAttr('style').parent().before(el).remove();
				el.closest('label').add('label[for="' + el.attr('id') + '"]').off('.styler');
			} else if (el.is(':file') || el.is('select')) {
				el.removeData().off('.styler').removeAttr('style').parent().before(el).remove();
			}

		} // destroy: function()

	}; // Plugin.prototype

	$.fn[pluginName] = function(options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function() {
				if (!$.data(this, '_' + pluginName)) {
					$.data(this, '_' + pluginName, new Plugin(this, options));
				}
			})
			// колбек после выполнения плагина
			.promise()
			.done(function() {
				var opt = $(this[0]).data('_' + pluginName);
				if (opt) opt.options.onFormStyled.call();
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			var returns;
			this.each(function() {
				var instance = $.data(this, '_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
			});
			return returns !== undefined ? returns : this;
		}
	};

	// прячем выпадающий список при клике за пределами селекта
	function onDocumentClick(e) {
		// e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
		// (при изменении селекта с клавиатуры срабатывает событие onclick)
		if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {
			if ($('div.jq-selectbox.opened').length) {
				var selectbox = $('div.jq-selectbox.opened'),
						search = $('div.jq-selectbox__search input', selectbox),
						dropdown = $('div.jq-selectbox__dropdown', selectbox),
						opt = selectbox.find('select').data('_' + pluginName).options;

				// колбек при закрытии селекта
				opt.onSelectClosed.call(selectbox);

				if (search.length) search.val('').keyup();
				dropdown.hide().find('li.sel').addClass('selected');
				selectbox.removeClass('focused opened dropup dropdown');
			}
		}
	}
	onDocumentClick.registered = false;

}));
/* Copyright (c) 2006 Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * jQueryLastChangedDate: 2007-12-20 09:02:08 -0600 (Thu, 20 Dec 2007) jQuery
 * jQueryRev: 4265 jQuery
 *
 * Version: 3.0
 * 
 * Requires: jQuery 1.2.2+
 */

(function(jQuery) {

jQuery.event.special.mousewheel = {
	setup: function() {
		var handler = jQuery.event.special.mousewheel.handler;
		
		// Fix pageX, pageY, clientX and clientY for mozilla
		if ( jQuery.browser.mozilla )
			jQuery(this).bind('mousemove.mousewheel', function(event) {
				jQuery.data(this, 'mwcursorposdata', {
					pageX: event.pageX,
					pageY: event.pageY,
					clientX: event.clientX,
					clientY: event.clientY
				});
			});
	
		if ( this.addEventListener )
			this.addEventListener( (jQuery.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = handler;
	},
	
	teardown: function() {
		var handler = jQuery.event.special.mousewheel.handler;
		
		jQuery(this).unbind('mousemove.mousewheel');
		
		if ( this.removeEventListener )
			this.removeEventListener( (jQuery.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = function(){};
		
		jQuery.removeData(this, 'mwcursorposdata');
	},
	
	handler: function(event) {
		var args = Array.prototype.slice.call( arguments, 1 );
		
		event = jQuery.event.fix(event || window.event);
		// Get correct pageX, pageY, clientX and clientY for mozilla
		jQuery.extend( event, jQuery.data(this, 'mwcursorposdata') || {} );
		var delta = 0, returnValue = true;
		
		if ( event.wheelDelta ) delta = event.wheelDelta/120;
		if ( event.detail     ) delta = -event.detail/3;
//		if ( jQuery.browser.opera  ) delta = -event.wheelDelta;
		
		event.data  = event.data || {};
		event.type  = "mousewheel";
		
		// Add delta to the front of the arguments
		args.unshift(delta);
		// Add event to the front of the arguments
		args.unshift(event);

		return jQuery.event.handle.apply(this, args);
	}
};

jQuery.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});

})(jQuery);
/*
 * Tree - jQuery Tree Widget
 * @author Valerio Galano <v.galano@daredevel.com>
 * @license MIT
 * @see https://github.com/daredevel/jquery-tree
 * @version 0.1
 */
(function(a,b){a.widget("daredevel.tree",{_attachLi:function(d,f,c){var e=f.find("ul:first");if(e.length){if((b==c)||(e.children("li").length<c)){e.append(d)}else{if(c==0){c=c+1}e.children("li:nth-child("+c+")").before(d)}}else{e=a("<ul/>");f.append(e.append(d))}},_attachNode:function(e,d,c){if(b==d){var f=this.element;this._attachLi(e,f,c);this._initializeNode(e)}else{var f=d;this._attachLi(e,f,c);f.removeClass("leaf collapsed").addClass("expanded");this._initializeNode(e);this._initializeNode(f)}},_buildNode:function(e){e=a.extend(true,this.options.defaultNodeAttributes,e);var f=a("<span/>",e.span);var c=a("<li/>",e.li);if(a.inArray("checkbox",this.options.components)>-1){var d=a("<input/>",e.input);c.append(d)}c.append(f);return c},_create:function(){var c=this;this.options.core=this;this.element.addClass("ui-widget ui-widget-content daredevel-tree");if(this.options.checkbox){this._createCheckbox()}if(this.options.collapsible){this._createCollapsible()}if(this.options.dnd){this._createDnd()}if(this.options.selectable){this._createSelectable()}this.element.find("li").each(function(){c._initializeNode(a(this))});if(this.options.nodes!=null){a.each(this.options.nodes,function(d,e){c.options.core.addNode(e)})}},_destroy:function(){a.Widget.prototype.destroy.call(this)},_detachNode:function(d){var c=this.options.core.parentNode(d);var e=c.find("ul:first");if(e.children().length==1){e.detach();c.removeClass("collapsed expanded").addClass("leaf")}else{d.detach()}this.options.core._initializeNode(c)},_initializeComponents:function(){for(var d in this.options.components){var c="element.tree"+this.options.components[d]+"(options);";run=new Function("options","element",c);run(this.options,this.element)}},_initializeNode:function(c){c.children("span:last").addClass("daredevel-tree-label");if(this.options.checkbox){this._initializeCheckboxNode(c)}if(this.options.collapsible){this._initializeCollapsibleNode(c)}if(this.options.dnd){this._initializeDndNode(c)}if(this.options.selectable){this._initializeSelectableNode(c)}},addNode:function(f,e,d){var g=this;var c=this._buildNode(f);if((b==e)||0==e.length){this._attachNode(a(c),b,d)}else{this._attachNode(a(c),a(e),d)}if(b!=f.children){a.each(f.children,function(i,h){g.addNode(i,c)})}g._trigger("add",true,c)},isRoot:function(c){c=a(c);var d=c.parentsUntil(".daredevel-tree");return 1==d.length},moveNode:function(e,d,c){this._detachNode(a(e));if((b==d)||0==d.length){this._attachNode(a(e),b,c)}else{this._attachNode(a(e),a(d),c)}this._trigger("move",true,a(e))},parentNode:function(c){return a(c).parents("li:first")},removeNode:function(c){this._detachNode(a(c));this._trigger("remove",true,a(c))},_allDescendantChecked:function(c){return(c.find("li input:checkbox:not(:checked)").length==0)},_checkAncestors:function(c){c.parentsUntil("daredevel-tree").filter("li").find("input:checkbox:first:not(:checked)").prop("checked",true).change()},_checkDescendants:function(c){c.find("li input:checkbox:not(:checked)").prop("checked",true).change()},_checkOthers:function(c){var d=this;c.addClass("exclude");c.parents("li").addClass("exclude");c.find("li").addClass("exclude");a(this.element).find("li").each(function(){if(!a(this).hasClass("exclude")){a(this).find("input:checkbox:first:not(:checked)").prop("checked",true).change()}});a(this.element).find("li").removeClass("exclude")},_createCheckbox:function(){var c=this;this.element.on("click","input:checkbox:not(:checked)",function(){c.uncheck(c.options.core.parentNode(a(this)))});this.element.on("click","input:checkbox:checked",function(){c.check(c.options.core.parentNode(a(this)))});if(this.options.onUncheck.node=="collapse"){this.element.on("click","input:checkbox:not(:checked)",function(){c.options.core.collapse(c.options.core.parentNode(a(this)))})}else{if(this.options.onUncheck.node=="expand"){this.element.on("click","input:checkbox:not(:checked)",function(){c.options.core.expand(c.options.core.parentNode(a(this)))})}}if(this.options.onCheck.node=="collapse"){this.element.on("click","input:checkbox:checked",function(){c.options.core.collapse(c.options.core.parentNode(a(this)))})}else{if(this.options.onCheck.node=="expand"){this.element.on("click","input:checkbox:checked",function(){c.options.core.expand(c.options.core.parentNode(a(this)))})}}},_initializeCheckboxNode:function(c){},_uncheckAncestors:function(c){c.parentsUntil("daredevel-tree").filter("li").find("input:checkbox:first:checked").prop("checked",false).change()},_uncheckDescendants:function(c){c.find("li input:checkbox:checked").prop("checked",false).change()},_uncheckOthers:function(c){var d=this;c.addClass("exclude");c.parents("li").addClass("exclude");c.find("li").addClass("exclude");a(this.element).find("li").each(function(){if(!a(this).hasClass("exclude")){a(this).find("input:checkbox:first:checked").prop("checked",false).change()}});a(this.element).find("li").removeClass("exclude")},check:function(c){c=a(c);c.find("input:checkbox:first:not(:checked)").prop("checked",true).change();if(this.options.onCheck.others=="check"){this._checkOthers(c)}else{if(this.options.onCheck.others=="uncheck"){this._uncheckOthers(c)}}if(this.options.onCheck.descendants=="check"){this._checkDescendants(c)}else{if(this.options.onCheck.descendants=="uncheck"){this._uncheckDescendants(c)}}if(this.options.onCheck.ancestors=="check"){this._checkAncestors(c)}else{if(this.options.onCheck.ancestors=="uncheck"){this._uncheckAncestors(c)}else{if(this.options.onCheck.ancestors=="checkIfFull"){var d=this.options.core.isRoot(c);var e=this._allDescendantChecked(this.options.core.parentNode(c));if(!d&&e){this.check(this.options.core.parentNode(c))}}}}},checkAll:function(){a(this.element).find("input:checkbox:not(:checked)").prop("checked",true).change()},uncheck:function(c){c=a(c);c.find("input:checkbox:first:checked").prop("checked",false).change();if(this.options.onUncheck.others=="check"){this._checkOthers(c)}else{if(this.options.onUncheck.others=="uncheck"){this._uncheckOthers(c)}}if(this.options.onUncheck.descendants=="check"){this._checkDescendants(c)}else{if(this.options.onUncheck.descendants=="uncheck"){this._uncheckDescendants(c)}}if(this.options.onUncheck.ancestors=="check"){this._checkAncestors(c)}else{if(this.options.onUncheck.ancestors=="uncheck"){this._uncheckAncestors(c)}}},uncheckAll:function(){a(this.element).find("input:checkbox:checked").prop("checked",false).change()},_createCollapsible:function(){var c=this;this.element.on("click","li span.daredevel-tree-anchor",function(){var d=c.options.core.parentNode(a(this));if(d.hasClass("collapsed")){c.expand(d)}else{if(d.hasClass("expanded")){c.collapse(d)}}})},_initializeCollapsibleNode:function(c){var e=this;var d=c.children("span.daredevel-tree-anchor");if(d.length<1){c.prepend(a("<span />",{"class":"daredevel-tree-anchor"}))}if(c.hasClass("leaf")){e._markAsLeaf(c)}else{if(c.hasClass("collapsed")){e.collapse(c,false,true)}else{if(c.hasClass("expanded")){e.expand(c,false,true)}else{if(c.is("li:not(:has(ul))")){e._markAsLeaf(c)}else{e._markAsExpanded(c)}}}}},_markAsCollapsed:function(c){var d=c.children("span.daredevel-tree-anchor");d.removeClass("ui-icon "+this.options.expandUiIcon+" "+this.options.leafUiIcon);if(this.options.collapseUiIcon.length>0){d.addClass("ui-icon "+this.options.collapseUiIcon)}c.removeClass("leaf").removeClass("expanded").addClass("collapsed")},_markAsExpanded:function(c){var d=c.children("span.daredevel-tree-anchor");d.removeClass("ui-icon "+this.options.collapseUiIcon+" "+this.options.leafUiIcon);if(this.options.expandUiIcon.length>0){d.addClass("ui-icon "+this.options.expandUiIcon)}c.removeClass("leaf").removeClass("collapsed").addClass("expanded")},_markAsLeaf:function(c){var d=c.children("span.daredevel-tree-anchor");d.removeClass("ui-icon "+this.options.collapseUiIcon+" "+this.options.expandUiIcon);if(this.options.leafUiIcon.length>0){d.addClass("ui-icon "+this.options.leafUiIcon)}c.removeClass("collapsed").removeClass("expanded").addClass("leaf")},_unmark:function(){li.removeClass("collapsed expanded leaf")},collapse:function(c,e,f){c=a(c);if(f==b){f=false}if(!f&&(c.hasClass("collapsed")||c.hasClass("leaf"))){return}if(e==b){e=true}var d=this;if(e){c.children("ul").hide(this.options.collapseEffect,{},this.options.collapseDuration);setTimeout(function(){d._markAsCollapsed(c,d.options)},d.options.collapseDuration)}else{c.children("ul").hide();d._markAsCollapsed(c,d.options)}d.options.core._trigger("collapse",true,c)},collapseAll:function(){var c=this;a(this.element).find("li.expanded").each(function(){c.collapse(a(this))})},expand:function(c,e,f){c=a(c);if(f==b){f=false}if(!f&&(c.hasClass("expanded")||c.hasClass("leaf"))){return}if(e==b){e=true}var d=this;if(e){c.children("ul").show(d.options.expandEffect,{},d.options.expandDuration);setTimeout(function(){d._markAsExpanded(c,d.options)},d.options.expandDuration)}else{c.children("ul").show();d._markAsExpanded(c,d.options)}d.options.core._trigger("expand",true,c)},expandAll:function(){var c=this;a(this.element).find("li.collapsed").each(function(){c.expand(a(this))})},_createDnd:function(){var c=this},_initializeDndNode:function(c){var d=this;var e=a("<span/>",{"class":"prepended",html:"<br/>"}).droppable({hoverClass:"over",drop:function(i,j){var h=a(this).closest("li");if(d.options.core.isRoot(h)){var g=b;var k=d.options.core.element}else{var g=h.parent().closest("li");var k=g;if(a(j.draggable.parent("li")).find(g).length){return}}var f=a(a(this).parent("li")).index()+1;d.options.core.moveNode(j.draggable.parent("li"),g,f);d._trigger("drop",i,{draggable:j.draggable,droppable:g})}});a(c).find(".daredevel-tree-label:first").after(e);a(c).find(".daredevel-tree-label:first").draggable({start:function(f,g){a(this).parent("li").find("ul, .prepended").css("visibility","hidden");a(this).parent("li").find(".droppable-label").css("display","none")},stop:function(f,g){a(this).parent("li").find("ul").css("visibility","visible");a(this).parent("li").find(".prepended").css("visibility","");a(this).parent("li").find(".droppable-label").css("display","inherit")},revert:true,revertDuration:0});var e=a("<span/>",{"class":"droppable-label",html:"<br/>"}).droppable({drop:function(g,h){var f=a(this).closest("li");if(a(h.draggable.parent("li")).find(f).length){return}d.options.core.moveNode(h.draggable.parent("li"),f,1);d._trigger("drop",g,{draggable:h.draggable,droppable:f})},over:function(f,g){a(this).parent("li").find(".daredevel-tree-label:first").addClass("ui-state-hover")},out:function(f,g){a(this).parent("li").find(".daredevel-tree-label:first").removeClass("ui-state-hover")}});a(c).find(".daredevel-tree-label:first").after(e)},_createSelectable:function(){var d=this;var c=".daredevel-tree-label:not(."+this.options.selectUiClass+")";this.element.on("click",c,function(){d.select(a(this).parent("li"))})},_deselect:function(c){c.find("span.daredevel-tree-label:first").removeClass(this.options.selectUiClass);this._trigger("deselect",true,c)},_destroySelectable:function(){},_initializeSelectableNode:function(c){},_select:function(c){c.find("span.daredevel-tree-label:first").addClass(this.options.selectUiClass);this._trigger("select",true,c)},deselect:function(){var c=this;this.element.find(".daredevel-tree-label."+this.options.selectUiClass).each(function(){c._deselect(a(this).parent("li"))})},select:function(c){c=a(c);this.deselect();this._select(c)},selected:function(){var c=this.element.find(".daredevel-tree-label."+this.options.selectUiClass);return a(c).parent()},options:{defaultNodeAttributes:{span:{html:"new node"},li:{"class":"leaf"},input:{type:"checkbox"}},nodes:null,checkbox:true,onCheck:{ancestors:"check",descendants:"check",node:"",others:""},onUncheck:{ancestors:"",descendants:"uncheck",node:"",others:""},collapsible:true,collapseDuration:400,collapseEffect:"blind",collapseUiIcon:"ui-icon-triangle-1-e",expandDuration:400,expandEffect:"blind",expandUiIcon:"ui-icon-triangle-1-se",leafUiIcon:"",dnd:true,drop:function(d,c){},selectable:true,deselect:function(d,c){},selectUiClass:"ui-state-active",select:function(d,c){}}});a.ui.draggable.prototype._getRelativeOffset=function(){if(this.cssPosition=="relative"){var c=this.element.position();return{top:c.top-(parseInt(this.helper.css("top"),10)||0),left:c.left-(parseInt(this.helper.css("left"),10)||0)}}else{return{top:0,left:0}}}})(jQuery);