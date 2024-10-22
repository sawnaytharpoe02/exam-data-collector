import { useAuthStore } from "@/store/authStore";

const useLogout = () => {
  const clearToken = useAuthStore((state) => state.clearToken);

  const logout = () => {
    clearToken();
    window.location.href = "/auth/logout";
  };

  return logout;
};

export default useLogout;
