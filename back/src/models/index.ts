import mongoose from "mongoose";
import { ITagModel } from "@src/types/Tag";
import { IUserDocument, IUserModel } from "@src/types/User";
import { IComment } from "@src/types/Comment";
import { IPost } from "@src/types/Post";

import { TagSchema } from "./schemas/tag.model";
import { UserSchema } from "./schemas/user.model";
import { CommentSchema } from "./schemas/comment.model";
import { PostSchema } from "./schemas/post.model";

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
const Tag = mongoose.model<ITagModel>("Tag", TagSchema);
const Comment = mongoose.model<IComment>("Comment", CommentSchema);
const Post = mongoose.model<IPost>("Comment", PostSchema);

export { User, Tag, Comment, Post };
