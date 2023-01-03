import { Request, Response } from "express";
import { AutheticateUserUseCase } from "./AutheticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AutheticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      username,
      password,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
