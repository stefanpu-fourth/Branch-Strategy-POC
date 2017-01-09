import EssAdapter from './ess';
import config from 'ess/config/environment';

export default EssAdapter.extend({
  namespace: "",
  update(employee) {
    debugger;
    const url = config.apiBaseUrl + `/employees/${employee.id}`;
    // this.store.update('employee', employee);
    // const url = this.buildURL(modelName) + '/update';
    return this.ajax(url, 'PUT', { data: employee })
        .then(function() {
          debugger;
          console.log('data');
        });
  }
});
