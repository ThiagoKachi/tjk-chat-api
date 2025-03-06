import mongoose from 'mongoose';
import { app } from '.';

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const port = Number(process.env.PORT) || 3333;

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  }).catch(() => console.log('Error to connect with MongoDB'));
