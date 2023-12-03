import { useState } from "react";
import { Button, Checkbox, Form, TextArea, Header } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";

const CreateList = ({
  fetchUserLists,
  setOpen,
}: {
  fetchUserLists: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useAuth();
  const { handleCreateNewList } = useMovie();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleAddNewList = async () => {
    //
    if (!name) {
      alert("handle add list, name required");
      return;
    }

    if (!user) {
      alert("add new list, user required");
      return;
    }

    const payload = {
      name,
      description,
      isPublic,
      list: [],
      userId: user.uid,
    };

    await handleCreateNewList(payload);
    fetchUserLists();
    setOpen(false);
  };

  return (
    <div
      style={{
        maxWidth: "30rem",
        display: "block",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <Header as="h3">Criar uma nova lista</Header>

      <Form onSubmit={handleAddNewList}>
        <Form.Field>
          <label>Nome</label>
          <input
            placeholder="Nome da lista"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Descrição</label>

          <TextArea
            rows={4}
            placeholder="Tell us more"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="A lista é pública?"
            checked={isPublic}
            onChange={(e) => setIsPublic(!isPublic)}
          />
        </Form.Field>
        <Button color="green" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
};

export default CreateList;
