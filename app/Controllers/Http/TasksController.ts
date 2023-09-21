import Task from 'App/Models/Task';
import * as console from 'console';

export default class TasksController {
  public async index({ inertia, request }) {
    let query = Task.query().orderBy('updated_at', 'desc');

    let completedTasks = query.clone().where('completed', 1);
    let incompleteTasks = query.clone().where('completed', 0);

    return inertia.render('tasks/Index', {
      data: {
        completedTasksData: await completedTasks.paginate(request.input('cpage', 1), 10),
        incompleteTasksData: await incompleteTasks.paginate(request.input('ipage', 1), 10),
      },
      cpage: request.input('cpage', 1),
      ipage: request.input('ipage', 1),
    });
  }

  public async list({ request, response, session }) {
    let query = Task.query()
      .where('completed', request.input('completed', 1))
      .orderBy('updated_at', 'desc');

    return query.paginate(request.input('page', 1), 10);
  }

  public async update({ request, response, session }) {
    const task = await Task.findOrFail(request.param('id'));
    task.completed = request.input('completed');
    await task.save();
    session.flash('success', 'Task updated successfully.');
    return task;
  }
}
