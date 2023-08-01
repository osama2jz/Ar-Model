import {
  Button,
  FileInput,
  Group,
  Modal,
  Stack,
  TextInput,
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
        close();
      }}
      styles={{ title: { marginLeft: "auto", fontWeight: "bold" } }}
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
            placeholder="Import Cover image"
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
            placeholder="Import 3d Model"
            onChange={(e) =>
              uploadSingleFile({
                file: e,
                folderName: "ARGuruModels",
                urlSetter: setModel,
                setProgress: setUploading,
              })
            }
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
