import SirenSerializer from './siren';

export default SirenSerializer.extend({
  extractArray: function(store, type, payload) {
    return [this.extractSingle(store, type, payload)];
  }
});
