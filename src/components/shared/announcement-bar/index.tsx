"use client";

import "./index.css";

import Link from "next/link";

import { getActiveAnnouncement } from "@/lib/pro/promos";

const stripHtmlTags = (text: string): string => {
  return text.replace(/<[^>]*>/g, "");
};

export const AnnouncementBar = () => {
  const activeAnnouncement = getActiveAnnouncement();

  if (!activeAnnouncement) {
    return null;
  }

  return (
    <Link href="/pro" className="announcement-bar" aria-live="polite">
      <p>{stripHtmlTags(activeAnnouncement.announcementText)}</p>
    </Link>
  );
};
