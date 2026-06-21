'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthRole, getCurrentUser } from '../lib/auth';

type Props = {
  allowedRoles: AuthRole[];
  children: ReactNode;
};

export default function AuthGuard({ allowedRoles, children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace('/login');
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [allowedRoles, router]);

  if (checking) {
    return (
      <div className="page">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
