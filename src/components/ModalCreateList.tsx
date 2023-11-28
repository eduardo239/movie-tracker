import { useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import CreateList from "../page/CreateList";

const ModalCreateList = ({
  fetchUserLists,
}: {
  fetchUserLists: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="app-button app-button__secondary">
          Criar Lista
        </button>
      }
    >
      <Modal.Header>Criar uma nova lista</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header></Header>
          <CreateList fetchUserLists={fetchUserLists} setOpen={setOpen} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button> */}
        <Button
          content="Sair"
          labelPosition="right"
          icon="close"
          onClick={() => setOpen(false)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ModalCreateList;
