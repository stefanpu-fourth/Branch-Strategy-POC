import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import t from 'ess/helpers/t';

moduleForComponent('hr-card', {
  needs: ['component:svg-icon'],
  beforeEach: function() {
    Ember.Handlebars.registerHelper('t', t);
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
