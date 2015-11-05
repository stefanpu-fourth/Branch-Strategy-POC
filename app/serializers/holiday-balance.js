import SirenSerializer from './ess';

export default SirenSerializer.extend({
  normalizeArrayResponse(store, primaryModelClass, payload) {
    var normalized = this.normalizeSingleResponse(store, primaryModelClass, payload);
    return {
      data: [normalized.data]
    };
  },

  // TODO - delete me and friends
  extractArray: function(store, type, payload) {
    return [this.extractSingle(store, type, payload)];
  }
});
