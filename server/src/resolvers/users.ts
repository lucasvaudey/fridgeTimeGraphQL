import argon2 from "argon2";
import { Users } from "../entities/Users";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => Users, { nullable: true })
  user?: Users;
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
    @Arg("options") options: ConnexionInput
  ): Promise<UserResponse> {
    const userTest = await Users.findOne({ username: options.username });
    const emailTest = await Users.findOne({ email: options.email });
    if (userTest != null) {
      return {
        error: { field: "username", message: "Ce pseudo est déjà utilisé." },
      };
    }
    if (emailTest != null) {
      return {
        error: { field: "email", message: "Cet email est déjà utilisé." },
      };
    }
    //TODO: register, etc... verification
    const hashedPassword = await argon2.hash(options.password);
    const user = await Users.create({
      username: options.username,
      email: options.email,
      password: hashedPassword,
    }).save();
    return { user };
  }
}
