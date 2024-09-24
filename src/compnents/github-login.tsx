import { useNavigate } from "react-router-dom";
import { GithubButton, Logo } from "./component-style";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

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
