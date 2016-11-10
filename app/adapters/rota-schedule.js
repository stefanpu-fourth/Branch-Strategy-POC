import EssAdapter from './ess';
import config from 'ess/config/environment';

export default EssAdapter.extend({
  _buildOdataUrl: function(type, qstring) {
    return `${this.urlPrefix()}/${this.pathForType(type.modelName).toLowerCase()}?${qstring}`;
  },

  query: function(store, type, query) {
    const isDev = (config.environment === 'development') ? true : false;
    let qstring = '';

    // If we are in the development environment,
    // we serve up the RedirectToUI and DefaultTestData flags
    // so the API will serve up some dummy data
    if (isDev) {
      qstring = `$filter=RedirectToUI eq true and DefaultTestData eq true`;
    } else if (query.RequestDate) {
      qstring = `$filter=RequestDate eq ${query.RequestDate} and NoPreviousWeeks eq 2 and NoFutureWeeks eq 2`;
    }

    const url = this._buildOdataUrl(type, qstring);

    return this.ajax(url);
  }
});
