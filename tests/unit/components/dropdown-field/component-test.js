import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('dropdown-field', {
  needs: [
    'component:svg-icon',
    'component:x-select',
    'component:x-option',
    'template:partials/icons/chevron-right'
  ]
});

test('it renders', function (assert) {
  assert.expect(2);

  // Create the component instance
  const component = this.subject();
  assert.equal(component._state, 'preRender');

  // Render component
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('component properties are set', function (assert) {
  assert.expect(3);

  const component = this.subject({
    selectedItem: '',
    itemsList: ['item1', 'item2', 'item3'],
    placeholder: 'test placeholder'
  });

  const selectElement = this.$('select');
  const optionsList = this.$('option');
  const actualSelectedItem = selectElement.val();
  const actualItemsList = $.map(optionsList, function (option) {
    return option.value;
  });
  const actualPlaceholder = this.$('#placeholder').text();

  assert.equal(actualSelectedItem, 'item1', '"selectedItem" property should be "item1".');
  assert.deepEqual(actualItemsList, ['item1', 'item2', 'item3'],
    'Items list should be ["item1", "item2", "item3"]');
  assert.equal(actualPlaceholder, 'test placeholder',
    'Input element type should be set to "test placeholder".');
});

test('selecting item from the list', function (assert) {
  assert.expect(1);

  const component = this.subject({
    selectedItem: '',
    itemsList: ['item1', 'item2', 'item3']
  });

  const selectElement = this.$('select');

  selectElement
    .val('item2')
    .trigger('change');

  assert.equal(component.get('selectedItem'), 'item2', component.get('selectedItem') + '');
});

test('"focusIn" action triggers', function (assert) {
  assert.expect(4);

  const component = this.subject({
    selectedItem: '',
    itemsList: ['', 'item1', 'item2', 'item3']
  });

  const selectElement = this.$('select');

  assert.notOk(component.get('isFocused'),
    '"isFocused" should be set to false, since the value is an empty string.');
  assert.notOk(this.$('#placeholder').hasClass('focused'), 'The label element should not have a class named "focused"');

  selectElement.focus();

  assert.ok(component.get('isFocused'),
    '"isFocused" should be set to true, since on the input element has been triggered a focus event.');
  assert.ok(this.$('#placeholder').hasClass('focused'), 'The label element should have a class named "focused"');
});

test('"focusOut" action triggers', function (assert) {
  assert.expect(8);

  const component = this.subject({
    selectedItem: '',
    itemsList: ['', 'item1', 'item2', 'item3']
  });

  const selectElement = this.$('select');

  // Test if "isFocused" is true when an item is selected.
  selectElement
    .val('item2')
    .trigger('change');

  assert.ok(component.get('isFocused'),
    '"isFocused" should be set to true, since there is a value.');
  assert.ok(this.$('#placeholder').hasClass('focused'), 'The label element should have a class named "focused"');

  // Test if "isFocused" is still true after "focusIn" and "focusOut" events.
  selectElement.focus();
  selectElement.focusout();
  assert.ok(component.get('isFocused'),
    '"isFocused" should be set to true, since there is a value.');
  assert.ok(this.$('#placeholder').hasClass('focused'),
    'The label element should have a class named "focused"');

  // Test if "isFocused" is true after selected item is set to an empty string and а "focusin" event is triggered on the element.
  selectElement
    .val('')
    .trigger('change');

  selectElement.focus();
  assert.ok(component.get('isFocused'),
    '"isFocused" should be set to true, since the element is focused.');
  assert.ok(this.$('#placeholder').hasClass('focused'),
    'The label element should have a class named "focused"');

  // Test if "isFocused" is false after selected item is set to an empty string and a "focusout" event is triggered.
  selectElement.focusout();
  assert.notOk(component.get('isFocused'),
    '"isFocused" should be set to false, since the value is set to an empty string.');
  assert.notOk(this.$('#placeholder').hasClass('focused'),
    'The label element should not have a class named "focused"');
});
