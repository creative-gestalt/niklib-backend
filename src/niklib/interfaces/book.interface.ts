import { Document } from 'mongoose';

export interface Book extends Document {
  readonly title: string;
  readonly description: string;
  readonly img_name: string;
  readonly author: string;
  readonly date_posted: string;
  readonly filename: string;
}
