import React, { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024 * 2;

export default function useFile() {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined
  );
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

  return {
    profileImage,
    setProfileImage,
    handleFileChange,
  };
}
