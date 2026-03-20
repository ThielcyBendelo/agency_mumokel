import React, { useEffect } from 'react';
import NavbarSecured from '../components/NavbarSecured';
import UserManagementSection from '../components/UserManagementSection';
import Footer from '../components/Footer';

export default function UserManagementPage() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);
  return (
    <>
      <NavbarSecured />
      <div className="mt-24">
        <UserManagementSection />
      </div>
      <Footer />
    </>
  );
}
