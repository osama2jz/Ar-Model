import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
const ModalCard = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);
  // const [color, setColor] = useState(null);
  const [glbFile, _] = useState(
    "https://firebasestorage.googleapis.com/v0/b/teamawep-6eff2.appspot.com/o/venue%2F4864.863584324886%40_%40music_stage.glb?alt=media&token=91f0d781-c843-4b63-8c77-90fdaad92d60"
  );

  // useEffect(() => {
  //   // console.log("i am rendering",);
  //   let modelViewerColor;

  //   setTimeout(() => {
  //     if (opened) {
  //       modelViewerColor = document?.querySelector("#color");
  //       modelViewerColor.addEventListener("model-visibility", () => {
  //         console.log("i am rendering");
  //         const [material] = modelViewerColor?.model?.materials;
  //         material.pbrMetallicRoughness.setBaseColorFactor(color);
  //       });
  //     }
  //   }, 100);

  //   return () => {
  //     modelViewerColor &&
  //       modelViewerColor.removeEventListener("model-visibility", () => {});
  //   };
  // }, [opened, color]);

  const handleColorChange = (color) => {
    let modelViewerColor = document?.querySelector("#color");
    const [material] = modelViewerColor?.model?.materials;
    material.pbrMetallicRoughness.setBaseColorFactor(color);
    // });
  };

  return (
    <div className="card" onClick={open}>
      <img src={data?.image} width={"200px"} height={"80%"} />
      <p>{data?.title}</p>
      <Modal
        opened={opened}
        centered
        size={"700px"}
        // size={"auto"}
        onClose={(e) => {
          e.stopPropagation();
          close();
        }}
        xOffset={0}
        styles={{ root: { width: "90% !important" } }}
        title="View AR Model"
      >
        <model-viewer
          id="color"
          src={data?.model}
          ar
          // poster={img1}
          // environment-image="shared-assets/environments/moon_1k.hdr"
          shadow-intensity="1"
          camera-controls
          touch-action="pan-y"
        ></model-viewer>
        <Group position="center" mt="sm">
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
      </Modal>
    </div>
  );
};

export default ModalCard;
