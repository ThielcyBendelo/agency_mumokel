/* global process */
// Configuration de l'API backend
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fonctions génériques pour utilisateurs
export async function fetchUsers() {
  const res = await fetch(`${API_BASE_URL}/users`);
  return res.json();
}
export async function createUser(data) {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateUser(id, data) {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

// Fonctions génériques pour paiements
export async function fetchPayments() {
  const res = await fetch(`${API_BASE_URL}/payments`);
  return res.json();
}
export async function createPayment(data) {
  const res = await fetch(`${API_BASE_URL}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updatePayment(id, data) {
  const res = await fetch(`${API_BASE_URL}/payments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function deletePayment(id) {
  const res = await fetch(`${API_BASE_URL}/payments/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
