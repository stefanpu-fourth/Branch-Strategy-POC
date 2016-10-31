import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const employee = Ember.computed.reads('details.attrs.employee');

const tabContainerConfig = [
  {
    name: 'name',
    title: 'Tab 1',
    component: 'edit-name-form',
    componentModel: employee,
    active: true
  }, {
    name: 'contact',
    title: 'Tab 2',
    component: 'edit-contact-form',
    componentModel: employee,
    active: false
  }
];

moduleForComponent('tabbed-container', {
  needs: [
    'component:edit-name-form',
    'component:edit-contact-form'
  ]
});

test('it renders', function (assert) {
  assert.expect(2);

  // Create the component instance
  const component = this.subject({
    tabs: tabContainerConfig
  });
  assert.equal(component._state, 'preRender');

  // Render component
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('component properties are set', function (assert) {
  assert.expect(1);

  // Create the component instance
  const component = this.subject({
    tabs: tabContainerConfig
  });

  assert.deepEqual(component.get('tabs'), tabContainerConfig, 'Test if configuration object is being set properly.');
});

test('default properties', function (assert) {
  assert.expect(3);

  // Create the component instance
  const component = this.subject({
    tabs: tabContainerConfig
  });

  const activeTabConfig = tabContainerConfig.find(tab => tab.active);

  assert.deepEqual(component.get('activeTab'), activeTabConfig, 'Test if "activeTab" equals actual active tab');
  assert.equal(component.get('activeTabComponent'), activeTabConfig.component, 'Test if "activeTabComponent" equals actual active tab component');
  assert.equal(component.get('activeTabComponentModel'), activeTabConfig.componentModel, 'Test if "activeTabComponentModel" equals actual active tab component model');
});

test('tab switch', function (assert) {
  assert.expect(6);

  // Create the component instance
  const component = this.subject({
    tabs: tabContainerConfig
  });

  const tab1Id = '#' + tabContainerConfig[0].name + '-tab';
  const tab2Id = '#' + tabContainerConfig[1].name + '-tab';

  assert.ok(this.$(tab1Id).hasClass('tabbed-container__tab--active'), 'Test if the active tab has "tabbed-container__tab--active" class.');

  this.$(tab2Id).click();

  const activeTabAfterClickConfig = tabContainerConfig[1];

  assert.notOk(this.$(tab1Id).hasClass('tabbed-container__tab--active'), 'Test if the inactive tab does not have "tabbed-container__tab--active" class.');
  assert.ok(this.$(tab2Id).hasClass('tabbed-container__tab--active'), 'Test if the active tab has "tabbed-container__tab--active" class.');
  assert.deepEqual(component.get('activeTab'), activeTabAfterClickConfig, 'Test if "activeTab" equals actual active tab');
  assert.equal(component.get('activeTabComponent'), activeTabAfterClickConfig.component, 'Test if "activeTabComponent" equals actual active tab component');
  assert.equal(component.get('activeTabComponentModel'), activeTabAfterClickConfig.componentModel, 'Test if "activeTabComponentModel" equals actual active tab component model');
});
