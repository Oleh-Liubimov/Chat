import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserStore = {
  username: string | null;
  setUsername: (name: string) => void;
  loadUsername: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  username: null,
  setUsername: (name: string) => {
    AsyncStorage.setItem("username", name);
    set({ username: name });
  },
  loadUsername: async () => {
    const storedUsername = await AsyncStorage.getItem("username");
    if (storedUsername) {
      set({ username: storedUsername });
    }
  },
}));
