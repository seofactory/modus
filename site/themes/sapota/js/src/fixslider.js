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