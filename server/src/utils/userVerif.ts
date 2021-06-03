import { User } from "../entities/User";
import { ConnexionInput } from "../resolvers/users";

export const userVerif = async (options: ConnexionInput, login: boolean) => {
  const emailTest = await User.findOne({ email: options.email });
  const userTest = await User.findOne({ username: options.username });
  if (login) {
    //TODO: login verification
  } else {
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
};
