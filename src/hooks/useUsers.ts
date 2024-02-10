import { useState } from "react";
import { UserTy } from "../types/user.type";

const userMockup = {
  id: "asdasdas",
  profile_picture: "asd",
  firstname: "asd",
  lastname: "asd",
  gender: "asd",
  birthday: "asd",
};

export default function useUsers() {
  const [users, setUsers] = useState<UserTy[]>([
    {
      id: String(Date.now()),
      profile_picture: "asd",
      firstname: "Brice ",
      lastname: "Swyre",
      gender: "Male",
      birthday: "12/2/2024",
    },
  ]);

  function onAddUser() {
    console.log("toggle");
    setUsers((oldArray) => [...oldArray, userMockup]);

    console.log(users);
  }
  return {
    users,
    onAddUser,
  };
}
