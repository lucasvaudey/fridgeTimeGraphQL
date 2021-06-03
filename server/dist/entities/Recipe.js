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
exports.Recipe = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("./Ingredient");
const User_1 = require("./User");
let Recipe = class Recipe extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Recipe.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ unique: true, type: "text" }),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Object)
], Recipe.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Object)
], Recipe.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(() => Ingredient_1.Ingredient, (ingredient) => ingredient.recipe),
    __metadata("design:type", Array)
], Recipe.prototype, "ingredients", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Recipe.prototype, "like", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.recipes),
    __metadata("design:type", User_1.User)
], Recipe.prototype, "user", void 0);
Recipe = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=Recipe.js.map