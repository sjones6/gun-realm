import Realm from 'realm';

const KeyValSchema = {
    name: 'KeyVal',
    primaryKey: 'key_field',
    properties: {
        key_field: 'string',
        key: {
            type: 'string',
            indexed: true
        },
        field: {
            type: 'string',
            indexed: true
        },
        rel: {
            type: 'string',
            optional: true
        },
        val: {
            type: 'string',
            optional: true
        },
        state: {
            type: 'int',
            optional: false
        }
    }
};

module.exports = new Realm({schema: [KeyValSchema]});