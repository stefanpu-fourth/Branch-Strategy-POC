import Serializer from 'ember-cli-mirage/serializers/json-api-serializer';
import Collection from 'ember-cli-mirage/orm/collection';
import Model from 'ember-cli-mirage/orm/model';
import _assign from 'lodash/object/assign';
import { capitalize, pluralize } from 'ember-cli-mirage/utils/inflector';

export default Serializer.extend({

  namespace: '/api',

  path: '/',

  serialize(response) {
    // const { included } = this;
    let payload;

    if (response instanceof Model) {
      payload =  this._serializePrimaryModel(response);
    } else {
      payload = this._serializePrimaryCollection(response);
    }

    return payload;
  },

  keyForModel({ type }) {
    return type;
  },

  keyForCollection({ type }) {
    return capitalize(pluralize(type));
  },

  keyForAttribute(attr) {
    return attr;
  },

  _serializePrimaryModel(model) {
    const response = this._resourceObjectFor(model);

    return response;
  },

  _serializePrimaryCollection(collection) {
    const response = {
      'class': [ 'Paged-Collection', this.keyForCollection(collection[0]) ],
      properties: {
        defaultPageSize: 100,
        top: 100,
        totalRows: collection.length
      },
      entities: collection.map(model => this._resourceObjectFor(model)),
      links: []
    };

    return response;
  },

  _resourceObjectFor(model) {
    const obj = {
      'class': [ this.keyForModel(model) ],
      properties: this._attrsForModel(model),
      entities: this._serializeRelationshipsFor(model),
      links: []
    };

    return obj;
  },

  _attrsForModel(model) {
    let attrs = {};

    if (this.attrs) {
      attrs = this.attrs.reduce((memo, attr) => {
        memo[attr] = model[attr];
        return memo;
      }, {});
    } else {
      attrs = _assign(attrs, model.attrs);
    }

    model.fks.forEach(fk => {
      delete attrs[fk];
    });

    return attrs;
  },

  _serializeRelationshipsFor(model) {
    const serializer = this._serializerFor(model);
    const { relationships } = serializer;

    return relationships.map(relName => {
      const relationship = model[relName];
      let entity;

      if (relationship instanceof Model) {
        entity = this._serializeRelationshipForModel(model, relationship, relName);
      } else if (relationship instanceof Collection) {
        entity = this._serializeRelationshipForCollection(model, relationship, relName);
      }

      return entity;
    });
  },

  _serializeRelationshipForModel(model, relationship, relName) {
    const { namespace, path } = this;
    const modelKey = this.keyForModel(model);
    const modelCollectionKey = this.keyForCollecton(model);
    const relKey = this.keyForModel(relationship);

    return {
      'class': [ relKey ],
      rel: [ `rels/${modelKey}/${relName}` ],
      href: [ `${namespace}${path}${modelCollectionKey}/${model.id}/${relName}/${relationship.id}` ]
    };
  },

  _serializeRelationshipForCollection(model, relationship, relName) {
    const { namespace, path } = this;
    const modelKey = this.keyForModel(model);
    const modelCollectionKey = this.keyForCollection(model);
    const relKey = this.keyForCollection(relationship);

    return {
      'class': [ relKey ],
      rel: [ `rels/${modelKey}/${relName}` ],
      href: [ `${namespace}${path}${modelCollectionKey}/${model.id}/${relName}` ]
    };
  }

});
