import styled from "styled-components";
import Timeline from "../compnents/timeline";
import NameInput from "../compnents/name-input-edit";
import ProfileInput from "../compnents/profile-icon-edit";

const Wrapper = styled.div`
  background-color: #d6d6d6;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 98.5dvh;
  align-items: center;
  border-radius: 20px;
`;

export default function Profile() {
  return (
    <Wrapper>
      <ProfileInput />
      <NameInput />
      <Timeline />
    </Wrapper>
  );
}
