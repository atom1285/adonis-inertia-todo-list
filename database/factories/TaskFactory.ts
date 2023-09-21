import Task from 'App/Models/Task'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Task, ({ faker }) => {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.words(10),
    completed: faker.datatype.boolean()
  }
}).build()
