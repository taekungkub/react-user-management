import { createContext, useState, useContext, ReactNode } from "react";
import { UserTy } from "../types/user.type";
import toast from "react-hot-toast";

interface UserContextType {
  users: UserTy[];
  createUser: (user: UserTy) => void;
  deleteUser: (user: UserTy) => void;
  getUserById: (id: string) => void;
  user?: UserTy | undefined;
  editUser: (user: UserTy) => void;
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
      profile_picture: "",
      firstname: "Brice",
      lastname: "Swyre",
      gender: "male",
      birthday: "2024-02-15",
    },
  ]);

  const [user, setUser] = useState<UserTy | undefined>(undefined);

  const createUser = (newUser: UserTy) => {
    setUsers((oldArray) => [...oldArray, newUser]);
    toast.success("Create  Successfully!");
  };

  const deleteUser = (user: UserTy) => {
    setUsers((prevUser) => prevUser.filter((v) => v.id != user.id));
    toast.success("Delete Successfully!");
  };

  const getUserById = (id: string) => {
    const user = users.find((user) => user.id === id);
    setUser(user);
  };

  async function editUser(user: UserTy) {
    setUsers((prevUser) => prevUser.map((v) => (v.id === user.id ? user : v)));
    toast.success("Edit  Successfully!");
  }

  return (
    <UserContext.Provider
      value={{
        users,
        createUser,
        deleteUser,
        getUserById,
        editUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
