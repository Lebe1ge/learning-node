module.exports = (app) => {
  const User = app.models.User;
  const Todo = app.models.Todo;

  return (req, res, next) => {
    let originalAssignedUser = null;
    let newAssignedUser = null;
    let todo = null;

    return findAssigned() // 1. ensuring the new assigned exist
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'assigned.not.found'))
      .then(findTodo) // 2. capturing the todo as global variable
      .then(app.utils.ensureOne)
      .catch(app.utils.reject(404, 'todo.not.found'))
      .then(getOriginalAssigned) // 3. capturing the originalAssigned as global variable.
      .then(updateTodo)
      .then(updateAssigneds)
      .then(app.utils.empty)
      .then(res.commit)
      .catch(res.error);

    function findAssigned(){
      return User.findById(req.params.assignedId)
        .then(set);

      function set(data){
        return newAssignedUser = data;
      }
    }

    function findTodo(){
      return Todo.findById(req.params.id)
        .then(set);

      function set(data){
        return todo = data
      }
    }

    function getOriginalAssigned() {
      return User.findById(todo.assigned)
        .then(set);

      function set(data) {
        originalAssignedUser = data
      }
    }

    function updateTodo() {
      todo.assigned = req.params.assignedId;
      return todo.save();
    }

    function updateAssigneds(){

      return updateOriginal()
        .then(updateNew);

      function updateOriginal() {
        return User.findByIdAndUpdate(originalAssignedUser._id, {
          $pull: {
            'tasks': todo._id
          }
        })
      }

      function updateNew() {
        newAssignedUser.tasks.push(todo._id.toString());
        return newAssignedUser.save();
      }
    }

    function returnTodo(){
      return todo;
    }
  };
};
