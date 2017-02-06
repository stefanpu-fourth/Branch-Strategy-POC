import EssAdapter from './ess';
import DS from 'ember-data';

export default EssAdapter.extend({
  namespace: "",
  adapterName: "super adapter",

  /**
    Handles responses from the API.
    In case of a response with status code 400
    and ErrorCode of 'error_updating_employee' manually create an DS.InvalidError
    object indicating to the flow that the problem is an initally conditional field
    needs to be set to mandatory.

    @method handleResponse
    @type Object
    @public
  */
  handleResponse(status, headers, payload) {
    if (payload.StatusCode === 400 && payload.ErrorCode === 'error_updating_employee' && payload.Message) {
      return new DS.InvalidError([{
        errorCase: 'mandatory_property',
        detail: payload.Message,
        status: payload.StatusCode
      }]);
    }

    return this._super(status, headers, payload);
  }
});
