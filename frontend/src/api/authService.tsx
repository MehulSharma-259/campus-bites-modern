/**
 * Handles all API calls related to user authentication (signin, signup).
 */
import { API_BASE_URL } from "../constants";
import { AuthResponse, ApiError, User } from "../types";

type SignInCredentials = {
  universityId: string;
  password: string;
};

type SignUpData = {
  name: string;
  email: string;
  universityId: string;
  password: string;
};

export const authService = {
  /**
   * Attempts to sign in a user.
   * Throws an error with the backend message on failure.
   */
  signIn: async (credentials: SignInCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse | ApiError = await response.json();

    if (!response.ok) {
      throw new Error((data as ApiError).message || "Failed to sign in");
    }
    return data as AuthResponse;
  },

  /**
   * Attempts to sign up a new user.
   */
  signUp: async (userData: SignUpData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data: AuthResponse | ApiError = await response.json();

    if (!response.ok) {
      throw new Error((data as ApiError).message || "Failed to sign up");
    }
    return data as AuthResponse;
  },
};