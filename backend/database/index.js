const mongoose = require('mongoose');
const MONGO_URI = process.env.DB_URI;

// console.log(MONGO_URI);

mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .then(async () => {})
  .catch((e) => console.error(e));
