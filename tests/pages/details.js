import PageObject, {
  clickable,
  fillable,
  selectable,
  text,
  visitable
} from 'ember-cli-page-object';

export default PageObject.create({
  visit: visitable('/details'),
  editNameButton: {
    scope: '.editable-block-name .editable-block__header__link',
    click: clickable()
  },
  editContactButton: {
    scope: '.editable-block-contact .editable-block__header__link',
    click: clickable()
  },
  modal: {
    scope: '.flex-modal',
    header: {
      scope: '.edit-employee-header',
      backButton: {
        scope: '.edit-employee__close-button',
        click: clickable()
      },
      saveButton: {
        scope: '.edit-employee__save-button',
        click: clickable()
      }
    },
    tabs: {
      scope: '.tabbed-container',
      name: {
        scope: '#name-tab',
        isActive: PageObject.hasClass('tabbed-container__tab--active'),
        click: clickable()
      },
      contact: {
        scope: '#contact-tab',
        isActive: PageObject.hasClass('tabbed-container__tab--active'),
        click: clickable()
      }
    },
    tabsContent: {
      scope: '.tabbed-container__tab__content',
      editNameForm: {
        scope: '.edit-name__form',
        personTitle: {
          scope: '.dropdown-field select',
          select: selectable()
        },
        firstName: {
          scope: '#firstNames',
          fill: fillable()
        },
        middleName: {
          scope: '#middleName',
          fill: fillable()
        },
        surname: {
          scope: '#surname',
          fill: fillable()
        },
        edit(title, firstName, middleName, surname) {
          this.personTitle.select(title);
          this.firstName.fill(firstName);
          this.middleName.fill(middleName);
          this.surname.fill(surname);
        }
      },
      editContactForm: {
        scope: '.edit-contact__form',
        address1: {
          scope: '#address1',
          fill: fillable()
        },
        address2: {
          scope: '#address2',
          fill: fillable()
        },
        address3: {
          scope: '#address3',
          fill: fillable()
        },
        town: {
          scope: '#town',
          fill: fillable()
        },
        county: {
          scope: '#county',
          fill: fillable()
        },
        country: {
          scope: '#country',
          fill: fillable()
        },
        postCode: {
          scope: '#postCode',
          fill: fillable()
        },
        homeTel: {
          scope: '#homeTel',
          fill: fillable()
        },
        mobileTel: {
          scope: '#mobileTel',
          fill: fillable()
        },
        homeEmail: {
          scope: '#homeEmail',
          fill: fillable()
        },
        workEmail: {
          scope: '#workEmail',
          fill: fillable()
        }
      }
    }
  },
  notification: {
    scope: '.c-notification',
    isError: PageObject.hasClass('c-notification--error'),
    isSuccess: PageObject.hasClass('c-notification--success')
  }
});
