// Service d'API pour l'authentification
const API_URL = '/api/auth';

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Erreur de connexion');
  return response.json();
}

export async function register(user) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = "Erreur d'inscription";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (parseError) {
        // If we can't parse the error response, use status text
        errorMessage = response.statusText || errorMessage;
      }

      // Provide more specific error messages based on status
      switch (response.status) {
        case 400:
          errorMessage = "Données invalides. Vérifiez vos informations.";
          break;
        case 409:
          errorMessage = "Cet email est déjà utilisé.";
          break;
        case 422:
          errorMessage = "Format d'email invalide.";
          break;
        case 429:
          errorMessage = "Trop de tentatives. Réessayez plus tard.";
          break;
        case 500:
          errorMessage = "Erreur serveur. Réessayez plus tard.";
          break;
      }

      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // If it's a network error or other fetch error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion.");
    }
    // Re-throw the error with our custom message
    throw error;
  }
}
