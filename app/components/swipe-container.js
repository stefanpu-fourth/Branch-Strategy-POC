import Ember from 'ember';

var run = Ember.run,
    w = window,
    doc = document,
    math = Math;

export default Ember.Component.extend({

    classNames: [ 'swipe' ],

    didInsertElement: function () {
        this.$(w).on('resize', run.bind(this, 'resizeHandler'));
        run.once(this, 'resizeHandler');

        this.setActiveCard();
    },

    resizeHandler: function () {
        var $el = this.$();
        var $wrap = $el.find('.swipe__wrap');
        var $cards = $wrap.children('.card');
        var viewPortWidth = this.getViewPortWidth();
        var activeCardPos = 0;

        $cards.css('width', viewPortWidth - 64);
        $wrap.css({
            transform: 'translate3d('+-Math.abs(activeCardPos*(viewPortWidth-48))+'px, 0, 0)',
            visibility: 'visible'
        });
    },

    getViewPortWidth: function () {
        return math.max(doc.documentElement.clientWidth, w.innerWidth || 0);
    },

    setActiveCard: function (index=0) {
        this.$().find('.card').eq(index).addClass('card--active');
    },

    swipe: function () {
        console.log('swipe');
    },

    pan: function () {
        console.log('pan');
    },

    panStart: function () {
        console.log('panStart');
    },

    panEnd: function () {
        console.log('panEnd');
    },
});
