'use client';

import { Button } from '../ui/button';

const LogOut = () => {
  const handleLogout = async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Successfully logged out');
      window.location.reload();
    } else {
      console.error('Logout failed');
    }
  };

  return <Button onClick={handleLogout}>Log Out</Button>;
};

export default LogOut;
