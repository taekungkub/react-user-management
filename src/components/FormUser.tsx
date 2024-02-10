import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserTy } from "../types/user.type";
import { useUser } from "../context/UserContext";
import useDisclosure from "../hooks/useDisclosure";
import Modal from "./Modal";

type FormData = {
  profile_picture: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
};

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  gender: z.string().nonempty("Gender is required"),
  birthday: z.string().min(1, { message: "Birthday  is required" }),
});

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

type Props = {
  user?: UserTy;
  type: "add" | "edit";
};
export default function FormUser({ user, type }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { createUser, editUser } = useUser();
  const { isOpen, open, close, toggle } = useDisclosure(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Please upload a JPEG or PNG image");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 2MB limit");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    open();
  };

  const handleConfirm = () => {
    let newUser: UserTy = {
      id: type === "add" ? uid() : (user?.id as string),
      profile_picture: profileImage as string,
      firstname: getValues("firstName"),
      lastname: getValues("lastName"),
      gender: getValues("gender"),
      birthday: getValues("birthday").toString(),
    };

    if (type === "add") {
      createUser(newUser);
    } else if (type === "edit") {
      editUser(newUser);
    }
    navigate(`/users`);
  };

  useEffect(() => {
    if (user) {
      setValue("profile_picture", user.profile_picture);
      setValue("firstName", user.firstname);
      setValue("lastName", user.lastname);
      setValue("gender", user.gender.toLocaleLowerCase());
      setValue("birthday", String(user.birthday));
    }
  }, [user]);

  useEffect(() => {
    if (type === "add") {
      reset();
    }
  }, [type]);

  return (
    <>
      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="flex justify-center">
                {profileImage && (
                  <div className="avatar">
                    <div className="w-40 rounded-full">
                      <img src={profileImage} />
                    </div>
                  </div>
                )}

                {!profileImage && (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-40">
                      <div className="flex flex-col  justify-center">
                        <img
                          src="https://icon-library.com/images/camera-icon-png-white/camera-icon-png-white-18.jpg"
                          alt=""
                          className="max-w-[40px] block mx-auto"
                        />
                        <span className="text-sm mt-2">Upload Photo</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4">
                <input
                  type="file"
                  id="profilePicture"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full max-w-xs file-input-sm"
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Please Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500">{errors.gender.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="birthday" className="block mb-1">
                  Birthday
                </label>
                <input
                  type="date"
                  id="birthday"
                  {...register("birthday")}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.birthday && (
                  <p className="text-red-500">{errors.birthday.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-sm ">
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              {type === "add" ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>

      <Modal open={isOpen}>
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">
          Are you sure to {type === "add" ? "add" : "edit"} this?
        </p>
        <div className="modal-action">
          <button className="btn btn-sm" onClick={() => close()}>
            Cancel
          </button>
          <button
            className={`btn btn-sm btn-primary`}
            onClick={() => handleConfirm()}
          >
            {type === "add" ? "Add" : "Save"}
          </button>
        </div>
      </Modal>
    </>
  );
}
