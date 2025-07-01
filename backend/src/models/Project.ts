import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  image: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  image: {
    type: String,
    required: [true, 'Project image is required']
  },
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Project description cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema);
