'use client'; // Error components must be Client Components

import { ErrorWrapper } from '@/components/common/style';
import Button from '@/elements/buttons/Button';

/**
 * Error component displays an error message and provides a way to attempt recovery.
 *
 * This component is used to handle errors that occur during rendering. It displays a generic
 * error message and includes a button that allows the user to attempt to recover from the error
 * by re-rendering the component or segment.
 *
 * @component
 *
 * @param {Object} props - The props object.
 * @param {Error & { digest?: string }} props.error - The error object, possibly containing a digest string for debugging.
 * @param {Function} props.reset - A function to reset and attempt re-rendering the component or segment.
 *
 * @returns {JSX.Element} The rendered Error component.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorWrapper>
      <p className="text-center text-5xl">Something went wrong!</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </ErrorWrapper>
  );
}
