import TweetForm from "../compnents/tweet-form";
import Timeline from "../compnents/timeline";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #d6d6d6;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 98.5dvh;
  align-items: center;
  border-radius: 20px;
`;

export default function Home() {
  return (
    <Wrapper>
      <TweetForm />
      <Timeline />
    </Wrapper>
  );
}
