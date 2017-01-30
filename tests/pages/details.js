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
        firstNameContainer: {
          scope: '.input__field__firstNames',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          firstName: {
            scope: '#firstNames',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        middleNameContainer: {
          scope: '.input__field__middleName',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          middleName: {
            scope: '#middleName',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        surnameContainer: {
          scope: '.input__field__surname',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          surname: {
            scope: '#surname',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        edit(title, firstName, middleName, surname) {
          this.personTitle.select(title);
          this.firstNameContainer.firstName.fill(firstName);
          this.middleNameContainer.middleName.fill(middleName);
          this.surnameContainer.surname.fill(surname);
        }
      },
      editContactForm: {
        scope: '.edit-contact__form',
        address1Container: {
          scope: '.input__field__address1',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          address1: {
            scope: '#address1',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        address2Container: {
          scope: '.input__field__address2',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          address2: {
            scope: '#address2',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        address3Container: {
          scope: '.input__field__address3',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          address3: {
            scope: '#address3',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        townContainer: {
          scope: '.input__field__town',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          town: {
            scope: '#town',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        countyContainer: {
          scope: '.input__field__county',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          county: {
            scope: '#county',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        countryContainer: {
          scope: '.input__field__country',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          country: {
            scope: '#country',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        postCodeContainer: {
          scope: '.input__field__postCode',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          postCode: {
            scope: '#postCode',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        homeTelContainer: {
          scope: '.input__field__homeTel',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          homeTel: {
            scope: '#homeTel',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        mobileTelContainer: {
          scope: '.input__field__mobileTel',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          mobileTel: {
            scope: '#mobileTel',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        homeEmailContainer: {
          scope: '.input__field__homeEmail',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          homeEmail: {
            scope: '#homeEmail',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        workEmailContainer: {
          scope: '.input__field__workEmail',
          errorElement: {
            scope: '.input__field__error__message',
            hasError: PageObject.hasClass('input__field__error__message--visible')
          },
          workEmail: {
            scope: '#workEmail',
            fill: fillable()
          },
          clearInputButton: {
            scope: '.input__field__clear__button',
            click: clickable()
          }
        },
        editMandatoryOnly(addressInput, townInput) {
          this.address1Container.address1.fill(addressInput);
          this.townContainer.town.fill(townInput);
        },
        editAllFields(inputObject) {
          this.address1Container.address1.fill(inputObject.address1 || '');
          this.address2Container.address2.fill(inputObject.address2 || '');
          this.address3Container.address3.fill(inputObject.address3 || '');
          this.townContainer.town.fill(inputObject.town || '');
          this.countyContainer.county.fill(inputObject.county || '');
          this.countryContainer.country.fill(inputObject.country || '');
          this.postCodeContainer.postCode.fill(inputObject.postCode || '');
          this.homeTelContainer.homeTel.fill(inputObject.homeTel || '');
          this.mobileTelContainer.mobileTel.fill(inputObject.mobileTel || '');
          this.homeEmailContainer.homeEmail.fill(inputObject.homeEmail || '');
          this.workEmailContainer.workEmail.fill(inputObject.workEmail || '');
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
