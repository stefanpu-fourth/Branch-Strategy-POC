import SirenSerializer from './ess';

export default SirenSerializer.extend({
  deriveRelationshipNameFromEntity(relationshipMeta /*, sirenRelName*/ ) {
    const name = this._super(relationshipMeta);

    return name === 'payslipElement' ? 'payslipElements' : name;
  }
});
