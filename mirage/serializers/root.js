import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({

  serialize(response) {
    return this._serializePrimaryModel(response[0]);
  }

});
