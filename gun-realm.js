import keyValRealm from './key-val';
import {KeyValAdapter} from './gun-flint/src/index';

const GunRealm = new KeyValAdapter({
    opt: function(context, options) {
    },
    get: function(key, field, done) {
        let db = keyValRealm.objects('KeyVal');
        let pairs;
        try {
            if (field) {
                pairs = db.filtered(`key_field == $0`, (key + '_' + field));
            } else {
                pairs = db.filtered('key == $0', key);
            }

            let graphRows = pairs.map(row => {
                let node = {
                    key: row.key,
                    field: row.field,
                    state: row.state
                };
                if (row.valType > -1) {
                    switch (row.valType) {
                        case 0: 
                            node.val = row.val;
                            break;
                        case 1:
                            node.val = parseInt(row.valType);
                            break;
                        case 2:
                            node.val = (row.valType === "true");
                            break;
                        case 3:
                            node.val = null;
                            break;
                    }
                } else {
                    node.rel = row.rel;
                }
                return node;
            });
            done(null, graphRows);
        } catch (err) {
            done(this.errors.internal)
        }
    },
    put: function(batch, done) {
        try {
            keyValRealm.write(() => {
                let written = 0;
                let target = batch.length;
                batch.forEach(node => {
                    node.key_field = node.key + '_' + node.field;
                    if (Object.keys(node).indexOf("val") >= 0) {
                        node.valType = this._determineValType(node.val);
                        node.val = (node.valType !== 3) ? node.val.toString() : "";
                    } else {
                        node.valType = -1;
                    }
                    node.rel = typeof node.rel === "string" ? node.rel : "";
                    keyValRealm.create('KeyVal', node, true);
                });
                done(null);
            });
        } catch (e) {
            console.error(e);
            done(e);
        }
    },
    _determineValType: function(val) {
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
});

module.exports = GunRealm;