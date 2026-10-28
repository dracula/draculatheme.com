import {
  hasHalloweenSaleEnded,
  hasHalloweenTeaserEnded
} from "@/lib/halloween";

const teaserHasEnded = hasHalloweenTeaserEnded();
const saleHasEnded = hasHalloweenSaleEnded();

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Draculaween",
  description:
    "Something wicked is stirring in the shadows. Count down to Draculaween, a Halloween surprise from Dracula arriving October 27, 2026.",
  url: "https://draculatheme.com/halloween/teaser",
  inLanguage: "en",
  dateModified: new Date().toISOString().split("T")[0],
  isPartOf: {
    "@type": "WebSite",
    name: "Dracula Theme",
    url: "https://draculatheme.com"
  },
  about: {
    "@type": "Event",
    name: "Draculaween",
    description: "A Halloween surprise from Dracula arriving October 27, 2026.",
    startDate: "2026-10-27",
    endDate: "2026-11-21",
    eventStatus: saleHasEnded
      ? "https://schema.org/EventConcluded"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    url: "https://draculatheme.com/halloween",
    location: {
      "@type": "VirtualLocation",
      url: "https://draculatheme.com/halloween"
    },
    organizer: {
      "@type": "Organization",
      name: "Dracula Theme",
      url: "https://draculatheme.com"
    }
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://draculatheme.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Draculaween",
        item: "https://draculatheme.com/halloween/teaser"
      }
    ]
  },
  publisher: {
    "@type": "Organization",
    name: "Dracula Theme",
    url: "https://draculatheme.com",
    logo: {
      "@type": "ImageObject",
      url: "https://draculatheme.com/images/hero/default.svg"
    },
    sameAs: [
      "https://github.com/dracula",
      "https://twitter.com/draculatheme",
      "https://discord.gg/yDcFsrB"
    ]
  },
  potentialAction: teaserHasEnded
    ? [
        {
          "@type": "ViewAction",
          name: "Meet Nosferatu",
          target: "https://draculatheme.com/halloween"
        }
      ]
    : [
        {
          "@type": "SubscribeAction",
          name: "Get notified when Draculaween begins",
          target: "https://draculatheme.com/halloween/teaser"
        }
      ]
};
