import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserTy } from "../types/user.type";
import useDisclosure from "../hooks/useDisclosure";
import Modal from "./Modal";
import AvatarProfile from "./AvatarProfile";
import useFile from "../hooks/useFile";

const schema = z.object({
  profile_picture: z.string().optional(),
  firstName: z.string().min(1, { message: "Firstname is required" }),
  lastName: z.string().min(1, { message: "Lastname is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  birthday: z.string().min(1, { message: "Birthday  is required" }),
});

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

type Props = {
  user?: UserTy;
  type: "add" | "edit";
  onUserSubmit: (user: UserTy) => void;
};
export default function FormUser({ user, type, onUserSubmit }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { isOpen, open, close, toggle } = useDisclosure(false);

  const { profileImage, setProfileImage, handleFileChange } = useFile();

  const onSubmit = (data: any) => open();

  const handleConfirm = () => {
    let newUser: UserTy = {
      id: type === "add" ? uid() : String(user?.id),
      profile_picture: String(profileImage),
      firstname: getValues("firstName"),
      lastname: getValues("lastName"),
      gender: getValues("gender"),
      birthday: getValues("birthday").toString(),
    };
    onUserSubmit(newUser);
  };

  useEffect(() => {
    if (user) {
      setValue("profile_picture", user.profile_picture);
      setValue("firstName", user.firstname);
      setValue("lastName", user.lastname);
      setValue("gender", user.gender.toLocaleLowerCase());
      setValue("birthday", String(user.birthday));
      setProfileImage(user.profile_picture);
    }
  }, [user]);

  useEffect(() => {
    resetForm();
  }, [type]);

  function resetForm() {
    if (type === "add") {
      reset();
      setProfileImage("");
    }
  }

  return (
    <>
      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-1">
              <AvatarProfile
                profileImage={profileImage}
                onTrash={() => setProfileImage("")}
              />
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

            <div className="col-span-2 mb-4">
              <div className="grid grid-cols-1  sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className="input input-bordered w-full"
                    placeholder="Please enter First name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="input input-bordered w-full"
                    placeholder="Please enter Last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="gender" className="block mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    className="select select-bordered w-full "
                  >
                    <option value="">-- Please Select Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="birthday" className="block mb-1">
                    Birthday
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    {...register("birthday")}
                    className="input input-bordered w-full"
                  />
                  {errors.birthday && (
                    <p className="text-red-500">{errors.birthday.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => navigate(-1)}
            >
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
