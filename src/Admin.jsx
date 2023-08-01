import { Button, Group, Loader, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import wa from "./assets/wa.svg";
import add from "./assets/add.svg";
import delet from "./assets/delete.svg";
import ModalCard from "./components/ModalCard";
import { useDisclosure } from "@mantine/hooks";
import AddNewModel from "./components/AddNewModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
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

  const handleDelete = (id) => {
    axios.delete(`https://arguru.onrender.com/armodel/${id}`).then(() => {
      setAllData(allData.filter((obj) => obj.id !== id));
    });
  };
  return (
    <div>
       <Group position="right" mb="md">
        <Button onClick={() => navigate("/")}>Sign Out</Button>
      </Group>
      <Button
        leftIcon={<img src={add} width={"20px"} />}
        variant="outline"
        color="black"
        onClick={open}
      >
        Add Model
      </Button>
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
              <Stack key={index} spacing={"sm"} align="center" mb="md">
                <ModalCard key={index} data={obj} />
                <img
                  src={delet}
                  width={"30px"}
                  onClick={() => handleDelete(obj?.id)}
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            );
          })
        )}
      </div>
      <img
        src={wa}
        onClick={() => window.open("https://wa.me/")}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: "30px",
          cursor: "pointer",
        }}
      />
      <AddNewModel opened={opened} close={close} getData={getData} />
    </div>
  );
};

export default Admin;
