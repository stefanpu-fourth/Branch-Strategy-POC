import QUnit, { test, start, stop } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from 'ess/tests/helpers/module-for-acceptance';
import page from 'ess/tests/pages/details';

moduleForAcceptance('Acceptance | edit personal details', {
  beforeEach() {
    this.id = server.create('root').id;
    this.mainEmployment = server.create('mainEmployment', { employeeId: this.id });
    this.employee = server.create('employee', { employeeId: this.id });
  }
});

/**
 * Scenario: Verify presence of edit name and edit contact buttons.
 *
 * Given I am on the ESS home-page
 * When I tap / click on the HR DETAILS tab
 * Then I see "Update" buttons for both the user's Name and Contact data
 */
test('Verify presence of edit name and edit contact buttons.', function (assert) {
  page.visit();

  assert.expect(2);

  andThen(() => {
    assert.ok(page.editNameButton.isVisible, 'Edit name button should be visible.');
    assert.ok(page.editContactButton.isVisible, 'Edit contact button should be visible.');
  });
});

/**
 * Scenario: Verify there is a header with a Back and Close buttons in the modal.
 *
 * Given I am on the ESS home-page
 * When I tap / click on the HR DETAILS tab
 * And I tap / click on any "Update" button from Name or Contact
 * Then I see a header for the new modal, with a Back / Close button
 */
test('Verify there is a header with a Back and Close buttons in the modal.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  assert.expect(4);

  andThen(() => {
    assert.ok(page.modal.isVisible, 'Modal window should be visible.');
    assert.ok(page.modal.header.isVisible, 'Modal window header should be visible.');
    assert.ok(page.modal.header.backButton.isVisible, 'Modal window back button should be visible.');
    assert.ok(page.modal.header.saveButton.isVisible, 'Modal window save button should be visible.');
  });
});

/**
 * Scenario: Verify presence of name and contact tabs.
 *
 * Given I am on the ESS home-page
 * And I tap / click on the HR DETAILS tab
 * When I tap / click on either "Update" button
 * Then I see tabs for Name / Contact in the new modal
 */
test('Verify presence of name and contact tabs.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  assert.expect(2);

  andThen(() => {
    assert.ok(page.modal.tabs.name.isVisible, 'Modal window name tab should be visible.');
    assert.ok(page.modal.tabs.contact.isVisible, 'Modal window contact tab should be visible.');
  });
});

/**
 * Scenario: Verify tapping edit name button will open modal with active name tab.
 *
 * Given I am on the ESS home-page
 * And I tap / click on the HR DETAILS tab
 * When I tap / click on "Update" next to Name
 * Then I see a modal / full-screen view where I can edit Name data
 * And I see the selected tab as Name
 */
test('Verify tapping edit name button will open modal with active name tab.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  assert.expect(2);

  andThen(() => {
    assert.ok(page.modal.tabs.name.isActive, 'Modal window name tab should be active.');
    assert.notOk(page.modal.tabs.contact.isActive, 'Modal window contact tab should not be active.');
  });
});

/**
 * Scenario: Verify tapping edit contact button will open modal with active contact tab.
 *
 * Given I am on the ESS home-page
 * And I tap / click on the HR DETAILS tab
 * When I tap / click on "Update" next to Contact
 * Then I see a modal / full-screen view where I can edit Contact data
 * And I see the selected tab as Contact
 */
test('Verify tapping edit contact button will open modal with active contact tab.', function (assert) {
  page.visit()
    .editContactButton
    .click();

  assert.expect(2);

  andThen(() => {
    assert.ok(page.modal.tabs.contact.isActive, 'Modal window contact tab should be active.');
    assert.notOk(page.modal.tabs.name.isActive, 'Modal window name tab should not be active.');
  });
});

/**
 * Scenario: Verify that the data in home screen is matching to the data in the modal screen.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * When I click on either "Update" button
 * Then I see the data in the modal screen is matching with the data in the home page
 */
test('Verify that the data in home screen is matching to the data in the modal screen.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  assert.expect(15);

  andThen(() => {
    assert.equal(page.modal.tabsContent.editNameForm.personTitle.value, this.employee.personTitle,
      'Input field value should equal model property "personTitle".');
    assert.equal(page.modal.tabsContent.editNameForm.firstName.value, this.employee.firstNames,
      'Input field value should equal model property "firstName".');
    assert.equal(page.modal.tabsContent.editNameForm.middleName.value, this.employee.middleName,
      'Input field value should equal model property "middleName".');
    assert.equal(page.modal.tabsContent.editNameForm.surname.value, this.employee.surname,
      'Input field value should equal model property "surname".');

    page.modal.tabs.contact
      .click();
  });

  andThen(() => {
    assert.equal(page.modal.tabsContent.editContactForm.address1.value, this.employee.address1,
      'Input field value should equal model property "address1".');
    assert.equal(page.modal.tabsContent.editContactForm.address2.value, this.employee.address2,
      'Input field value should equal model property "address2".');
    assert.equal(page.modal.tabsContent.editContactForm.address3.value, this.employee.address3,
      'Input field value should equal model property "address3".');
    assert.equal(page.modal.tabsContent.editContactForm.town.value, this.employee.town,
      'Input field value should equal model property "town".');
    assert.equal(page.modal.tabsContent.editContactForm.county.value, this.employee.county,
      'Input field value should equal model property "county".');
    assert.equal(page.modal.tabsContent.editContactForm.country.value, this.employee.country,
      'Input field value should equal model property "country".');
    assert.equal(page.modal.tabsContent.editContactForm.postCode.value, this.employee.postCode,
      'Input field value should equal model property "postCode".');
    assert.equal(page.modal.tabsContent.editContactForm.homeTel.value, this.employee.homeTel,
      'Input field value should equal model property "homeTel".');
    assert.equal(page.modal.tabsContent.editContactForm.mobileTel.value, this.employee.mobileTel,
      'Input field value should equal model property "mobileTel".');
    assert.equal(page.modal.tabsContent.editContactForm.homeEmail.value, this.employee.homeEmail,
      'Input field value should equal model property "homeEmail".');
    assert.equal(page.modal.tabsContent.editContactForm.workEmail.value, this.employee.workEmail,
      'Input field value should equal model property "workEmail".');
  });
});

/**
 * Scenario: Verify changing between the "Update" Modal view tabs maintains added or modified data.
 *
 * Given I am on the ESS home-page
 * And I tap / click on the HR DETAILS tab
 * And I tap / click on "Update" for either section
 * And I insert / edit data on either tab of the new modal / full-screen view
 * When I tap / click on any other tab
 * And I return to the initial tab
 * Then I should see the exact same data I inserted or edited
 */
test('Verify changing between the "Update" Modal view tabs maintains added or modified data.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  page.modal.tabsContent.editNameForm
    .edit('Mr', 'John', 'Roe', 'Doe');

  page.modal.tabs.contact
    .click();

  page.modal.tabs.name
    .click();

  assert.expect(4);

  andThen(() => {
    assert.equal(page.modal.tabsContent.editNameForm.personTitle.value, 'Mr',
      'Input field value should equal model property "personTitle".');
    assert.equal(page.modal.tabsContent.editNameForm.firstName.value, 'John',
      'Input field value should equal model property "firstName".');
    assert.equal(page.modal.tabsContent.editNameForm.middleName.value, 'Roe',
      'Input field value should equal model property "middleName".');
    assert.equal(page.modal.tabsContent.editNameForm.surname.value, 'Doe',
      'Input field value should equal model property "surname".');
  });
});

/**
 * Scenario: Verify presence of Save button in the modal screen.
 *
 * Given I am on the ESS home-page on a Desktop browser
 * When I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * Then I see a "Save" button in the right top corner of the modal screen
 */
test('Verify presence of Save button in the modal screen.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  assert.expect(1);

  andThen(() => {
    assert.ok(page.modal.header.saveButton.isVisible, 'Save button should be visible.');
  });
});

/**
 * Scenario: Verify that success message appears after successful save.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on the "Update" button for either section
 * And I update any field with valid data
 * When I click "Save" button
 * Then I see a success message coloured in green
 */
test('Verify that success message appears after successful save', function (assert) {
  page.visit()
    .editNameButton
    .click();

  page.modal.tabsContent.editNameForm
    .edit('Mr', 'John', 'Roe', 'Doe');

  assert.expect(3);

  andThen(() => {
    $(page.modal.header.saveButton.scope).click();

    Ember.run.later(() => {
      assert.ok(page.notification.isSuccess, 'Notification should be successful.');
      assert.notOk(page.notification.isError, 'Notification should not be error.');
      assert.equal(page.notification.text, 'Success! Your request has been accepted.',
        'Notification should contain correct success message.');
    }, 0);
  });
});

/**
 * Scenario: Verify that error message appears after unsuccessful save.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on the "Update" button for either section
 * And I update any field with valid data
 * When I click "Save" button
 * Then I see a success message coloured in green
 */
test('Verify that error message appears after error on save.', function (assert) {
  server.put('/employees/:id', { errors: ['there was an error'] }, 404);

  assert.expect(3);

  page.visit()
    .editNameButton
    .click();

  page.modal.tabsContent.editNameForm
    .edit('Mr', 'John', 'Roe', 'Doe');

  andThen(() => {
    $(page.modal.header.saveButton.scope).click();

    Ember.run.later(() => {
      assert.ok(page.notification.isError, 'Notification should be error.');
      assert.notOk(page.notification.isSuccess, 'Notification should not be successful.');
      assert.equal(page.notification.text, 'Sorry, your request has failed. Please try again or contact support.',
        'Notification should contain correct error message.');
    }, 0);
  });
});

/**
 * Scenario: Verify that no query is sent when data is dismissed.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Update" button
 * And I perform an edit on the shown data
 * When I click Close button from the header
 * Then I see that no query is sent to the API
 */
test('Verify that no query is sent when data is dismissed.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  page.modal.tabsContent.editNameForm
    .edit('Mr', 'John', 'Roe', 'Doe');

  page.modal.header.backButton
    .click();

  assert.expect(4);

  andThen(() => {
    assert.equal(server.db.employees[0].personTitle, this.employee.personTitle,
      'Person title shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].firstNames, this.employee.firstNames,
      'First name shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].middleName, this.employee.middleName,
      'Middle name shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].surname, this.employee.surname,
      'Surname shouldn\'t be changed since PUT request shouldn\'t be created.');
  });
});

/**
 * Scenario: Verify that no query is sent to the API when invalid data is present.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on the "Update" button for either section
 * When I modify data with unsupported character and click Save button
 * Then I see that no query is sent to the API
 */
test('Verify that no query is sent to the API when invalid data is present.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  page.modal.tabsContent.editNameForm
    .edit('', '', '', '');

  page.modal.header.saveButton
    .click();

  assert.expect(4);

  andThen(() => {
    assert.equal(server.db.employees[0].personTitle, this.employee.personTitle,
      'Person title shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].firstNames, this.employee.firstNames,
      'First name shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].middleName, this.employee.middleName,
      'Middle name shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].surname, this.employee.surname,
      'Surname shouldn\'t be changed since PUT request shouldn\'t be created.');
  });
});

/**
 * Scenario: Verify that query is accepted by the API when data is saved in another tab.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update the data in Name tab
 * And I click the Contact tab
 * When I Save
 * Then the modified data in Name tab is saved
 */
test('Verify that query is accepted by the API when data is saved in another tab.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  page.modal.tabsContent.editNameForm
    .edit('Mr', 'John', 'Roe', 'Doe');

  page.modal.tabs.contact
    .click();

  page.modal.header.saveButton
    .click();

  assert.expect(4);

  andThen(() => {
    assert.equal(server.db.employees[0].personTitle, 'Mr',
      'Person title should be changed since PUT request should be created.');
    assert.equal(server.db.employees[0].firstNames, 'John',
      'First name should be changed since PUT request should be created.');
    assert.equal(server.db.employees[0].middleName, 'Roe',
      'Middle name should be changed since PUT request should be created.');
    assert.equal(server.db.employees[0].surname, 'Doe',
      'Surname should be changed since PUT request should be created.');
  });
});

/**
 * Scenario: Verify that no query is sent to the API when invalid data is saved in another tab.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update a field form Contact tab with invalid data
 * And I click the Name tab
 * When I Save
 * Then I see that no query is sent to the API
 */
test('Verify that no query is sent to the API when invalid data is saved in another tab.', function (assert) {
  page.visit()
    .editNameButton
    .click();

  page.modal.tabsContent.editNameForm
    .edit('', '', '', '');

  page.modal.tabs.contact
    .click();

  page.modal.header.saveButton
    .click();

  assert.expect(4);

  andThen(() => {
    assert.equal(server.db.employees[0].personTitle, this.employee.personTitle,
      'Person title shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].firstNames, this.employee.firstNames,
      'First name shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].middleName, this.employee.middleName,
      'Middle name shouldn\'t be changed since PUT request shouldn\'t be created.');
    assert.equal(server.db.employees[0].surname, this.employee.surname,
      'Surname shouldn\'t be changed since PUT request shouldn\'t be created.');
  });
});

/**
 * Scenario: Verify that no query is sent when data is not changed and Save is clicked.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Update" button
 * When I click Save button
 * Then I see that no query is sent to the API
 */
test('Verify that no query is sent when data is not changed and Save is clicked.', function (assert) {
  let isChangeCreated = false;

  server.put('/employees/:id', () => {
    isChangeCreated = true;
  });

  page.visit()
    .editNameButton
    .click();

  page.modal.header.saveButton
    .click();

  assert.expect(1);

  andThen(() => {
    assert.notOk(isChangeCreated, 'Should be "false" since PUT request shouldn\'t be created.');
  });
});
