/**
 * Cache control utilities for API responses
 */

export const CacheControl = {
  /**
   * Public cache for listings, search results, PDP (non-sensitive data)
   * s-maxage=60, stale-while-revalidate=300
   */
  public: () => ({
    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  }),

  /**
   * No cache for sensitive data (cart, checkout, orders, profile)
   */
  private: () => ({
    "Cache-Control": "no-store, must-revalidate",
  }),

  /**
   * Short cache for frequently changing data (inventory, pricing)
   */
  short: () => ({
    "Cache-Control": "public, s-maxage=10, stale-while-revalidate=60",
  }),
} as const
