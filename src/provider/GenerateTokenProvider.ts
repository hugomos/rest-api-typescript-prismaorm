import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, process.env.SECRET_KEY, {
      subject: userId,
      expiresIn: "3600s",
    });

    return token;
  }
}

export { GenerateTokenProvider };
