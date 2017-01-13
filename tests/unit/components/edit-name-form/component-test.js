import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const employee = {
  selectedTitle: '',
  firstNames: 'John',
  middleNames: 'Roe',
  surname: 'Doe'
};

const titlesList = ['', 'Mr', 'Mrs', 'Ms', 'Miss'];

moduleForComponent('edit-name-form', {
  needs: [
    'component:input-field',
    'component:dropdown-field',
    'helper:t'
  ]
});

test('it renders', function (assert) {
  assert.expect(2);

  // Create the component instance
  const component = this.subject({
    model: employee,
    titles: titlesList
  });
  assert.equal(component._state, 'preRender');

  // Render component
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('component properties are set', function (assert) {
  assert.expect(2);

  // Create the component instance
  const component = this.subject({
    model: employee,
    titles: titlesList
  });

  assert.deepEqual(component.get('model'), employee, 'Test if configuration object is being set properly.');
  assert.deepEqual(component.get('titles'), titlesList, 'Test if configuration object is being set properly.');
});
