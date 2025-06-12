// filepath: c:\Users\admin\Downloads\Airbnb-Build-master\new-project\Airbnb-Build\app\actions\widgetActions.ts
export async function uploadWidget(widgetData: any) {
  try {
    const response = await fetch("/api/widgets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(widgetData),
    });

    if (!response.ok) {
      throw new Error("Failed to upload widget");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading widget:", error);
    throw error;
  }
}