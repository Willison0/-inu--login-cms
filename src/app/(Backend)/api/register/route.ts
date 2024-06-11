import { verifiedEmailPath } from '../../libs/constants.mjs';
import prisma from "../../libs/prisma";
import { hashPassword } from '../../libs/encryptHandlers';
import {
  badRequest400,
  forbidden403,
  ok201,
} from '../../libs/requestsHandlers';
import { signJWT } from '../../libs/tokensHandlers';
import { validateRawData } from '../../libs/validationHandler';
import { NextRequest } from 'next/server';
import { number, object, string, date, array } from 'yup';
import { sendVerifiedEmail } from '../mails/sendMail';

/** Schema to register user form */
const registerSchema = object({
  email: string().email().required('Email is required'),
  firstName: string().required('First name is required'),
  secondName: string(),
  firstSurname: string().required('Lastname is required'),
  secondSurname: string(),
  gender: number().required('Please state your gender'),
  dateOfBirth: date().required('Birthdate is required'),
  nationalId: number().required('National ID is required'),
  nationality: number().required('Nationality is required'),
  country: number().required('Country is required'),
  detailedAddress: string(),
  personalDescrip: string(),
  socials: array(yup.object({
    platform: string().required(),
    handle: string().required()
  })),
  password: string().required('Password is required'),
  rePassword: string().test({
    name: 'passwordMatch',
    test: function (value) {
      return this.parent.password === value;
    },
    message: 'Passwords must be the same',
  }),
  username: string().required('Username is required'),
  createdAt: date()
});

/**
 * @param {NextRequest} request
 */
export async function POST(request) {
  const rawData: RegisterPayloadDto = await request.json();

  const { data, success, errors } = await validateRawData({
    schema: registerSchema,
    rawData,
  });

  if (!success) {
    return badRequest400({ message: errors });
  }

  const search = await prisma.user.findFirst({
    select: { id: true },
    where: { OR: [{ email: data.email }, { username: data.username }] },
  });

  if (search) {
    return forbidden403({ message: 'username or email exists' });
  }

  // const companyIdSearch = await prisma.company.findFirst({
  //   select: { id: true },
  //   where: {
  //     identificationNumber: data.company.identificationNumber.toString(),
  //   },
  // });

  // console.log(data.company.identificationNumber.toString());
  // console.log(companyIdSearch);

  // if (companyIdSearch) {
  //   return forbidden403({ message: 'company already exists' });
  // }
  const payload = await prisma.users.create({
    data: {
      email: data.email,
      user_name: data.username,
      password: await hashPassword(data.password),
      create_at: new Date(),
      personas: {
        create: {
          "p-nombre": data.firstName,
      "s-nombre": data.secondName,
      "p-apellido": data.firstSurname,
      "s-apellido": data.secondSurname,
          genero: data.gender,
          fecha_nacimiento: data.dateOfBirth,
          cedula: data.nationalId,
          nacionalidad: data.nationality,
          pais: data.country,
          direccion_detallada: data.detailedAddress,
          descripcion_personal: data.personalDescrip,
          redes_sociales_has_personas: {
            create: socials.map(social => ({
              usuario_red_social: social.handle,
              redes_sociales: {
                create: {
                  red_social: social.platform
                }
              }
            }))
          }
        }
      },
      tipo_usuario: {
        connect: { idtipo_usuario: 1 } // Assuming a default user type ID
      }
    }
  });

  // return payload;
  const jwt = await signJWT(payload);

  // send a email with jwt
  const verifiedUrl = new URL(verifiedEmailPath + jwt, request.nextUrl.href);
  await sendVerifiedEmail({ token: verifiedUrl.href, receiver: payload.email });
  return ok201();
}