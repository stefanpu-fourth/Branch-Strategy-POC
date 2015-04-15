import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import moment from 'ess/helpers/moment';

moduleForComponent('rota-day', {
  needs: ['helper:moment', 'component:rota-bar'],
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

test('it can detect non-rota days', function(assert) {
  assert.expect(7);

  // Creates the component instance
  var component = this.subject();

  component.set('shift', { type: 'on' });
  assert.equal(component.get('isNotRota'), false);
  component.set('shift', { type: 'off' });
  assert.equal(component.get('isNotRota'), false);
  component.set('shift', { type: 'On' });
  assert.equal(component.get('isNotRota'), false);
  component.set('shift', { type: 'OFF' });
  assert.equal(component.get('isNotRota'), false);
  component.set('shift', { type: 'Xon' });
  assert.equal(component.get('isNotRota'), true);
  component.set('shift', { type: 'Xoff' });
  assert.equal(component.get('isNotRota'), true);
  component.set('shift', { type: 'Holiday' });
  assert.equal(component.get('isNotRota'), true);
});
