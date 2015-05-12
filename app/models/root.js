import DS from 'ember-data';
import config from 'ess/config/environment';

var Root = DS.Model.extend({});

Root.reopenClass({
  FIXTURES: config.employees.map(function (employee) {
    return { id: employee };
  })
});

export default Root;

/*export default DS.Model.extend({
});
*/
