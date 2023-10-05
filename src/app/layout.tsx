import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "components/Footer";

export const metadata = {
  title: "DivergeResume",
  description:
    "DivergeResume is a resume builder that allows the parsing and improvement of resumes with OpenAI's API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
