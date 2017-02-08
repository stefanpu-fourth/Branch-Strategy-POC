import QUnit, {
  test,
  start,
  stop
} from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from 'ess/tests/helpers/module-for-acceptance';
import page from 'ess/tests/pages/details';

const sixtyLenghtString = 'SixtySymbolsLengthDoeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const sixtyOneLenghtString = 'SixtySymbolsLengthDoeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab';
const thirtyTwoLengthString = 'thirtyTwoLengthStringaaaaaaaaaaa';
const thirtyThreeLengthString = 'thirtyTwoLengthStringaaaaaaaaaaab';
const twentyLengthPhone = '022345127890123456789';
const secondBadVariable = "QQQQQ";
const twentyOneLengthPhone = '00234567890145634567890';
const anotherBadLine = "very bad";
const nameForm = page.modal.tabsContent.editNameForm;
const contactForm = page.modal.tabsContent.editContactForm;

function forConflicts() {
  return 1;
};

moduleForAcceptance('Acceptance | F2483 edit personal details', {
  beforeEach() {
    this.id = server.create('root').id;
    this.mainEmployment = server.create('mainEmployment', {
      employeeId: this.id
    });
    this.employee = server.create('employee', {
      employeeId: this.id
    });
  }
});

/**
 * Scenario: Verify there is a header with a Back and Close buttons in the modal.
 *
 * Given I am on the ESS home-page
 * When I tap / click on the HR DETAILS tab
 * And I tap / click on any "Update" button from Name or Contact
 * Then I see a header for the new modal, with a Back / Close button
 */
test('Verify there is a header with a Back and Close buttons in the modal.', function(assert) {
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
 * Scenario: Verify there is a header with a Back and Close buttons in the modal.
 *
 * Given I am on the ESS home-page
 * When I tap / click on the HR DETAILS tab
 * And I tap / click on any "Update" button from Name or Contact
 * Then I see a header for the new modal, with a Back / Close button
 */
test('Verify there is a header with a Back and Close buttons in the modal.', function(assert) {
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
 * Scenario: Verify presence of edit name and edit contact buttons.
 *
 * Given I am on the ESS home-page
 * When I tap / click on the HR DETAILS tab
 * Then I see "Update" buttons for both the user's Name and Contact data
 */
test('Verify presence of edit name and edit contact buttons.', function(assert) {
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
test('Verify there is a header with a Back and Close buttons in the modal.', function(assert) {
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
test('Verify presence of name and contact tabs.', function(assert) {
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
test('Verify tapping edit name button will open modal with active name tab.', function(assert) {
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
test('Verify tapping edit contact button will open modal with active contact tab.', function(assert) {
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
test('Verify that the data in home screen is matching to the data in the modal screen.', function(assert) {
  page.visit()
    .editNameButton
    .click();

  assert.expect(15);

  andThen(() => {
    assert.equal(page.modal.tabsContent.editNameForm.personTitle.value, this.employee.personTitle,
      'Input field value should equal model property "personTitle".');
    assert.equal(page.modal.tabsContent.editNameForm.firstNameContainer.firstName.value, this.employee.firstNames,
      'Input field value should equal model property "firstName".');
    assert.equal(page.modal.tabsContent.editNameForm.middleNameContainer.middleName.value, this.employee.middleName,
      'Input field value should equal model property "middleName".');
    assert.equal(page.modal.tabsContent.editNameForm.surnameContainer.surname.value, this.employee.surname,
      'Input field value should equal model property "surname".');

    page.modal.tabs.contact
      .click();
  });

  andThen(() => {
    assert.equal(page.modal.tabsContent.editContactForm.address1Container.address1.value, this.employee.address1,
      'Input field value should equal model property "address1".');
    assert.equal(page.modal.tabsContent.editContactForm.address2Container.address2.value, this.employee.address2,
      'Input field value should equal model property "address2".');
    assert.equal(page.modal.tabsContent.editContactForm.address3Container.address3.value, this.employee.address3,
      'Input field value should equal model property "address3".');
    assert.equal(page.modal.tabsContent.editContactForm.townContainer.town.value, this.employee.town,
      'Input field value should equal model property "town".');
    assert.equal(page.modal.tabsContent.editContactForm.countyContainer.county.value, this.employee.county,
      'Input field value should equal model property "county".');
    assert.equal(page.modal.tabsContent.editContactForm.countryContainer.country.value, this.employee.country,
      'Input field value should equal model property "country".');
    assert.equal(page.modal.tabsContent.editContactForm.postCodeContainer.postCode.value, this.employee.postCode,
      'Input field value should equal model property "postCode".');
    assert.equal(page.modal.tabsContent.editContactForm.homeTelContainer.homeTel.value, this.employee.homeTel,
      'Input field value should equal model property "homeTel".');
    assert.equal(page.modal.tabsContent.editContactForm.mobileTelContainer.mobileTel.value, this.employee.mobileTel,
      'Input field value should equal model property "mobileTel".');
    assert.equal(page.modal.tabsContent.editContactForm.homeEmailContainer.homeEmail.value, this.employee.homeEmail,
      'Input field value should equal model property "homeEmail".');
    assert.equal(page.modal.tabsContent.editContactForm.workEmailContainer.workEmail.value, this.employee.workEmail,
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
test('Verify changing between the "Update" Modal view tabs maintains added or modified data.', function(assert) {
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
    assert.equal(page.modal.tabsContent.editNameForm.firstNameContainer.firstName.value, 'John',
      'Input field value should equal model property "firstName".');
    assert.equal(page.modal.tabsContent.editNameForm.middleNameContainer.middleName.value, 'Roe',
      'Input field value should equal model property "middleName".');
    assert.equal(page.modal.tabsContent.editNameForm.surnameContainer.surname.value, 'Doe',
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
test('Verify presence of Save button in the modal screen.', function(assert) {
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
test('Verify that success message appears after successful save', function(assert) {
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
test('Verify that error message appears after error on save.', function(assert) {
  server.put('/employees/:id', {
    errors: ['there was an error']
  }, 404);

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
test('Verify that no query is sent when data is dismissed.', function(assert) {
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
test('Verify that no query is sent to the API when invalid data is present.', function(assert) {
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
test('Verify that query is accepted by the API when data is saved in another tab.', function(assert) {
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
test('Verify that no query is sent to the API when invalid data is saved in another tab.', function(assert) {
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
test('Verify that no query is sent when data is not changed and Save is clicked.', function(assert) {
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

/**
 * Scenario: Verify that there is an error message when mandatory field
 * is updated with unsupported character
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update the mandatory field with unsupported character / number
 * Then I see an error message
 */
test('Verify that there is error message when field in name form is updated with unsupported character',
  function(assert) {
    page.visit()
      .editNameButton
      .click();

    nameForm.edit('Mr', 'John?', 'Roe', 'Doe@');
    assert.expect(8);

    andThen(function() {
      assert.ok(nameForm.firstNameContainer.errorElement.hasError,
        'First name unsupported characters validation should be triggered');
      assert.equal(nameForm.firstNameContainer.errorElement.text,
        'Your entry must contain only letters.',
        'First name unsupported characters validation message should be correct');

      assert.ok(nameForm.surnameContainer.errorElement.hasError,
        'Surname unsupported characters validation should be triggered');
      assert.equal(nameForm.surnameContainer.errorElement.text,
        'Your entry must contain only letters.', 'Validation message should be correct');
    });

    page.modal.tabs.contact.click();
    contactForm.address1Container.address1.fill('Test | Address');
    contactForm.townContainer.town.fill('Town test?');

    andThen(function() {
      assert.ok(contactForm.address1Container.errorElement.hasError,
        'Address 1 unsupported characters validation should be triggered');
      assert.equal(contactForm.address1Container.errorElement.text,
        'Your entry must not contain ` or | symbol',
        'Address 1 unsupported characters validation message should be correct');

      assert.ok(contactForm.townContainer.errorElement.hasError,
        'Town unsupported characters validation should be triggered');
      assert.equal(contactForm.townContainer.errorElement.text,
        'Your entry must not contain unsupported characters.',
        'Town unsupported characters validation message should be correct');
    });
  });

/**
 * Scenario: Verify the mandatory field characters length.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update the mandatory field with string longer than its max/ less than min characters
 * Then I see an error message
 */
test('Verify the mandatory field characters length.', function(assert) {
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', sixtyLenghtString, sixtyLenghtString, sixtyLenghtString);

  assert.expect(18);
  andThen(function() {
    assert.notOk(nameForm.firstNameContainer.errorElement.hasError,
      'First name over length validation shouldn\'t be triggered');
    assert.notOk(nameForm.surnameContainer.errorElement.hasError,
      'Surname over length validation shouldn\'t be triggered');
  });

  nameForm
    .edit('Mr', sixtyOneLenghtString, sixtyOneLenghtString, sixtyOneLenghtString);

  andThen(function() {
    assert.ok(nameForm.firstNameContainer.errorElement.hasError,
      'First name over length validation should be triggered');
    assert.ok(nameForm.surnameContainer.errorElement.hasError,
      'Surname over length validation should be triggered');

    assert.equal(nameForm.firstNameContainer.errorElement.text,
      'Your input is less than 1 or more than 60 characters.',
      'Firstn name over length validation message should be correct');
    assert.equal(nameForm.surnameContainer.errorElement.text,
      'Your input is less than 1 or more than 60 characters.',
      'Surname over length validation message should be correct');

  });

  page.modal.tabs.contact
    .click();
  contactForm.editMandatoryOnly('tre', 'to');

  andThen(function() {
    assert.ok(contactForm.address1Container.errorElement.hasError,
      'Address 1 under length validation should be triggered');
    assert.ok(contactForm.townContainer.errorElement.hasError,
      'Town under length validation should be triggered');

    assert.equal(contactForm.address1Container.errorElement.text,
      'Your input is less than 4 or more than 32 characters.',
      'Address 1 under length validation message should be correct');
    assert.equal(contactForm.townContainer.errorElement.text,
      'Your input is less than 3 or more than 32 characters.',
      'Town under length validation message should be correct');
  });

  contactForm.editMandatoryOnly('four', 'tre');
  andThen(function() {
    assert.notOk(contactForm.address1Container.errorElement.hasError,
      'Address 1 under length validation shouldn\'t be triggered');
    assert.notOk(contactForm.townContainer.errorElement.hasError,
      'Town under length validation shouldn\'t be triggered');
  });

  contactForm.editMandatoryOnly(thirtyTwoLengthString, thirtyTwoLengthString);
  andThen(function() {
    assert.notOk(contactForm.address1Container.errorElement.hasError,
      'Address 1 length validation shouldn\'t be triggered');
    assert.notOk(contactForm.townContainer.errorElement.hasError,
      'Town length validation shouldn\'t be triggered');
  });

  contactForm.editMandatoryOnly(thirtyThreeLengthString, thirtyThreeLengthString);
  andThen(function() {
    assert.ok(contactForm.address1Container.errorElement.hasError,
      'Address 1 over length validation should be triggered');
    assert.ok(contactForm.townContainer.errorElement.hasError,
      'Town over length validation should be triggered');

    assert.equal(contactForm.address1Container.errorElement.text,
      'Your input is less than 4 or more than 32 characters.',
      'Address 1 over length validation message should be correct');
    assert.equal(contactForm.townContainer.errorElement.text,
      'Your input is less than 3 or more than 32 characters.',
      'Town length over validation message should be correct');
  });

});

/**
 * Scenario: Verify the optional field characters lenght
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update the optional field with string longer than its max/ less than min characters
 * Then I see an error message
 *
 * Test cases for different casses: in case of acceptable values between 1 to n
 * test with strings of length n and n + 1.
 * In case of acceptable values betwheen m and j -> testing with m - 1, m, j and j + 1.
 */
test('Verify the optional field characters lenght', function(assert) {
  let contactInputObject = {
    address2: thirtyTwoLengthString,
    address3: thirtyTwoLengthString,
    county: thirtyTwoLengthString,
    country: 'to',
    postCode: 'abcd',
    homeTel: '012',
    mobileTel: '012'
  };

  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', 'John', sixtyLenghtString, 'Doe');

  assert.expect(32);
  andThen(function() {
    assert.notOk(nameForm.middleNameContainer.errorElement.hasError,
      'Middle name over length validation shouldn\'t be triggered');
  });

  nameForm.edit('Mr', 'John', sixtyOneLenghtString, 'Doe');
  andThen(function() {
    assert.ok(nameForm.middleNameContainer.errorElement.hasError,
      'Middle name over length validation should be triggered');
    assert.equal(nameForm.middleNameContainer.errorElement.text,
      'Your input is less than 1 or more than 60 characters.',
      'Middle name over length validation message should be correct');
  });

  page.modal.tabs.contact.click();
  contactForm.editAllFields(contactInputObject);
  andThen(function() {
    assert.notOk(contactForm.address2Container.errorElement.hasError,
      'Address 2 over length validation shouldn\'t be triggered');
    assert.notOk(contactForm.address3Container.errorElement.hasError,
      'Address 3 over length validation shouldn\'t be triggered');
    assert.notOk(contactForm.countyContainer.errorElement.hasError,
      'County over length validation shouldn\'t be triggered');

    assert.ok(contactForm.countryContainer.errorElement.hasError,
      'Country under length validation should be triggered');
    assert.ok(contactForm.postCodeContainer.errorElement.hasError,
      'Post code under length validation should be triggered');
    assert.ok(contactForm.homeTelContainer.errorElement.hasError,
      'Home telephone under length validation should be triggered');
    assert.ok(contactForm.mobileTelContainer.errorElement.hasError,
      'Mobile telephone under length validation should be triggered');

    assert.equal(contactForm.countryContainer.errorElement.text,
      'Your input is less than 3 or more than 32 characters.',
      'Country under length validation message should be correct');

    assert.equal(contactForm.postCodeContainer.errorElement.text,
      'Your input is less than 5 or more than 8 characters.',
      'Country under length validation message should be correct');

    assert.equal(contactForm.homeTelContainer.errorElement.text,
      'Your input is less than 4 or more than 20 characters.',
      'Country under length validation message should be correct');

    assert.equal(contactForm.mobileTelContainer.errorElement.text,
      'Your input is less than 4 or more than 20 characters.',
      'Country under length validation message should be correct');
  });

  contactInputObject.address2 = thirtyThreeLengthString;
  contactInputObject.address3 = thirtyThreeLengthString;
  contactInputObject.county = thirtyThreeLengthString;
  contactInputObject.country = 'top';
  contactInputObject.postCode = 'abcdef';
  contactInputObject.homeTel = '0123';
  contactInputObject.mobileTel = '0123';
  contactForm.editAllFields(contactInputObject);

  andThen(function() {
    assert.ok(contactForm.address2Container.errorElement.hasError,
      'Address 2 over length validation should be triggered');
    assert.ok(contactForm.address3Container.errorElement.hasError,
      'Address 3 over length validation should be triggered');
    assert.ok(contactForm.countyContainer.errorElement.hasError,
      'County over length validation should be triggered');

    assert.equal(contactForm.address2Container.errorElement.text,
      'Your input is less than 1 or more than 32 characters.',
      'Addres 2 over length validation message should be correct');
    assert.equal(contactForm.address3Container.errorElement.text,
      'Your input is less than 1 or more than 32 characters.',
      'Address 3 over length validation message should be correct');
    assert.equal(contactForm.countyContainer.errorElement.text,
      'Your input is less than 1 or more than 32 characters.',
      'County over length validation message should be correct');

    assert.notOk(contactForm.countryContainer.errorElement.hasError,
      'Country under length validation shouldn\' be triggered');
    assert.notOk(contactForm.postCodeContainer.errorElement.hasError,
      'Post code under length validation shouldn\' be triggered');
    assert.notOk(contactForm.homeTelContainer.errorElement.hasError,
      'Home telephone under length validation shouldn\' be triggered');
    assert.notOk(contactForm.mobileTelContainer.errorElement.hasError,
      'Mobile telephone under length validation shouldn\' be triggered');
  });

  contactInputObject.country = thirtyTwoLengthString;
  contactInputObject.postCode = 'abcdefgh';
  contactInputObject.homeTel = twentyLengthPhone;
  contactInputObject.mobileTel = twentyLengthPhone;
  contactForm.editAllFields(contactInputObject);

  andThen(function() {
    assert.notOk(contactForm.countryContainer.errorElement.hasError,
      'Country over length validation shouldn\' be triggered');
    assert.notOk(contactForm.postCodeContainer.errorElement.hasError,
      'Post code over length validation shouldn\' be triggered');
    assert.notOk(contactForm.homeTelContainer.errorElement.hasError,
      'Home telephone over length validation shouldn\' be triggered');
    assert.notOk(contactForm.mobileTelContainer.errorElement.hasError,
      'Mobile telephone over length validation shouldn\' be triggered');
  });

  contactInputObject.country = thirtyThreeLengthString;
  contactInputObject.postCode = 'abcdefghi';
  contactInputObject.homeTel = twentyOneLengthPhone;
  contactInputObject.mobileTel = twentyOneLengthPhone;
  contactForm.editAllFields(contactInputObject);

  andThen(function() {
    assert.ok(contactForm.countryContainer.errorElement.hasError,
      'Country length over validation should be triggered');
    assert.ok(contactForm.postCodeContainer.errorElement.hasError,
      'Post code length over validation should be triggered');
    assert.ok(contactForm.homeTelContainer.errorElement.hasError,
      'Home telephone over length validation should be triggered');
    assert.ok(contactForm.mobileTelContainer.errorElement.hasError,
      'Mobile telephone over length validation should be triggered');
  });
});

/**
 * Scenario: Verify that field is mandatory
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I leave the mandatory field empty
 * Then I see an error message
 */
test('Verify that field is mandatory', function(assert) {
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', '', '', '');
  assert.expect(8);
  andThen(function() {
    assert.ok(nameForm.firstNameContainer.errorElement.hasError,
      'First name presence validation should be triggered');
    assert.ok(nameForm.surnameContainer.errorElement.hasError,
      'Surname presence validation should be triggered');

    assert.equal(nameForm.firstNameContainer.errorElement.text,
      'This field is required.',
      'First name presence validation message should be correct');
    assert.equal(nameForm.surnameContainer.errorElement.text,
      'This field is required.',
      'Surname presence validation message should be correct');
  });

  page.modal.tabs.contact
    .click();
  contactForm.editMandatoryOnly('', '');

  andThen(function() {
    assert.ok(contactForm.address1Container.errorElement.hasError,
      'Address 1 presence validation should be triggered');
    assert.ok(contactForm.townContainer.errorElement.hasError,
      'Town under presence validation should be triggered');

    assert.equal(contactForm.address1Container.errorElement.text,
      'This field is required.',
      'Address 1 presence validation message should be correct');
    assert.equal(contactForm.townContainer.errorElement.text,
      'This field is required.',
      'Town presence validation message should be correct');
  });
});

/**
 * Scenario: Verify that the mandatory field is marked as error and an error
 * message appears when x button is clicked.
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click x button on mandatory field
 * Then I see an error message
 * And the field is marked as error
 */
test('Verify error after X button is clicked on mandatory field', function(assert) {
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', 'John', 'Asd', 'Doe');
  nameForm.firstNameContainer.clearInputButton.click();
  nameForm.surnameContainer.clearInputButton.click();

  assert.expect(12);
  andThen(function() {
    assert.ok(nameForm.firstNameContainer.errorElement.hasError,
      'First name presence validation should be triggered');
    assert.ok(nameForm.surnameContainer.errorElement.hasError,
      'Surname presence validation should be triggered');

    assert.equal(nameForm.firstNameContainer.firstName.value, '',
      'First name should be empty');
    assert.equal(nameForm.surnameContainer.surname.value, '',
      'Surname should be empty');

    assert.equal(nameForm.firstNameContainer.errorElement.text,
      'This field is required.',
      'First name presence validation message should be correct');
    assert.equal(nameForm.surnameContainer.errorElement.text,
      'This field is required.',
      'Surname presence validation message should be correct');
  });

  page.modal.tabs.contact
    .click();
  contactForm.editMandatoryOnly('Adress', 'Town');
  contactForm.address1Container.clearInputButton.click();
  contactForm.townContainer.clearInputButton.click();
  andThen(function() {
    assert.ok(contactForm.address1Container.errorElement.hasError,
      'Address 1 presence validation should be triggered');
    assert.ok(contactForm.townContainer.errorElement.hasError,
      'Town presence validation should be triggered');

    assert.equal(contactForm.address1Container.address1.value, '',
      'Address 1 should be empty');
    assert.equal(contactForm.townContainer.town.value, '',
      'Town should be empty');

    assert.equal(contactForm.address1Container.errorElement.text,
      'This field is required.',
      'Address 1 presence validation message should be correct');
    assert.equal(contactForm.townContainer.errorElement.text,
      'This field is required.',
      'Town presence validation message should be correct');
  });

});

/**
 * Scenario: Verify that the field is still marked as error with an error message.
 *  when we navigate back to its tab
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click x button on mandatory field / unsupported character (error message should appear)
 * And I click on next tab
 * And I click back on the previous tab
 * Then I still see the same error message
 *
 */
test('Verify error persists when switching tabs', function(assert) {
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', 'John', 'Asd', 'Doe/');
  nameForm.firstNameContainer.clearInputButton.click();

  assert.expect(8);
  andThen(function() {
    assert.ok(nameForm.firstNameContainer.errorElement.hasError,
      'First name presence validation should be triggered');
    assert.ok(nameForm.surnameContainer.errorElement.hasError,
      'Surname invalid symbols validation should be triggered');

    assert.equal(nameForm.firstNameContainer.errorElement.text,
      'This field is required.',
      'First name presence validation message should be correct');
    assert.equal(nameForm.surnameContainer.errorElement.text,
      'Your entry must contain only letters.',
      'Surname invalid symbols validation message should be correct');
  });

  page.modal.tabs.contact
    .click();
  page.modal.tabs.name.click();

  andThen(function() {
    assert.ok(nameForm.firstNameContainer.errorElement.hasError,
      'First name presence validation should be triggered');
    assert.ok(nameForm.surnameContainer.errorElement.hasError,
      'Surname invalid symbols validation should be triggered');

    assert.equal(nameForm.firstNameContainer.errorElement.text,
      'This field is required.',
      'First name presence validation message should be correct');
    assert.equal(nameForm.surnameContainer.errorElement.text,
      'Your entry must contain only letters.',
      'Surname invalid symbols validation message should be correct');
  });
});

/**
 * Scenario: Verify that there is an error message when optional field is updated
 * with unsupported character
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update the optional field with unsupported character / number
 * Then I see an error message
 */
test('Verify optional field validation is triggered by unsupported character', function(assert) {
  let contactInputObject = {
    address2: 'adress | invalid',
    address3: 'adress | invalid',
    county: 'Country123',
    country: '??2@',
    postCode: '???!:@',
    homeTel: 'very valid',
    mobileTel: 'very valid',
    homeEmail: 'such mail@google.com',
    workEmail: 'very@legit.???'
  };
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', 'John', '??Middle@', 'Doe');
  assert.expect(20);
  andThen(function() {
    assert.ok(nameForm.middleNameContainer.errorElement.hasError,
      'Middle name unsupported characters validation should be triggered');
    assert.equal(nameForm.middleNameContainer.errorElement.text,
      'Your entry must contain only letters.',
      'Middle name unsupported character validation message should be correct');
  });

  page.modal.tabs.contact.click();
  contactForm.editAllFields(contactInputObject);

  andThen(function() {
    assert.ok(contactForm.address2Container.errorElement.hasError,
      'Address 2 unsupported character validation should be triggered');
    assert.ok(contactForm.address3Container.errorElement.hasError,
      'Address 3 unsupported character validation should be triggered');
    assert.ok(contactForm.countyContainer.errorElement.hasError,
      'County unsupported character validation should be triggered');
    assert.ok(contactForm.countryContainer.errorElement.hasError,
      'Country unsupported character validation should be triggered');
    assert.ok(contactForm.postCodeContainer.errorElement.hasError,
      'Post code unsupported character validation should be triggered');
    assert.ok(contactForm.homeTelContainer.errorElement.hasError,
      'Home telephone unsupported character validation should be triggered');
    assert.ok(contactForm.mobileTelContainer.errorElement.hasError,
      'Mobile telephone unsupported character validation should be triggered');
    assert.ok(contactForm.homeEmailContainer.errorElement.hasError,
      'Home email unsupported character validation should be triggered');
    assert.ok(contactForm.workEmailContainer.errorElement.hasError,
      'Work email unsupported character validation should be triggered');

    assert.equal(contactForm.address2Container.errorElement.text,
      'Your entry must not contain ` or | symbol',
      'Addres 2 unsupported character validation message should be correct');
    assert.equal(contactForm.address3Container.errorElement.text,
      'Your entry must not contain ` or | symbol',
      'Address 3 unsupported character validation message should be correct');
    assert.equal(contactForm.countyContainer.errorElement.text,
      'Your entry must not contain unsupported characters.',
      'County unsupported character validation message should be correct');
    assert.equal(contactForm.countryContainer.errorElement.text,
      'Your entry must not contain unsupported characters.',
      'Country unsupported character validation message should be correct');
    assert.equal(contactForm.postCodeContainer.errorElement.text,
      'Your entry must not contain unsupported characters.',
      'Post code unsupported character validation message should be correct');
    assert.equal(contactForm.homeTelContainer.errorElement.text,
      'Phone number must contain only digits.',
      'Home telephone unsupported character validation message should be correct');
    assert.equal(contactForm.mobileTelContainer.errorElement.text,
      'Phone number must contain only digits.',
      'Mobile telephone unsupported character validation message should be correct');
    assert.equal(contactForm.homeEmailContainer.errorElement.text,
      'This field must be a valid email address',
      'Home email unsupported character validation message should be correct');
    assert.equal(contactForm.workEmailContainer.errorElement.text,
      'This field must be a valid email address',
      'Work email unsupported character validation message should be correct');
  });

});

/**
 * Scenario: Verify that the Optional field is not marked as error when x button is clicked
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click x button on mandatory field
 * Then the field shouldn't contains errors
 *
 */
test('Verify that optional field is not marked as error when X button is clicked', function(assert) {
  let contactInputObject = {
    address2: 'adress ',
    address3: 'adress ',
    county: 'Country',
    country: 'Butan',
    postCode: 'postco',
    homeTel: '08888888',
    mobileTel: '099999',
    homeEmail: 'mail@google.com',
    workEmail: 'meil@google.com'
  };
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', 'John', 'Middle', 'Doe');
  nameForm.middleNameContainer.clearInputButton.click();
  assert.expect(10);
  andThen(function() {
    assert.notOk(nameForm.middleNameContainer.errorElement.hasError,
      'Middle name presence validation shouldn\'t be triggered');
  });

  page.modal.tabs.contact.click();
  contactForm.editAllFields(contactInputObject);
  contactForm.address2Container.clearInputButton.click();
  contactForm.address3Container.clearInputButton.click();
  contactForm.countyContainer.clearInputButton.click();
  contactForm.countryContainer.clearInputButton.click();
  contactForm.postCodeContainer.clearInputButton.click();
  contactForm.homeTelContainer.clearInputButton.click();
  contactForm.mobileTelContainer.clearInputButton.click();
  contactForm.homeEmailContainer.clearInputButton.click();
  contactForm.workEmailContainer.clearInputButton.click();

  andThen(function() {
    assert.notOk(contactForm.address2Container.errorElement.hasError,
      'Address 2 presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.address3Container.errorElement.hasError,
      'Address 3 presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.countyContainer.errorElement.hasError,
      'County presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.countryContainer.errorElement.hasError,
      'Country presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.postCodeContainer.errorElement.hasError,
      'Post code presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.homeTelContainer.errorElement.hasError,
      'Home telephone presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.mobileTelContainer.errorElement.hasError,
      'Mobile telephone presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.homeEmailContainer.errorElement.hasError,
      'Home email presence validation shouldn\'t be triggered');
    assert.notOk(contactForm.workEmailContainer.errorElement.hasError,
      'Work email presence validation shouldn\'t be triggered');
  });
});

/**
 * Scenario: Enter valid value in mandatory field
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update the mandatory field with valid value
 * Then the field is not marked as an error
 * And no error message is displayed
 */
test('Verify entering valid value in mandatory field doesn\'t trigger error', function(assert) {
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', sixtyLenghtString, sixtyLenghtString, sixtyLenghtString);
  assert.expect(4);
  andThen(function() {
    assert.notOk(nameForm.firstNameContainer.errorElement.hasError,
      'First name validation shouldn\'t be triggered');
    assert.notOk(nameForm.surnameContainer.errorElement.hasError,
      'Surname validation shouldn\'t be triggered');
  });

  page.modal.tabs.contact.click();
  contactForm.editMandatoryOnly('Address', 'Town');
  andThen(function() {
    assert.notOk(contactForm.address1Container.errorElement.hasError,
      'Address 1 validation shouldn\'t be triggered');
    assert.notOk(contactForm.townContainer.errorElement.hasError,
      'Town validation shouldn\'t be triggered');
  });

});

/**
 * Scenario: Enter valid value in optional field
 *
 * Given I am on the ESS home-page
 * And I click on the HR DETAILS tab
 * And I click on either "Edit" button
 * And I update the mandatory field with valid value
 * Then the field is not marked as an error
 * And no error message is displayed
 */
test('Verify entering valid value in optional field doesn\'t trigger error', function(assert) {
  let contactInputObject = {
    address2: thirtyTwoLengthString,
    address3: thirtyTwoLengthString,
    county: thirtyTwoLengthString,
    country: 'Country',
    postCode: 'postco',
    homeTel: '01234567',
    mobileTel: '01234567',
    homeEmail: 'home@google.com',
    workEmail: 'work@google.com'
  };
  page.visit()
    .editNameButton
    .click();

  nameForm.edit('Mr', 'John', sixtyLenghtString, 'Doe');

  assert.expect(9);
  andThen(function() {
    assert.notOk(nameForm.middleNameContainer.errorElement.hasError,
      'Middle name length validation shouldn\'t be triggered');
  });

  page.modal.tabs.contact.click();
  contactForm.editAllFields(contactInputObject);
  andThen(function() {
    assert.notOk(contactForm.address2Container.errorElement.hasError,
      'Address 2 validation shouldn\' be triggered');
    assert.notOk(contactForm.address3Container.errorElement.hasError,
      'Address 3 validation shouldn\' be triggered');
    assert.notOk(contactForm.countryContainer.errorElement.hasError,
      'Country validation shouldn\' be triggered');
    assert.notOk(contactForm.postCodeContainer.errorElement.hasError,
      'Post code validation shouldn\' be triggered');
    assert.notOk(contactForm.homeTelContainer.errorElement.hasError,
      'Home telephone validation shouldn\' be triggered');
    assert.notOk(contactForm.mobileTelContainer.errorElement.hasError,
      'Mobile telephone validation shouldn\' be triggered');
    assert.notOk(contactForm.homeEmailContainer.errorElement.hasError,
      'Home email validation shouldn\' be triggered');
    assert.notOk(contactForm.workEmailContainer.errorElement.hasError,
      'Work email validation shouldn\' be triggered');
  });
});


/**
 * Scenario: Verify presence of edit name and edit contact buttons.
 *
 * Given I am on the ESS home-page
 * When I tap / click on the HR DETAILS tab
 * Then I see "Update" buttons for both the user's Name and Contact data
 */
test('Verify presence of edit name and edit contact buttons.', function(assert) {
  page.visit();

  assert.expect(2);

  andThen(() => {
    assert.ok(page.editNameButton.isVisible, 'Edit name button should be visible.');
    assert.ok(page.editContactButton.isVisible, 'Edit contact button should be visible.');
  });
});


/**
 * Scenario: Verify presence of edit name and edit contact buttons.
 *
 * Given I am on the ESS home-page
 * When I tap / click on the HR DETAILS tab
 * Then I see "Update" buttons for both the user's Name and Contact data
 */
test('Verify presence of edit name and edit contact buttons.', function(assert) {
  page.visit();

  assert.expect(2);

  andThen(() => {
    assert.ok(page.editNameButton.isVisible, 'Edit name button should be visible.');
    assert.ok(page.editContactButton.isVisible, 'Edit contact button should be visible.');
  });
});
