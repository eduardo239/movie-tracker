import { useEffect, useState } from "react";
import { getAllListsFB } from "../fetch/firebase";
import { DocumentData } from "firebase/firestore";
import { Checkbox, Header, Image, Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import IconWithLabel from "../components/Elements/IconWithLabel";

const fbPosterDefault = import.meta.env.VITE_FIREBASE_POSTER_DEFAULT_URL;
const tmdbPosterUrl = import.meta.env.VITE_TMDB_POSTER_URL;

const AllLists = () => {
  const navigate = useNavigate();

  const [allLists, setAllLists] = useState<DocumentData[] | []>([]);

  const fetchUserLists = async () => {
    const response = await getAllListsFB();
    if (response) setAllLists(response);
    else return setAllLists([]);
  };

  const handleItemChecked = (item: DocumentData) => {
    console.log("handleItemChecked");
  };

  useEffect(() => {
    fetchUserLists();
    return () => {};
  }, []);

  return (
    <div>
      <Table celled color="orange" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell width={2}>Pública</Table.HeaderCell>
            <Table.HeaderCell width={2}>Itens</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {allLists.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell collapsing>
                <Checkbox onClick={() => handleItemChecked(item)} />
              </Table.Cell>
              <Table.Cell
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/list?id=${item.id}`)}
              >
                <Header as="h4" image>
                  <Image
                    src={`${
                      item.list && item.list[0] && item.list[0].poster_path
                        ? tmdbPosterUrl + item.list[0].poster_path
                        : fbPosterDefault
                    }`}
                    rounded
                    size="mini"
                  />
                  <Header.Content>
                    {item.name}
                    <Header.Subheader>
                      <small>ID: {item.id}</small>
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell positive={item.isPublic} negative={!item.isPublic}>
                <IconWithLabel
                  iconName={item.isPublic ? "unlock" : "lock"}
                  label={item.isPublic ? "Pública" : "Privada"}
                />
              </Table.Cell>
              <Table.Cell>
                <IconWithLabel
                  iconName="chart line"
                  label={item.list && item.list.length}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllLists;
