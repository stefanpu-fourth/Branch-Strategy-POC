import DS from 'ember-data';

var attr = DS.attr;

var MainEmployment = DS.Model.extend({
  addedToCache: attr('date'),
  employeeId: attr('number'),
  manager: attr('string'),
  jobTitle: attr('string'),
  payType: attr('string'),
  companyName: attr('string'),
  companyAddress1: attr('string'),
  companyAddress2: attr('string'),
  companyAddress3: attr('string'),
  companyTown: attr('string'),
  companyCounty: attr('string'),
  companyPostCode: attr('string'),
  companyPhone: attr('string'),
  companyFax: attr('string'),
  taxOfficeName: attr('string'),
  taxOfficeNumber: attr('number'),
  payeReference: attr('string'),
  locationName: attr('string'),
  locationAddress1: attr('string'),
  locationAddress2: attr('string'),
  locationAddress3: attr('string'),
  locationTown: attr('string'),
  locationCounty: attr('string'),
  locationPostCode: attr('string'),
  locationPhone: attr('string'),
  locationFax: attr('string'),
  division: attr('string')

});

MainEmployment.reopenClass({
  FIXTURES: [{
    addedToCache: "2015-04-20T15:30:36.2263126+00:00",
    id: 57354,
    employeeId: 57354,
    manager: "Heather Lawson",
    jobTitle: "Waiter",
    payType: "Hourly Paid",
    companyName: "PizzaExpress",
    companyAddress1: "Hunton House",
    companyAddress2: "Highbridge Estate, Oxford Road",
    companyAddress3: "",
    companyTown: "Uxbridge",
    companyCounty: "",
    companyPostCode: "UB8 1LX",
    companyPhone: "0",
    companyFax: "0",
    taxOfficeName: "",
    taxOfficeNumber: "073",
    payeReference: "P7266A",
    locationName: "Bexleyheath",
    locationAddress1: "163 Broadway",
    locationAddress2: "",
    locationAddress3: "",
    locationTown: "",
    locationCounty: "",
    locationPostCode: "DA6 7ES",
    locationPhone: "020 8303 3040",
    locationFax: "020 8304 4974",
    division: "1. Front Of House"
}]
});

export default MainEmployment;

