import Camera from '../models/Camera.js';

const getAll = async (req, res) => {
  console.log('controller getAll req.body', req.body);
  console.log('controller getAll req.params - ', req.params);
  try {
    const cameras = await Camera.getAll();
    res.status(200).send(cameras);
  } catch (e) {
    console.log('controller getAll error - ', e);
    res.status(500).json(e.message);
  }
};

const getOne = async (req, res) => {
  console.log('controller getOne req.body - ', req.body);
  console.log('controller getOne req.params - ', req.params);
  const { id } = req.params;
  try {
    const camera = await Camera.findOneById(id);
    res.status(200).send(camera);
  } catch (e) {
    console.log('controller getOne error - ', e);
    res.status(500).send(e.message);
  }
};

const createOne = async (req, res) => {
  console.log('controller createOne req.body - ', req.body);
  console.log('controller createOne req.params - ', req.params);
  try {
    const camera = new Camera(req.body);
    const savedCamera = await camera.saveOne();
    res.status(201).send(savedCamera);
  } catch (e) {
    console.log('controller createOne error - ', e);
    res.status(500).send(e.message);
  }
};

const updateOne = async (req, res) => {
  console.log('controller updateOne req.body - ', req.body);
  console.log('controller updateOne req.params - ', req.params);

  const { id } = req.params;

  try {
    const camera = await Camera.updateOne(id, req.body);
    res.status(201).send(camera);
  } catch (e) {
    console.log('controller updateOne error - ', e);
    res.status(500).send(e.message);
  }
};

const deleteOne = async (req, res) => {
  console.log('controller deleteOne req.body - ', req.body);
  console.log('controller deleteOne req.params - ', req.params);

  const { id } = req.params;

  try {
    await Camera.deleteOne(id);
    res.status(204).send();
  } catch (e) {
    console.log('controller deleteOne error - ', e);
    res.status(500).send(e.message);
  }
};

export default {
  getAll, getOne, createOne, updateOne, deleteOne,
};
