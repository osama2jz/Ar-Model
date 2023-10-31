import React, { useEffect, useState } from "react";
import wa from "./assets/wa.svg";
import ModalCard from "./components/ModalCard";
import axios from "axios";
import { Button, Group, Image, Loader, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import logo from "../public/logo.jpg"
const AllModels = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios.get("https://arguru.onrender.com/armodel").then((res) => {
      setAllData(res.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <Group position="apart" mb="md">
        <Image src={logo} width={80}/>
        <Button onClick={() => navigate("/signin")}>Sign In</Button>
      </Group>
      <h1>View All Models</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Loader m="auto" />
        ) : (
          allData.map((obj, index) => {
            return (
              <Stack spacing={"sm"} align="center" mb="md" key={index}>
                <ModalCard key={index} data={obj} />
                <img
                  src={wa}
                  onClick={() =>
                    window.open(
                      `https://api.whatsapp.com/send/?phone=529841191943&text&type=phone_number&app_absent=0`
                    )
                  }
                  style={{
                    width: "30px",
                    cursor: "pointer",
                  }}
                />
              </Stack>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllModels;
