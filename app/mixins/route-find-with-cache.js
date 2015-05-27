import Ember from 'ember';

var resolve = Ember.RSVP.resolve;

export default Ember.Mixin.create({
  findWithCache(typeKey/*, id, preload*/) {
    var records = Ember.A();

    if (arguments.length === 1) {
      records = this.store.all(typeKey);
    }

    //resolve to to found records or create a new request
    return records.get('length') ? resolve(records) : this.store.find.apply(this.store, arguments);
  }

});
