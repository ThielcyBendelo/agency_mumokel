import React, { useEffect } from 'react';
import NavbarSecured from '../components/NavbarSecured';
import PaymentManagementSection from '../components/PaymentManagementSection';
import Footer from '../components/Footer';

export default function PaymentManagementPage() {
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
        <PaymentManagementSection />
      </div>
      <Footer />
    </>
  );
}
