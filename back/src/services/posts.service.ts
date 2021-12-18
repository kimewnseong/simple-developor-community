import { PostModel, UserModel, TagModel } from "@src/models";

export class PostsService {
  constructor(
    private readonly postModel: typeof PostModel,
    private readonly userModel: typeof UserModel,
  ) {}

  async getById(postId: string) {
    const post = await PostModel.findById(postId).populate(
      "author",
      "-password -refreshToken -keyForVerify",
    );
    return post;
  }

  async createPost(title: string, content: string, userId: string, tagList: string[]) {
    const tags = await Promise.all(
      tagList.map((tag: string) => TagModel.findOrCreate({ content: tag })),
    );

    if (!title || !content) {
      throw new Error("제목과 내용을 입력해 주세요.");
    }

    const author = await UserModel.findById(userId);
    const post = await PostModel.create({ title, content, author, members: author, tags });
    return post;
  }

  async editPost(
    postId: string,
    title: string,
    content: string,
    userId: string,
    tagList: string[],
  ) {
    const tags = await Promise.all(
      tagList.map((tag: string) => TagModel.findOrCreate({ content: tag })),
    );

    if (!title || !content) {
      throw new Error("제목과 내용을 입력해 주세요.");
    }
    const post = await PostModel.findById(postId).populate(
      "author",
      "-password -refreshToken -keyForVerify",
    );

    if (post.author._id.toString() !== userId) {
      throw new Error("수정할 수 없습니다.");
    }

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $set: { title, content, tags, isEdit: true } },
      { new: true },
    );
    return updatedPost;
  }

  async addMember(postId: string, userId: string) {
    const user = await UserModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await PostModel.findById(postId);
    if (!post || !user) {
      throw new Error("잘못된 요청입니다.");
    }
    if (post.members.indexOf(user._id) >= 0) {
      throw new Error("이미 참여한 게시글입니다.");
    }

    post.members.push(user);
    await post.save();
    return post;
  }

  async deletePost(postId: string, userId: string) {
    const post = await PostModel.findById(postId).populate(
      "author",
      "-password -refreshToken -keyForVerify",
    );
    if (post.author._id.toString() !== userId) {
      throw new Error("제거할 수 없습니다.");
    }

    return await PostModel.deleteOne({ _id: postId });
  }
}

export const postsService = new PostsService(PostModel, UserModel);
