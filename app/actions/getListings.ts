import prisma from "@/lib/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  skip?: number; // For pagination
  take?: number; // For pagination
}

export default async function getListings(params: IListingsParams) {
  try {
    // Log the received parameters for debugging
    console.log("Params received:", params);

    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
      skip,
      take,
    } = params;

    // Build the query object dynamically
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount, // Greater than or equal to
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount, // Greater than or equal to
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount, // Greater than or equal to
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    // Log the query object for debugging
    console.log("Query object:", query);

    // Fetch listings from the database
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc", // Order by creation date
      },
      skip: skip || 0, // Pagination: skip this many records
      take: take || 10, // Pagination: limit to this many records
    });

    // Log the fetched listings for debugging
    console.log("Listings fetched:", listings);

    // Convert createdAt to ISO string for safety
    const safeListings = listings.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    // Log the error for debugging
    console.error("Error fetching listings:", error);
    throw new Error(error.message);
  }
}