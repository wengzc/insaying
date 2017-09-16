/**
 * Created by Administrator on 2017/8/6.
 */
export class UserModel {
  _id: string;
  name: string;
  password: string;
  salt: string;
  avatar: string;
  bio?: string;
  email?: string;
  created_at: string;
  github?: string;
  website?: string;
  tagline?: string;
}
