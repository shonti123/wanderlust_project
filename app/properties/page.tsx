"use client";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
import ExampleComponent from "@/components/ExampleComponent"; // Ensure this path is correct
import React, { useEffect } from "react";

type Props = {};

// PropertiesPage Component
const PropertiesPage = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you have not any Properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
      <ExampleComponent /> {/* Add ExampleComponent here */}
    </ClientOnly>
  );
};

// TestPage Component
export function TestPage() {
  useEffect(() => {
    console.log("CLOUDINARY_URL:", process.env.CLOUDINARY_URL);
    console.log("CLOUDINARY_UPLOAD_PRESET:", process.env.CLOUDINARY_UPLOAD_PRESET);
  }, []);

  return (
    <div>
      <h1>Testing Environment Variables</h1>
    </div>
  );
}

export default PropertiesPage;