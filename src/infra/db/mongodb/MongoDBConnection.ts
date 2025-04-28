import mongoose from 'mongoose';

export class MongoDBConnection {
  private static instance: MongoDBConnection;

  private constructor() {}

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}