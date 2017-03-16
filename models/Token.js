const timestamps = require('mongoose-timestamps');
const ttl = require('mongoose-ttl');

module.exports = (app) => {
    const Schema = app.mongoose.Schema;

    const TokenSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    TokenSchema.plugin(timestamps);
    TokenSchema.plugin(ttl, {'ttl': '1d'});

    return app.mongoose.model('Token', TokenSchema);
};
