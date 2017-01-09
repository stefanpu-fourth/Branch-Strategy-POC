import { validator, buildValidations } from 'ember-cp-validations';
import errorMessage from './error-messages';

/**
  Defines validations for each property of "employee" model

  @class Validations
  @public
*/
export default buildValidations({
  /**
    Defines "presence" validator for "surname"
    Defines "alphabetical" validator for "surname"
    Defines "length" validator for "surname"

    @property surname
    @type {Array}
    @public
  */
  surname: [
    validator('presence', {
      presence: true,
      message: errorMessage.presence
    }),
    validator('alphabetical', {
      message: errorMessage.alphabetical,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 1,
      max: 60,
      message: errorMessage.length
    })],

  /**
    Defines "alphabetical" validator for "middleName"
    Defines "length" validator for "middleName"

    @property middleName
    @type {Array}
    @public
  */
  middleName: [
    validator('alphabetical', {
      message: errorMessage.alphabetical,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 1,
      max: 60,
      message: errorMessage.length
    })],

  /**
    Defines "presence" validator for "firstNames"
    Defines "alphabetical" validator for "firstNames"
    Defines "length" validator for "firstNames"

    @property firstNames
    @type {Array}
    @public
  */
  firstNames: [
    validator('presence', {
      presence: true,
      message: errorMessage.presence
    }),
    validator('alphabetical', {
      message: errorMessage.alphabetical,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 1,
      max: 60,
      message: errorMessage.length
    })],

  /**
    Defines "presence" validator for "address1"
    Defines "length" validator for "address1"

    @property address1
    @type {Array}
    @public
  */
  address1: [
    validator('presence', {
      presence: true,
      message: errorMessage.presence
    }),
    validator('length', {
      allowBlank: true,
      min: 4,
      max: 32,
      message: errorMessage.length
    })],

  /**
    Defines "length" validator for "address2"

    @property address2
    @type {Object}
    @public
  */
  address2: validator('length', {
    allowBlank: true,
    min: 1,
    max: 32,
    message: errorMessage.length
  }),

  /**
    Defines "length" validator for "address3"

    @property address3
    @type {Object}
    @public
  */
  address3: validator('length', {
    allowBlank: true,
    min: 1,
    max: 32,
    message: errorMessage.length
  }),

  /**
    Defines "presence" validator for "town"
    Defines "alphabetical" validator for "town"
    Defines "length" validator for "town"

    @property town
    @type {Array}
    @public
  */
  town: [
    validator('presence', {
      presence: true,
      message: errorMessage.presence
    }),
    validator('alphabetical', {
      message: errorMessage.alphabetical,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 3,
      max: 32,
      message: errorMessage.length
    })],

  /**
    Defines "alphabetical" validator for "county"
    Defines "length" validator for "county"

    @property county
    @type {Array}
    @public
  */
  county: [
    validator('alphabetical', {
      message: errorMessage.alphabetical,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 3,
      max: 32,
      message: errorMessage.length
    })],

  /**
    Defines "alphabetical" validator for "country"
    Defines "length" validator for "country"

    @property country
    @type {Array}
    @public
  */
  country: [
    validator('alphabetical', {
      message: errorMessage.alphabetical,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 3,
      max: 32,
      message: errorMessage.length
    })
  ],

  /**
    Defines "length" validator for "postCode"

    @property postCode
    @type {Object}
    @public
  */
  postCode: validator('length', {
    allowBlank: true,
    min: 5,
    max: 8,
    message: errorMessage.length
  }),

  /**
    Defines "phone-number" validator for "homeTel"
    Defines "length" validator for "homeTel"

    @property homeTel
    @type {Array}
    @public
  */
  homeTel: [
    validator('phone-number', {
      onlyDigitsErrorMessage: errorMessage.onlyDigits,
      leadingZeroErrorMessage: errorMessage.leadingZero,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 4,
      max: 20,
      message: errorMessage.length
    })
  ],

  /**
    Defines "phone-number" validator for "mobileTel"
    Defines "length" validator for "mobileTel"

    @property mobileTel
    @type {Array}
    @public
  */
  mobileTel: [
    validator('phone-number', {
      leadingZeroErrorMessage: errorMessage.leadingZero,
      onlyDigitsErrorMessage: errorMessage.onlyDigits,
      allowBlank: true
    }),
    validator('length', {
      allowBlank: true,
      min: 4,
      max: 20,
      message: errorMessage.length
    })
  ],

  /**
    Defines "format" validator for "workEmail"

    @property workEmail
    @type {Object}
    @public
  */
  workEmail: validator('format', {
    allowBlank: true,
    type: 'email'
  }),

  /**
    Defines "format" validator for "homeEmail"

    @property homeEmail
    @type {Object}
    @public
  */
  homeEmail: validator('format', {
    allowBlank: true,
    type: 'email'
  })
});
