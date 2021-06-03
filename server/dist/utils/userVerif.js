"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerif = void 0;
const User_1 = require("../entities/User");
const userVerif = (options, login) => __awaiter(void 0, void 0, void 0, function* () {
    const emailTest = yield User_1.User.findOne({ email: options.email });
    const userTest = yield User_1.User.findOne({ username: options.username });
    if (login) {
    }
    else {
        if (emailTest != null) {
            return {
                error: {
                    field: "email",
                    message: "Cet email est déjà utilisé",
                },
            };
        }
        if (userTest != null) {
            return {
                error: {
                    field: "username",
                    message: "Cet identifiant est déjà utilisé",
                },
            };
        }
        if (options.password.length < 6) {
            return {
                error: {
                    field: "password",
                    message: "Le mot de passe doit faire au moins 6 charactères.",
                },
            };
        }
        if (!options.email.includes("@") || !options.email.includes(".")) {
            return {
                error: {
                    field: "email",
                    message: "Le format de l'email n'est pas valide.",
                },
            };
        }
    }
    return null;
});
exports.userVerif = userVerif;
//# sourceMappingURL=userVerif.js.map