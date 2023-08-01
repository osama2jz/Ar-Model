import React, { useEffect, useState } from "react";
import wa from "./assets/wa.svg";
import ModalCard from "./components/ModalCard";
import axios from "axios";
import { Button, Group, Loader, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
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
      <Group position="right">
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
                      `https://api.whatsapp.com/send?phone=+923007171197&text=Hi this is a sample text for ${obj?.title}`
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
