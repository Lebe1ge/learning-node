module.exports = (app) => {
  const User = app.models.User

  return {
    create,
    list,
    show,
    update,
    remove
  }

  function create(req, res, next){
    let user = new User(req.body);

    User.findOne({
      email: req.body.email
    })
      .then(ensureEmpty)
      .then(createUser)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))

      function createUser(){
        user.password = sha1(user.password);
        return user.save();
      }

  }

  function list(req, res, next){
    User.find()
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

  function show(req, res, next){
    User.findById(req.params.id)
      .populate('todos')
      .then(ensureOne)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

  function update(req, res, next){
    User.findByIdAndUpdate(req.body.id, req.body)
      .then(ensureOne)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

  function remove(req, res, next){
    User.findByIdAndRemove(req.params.id)
      .then(ensureOne)
      .then(respond.bind(null, res))
      .catch(spread.bind(null, res))
  }

}

function ensureOne(data){
  return (data) ? data : Promise.reject({code: 404, message: 'user.not.found'})
}

function respond(res, data) {
  if(!data)
    return res.status(204).send()

  return res.send(data)
}

function spread(res, error) {
  if(error.code){
    return res.status(error.code).send(error.message)
  }
  return res.status(500).send(error.message)
}
