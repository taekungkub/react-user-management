import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { UserTy } from "../types/user.type";
import useDisclosure from "../hooks/useDisclosure";
import Modal from "../components/Modal";
import TableUser from "../components/TableUser";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

export default function UserPage() {
  const { users, deleteUser, getUserById, user } = useUser();
  const navigate = useNavigate();
  const { isOpen, open, close, toggle } = useDisclosure(false);

  const { totalPage, currentRecords, currentPage, goToPage } = usePagination({
    data: users,
    pageSize: 10,
  });

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
          items={currentRecords}
          onDelete={(user) => {
            getUserById(user.id);
            open();
          }}
          onEdit={(user) => {
            navigate(`/users/edit/${user.id}`);
          }}
        />

        <div className="flex justify-center mt-8">
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={(i) => goToPage(i)}
          />
        </div>
      </div>

      <Modal open={isOpen}>
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">Are you sure to delete this?</p>
        <div className="modal-action">
          <button className="btn btn-sm" onClick={() => close()}>
            Cancel
          </button>
          <button
            className={`btn btn-sm btn-primary`}
            onClick={() => {
              deleteUser(user as UserTy);
              close();
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}
