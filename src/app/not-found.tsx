"use client";
import Link from "next/link";
import { ErrorWrapper } from "@/components/common/style";

/**
 * NotFound component displays a 404 error message when a requested resource is not found.
 *
 * This component provides a user-friendly message indicating that the requested resource
 * could not be found, along with a link to return to the homepage.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
export default function NotFound() {
  return (
    <ErrorWrapper>
      <p className="text-5xl text-center">Not Found</p>
      <p className="text-2xl text-center">Could not find requested resource</p>
      <Link href="/" className="underline">
        Return Home
      </Link>
    </ErrorWrapper>
  );
}
