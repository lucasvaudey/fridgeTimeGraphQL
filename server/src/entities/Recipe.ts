import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ingredient } from "./Ingredient";
import { User } from "./User";

@Entity()
@ObjectType()
export class Recipe extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "text" })
  title: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();

  @Field(() => String)
  @Column({ type: "text" })
  description: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  like!: number;

  @ManyToOne(() => User, (user) => user.recipes)
  user: User;
}
