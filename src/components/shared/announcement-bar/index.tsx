"use client";

import "./index.css";

import Link from "next/link";

import { getActiveAnnouncement } from "@/lib/pro/promos";

export const AnnouncementBar = () => {
  const activeAnnouncement = getActiveAnnouncement();

  if (!activeAnnouncement) {
    return null;
  }

  return (
    <Link href="/pro" className="announcement-bar" aria-live="polite">
      <p
        dangerouslySetInnerHTML={{
          __html: activeAnnouncement.announcementText
        }}
      />
    </Link>
  );
};
