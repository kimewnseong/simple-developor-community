import { TagModel, UserModel } from "@src/models";
import { makeVerifyKey } from "@utils/mailAuth";

import { IUserDocument, IUserData } from "@src/types/User";
import { ICreateUser } from "@src/types/CoreResponse";

export class UserService {
  constructor(
    private readonly userModel: typeof UserModel,
    private readonly tagModel: typeof TagModel,
  ) {}

  async createUser(data: IUserData): Promise<ICreateUser> {
    try {
      const user = await this.userModel.findOne({ email: data.email });

      if (user) return { status: false, message: "이미 가입된 이메일입니다." };

      const { tags } = data;

      const result = await this.tagModel.getTags(tags);

      const keyForVerify = makeVerifyKey(20);

      const createUserData = {
        ...data,
        tags: result,
        keyForVerify,
        emailVerified: false,
      };

      await this.userModel.hashPassword(createUserData);

      await this.userModel.create(createUserData);
      return { status: true, keyForVerify };
    } catch (err: any) {
      return { status: false, message: err.message };
    }
  }

  async getByEmail(email: string, obj = {}): Promise<IUserDocument | null> {
    return this.userModel.findOne({ email }, obj);
  }

  async getById(id: string, obj = {}): Promise<IUserDocument | null> {
    return this.userModel.findById(id, obj);
  }

  async updateByQuery(where: any, query: any) {
    return await this.userModel.updateOne(where, query);
  }

  async updateSkillTags(id: string, tags: string[]) {
    await this.userModel.updateOne({ _id: id }, { tags: [] });

    const newTags = await this.tagModel.getTags(tags);

    await this.userModel.updateOne({ _id: id }, { $push: { tags: newTags } });
  }
}

export const userService = new UserService(UserModel, TagModel);
