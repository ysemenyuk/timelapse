import mongodb from 'mongodb';
import cameraTaskService from '../services/cameraTask.service.js';

export default () => {
  const getAll = async ({ cameraId, logger }) => {
    logger(`task.controller.getAll`);
    const tasks = await taskRepository.getAll({ camera: cameraId, logger });
    return tasks;
  };

  const getOne = async ({ id, logger }) => {
    logger(`task.controller.getOne id: ${id}`);
    const task = await taskRepository.getOne({ id, logger });

    if (!task) {
      logger(`task.controller.getOne id: ${id} - not found`);
      throw new Error('task not found');
    }

    return task;
  };

  const createOne = async ({ userId, cameraId, payload, logger }) => {
    logger(`task.controller.createOne payload: ${payload}`);

    // TODO: create jobs?

    console.log('task.controller.createOne payload', payload);

    // const { jobName, status, ...data } = payload;

    // const jobs = await worker.jobs({ name: jobName, 'data.cameraId': cameraId });

    // console.log(333, jobs);

    // const job = worker.create(jobName, { userId, cameraId, ...payload });
    // job.repeatEvery(`${payload.interval} seconds`);
    // const j = await job.save();

    // // console.log(222, job);
    // console.log(333, job.attrs._id);

    // const task = await taskRepository.createOne({
    //   user: userId,
    //   camera: cameraId,
    //   name: jobName,
    //   status: status,
    //   job: job.attrs._id,
    //   data: data,
    //   logger,
    // });

    // return task;
  };

  const updateOne = async ({ id, payload, logger }) => {
    logger(`task.controller.updateOne id: ${id}`);
    const task = await taskRepository.getOne({ id, logger });

    if (!task) {
      logger(`task.controller.updateOne id: ${id} - not found`);
      throw new Error('task not found');
    }

    // const { ObjectID } = mongodb;
    // const id = new ObjectID(task.job);

    console.log('task.controller.updateOne payload', payload);

    // const { jobName, status, ...data } = payload;

    // const jobs = await worker.jobs({ _id: task.job });

    // console.log(111333, jobs);

    // await taskRepository.updateOne({ userId, taskId, payload, logger });
    // const updated = await taskRepository.getOne({ userId, id, logger });
    // return updated;
  };

  const deleteOne = async ({ id, logger }) => {
    logger(`task.controller.deleteOne taskId: ${id}`);
    const task = await taskRepository.getOne({ id, logger });

    if (!task) {
      logger(`task.controller.deleteOne taskId: ${taskId} - not found`);
      throw new Error('taskId not found');
    }

    // TODO: delete jobs?

    const deleted = await taskRepository.deleteOne({ id, logger });
    return deleted;
  };

  return { getAll, getOne, createOne, updateOne, deleteOne };
};
