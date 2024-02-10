import { createContext, useState, useContext, ReactNode } from "react";
import { UserTy } from "../types/user.type";

interface UserContextType {
  users: UserTy[];
  createUser: (user: UserTy) => void;
  deleteUser: (user: UserTy) => void;
  getUserById: (id: string) => void;
  user?: UserTy | undefined;
}

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<UserTy[]>([
    {
      id: uid(),
      profile_picture: "asd",
      firstname: "Brice ",
      lastname: "Swyre",
      gender: "Male",
      birthday: "2024-02-15",
    },
  ]);

  const [user, setUser] = useState<UserTy | undefined>(undefined);

  const createUser = (newUser: UserTy) => {
    setUsers((oldArray) => [...oldArray, newUser]);
  };

  const deleteUser = (user: UserTy) => {
    setUsers((prevUser) => prevUser.filter((v) => v.id != user.id));
  };

  const getUserById = (id: string) => {
    const user = users.find((user) => user.id === id);
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        deleteUser,
        getUserById,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
