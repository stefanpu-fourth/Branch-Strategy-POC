import SirenSerializer from './siren';

export default SirenSerializer.extend({
  extractArray: function(store, type, payload) {
    return [this.extractSingle(store, type, payload)];
  },

  normalize: function(type, hash, prop) {
    hash.id = hash.employeeId;
    return this._super(type, hash, prop);
  }
});
