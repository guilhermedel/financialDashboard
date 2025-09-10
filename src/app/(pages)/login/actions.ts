'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type State = { ok: boolean; message?: string };

export async function loginAction(_prevState: State, formData: FormData): Promise<State> {
  // 1) ler dados do form
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');

  // 2) validações simples
  if (!email || !password) {
    return { ok: false, message: 'Informe e-mail e senha.' };
  }

  // 3) autenticar (exemplo mock; aqui você chamaria sua API/DB)
  const isValid = password === '123456'; // apenas EXEMPLO
  if (!isValid) {
    return { ok: false, message: 'Credenciais inválidas.' };
  }

  // 4) definir role por domínio (exemplo), montar payload da sessão
  const role = email.endsWith('@admin.com') ? 'admin' : 'user';
  const session = { user: { email, role } };

  // 5) setar cookie httpOnly (feito DENTRO da Server Action)
  const cookiesConfig = await cookies();
  cookiesConfig.set('session_user', JSON.stringify(session), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    secure: process.env.NODE_ENV === 'production',
  });

  // 6) redirecionar (encerra a Action)
  redirect('/dashboard');
}
