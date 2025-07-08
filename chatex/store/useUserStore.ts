import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/user";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
  loading: boolean;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user: User) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    set({ user: user });
  },
  loadUser: async () => {
    set({ loading: true });
    try {
      const storedUser = (await AsyncStorage.getItem("user")) || "";
      const user = JSON.parse(storedUser);
      if (user) {
        set({ user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  clearUser: async () => {
    await AsyncStorage.removeItem("user");
    set({ user: null });
  },
}));
