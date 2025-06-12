import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    // Fetch the current user
    const currentUser = await getCurrentUser();

    // If no user is logged in, return an empty array
    if (!currentUser) {
      console.log("No current user found.");
      return [];
    }

    // Fetch favorite listings based on the user's favorite IDs
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds || [], // Ensure favoriteIds is an array
        },
      },
    });

    // Map the favorites to a safe format (e.g., converting Date objects to strings)
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(), // Use toISOString for consistency
    }));

    console.log("Fetched favorite listings:", safeFavorites);

    return safeFavorites;
  } catch (error: any) {
    console.error("Error fetching favorite listings:", error);
    throw new Error(error.message || "Failed to fetch favorite listings.");
  }
}