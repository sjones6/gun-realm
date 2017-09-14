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
            done(null, pairs);
        } catch (err) {
            done(err)
        }
    },
    put: function(batch, done) {
        try {
            keyValRealm.write(() => {
                let written = 0;
                let target = batch.length;
                batch.forEach(node => {
                    node.key_field = node.key + '_' + node.field;

                    // Todo: must support all types
                    node.val = typeof node.val === "string" ? node.val : "";
                    node.rel = typeof node.rel === "string" ? node.rel : "";
                    keyValRealm.create('KeyVal', node, true);
                });
                done(null);
            });
        } catch (e) {
            console.error(e);
            done(e);
        }
    }
});

module.exports = GunRealm;