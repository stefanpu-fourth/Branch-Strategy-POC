import DS from 'ember-data';
import config from 'ess/config/environment';

var Root = DS.Model.extend({
  token: DS.attr('string') //TODO: remove this after SF integration
});

Root.reopenClass({
  FIXTURES: config.employees.map(function (employee) {
    return { id: employee.id, token: employee.token };
  })
});

export default Root;

/*export default DS.Model.extend({
});
*/
