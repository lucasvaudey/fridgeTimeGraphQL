import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  Column,
  Double,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
@ObjectType()
export class Ingredient {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Field(() => Double)
  @Column({ nullable: true })
  quantity: number;

  @Field(() => String)
  @Column({ nullable: true })
  refQuant: string;

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
