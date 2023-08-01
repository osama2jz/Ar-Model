import {
  Button,
  Container,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: null,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value?.length > 0 ? null : "Invalid Password"),
    },
  });
  const handleSignin = (values) => {
    console.log(values);
    navigate("/admin");
  };
  return (
    <Container
      h="87vh"
      fluid
      p="0px"
      style={{ display: "flex", alignItems: "center" }}
    >
      <form
        onSubmit={form.onSubmit((values) => handleSignin(values))}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "400px",
          margin: "auto",
          border: "1px solid rgb(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 10px 10px rgb(0,0,0,0.2)",
        }}
      >
        <Title>Sign In</Title>
        <TextInput placeholder="email@example.com" {...form.getInputProps('email')}/>
        <PasswordInput placeholder="******" {...form.getInputProps('password')}/>
        <Button type="submit">Sign In</Button>
      </form>
    </Container>
  );
};

export default Signin;
