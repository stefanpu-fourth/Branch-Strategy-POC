import Siren from './siren';

export default Siren.extend({
  normalize: function(type, hash, prop) {
    hash.id = hash.processingDate;
    return this._super(type, hash, prop);
  }
});
