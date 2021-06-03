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
exports.Fridge = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("./Ingredient");
const User_1 = require("./User");
let Fridge = class Fridge {
};
__decorate([
    typeorm_1.OneToOne(() => User_1.User, (user) => user.fridge),
    __metadata("design:type", User_1.User)
], Fridge.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Ingredient_1.Ingredient]),
    typeorm_1.Column(() => Ingredient_1.Ingredient),
    __metadata("design:type", Array)
], Fridge.prototype, "ingredients", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column({ nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Fridge.prototype, "person", void 0);
Fridge = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Fridge);
exports.Fridge = Fridge;
//# sourceMappingURL=Fridge.js.map