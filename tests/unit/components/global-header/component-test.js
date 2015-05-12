import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('global-header', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
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

test('it has correct tag- and class-name', function(assert) {
  assert.expect(2);

  var correctTag = 'nav';
  var correctClass = 'global-header';

  console.log(this.$().prop('tagName') + ' | ' + correctTag);

  assert.equal(this.$().prop('tagName').toLowerCase() === correctTag, true, 'tagName is correct');
  assert.equal(this.$().hasClass(correctClass), true, 'className is correct');
});
