'use client';
import React, { Suspense } from 'react';
import { PageWrapper } from '@/components/policy-coverage/style';
import LayoutQuoteCard from '@/components/business-info/LayoutQuoteCard';

/**
 * Layout component that wraps the main content of the page.
 *
 * This component provides a consistent layout structure for the business-info form pages,
 * including a quote card.
 *
 * @component
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be displayed within the layout.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="pb-24">
      <PageWrapper>
        <div className="mr-auto w-full md:pr-10 lg:px-32">
          <Suspense>{children}</Suspense>
        </div>
        <LayoutQuoteCard />
      </PageWrapper>
    </div>
  );
};

export default Layout;
