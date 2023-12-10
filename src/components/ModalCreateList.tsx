import { useState } from "react";
import { Button, Form, Header, Icon, Modal, Radio } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const ModalCreateList = ({
  fetchUserLists,
}: {
  fetchUserLists: () => void;
}) => {
  const { user } = useAuth();
  const { handleCreateNewList } = useMovie();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    isPublic: true,
    name: "",
    description: "",
  });

  const handleChange = (e: boolean) => {
    setForm({ ...form, isPublic: e });
  };

  const handleSubmit = async () => {
    if (!form.name) {
      alert("[handleSubmit] - Name is required");
      return;
    }

    if (!user) {
      alert("[handleSubmit] - user is required");

      return;
    }

    const payload = {
      name: form.name,
      description: form.description,
      isPublic: form.isPublic,
      list: [],
      userId: user.uid,
    };

    await handleCreateNewList(payload);
    await fetchUserLists();
    setOpen(false);
  };

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button>
          <Icon name="file" />
          Criar Lista
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="list" content="Criar uma nova lista" />
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Nome"
              placeholder="Nome da lista"
              onChange={(e) =>
                setForm({ ...form, name: e.currentTarget.value })
              }
            />

            <Form.Select
              fluid
              label="Gender"
              options={options}
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Group inline>
            <label>A lista é pública?</label>
            <Form.Radio
              label="Sim"
              value="1"
              checked={form.isPublic}
              onChange={() => setForm({ ...form, isPublic: true })}
              control={Radio}
            />
            <Form.Radio
              label="Não"
              value="0"
              checked={!form.isPublic}
              onChange={() => setForm({ ...form, isPublic: false })}
            />
          </Form.Group>
          <Form.TextArea
            label="Descrição"
            placeholder="..."
            onChange={(e) =>
              setForm({ ...form, description: e.currentTarget.value })
            }
          />
          <Form.Checkbox label="Eu aceito os termos e condições" />
          <Form.Button color="green" type="submit">
            Salvar
          </Form.Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>
          <Icon name="remove" /> Sair
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalCreateList;
