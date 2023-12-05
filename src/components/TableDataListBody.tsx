import { useNavigate } from "react-router-dom";
import { Icon, Table } from "semantic-ui-react";
import ListItemType from "./ListItemType";
import { DocumentData } from "firebase/firestore";

const TableDataListBody = ({ list }: { list: DocumentData[] }) => {
  const navigate = useNavigate();
  return (
    <Table.Body>
      {list.map((item) => (
        <Table.Row key={item.id}>
          <Table.Cell
            onClick={() => navigate(`/${item.mediaType}?id=${item.movieId}`)}
            style={{ cursor: "pointer" }}
          >
            {item.movieId}
          </Table.Cell>
          <Table.Cell
            onClick={() => navigate(`/${item.mediaType}?id=${item.movieId}`)}
            style={{ cursor: "pointer" }}
          >
            {item.title}
          </Table.Cell>

          <ListItemType listType={item.listType} />
          <Table.Cell>{item.mediaType}</Table.Cell>
          <Table.Cell textAlign="center" style={{ padding: "2px" }}>
            <div className="flex flex-center gap-sm">
              <button className="app-button app-button__small">
                <Icon name="trash" />
              </button>
            </div>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default TableDataListBody;
