import IconTrash from "./Icons/IconTrash";

type Props = {
  profileImage?: string;
  onTrash: () => void;
};

export default function AvatarProfile({ profileImage, onTrash }: Props) {
  return (
    <div className="flex justify-center">
      <div>
        {profileImage && (
          <div className="avatar relative  w-40 rounded-full ">
            <span className="absolute bottom-[10px] right-[15px]">
              <div
                className="w-6 h-6 bg-white rounded-full grid place-items-center cursor-pointer"
                onClick={() => onTrash()}
              >
                <IconTrash />
              </div>
            </span>
            <div className=" rounded-full">
              <img src={profileImage} />
            </div>
          </div>
        )}
      </div>

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
  );
}
