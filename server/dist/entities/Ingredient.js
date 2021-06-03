"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Recipe_1 = require("./Recipe");
let Ingredient = class Ingredient {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Ingredient.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Ingredient.prototype, "quantity", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Recipe_1.Recipe, (recipe) => recipe.ingredients),
    __metadata("design:type", Recipe_1.Recipe)
], Ingredient.prototype, "recipe", void 0);
Ingredient = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Ingredient);
exports.Ingredient = Ingredient;
//# sourceMappingURL=Ingredient.js.map