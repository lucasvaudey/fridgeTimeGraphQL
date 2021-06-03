import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
@ObjectType()
export class Ingredient {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  @Column({ nullable: true })
  quantity: string;

  @Field(() => String)
  @Column({ unique: true })
  name!: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
