import React from "react";
import CrossIcon from "@/elements/icons/CrossIcon";
import { IconContainer, ModalContainer, ModalWrapper } from "@/components/common/style";

type Props = {
  children: React.ReactNode;
  hide: boolean;
  onCloseModal: () => void;
};

/**
 * `Modal` component displays a modal dialog box that can be shown or hidden based
 * on the `hide` prop. The modal can be closed by clicking on the overlay or the
 * close icon inside the modal.
 *
 * @param {Props} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {boolean} props.hide - Determines whether the modal should be hidden or visible.
 * @param {function} props.onCloseModal - The function to call when the modal is requested to close.
 *
 * @returns JSX.Element - The rendered modal dialog box, or null if `hide` is true.
 */
const Modal = (props: Props) => {
  return (
    <>
      {!props.hide && (
        <ModalWrapper onClick={props.onCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <IconContainer>
              <div
                className="cursor-pointer"
                onClick={() => props.onCloseModal()}
              >
                <CrossIcon />
              </div>
            </IconContainer>
            {props.children}
          </ModalContainer>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;
