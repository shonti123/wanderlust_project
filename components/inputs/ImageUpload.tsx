"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

function ImageUpload({ onChange, value }: Props) {
  const handleCallback = useCallback(
    (result: any) => {
      if (result.event === "success") {
        onChange(result.info.secure_url);
      } else {
        console.error("Upload failed:", result);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleCallback}
      uploadPreset="airbnb" // Make sure this preset exists and is unsigned in your Cloudinary account
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                alt="Uploaded image"
                fill
                style={{ objectFit: "cover" }}
                src={value}
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}

export default ImageUpload;