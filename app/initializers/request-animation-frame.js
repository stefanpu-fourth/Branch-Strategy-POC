export function initialize(/* container, application */) {

  window.requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { return setTimeout(callback, 1000 / 60); };

  window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.msCancelAnimationFrame
    || function (id) { window.clearTimeout(id); };
}

export default {
  name: 'request-animation-frame',
  initialize: initialize
};
