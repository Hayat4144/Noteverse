import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'password must be at least 8 characters long',
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          'password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      }),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password doesn't match.",
    path: ['confirmpassword'],
  });

export const changePasswordSchema = z
  .object({
    password: z.string(),
    newpassword: z
      .string()
      .min(8, {
        message: 'password must be at least 8 characters long',
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          'password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      }),
    confirmpassword: z.string(),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Password doesn't match.",
    path: ['confirmpassword'],
  });

export const authSchma = z.object({
  email: z.string().email({ message: 'Please enter valid email address' }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    }),
});

export const SignupSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Name should be minimum 8 character long.' })
      .max(20),
    email: z.string().email({ message: 'Please enter valid email address' }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
        message:
          'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match.",
    path: ['confirmPassword'],
  });
