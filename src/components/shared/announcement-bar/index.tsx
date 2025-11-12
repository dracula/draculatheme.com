import "./index.css";

import Link from "next/link";

export const AnnouncementBar = () => (
  <Link href="/pro" className="announcement-bar" aria-live="polite">
    <p>
      It&apos;s Dracula-o-ween! Dracula Pro with <strong>40% OFF</strong> until{" "}
      <strong>Oct 31 →</strong>
    </p>
  </Link>
);
