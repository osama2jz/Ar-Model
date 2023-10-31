import {
  Button,
  Checkbox,
  FileInput,
  Group,
  Modal,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { uploadSingleFile } from "../firebase";

const AddNewModel = ({ opened, close, getData }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);
  const form = useForm({
    initialValues: {
      title: "",
      image: image,
      model: null,
      showColors: false,
      price: null,
      dimensions: "",
      description: "",
    },

    validate: {
      title: (value) => (value?.length > 0 ? null : "Invalid TItle"),
      image: (value) => (value ? null : "Invalid Image"),
      model: (value) => (value ? null : "Invalid Model"),
    },
  });
  const handleAddModel = (values) => {
    console.log(values);
    setLoading(true);
    axios.post("https://arguru.onrender.com/armodel", values).then((res) => {
      form.reset();
      close();
      setLoading(false);
      getData();
    });
  };
  useEffect(() => {
    form.setFieldValue("image", image);
    form.setFieldValue("model", model);
  }, [image, model]);
  return (
    <Modal
      opened={opened}
      onClose={(e) => {
        form.reset();
        setUploading(false);
        close();
      }}
      xOffset={0}
      styles={{
        root: { width: "85% !important" },
        title: { marginLeft: "auto", fontWeight: "bold" },
      }}
      title="Add 3d Model"
    >
      <form onSubmit={form.onSubmit((values) => handleAddModel(values))}>
        <Stack spacing={"md"}>
          <TextInput
            label="Model Title"
            placeholder="Enter Model Title"
            {...form.getInputProps("title")}
          />
          <FileInput
            label="Cover Image"
            accept="image/png, image/jpeg"
            placeholder="Import Cover image (200px x 250px)"
            onChange={(e) =>
              uploadSingleFile({
                file: e,
                folderName: "ARGuruImages",
                urlSetter: setImage,
                setProgress: setUploading,
              })
            }
          />
          <FileInput
            label="Model File"
            accept=".glb"
            placeholder="Select AR Model"
            onChange={(e) =>
              uploadSingleFile({
                file: e,
                folderName: "ARGuruModels",
                urlSetter: setModel,
                setProgress: setUploading,
              })
            }
          />
          <TextInput
            label="Price"
            placeholder="Price"
            type="number"
            {...form.getInputProps("price")}
          />
          <TextInput
            label="Dimensions"
            placeholder="00 x 00 x 00"
            {...form.getInputProps("dimensions")}
          />
          <Textarea
            label="Description"
            placeholder="Details about model"
            {...form.getInputProps("description")}
          />
          <Checkbox
            label="Show Colors Options"
            {...form.getInputProps("showColors")}
          />
          <Group position="right">
            <Button
              variant="outline"
              onClick={() => {
                close();
                form.reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading || uploading}>
              Add Model
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddNewModel;
