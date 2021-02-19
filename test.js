import axios from 'axios';
import fs from 'fs';
import path from 'path';

import getImgFromUrl from './getImgFromUrl.js';
import makeVideoFile from './makeVideoFile.js';
import concatVideos from './concatVideos.js';

import { makeNum, msToTime, log } from './utils.js'

console.log(path.resolve('../'))