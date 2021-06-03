import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Ingredient } from "./Ingredient";
import { User } from "./User";

@ObjectType()
@Entity()
export class Fridge {
  @OneToOne(() => User, (user) => user.fridge)
  user: User;

  @Field(() => [Ingredient])
  @Column(() => Ingredient)
  ingredients: Ingredient[];

  @Field(() => Int)
  @Column({ nullable: false, default: 1 })
  person: number;
}
