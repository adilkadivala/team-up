"use client";

import axios from "axios";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
  useCallback,
} from "react";

const server_api = process.env.NEXT_PUBLIC_SERVER_API;

interface UserContextType {
  users: any[];
  hackathons: any[];
  currentUser: any;
  isAuthenticated: boolean;
  getUserData: () => Promise<void>;
  logout: () => void;
  refreshUserContext: () => Promise<void>;
  isLoading: boolean;
}

export const VerifyUser = createContext<UserContextType | null>(null);

// Create a custom event for auth state changes
export const authStateChanged = () => {
  if (typeof window !== "undefined") {
    // Dispatch a custom event when auth state changes
    window.dispatchEvent(new Event("auth-state-changed"));
  }
};

export function UserContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hackathons, setHackathons] = useState<any[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`${server_api}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userList = response?.data?.users || [];
      setUsers(userList);

      // Check if a token exists
      if (accessToken) {
        const decoded: any = jwt.decode(accessToken);
        const matchedUser = userList.find(
          (user: any) => user.id === decoded.userId
        );

        if (matchedUser) {
          setCurrentUser(matchedUser);
          setIsAuthenticated(true);
        } else {
          // User not found in the list
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error: any) {
      console.log("Failed to get users or authenticate:", error.message);

      if (error?.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) throw new Error("No refresh token");

          const refreshRes = await axios.post(
            `${server_api}/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            refreshRes.data;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // retry getUserData after refresh
          await getUserData();
          return;
        } catch (refreshError) {
          console.log("Refresh token invalid or failed:", refreshError);
        }
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsAuthenticated(false);
      setCurrentUser(null);
      router.push("/sign-in");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Function to explicitly refresh the context
  const refreshUserContext = useCallback(async () => {
    await getUserData();
  }, [getUserData]);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setCurrentUser(null);
    setIsAuthenticated(false);
    router.push("/sign-in");
    // Notify about auth state change
    authStateChanged();
  }, [router]);

  // Listen for auth state changes
  useEffect(() => {
    const handleAuthChange = () => {
      getUserData();
    };

    window.addEventListener("auth-state-changed", handleAuthChange);

    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, [getUserData]);

  // get hackathon
  const getHackathon = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      setIsLoading(true);
      const response = await axios.get(`${server_api}/getallhackathons`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setHackathons(response?.data);
      }
    } catch (error: any) {
      console.log(error?.response?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // Initial data fetch
  useEffect(() => {
    getHackathon();
  }, []);

  return (
    <VerifyUser.Provider
      value={{
        users,
        currentUser,
        isAuthenticated,
        hackathons,
        getUserData,
        logout,
        refreshUserContext,
        isLoading,
      }}
    >
      {children}
    </VerifyUser.Provider>
  );
}

export const useValidateUser = () => useContext(VerifyUser);
