import { NextRequest } from "next/server";
import prisma from "../../libs/prisma";
import { badRequest400, ok200, unauthorized401 } from "../../libs/requestsHandlers";
import { verifyPassword } from "../../libs/encryptHandlers";
import { accessTokenName, setupSessionCookie } from "../../libs/cookiesHandlers";

export async function POST(request: NextRequest) {
    const body: LoginBody = await request.json();
    const { password, username } = body;
  
    if (!password || !username) {
      return badRequest400({ message: 'user or password is not correct' });
    }
  
    /** Search user by username or email **/
    const user = await prisma.users.findFirst({
      select: {
        iduser: true,
        password: true,
        user_name: true,
        email: true,
      },
      where: { OR: [{ user_name: username }, { email: username }] },
    });
  
    if (!user) {
      return unauthorized401({ message: 'User or password is not correct' });
    }
  
    // Check if trust password
    if (!(await verifyPassword(password, user.password))) {
      return unauthorized401({ message: 'user or password is not correct' });
    }
  
    const { iduser, email } = user;
    const payload = {
      iduser,
      email,
      username: user.user_name,
    };
  
    const res = ok200();
    await setupSessionCookie(payload, res.cookies, accessTokenName);
    return res;
  }