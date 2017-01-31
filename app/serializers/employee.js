import SirenSerializer from './siren';

export default SirenSerializer.extend({

  /**
    Serializes employee object into json object to be sent to the API, adds the
    id in order to be included for the PUT request to the server.

    @method serialize
    @type Object
    @public
  */
  serialize: function(record) {
    let json = this._super.apply(this, arguments);

    json.id = record.id;

    return json;
  }
});
