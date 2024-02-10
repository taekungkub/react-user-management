import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormUser from "../components/FormUser";
import { useUser } from "../context/UserContext";
import { UserTy } from "../types/user.type";
import PageHeader from "../components/PageHeader";

type FormTypeTy = "add" | "edit";

export default function UserActionPage() {
  const navigate = useNavigate();
  let { type, id } = useParams();

  const { getUserById, user } = useUser();

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  return (
    <>
      <div className="container mx-auto mt-8">
        <button
          className="btn btn-primary btn-sm btn-outline"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <div className="mt-4">
          <PageHeader>
            {type === "add" ? "Create New User" : "Edit User " + id}
          </PageHeader>
        </div>

        <FormUser type={type as FormTypeTy} user={user} />
      </div>
    </>
  );
}
