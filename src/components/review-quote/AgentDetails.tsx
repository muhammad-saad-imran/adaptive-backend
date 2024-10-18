import React from 'react';
import { IAgent } from '@/store/api/types';
import { DetailsContainer } from '@/components/review-quote/style';
import DetailsRow from '@/components/review-quote/DetailsRow';

type Props = {
  agent: IAgent | undefined;
};

/**
 * `AgentDetails` component displays detailed information about an agent in a structured format. 
 * It includes various details such as agent ID, name, agency, role, email, phone, and status.
 *
 * @param {Props} props - The props for the component.
 * @param {IAgent} props.agent - The agent object containing details to be displayed.
 *
 * @returns JSX.Element - The rendered component displaying the agent's details in a formatted manner.
 */
const AgentDetails = ({ agent }: Props) => {
  return (
    <DetailsContainer className="border-slate-300 pr-8 md:border-r">
      <DetailsRow title="Agent Id" value={agent?.id} />
      <DetailsRow title="Agent Name" value={agent?.firstName} />
      <DetailsRow title="Agency" value={agent?.agencyName} />
      <DetailsRow title="Role" value={agent?.role} />
      <DetailsRow title="Email" value={agent?.email} />
      <DetailsRow title="Phone" value={agent?.phone} />
      <DetailsRow title="Status" value={agent?.status} />
    </DetailsContainer>
  );
};

export default AgentDetails;
