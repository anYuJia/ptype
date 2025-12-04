import { z } from 'zod';

export const loginSchema = z.object({
    identifier: z.string().min(1, '请输入用户名或邮箱'),
    password: z.string().min(6, '密码长度至少为 6 位'),
});

export const registerSchema = z.object({
    username: z.string()
        .min(2, '用户名至少需要 2 个字符')
        .max(20, '用户名不能超过 20 个字符')
        .regex(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, '用户名只能包含字母、数字、下划线和中文'),
    email: z.string().email('请输入有效的电子邮箱地址'),
    password: z.string()
        .min(8, '密码长度至少为 8 位')
        .regex(/[A-Z]/, '密码需要包含至少一个大写字母')
        .regex(/[a-z]/, '密码需要包含至少一个小写字母')
        .regex(/[0-9]/, '密码需要包含至少一个数字'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
