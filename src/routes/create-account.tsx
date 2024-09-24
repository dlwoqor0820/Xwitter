import { Form, Link, useNavigate } from "react-router-dom";
import {
  Email,
  Name,
  Password,
  SubmitButton,
  Wrapper,
} from "../compnents/component-style";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.email == "" || data.password == "") return;
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(newUser.user, { displayName: data.name });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Name
          {...register("name", { required: true })}
          placeholder="Name"
        ></Name>
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
        <SubmitButton type="submit" value="Create Account"></SubmitButton>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Wrapper>
  );
}
