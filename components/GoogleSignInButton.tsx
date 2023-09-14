'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { UserIcon } from '@heroicons/react/24/outline';

const GoogleSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '';

  return (
    <button
      className="!outline-none"
      onClick={() => signIn('google', { callbackUrl })}
    >
      <UserIcon className="header__icon" />
    </button>
  );
};

export default GoogleSignInButton;
