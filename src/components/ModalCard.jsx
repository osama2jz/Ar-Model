import { Button, Flex, Group, Image, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
const ModalCard = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleColorChange = (color) => {
    let modelViewerColor = document?.querySelector("#color");
    const [material] = modelViewerColor?.model?.materials;
    material.pbrMetallicRoughness.setBaseColorFactor(color);
    // });
  };

  return (
    <div className="card" onClick={open}>
      <Image src={data?.image} width={"200px"} height={"240px"} fit="cover" />
      <p>{data?.title}</p>
      <Modal
        opened={opened}
        centered
        size={"lg"}
        onClose={(e) => {
          e.stopPropagation();
          close();
        }}
        xOffset={0}
        styles={{
          title: { marginLeft: "auto", fontWeight: "bold" },
        }}
        title={data?.title}
      >
        <model-viewer
          id="color"
          src={data?.model}
          ar
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
        ></model-viewer>
        {data.showColors && (
          <Group position="center" mt="sm" my="md">
            <Button color="green" onClick={() => handleColorChange("#37b24d")}>
              Green
            </Button>
            <Button color="red" onClick={() => handleColorChange("#f03e3e")}>
              Red
            </Button>
            <Button color="Blue" onClick={() => handleColorChange("#1c7ed6")}>
              Blue
            </Button>
          </Group>
        )}
        <Flex align={"center"} gap={"xs"}>
          <Title order={5}>Dimensions: </Title>
          <Text>{data?.dimensions || "N/A"}</Text>
        </Flex>
        <Flex align={"center"} gap={"xs"}>
          <Title order={5}>Price: </Title>
          <Text>{data?.price || "N/A"}</Text>
        </Flex>
        <Flex align={"center"} gap={"xs"}>
          <Title order={5}>Description: </Title>
          <Text>{data?.description || "N/A"}</Text>
        </Flex>
      </Modal>
    </div>
  );
};

export default ModalCard;
