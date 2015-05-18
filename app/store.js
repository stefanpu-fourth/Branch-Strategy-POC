import DS from 'ember-data';
import Ember from 'ember';
import config from 'ess/config/environment';

var resolve = Ember.RSVP.resolve;

export default DS.Store.extend({

  cacheResources: config.cacheResources,

  //DS.Store.find throws an error if id is "undefined"
  find(typeKey/*, id, preload*/) {
    var records = Ember.A();

    //avoid calling all if we don't need to
    if (this.cacheResources) {
      records = this.all(typeKey);
    }

    //resolve to to found records or create a new request
    return records.get('length') ? resolve(records) : this._super.apply(this, arguments);
  }
});
