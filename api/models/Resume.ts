import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  resumeFileId: mongoose.Types.ObjectId; // GridFS file ID
  createdAt: Date;
}

const ResumeSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  education: { type: String, required: true },
  skills: [{ type: String }],
  resumeFileId: { type: Schema.Types.ObjectId, required: true }, // Store GridFS file ID
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IResume>('Resume', ResumeSchema); 