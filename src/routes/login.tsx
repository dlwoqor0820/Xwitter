import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Email,
  Form,
  Password,
  SubmitButton,
  Wrapper,
} from "../compnents/component-style";
import GithubLogin from "../compnents/github-login";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.email == "" || data.password == "") return;
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Email
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        ></Email>
        <Password
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
        ></Password>
        <SubmitButton type="submit" value="Login"></SubmitButton>
      </Form>
      <Link to="/create-account">Create an Account</Link>
      <GithubLogin />
    </Wrapper>
  );
}
