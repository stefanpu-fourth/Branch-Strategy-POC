import DS from 'ember-data';

const attr = DS.attr;

const nextOfKin = DS.Model.extend({
    reference: attr('string'),
    personTitle: attr('string'),
    firstName: attr('string'),
    lastName: attr('string'),
    relationship: attr('string'),
    homeTelephone: attr('string'),
    mobileTelephone: attr('string'),
    workEmail: attr('string'),
    homeEmail: attr('string'),
    employeeId: attr('string'),
    employee: DS.belongsTo('employee')
});

export default nextOfKin;

