import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  image: string;
  name: string;
  description: string;
  designation: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema: Schema = new Schema({
  image: {
    type: String,
    required: [true, 'Client image is required']
  },
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Client name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Client description is required'],
    maxlength: [500, 'Client description cannot exceed 500 characters']
  },
  designation: {
    type: String,
    required: [true, 'Client designation is required'],
    trim: true,
    maxlength: [100, 'Client designation cannot exceed 100 characters']
  }
}, {
  timestamps: true
});

export default mongoose.model<IClient>('Client', ClientSchema);
