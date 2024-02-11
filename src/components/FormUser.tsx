import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserTy } from "../types/user.type";
import useFile from "../hooks/useFile";
import useDisclosure from "../hooks/useDisclosure";
import Modal from "./Modal";
import AvatarProfile from "./AvatarProfile";
import {
  InputDateField,
  InputField,
  InputFileField,
  SelectField,
} from "./InputField";

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
    if (type === "add") {
      reset();
      setProfileImage("");
    }
  }, [type]);

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
                <InputFileField
                  fieldRegister={register("profile_picture")}
                  onChange={handleFileChange}
                  error={errors.profile_picture?.message}
                />
              </div>
            </div>
            <div className="col-span-2 mb-4">
              <div className="grid grid-cols-1  sm:grid-cols-2 gap-3">
                <InputField
                  labelText="First Name"
                  placeholder="Please enter First name"
                  fieldRegister={register("firstName")}
                  error={errors.firstName?.message}
                />
                <InputField
                  labelText="Last Name"
                  placeholder="Please enter Last name"
                  fieldRegister={register("lastName")}
                  error={errors.lastName?.message}
                />

                <SelectField
                  labelText="Gender"
                  fieldRegister={register("gender")}
                  error={errors.gender?.message}
                >
                  <SelectField.Option value="">
                    -- Please Select Gender --
                  </SelectField.Option>
                  <SelectField.Option value="male">Male</SelectField.Option>
                  <SelectField.Option value="female">Female</SelectField.Option>
                </SelectField>
                <InputDateField
                  labelText="Birthday"
                  fieldRegister={register("birthday")}
                  error={errors.birthday?.message}
                />
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
