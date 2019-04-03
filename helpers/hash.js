const bcrypt    =   require('bcrypt');

const hash = {
    hash: string => {
        return new Promise(async (resolve, reject) => {
            if (!string) {
                reject(new Error('Missing string parameter'));
            }
            let hash = await bcrypt.hash(string, parseInt(process.env.SALT_ROUND))
                .then(hashedString => hashedString)
                .catch(err => err);
            if (hash instanceof Error) {
                reject(new Error(hash));
            } else {
                resolve(hash);
            }
        });
    },
    compare: (string, hash) => {
        return new Promise(async (resolve, reject) => {
            if (!string) {
                reject(new Error('Missing string parameter'));
            }
            if (!hash) {
                reject(new Error('Missing hash parameter'));
            }
            let match = await bcrypt.compare(string, hash)
                .then(matched => matched)
                .catch(err => err);
            if (match instanceof Error) {
                reject(new Error(match));
            } else {
                if (!match) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        });
    }
};

module.exports = hash;
