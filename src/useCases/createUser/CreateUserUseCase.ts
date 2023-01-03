import { client } from "../../prisma/client";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  username: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // Verificar se o usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    //Cadastra o usuario
    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
