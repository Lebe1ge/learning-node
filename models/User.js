const timestamp = require('mongoose-timestamp');
module.exports = (app) => {
  const Schema = app.mongoose.Schema;

  const UserSchema = new Schema({
    name: {
      type: String,
      default: 'unknown'
    },
    email: {
      type: String,
      required: true
    },
    todos: [
      {
        type: app.mongoose.Schema.Types.ObjectId,
        ref:'Todo'
      }
    ]
  });

  UserSchema.plugin(timestamp);

  return app.mongoose.model('User', UserSchema);

}
