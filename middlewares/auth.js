module.exports = (app) => {
  (res, req, next) => {
    let authorization = req.headers['authorization'];

    if(!authorization)
      return res.status(401).send('unauthorized')

      Token.findById(authorization)
        .then(ensureOne)
        .then(findAssociatedUser)
        .then(ensureOne)
        .then(setUserId)
        .then(next)
        .catch(unauthorized)

      function findAssociatedUser(){
        return User.findById(token.userId)
      }

      function setUserId(user){
        req.userId = user._id;
      }

      function ensureOne(data) {
        return (data) ? data : Promise.reject({code: 404, message: 'Todo.not.found'})
      }

      function unauthorized(){
        return res.status(401).send('unauthorized')
      }
  };
}
