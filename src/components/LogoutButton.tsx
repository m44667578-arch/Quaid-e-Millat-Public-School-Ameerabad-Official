'use client';

import { logoutUser } from '../lib/auth';

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="button danger"
      onClick={() => {
        logoutUser();
        window.location.href = '/login';
      }}
    >
      Logout
    </button>
  );
}
