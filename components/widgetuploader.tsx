"use client"; // Mark this as a Client Component

import { uploadWidget } from "@/app/actions/wigetaction"; // Ensure this path is correct

export default function WidgetUploader() {
  const handleUpload = async () => {
    const widgetData = {
      name: "Sample Widget",
      description: "This is a sample widget",
    };

    try {
      const result = await uploadWidget(widgetData);
      console.log("Widget uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading widget:", error);
    }
  };

  return (
    <div>
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
        Upload Widget
      </button>
    </div>
  );
}