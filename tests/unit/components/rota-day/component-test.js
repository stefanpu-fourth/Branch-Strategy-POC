import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import moment from 'ess/helpers/moment';

moduleForComponent('rota-day', {
  needs: ['helper:moment', 'component:rota-bar', 'component:svg-icon'],
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  beforeEach: function () {
    Ember.Handlebars.registerHelper('moment', moment);
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
