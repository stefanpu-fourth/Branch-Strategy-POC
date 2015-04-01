import Ember from 'ember';

var run = Ember.run;
var w = window;
var doc = document;
var math = Math;
var horizontalPanHandler = function (e) {
    var evt = e.originalEvent;
    var gesture = evt.gesture;
    var deltaX = gesture.deltaX;
    var deltaY = gesture.deltaY;
    var isMoving = this.get('isMoving');
    var $wrap;
    var xPos;

    if (isMoving || math.abs(deltaY) > math.abs(deltaX)) {
        return;
    }

    $wrap = this.$().find('.swipe__wrap');
    xPos = deltaX + this.get('xPosStart');

    if (!$wrap.hasClass('swipe--loaded')) {
        $wrap.addClass('swipe--loaded');
    }

    $wrap.addClass('swipe--dragging').css({ transform: `translate3d(${xPos}px, 0, 0)` });

    this.setProperties({
        xPos: xPos,
        deltaX: deltaX
    });
};

export default Ember.Component.extend({

    classNames: [ 'swipe' ],

    xPos: 0,

    deltaX: 0,

    xPosStart: 0,

    activeCardIndex: 0,

    isMoving: false,

    didInsertElement: function () {
        var transitionEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

        //bind handlers
        this.$(w).on('resize', run.bind(this, 'resizeHandler'));
        this.$().find('.swipe__wrap').on(transitionEvents, run.bind(this, 'transitionEnd'));

        //init viewport
        run.once(this, 'resizeHandler');
        this.setActiveCard();
    },

    getViewPortWidth: function () {
        return math.max(doc.documentElement.clientWidth, w.innerWidth || 0);
    },

    setActiveCard: function (index=0) {
        var $cards;

        if (index === this.get('activeCardIndex')) {
            return;
        }

        this.set('activeCardIndex', index);

        $cards = this.$().find('.card');
        $cards.removeClass('card--active').eq(index).addClass('card--active');
    },

    setWrapOffset: function (index, viewPortWidth) {
        var $wrap = this.$().find('.swipe__wrap');
        var wrapOffset;

        viewPortWidth = viewPortWidth || this.getViewPortWidth();
        wrapOffset = -math.abs(index * (viewPortWidth - 48));

        $wrap.css({
            transform: `translate3d(${wrapOffset}px, 0, 0)`,
            visibility: 'visible'
        });
    },

    resizeHandler: function () {
        var $wrap = this.$().find('.swipe__wrap');
        var $cards = $wrap.children('.card');
        var viewPortWidth = this.getViewPortWidth();
        var activeCardIndex = this.get('activeCardIndex');

        $cards.css('width', viewPortWidth - 64);
        this.setWrapOffset(activeCardIndex, viewPortWidth);
    },

    transitionEnd: function () {
        var $wrap = this.$().find('.swipe__wrap');

        this.setProperties({
            xPosStart: $wrap.offset().left - 30,
            isMoving: false
        });
    },

    panEnd: function (e) {
        var evt = e.originalEvent;
        var gesture = evt.gesture;
        var deltaX = gesture.deltaX;
        var deltaY = gesture.deltaY;
        var $wrap;
        var $cards;
        var currentDelta;
        var activeCardIndex;

        if (math.abs(deltaY) > math.abs(deltaX)) {
            return;
        }

        $wrap = this.$().find('.swipe__wrap');
        $cards = $wrap.children('.card');

        currentDelta = this.get('deltaX');
        activeCardIndex = this.get('activeCardIndex');

        $wrap.removeClass('swipe--dragging');

        this.set('isMoving', true);

        if (currentDelta < 0) {
            if (activeCardIndex !== $cards.length - 1) {
                activeCardIndex++;
            }
        }
        else {
            if (activeCardIndex !== 0) {
                activeCardIndex--;
            }
        }

        this.setWrapOffset(activeCardIndex);
        this.setActiveCard(activeCardIndex);
    },

    panLeft: horizontalPanHandler,

    panRight: horizontalPanHandler
});
