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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = exports.ConnexionInput = void 0;
const argon2_1 = __importDefault(require("argon2"));
const Users_1 = require("../entities/Users");
const type_graphql_1 = require("type-graphql");
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(() => FieldError, { nullable: true }),
    __metadata("design:type", FieldError)
], UserResponse.prototype, "error", void 0);
__decorate([
    type_graphql_1.Field(() => Users_1.Users, { nullable: true }),
    __metadata("design:type", Users_1.Users)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
let ConnexionInput = class ConnexionInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ConnexionInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ConnexionInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ConnexionInput.prototype, "email", void 0);
ConnexionInput = __decorate([
    type_graphql_1.InputType()
], ConnexionInput);
exports.ConnexionInput = ConnexionInput;
let UsersResolver = class UsersResolver {
    register(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const userTest = yield Users_1.Users.findOne({ username: options.username });
            const emailTest = yield Users_1.Users.findOne({ email: options.email });
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
            const hashedPassword = yield argon2_1.default.hash(options.password);
            const user = yield Users_1.Users.create({
                username: options.username,
                email: options.email,
                password: hashedPassword,
            }).save();
            return { user };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => UserResponse),
    __param(0, type_graphql_1.Arg("options")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ConnexionInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "register", null);
UsersResolver = __decorate([
    type_graphql_1.Resolver()
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.js.map