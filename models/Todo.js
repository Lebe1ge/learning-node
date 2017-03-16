const timestamp = require('mongoose-timestamp');
module.exports = (app) => {
  const Schema = app.mongoose.Schema;

  const TodoSchema = new Schema({
    title: String,
    content: String,
    creator: {
      type: app.mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    assigned: {
      type: app.mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  });

  TodoSchema.plugin(timestamp);

  return app.mongoose.model('Todo', TodoSchema);


}
