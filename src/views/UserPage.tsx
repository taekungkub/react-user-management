import TableUser from "../components/TableUser";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { UserTy } from "../types/user.type";

export default function UserPage() {
  const { users, deleteUser } = useUser();
  const navigate = useNavigate();

  function handleDelete(user: UserTy) {
    confirm("Confirm delete!");
    deleteUser(user);
  }

  function handleEdit(user: UserTy) {
    navigate(`/users/edit/${user.id}`);
  }

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="flex justify-between">
          <div className="text-lg font-bold">Users List</div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/users/add")}
          >
            Add +
          </button>
        </div>
        <TableUser
          items={users}
          onDelete={(user) => handleDelete(user)}
          onEdit={(user) => handleEdit(user)}
        />
      </div>
    </>
  );
}
