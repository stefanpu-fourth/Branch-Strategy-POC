import Ember from 'ember';

var resolve = Ember.RSVP.resolve;

export default Ember.Mixin.create({
  findAllWithCache(modelName) {
    var records = Ember.A();
    var len = arguments.length;

    //use cache for find and findQuery
    if (len === 1 || (len === 2 && typeof arguments[1] === 'object')) {
      records = this.store.peekAll(modelName);
    }

    //resolve to to found records or create a new request
    return records.get('length') ? resolve(records) : this.store.findAll.apply(this.store, arguments);
  },

  queryWithCache(modelName) {
    var records = this.store.peekAll(modelName);

    return records.get('length') ? resolve(records) : this.store.query.apply(this.store, arguments);
  },

  findWithCache(modelName, id) {
    var record = this.store.peekRecord(modelName, id);
    return record ? resolve(record) : this.store.find.apply(this.store, arguments);
  }
});
