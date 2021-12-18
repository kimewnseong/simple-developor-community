import { IComment } from "./Comment";
import { IUserDocument } from "./User";
import { ITagDocument } from "./Tag";
import { Model, Types, PopulatedDoc } from "mongoose";

export interface IPost {
  title: string;
  author: PopulatedDoc<IUserDocument>;
  views: number;
  comments: Types.DocumentArray<IComment>;
  members: Types.DocumentArray<Partial<IUserDocument>>;
  tags: Types.DocumentArray<ITagDocument>;
  isEdit: boolean;
}

export interface IPostModel extends Model<IPost> {
  getPaginatedPosts(query: object, page: number, perPage: number): Promise<number[]>;
}
