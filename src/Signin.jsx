import {
  Button,
  Container,
  Image,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../public/logo.jpg";

const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    axios
      .post("https://arguru.onrender.com/user", values)
      .then((res) => {
        if (res?.status === 200) {
          setLoading(false);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          navigate("/admin");
        }
      })
      .catch((res) => {
        setLoading(false);
        alert("Wrong Credentials");
      });
  };
  return (
    <Container
      h="87vh"
      fluid
      p="0px"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={logo} width={200} w={200} />
      <form
        onSubmit={form.onSubmit((values) => handleSignin(values))}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "250px",
          margin: "auto",
          border: "1px solid rgb(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 10px 10px rgb(0,0,0,0.2)",
        }}
      >
        <Title>Sign In</Title>
        <TextInput
          placeholder="email@example.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="******"
          {...form.getInputProps("password")}
        />
        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Signin;
