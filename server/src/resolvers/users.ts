import argon2 from "argon2";
import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { userVerif } from "../utils/userVerif";
import { MyContext } from "src/types";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class ConnexionInput {
  @Field()
  password: string;
  @Field({ nullable: true })
  username: string;
  @Field({ nullable: true })
  email: string;
}

@Resolver()
export class UsersResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: ConnexionInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const error = await userVerif(options, false);
    if (error != null) {
      return error;
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = await User.create({
      username: options.username,
      email: options.email,
      password: hashedPassword,
    }).save();
    req.session.userId = user.id;
    console.log(req.session);
    return { user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    console.log(req.session);
    if (req.session.userId == null) {
      return null;
    } else {
      return await User.findOne({ id: req.session.userId });
    }
  }
}
