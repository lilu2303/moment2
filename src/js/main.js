"use strict";
import {fetchAndDislayCourses, fetchUrl} from './utilities/courses.js';

window.onload = fetchAndDislayCourses(fetchUrl);