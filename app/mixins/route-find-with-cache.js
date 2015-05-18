import Ember from 'ember';
import config from 'ess/config/environment';

var resolve = Ember.RSVP.resolve;

export default Ember.Mixin.create({

  cacheResources: config.cacheResources,

  findWithCache(typeKey/*, id, preload*/) {
    var records = Ember.A();

    //avoid calling all if we don't need to
    if (this.cacheResources) {
      records = this.store.all(typeKey);
    }

    //resolve to to found records or create a new request
    return records.get('length') ? resolve(records) : this.store.find.apply(this.store, arguments);
  }

});
