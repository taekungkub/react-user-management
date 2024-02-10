import { UserTy } from "../types/user.type";

type Props = {
  items: Array<UserTy>;
  onEdit: (user: UserTy) => void;
  onDelete: (user: UserTy) => void;
};

export default function TableUser({ items, onEdit, onDelete }: Props) {
  const rows = items.map((v, i) => (
    <tr key={v.id}>
      <th className=" flex justify-center">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-8">
            <span className="text-xs">
              {v.firstname.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </th>
      <td>{v.firstname}</td>
      <td>{v.lastname}</td>
      <td>{v.gender}</td>
      <td>{v.birthday}</td>
      <td className="flex justify-center">
        <div className="flex gap-3 items-center">
          <div className="btn btn-warning btn-sm" onClick={() => onEdit(v)}>
            Edit
          </div>
          <div className="btn btn-error btn-sm" onClick={() => onDelete(v)}>
            Delete
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className="overflow-x-auto mt-8">
        <table className="table border rounded-md">
          {/* head */}
          <thead>
            <tr>
              <th className="w-[200px] text-center"> Profile picture</th>
              <th>First name</th>
              <th> Last name </th>
              <th> Gender </th>
              <th> Birthday </th>
              <th className="text-center"> Action </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}
