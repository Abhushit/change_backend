import mongoose from 'mongoose';
import dbConfig from './utils/configs/db.config.js';

mongoose.connect(dbConfig.dbURL).then(() => console.log('DB connected!'))
.catch((err) => console.log('Db connection failed - ',err))
