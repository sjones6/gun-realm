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
        valType: {
            type: 'int',
            optional: true
        },
        state: {
            type: 'int',
            optional: false
        }
    }
};

const type = function(val) {
    let type = -1;
    switch (true) {
        case (typeof val === 'string'):
            type = 0;
            break;
        case (typeof val === 'number'):
            type = 1;
            break;
        case (typeof val === 'boolean'):
            type = 2;
        case (val === null):
            type = 3;
    }
    return type;
}




module.exports = new Realm({
    schema: [KeyValSchema],
    schemaVersion: 1,
    migration: (oldRealm, newRealm) => {
        // only apply this change if upgrading to schemaVersion 1
        const oldObjects = oldRealm.objects('KeyVal');
        const newObjects = newRealm.objects('KeyVal');

        // loop through all objects and set the name property in the new schema
        for (let i = 0; i < oldObjects.length; i++) {
            newObjects[i].valType = type(oldObjects[0].val);
        }
    }
});