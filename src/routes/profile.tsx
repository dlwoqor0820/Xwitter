import { Link } from "react-router-dom";
import { Wrapper } from "../compnents/component-style";

export default function Profile() {
  return (
    <Wrapper>
      <h1>
        Here is Profile &rarr; <Link to="/">Go to Home</Link>
      </h1>
    </Wrapper>
  );
}
