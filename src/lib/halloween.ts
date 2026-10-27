export const halloweenTeaserEndsAt = "2026-10-27T23:59:59Z";
export const halloweenSaleEndsAt = "2026-11-21T23:59:59Z";

export const hasHalloweenTeaserEnded = (): boolean =>
  Date.now() >= new Date(halloweenTeaserEndsAt).getTime();

export const hasHalloweenSaleEnded = (): boolean =>
  Date.now() >= new Date(halloweenSaleEndsAt).getTime();
