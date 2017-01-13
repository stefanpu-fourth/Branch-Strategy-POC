import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const employee = {
  selectedTitle: '',
  surname: 'Doe',
  firstNames: 'John',
  middleNames: 'Roe',
  address1: 'address1',
  address2: 'address2',
  address3: 'address3',
  town: 'Town',
  county: 'County',
  country: 'Country',
  postCode: '0000',
  homeTel: '000-000-000',
  mobileTel: '00000-000-000-000',
  workEmail: 'work@email.com',
  homeEmail: 'home@email.com'
};

const selectedTabName = 'name';

moduleForComponent('edit-employee', {
  needs: [
    'component:svg-icon',
    'template:partials/icons/chevron-left',
    'template:partials/icons/tick-icon',
    'component:tabbed-container',
    'helper:t'
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
  assert.expect(4);

  // Create the component instance
  const component = this.subject({
    selectedForEdit: selectedTabName,
    employee: employee,
    isOpen: true
  });

  const selectedTab = component.get('tabContainerConfig').find(tab => tab.name === selectedTabName);

  assert.equal(component.get('selectedForEdit'), selectedTabName, 'Test if property "selectedForEdit" is being set.');
  assert.deepEqual(component.get('employee'), employee, 'Test if configuration object is being set properly.');
  assert.ok(component.get('isOpen', 'Test if property "isOpen" is true'));
  assert.ok(selectedTab.active, 'Test if the selected tab property "active" is true');
});
