import { Link } from "react-router-dom";
import { Logout, Wrapper } from "../compnents/component-style";

export default function Home() {
  return (
    <Wrapper>
      <h1>
        Here is Home! &rarr; <Link to="/profile">Go to Profile</Link>
      </h1>
      <Logout
        type="button"
        onClick={() => alert("You just activated my trap card")}
      >
        Logout
      </Logout>
    </Wrapper>
  );
}
