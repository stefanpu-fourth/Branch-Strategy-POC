import Serializer from 'ember-cli-mirage/serializers/json-api-serializer';
import Collection from 'ember-cli-mirage/orm/collection';
import Model from 'ember-cli-mirage/orm/model';
import flatten from 'lodash/array/flatten';
import { capitalize, pluralize } from 'ember-cli-mirage/utils/inflector';

export default Serializer.extend({

  namespace: '/api',

  path: '',

  serialize(response) {
    let payload;

    if (response instanceof Model) {
      payload = this._serializePrimaryModel(response);
    } else {
      payload = this._serializePrimaryCollection(response);
    }

    return payload;
  },

  keyForModel({ type }) {
    return capitalize(type);
  },

  keyForCollection({ type }) {
    return capitalize(pluralize(type));
  },

  keyForAttribute(attr) {
    return attr;
  },

  _serializePrimaryModel(model) {
    const response = this._resourceObjectFor(model);

    // TODO: populate links here

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
      entities: flatten(this._serializeRelationshipsFor(model))
    };

    return obj;
  },

  _attrsForModel(model) {
    const { attrs, fks } = model;

    return Object.keys(attrs).reduce((memo, attr) => {
      if (fks.indexOf(attr) === -1) {
        memo[attr] = model[attr];
      }

      return memo;
    }, {});
  },

  _serializeRelationshipsFor(model) {
    return this.relationships.map(relName => {
      const relationship = model[relName];
      const included = this._isIncludedRelationship(relName);
      let entity;

      if (relationship instanceof Model) {
        entity = this._serializeBelongsTo(model, relationship, relName, included);
      } else if (relationship instanceof Collection) {
        entity = this._serializeHasMany(model, relationship, relName, included);
      }

      return entity;
    });
  },

  _isIncludedRelationship(relName) {
    return this.constructor.prototype.included.indexOf(relName) !== -1;
  },

  _serializeBelongsTo(model, relationship, relName, included) {
    let res;

    if (included) {
      res = this._serializeIncludedModel(model, relationship, relName);
    } else {
      res = {
        'class': [ this.keyForModel(relationship) ],
        rel: [ this._buildRelPath(model, relName) ],
        href: this._buildURLForBelongsTo(model, relationship, relName)
      };
    }

    return res;
  },

  _serializeHasMany(model, relationship, relName, included) {
    let res;

    if (included) {
      res = relationship.map(rel => this._serializeIncludedModel(model, rel, relName));
    } else {
      res = [{
        'class': [ this.keyForCollection(relationship) ],
        rel: [ this._buildRelPath(model, relName) ],
        href: this._buildURLForHasMany(model, relName)
      }];
    }

    return res;
  },

  _serializeIncludedModel(model, relatedModel, relName) {
    const relPath = this._buildRelPath(model, relName);

    return {
      'class': [ this.keyForModel(relatedModel) ],
      rel: [ relPath ],
      properties: this._attrsForModel(relatedModel)
    };
  },

  _buildRelPath(model, relName) {
    const modelKey = this.keyForModel(model);

    return `rels/${modelKey}/${relName}`.toLowerCase();
  },

  _buildURL(...args) {
    const { namespace, path } = this;
    let url = [];

    url.push(namespace);

    if (typeof path === 'function') {
      url.push(path.apply(this, args));
    } else if (typeof path === 'string' && path.length) {
      url.push(path);
    }

    args.forEach(x => url.push(x));

    return url.join('/').toLowerCase();
  },

  _buildURLForHasMany(model, relName) {
    const modelCollectionKey = this.keyForCollection(model);

    return this._buildURL(modelCollectionKey, model.id, relName);
  },

  _buildURLForBelongsTo(model, relationship, relName) {
    const modelCollectionKey = this.keyForCollection(model);

    return this._buildURL(modelCollectionKey, model.id, relName, relationship.id);
  }

});
