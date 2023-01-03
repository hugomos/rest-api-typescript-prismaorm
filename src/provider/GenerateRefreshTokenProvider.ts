import { RefreshToken } from "@prisma/client";
import { client } from "../prisma/client";
import dayjs from "dayjs";

class GenerateRefreshTokenProvider {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "seconds").unix();

    const oldRefreshToken = await client.refreshToken.findFirst({
      where: {
        userId,
      },
    });

    let generatedRefreshToken: RefreshToken;

    if (!oldRefreshToken) {
      generatedRefreshToken = await client.refreshToken.create({
        data: {
          userId,
          expiresIn,
        },
      });
    } else {
      generatedRefreshToken = await client.refreshToken.update({
        where: {
          userId: userId,
        },
        data: {
          userId,
          expiresIn,
        },
      });
    }

    return generatedRefreshToken;
  }
}

export { GenerateRefreshTokenProvider };
