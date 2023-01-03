import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshTokenAlreadyExists = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshTokenAlreadyExists) {
      throw new Error("Refresh token invalid");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(
      refreshTokenAlreadyExists.userId
    );

    return { token };
  }
}

export { RefreshTokenUserUseCase };
