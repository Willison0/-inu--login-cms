import { verifiedEmailPath } from "../../libs/constants.mjs";
import prisma from "../../libs/prisma";
import { hashPassword } from "../../libs/encryptHandlers";
import {
  badRequest400,
  forbidden403,
  ok201,
} from "../../libs/requestsHandlers";
import { signJWT } from "../../libs/tokensHandlers";
import { validateRawData } from "../../libs/validationHandler";
import * as yup from "yup";
import { number, object, string, date, array } from "yup";
import { sendVerifiedEmail } from "../mails/sendMail";
import Urlbox from "urlbox";

// Get your API key and secret from urlbox.com
const apiKey = "uLXfCfYFKGgKoACk";
const apiSec = "bd8a9bb8ea8c4ce49c22a3c2022ea183";
const urlbox = Urlbox(apiKey, apiSec);

// See all urlbox screenshot options at urlbox.com/docs

/** Schema to register user form */
const registerSchema = object({
  email: string().email().required("Email is required"),
  firstName: string().required("First name is required"),
  secondName: string(),
  firstSurname: string().required("Lastname is required"),
  secondSurname: string(),
  gender: number().required("Please state your gender"),
  dateOfBirth: date().required("Birthdate is required"),
  nationalId: number().required("National ID is required"),
  nationality: number().required("Nationality is required"),
  country: number().required("Country is required"),
  detailedAddress: string(),
  personalDescrip: string(),
  socials: array(
    yup.object({
      platform: number().required(),
      handle: string().required(),
    })
  ),
  website: string(),
  password: string().required("Password is required"),
  rePassword: string().test({
    name: "passwordMatch",
    test: function (value) {
      return this.parent.password === value;
    },
    message: "Passwords must be the same",
  }),
  username: string().required("Username is required"),
  createdAt: date(),
});

/**
 * @param {NextRequest} request
 */
export async function POST(request) {
  const rawData = await request.json();

  const { data, success, errors } = await validateRawData({
    schema: registerSchema,
    rawData,
  });

  if (!success) {
    return badRequest400({ message: errors });
  }

  const search = await prisma.users.findFirst({
    select: { iduser: true },
    where: { OR: [{ email: data.email }, { user_name: data.username }] },
  });

  if (search) {
    return forbidden403({ message: "username or email exists" });
  }

  const payload = await prisma.users.create({
    data: {
      email: data.email,
      user_name: data.username,
      password: await hashPassword(data.password),
      create_at: new Date(),
      personas: {
        create: {
          p_nombre: data.firstName,
          s_nombre: data.secondName,
          p_apellido: data.firstSurname,
          s_apellido: data.secondSurname,
          genero: data.gender,
          fecha_nacimiento: data.dateOfBirth,
          cedula: data.nationalId,
          nacionalidad: data.nationality,
          pais: data.country,
          direccion_detallada: data.detailedAddress,
          descripcion_personal: data.personalDescrip,
          redes_sociales_has_personas: data.socials
            ? {
                create: data.socials.map((social) => ({
                  redes_sociales: {
                    connect: { idred_social: social.platform },
                  },
                  usuario_red_social: social.handle,
                })),
              }
            : undefined,
        },
      },
      tipo_usuario: {
        connect: { idtipo_usuario: 1 }, // Default user type ID
      },
    },
  });

  // return payload;
  const jwt = await signJWT(payload);

  const website = data.website;
  const options = {
    url: website,
    thumb_width: 600,
    format: "jpg",
    quality: 80,
  };
  const imgUrl = urlbox.generateRenderLink(options);

  // send an email with jwt
  const verifiedUrl = new URL(verifiedEmailPath + jwt, request.nextUrl.href);
  await sendVerifiedEmail({ token: verifiedUrl.href, receiver: payload.email });
  return ok201();
}
