import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import styled from "styled-components";

const GithubButton = styled.button``;

const Logo = styled.img`
  height: 20px;
`;

export default function GithubLogin() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <GithubButton onClick={onClick} type="button">
      <Logo src="/github.png" />
      Continue with Github
    </GithubButton>
  );
}
