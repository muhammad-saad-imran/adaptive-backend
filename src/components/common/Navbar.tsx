"use client";
import LeftArrowIcon from "@/elements/icons/LeftArrowIcon";
import PhoneIcon from "@/elements/icons/PhoneIcon";
import Image from "next/image";
import React from "react";
import { InfoContainer, NavbarIconContainer, NavbarWrapper } from "@/components/common/style";

/**
 * `Navbar` component displays a navigation bar with a logo, navigation icons, and 
 * contact information. It includes the following elements:
 * - A left arrow icon (potentially for navigation).
 * - A centered logo image.
 * - A phone icon.
 * - Contact information for speaking to a licensed agent.
 *
 * @returns JSX.Element - The rendered navigation bar with icons and contact information.
 */
const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarIconContainer>
        <LeftArrowIcon />
      </NavbarIconContainer>
      <Image
        className="ml-auto mr-auto md:ml-0 md:mr-0"
        src={"/adaptive-logo.svg"}
        alt=""
        width={200}
        height={20}
      />
      <NavbarIconContainer>
        <PhoneIcon />
      </NavbarIconContainer>
      <InfoContainer>
        <p>Speak to a licensed agent :</p>
        <p className="font-bold text-lg">1-800-000-0000</p>
      </InfoContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
