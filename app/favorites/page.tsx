import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React, { useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";
import WidgetUploader from "@/components/widgetuploader"; // Import WidgetUploader
import ImageUpload from "@/components/inputs/ImageUpload"; // Import ImageUpload

type Props = {};

// FavoritePage Component
const FavoritePage = async (props: Props) => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

// Home Component
export function Home() {
  return (
    <div>
      <h1>Welcome to Airbnb Clone</h1>
      <WidgetUploader />
    </div>
  );
}

// TestPage Component
export default function TestPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <h1>Image Upload Test</h1>
      <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} />
      {imageUrl && <p>Uploaded Image URL: {imageUrl}</p>}
    </div>
  );
}

export { FavoritePage };