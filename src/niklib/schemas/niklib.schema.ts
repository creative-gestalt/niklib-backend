import * as mongoose from 'mongoose';

export const NiklibSchema = new mongoose.Schema({
  title: String,
  description: String,
  img_name: String,
  author: String,
  date_posted: String,
  filename: String,
});
