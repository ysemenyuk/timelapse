import express from 'express'

import { getCameras } from './controllers.js';

const router = express.Router()

router.route('/').get(getCameras)

export default router