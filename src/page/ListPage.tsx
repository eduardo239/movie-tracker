import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IUserList, TListItemData } from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import { DocumentData } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";
import { Header } from "semantic-ui-react";

const ListPage = () => {
  const { user } = useAuth();
  const { getUserLists } = useMovie();

  const [userList, setUserList] = useState<DocumentData | null>(null);
  const [params, _] = useSearchParams();
  const [id, setId] = useState<string>(params.get("id") + "");

  useEffect(() => {
    if (id) {
      if (user) {
        const payload: IUserList = {
          userId: user.uid,
          id: id,
          fullList: true,
        };

        // TODO: fix fullList
        (async () => {
          const response = await getUserLists(payload);
          // TODO: fix
          setUserList(response.filter((x) => x.id === id)[0]);
        })();
      }
    } else {
      alert("list id not found");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);
  console.log(userList);

  if (userList)
    return (
      <div>
        <Header textAlign="center" as="h3" inverted>
          Lista: {userList.name}
        </Header>
        <div>
          {userList && userList.list.length > 0 && (
            <div>
              <GridContainer centered gap="gap-sm">
                <DataGroup
                  data={userList ? userList.list.reverse() : []}
                  mediaType={"movie"}
                />
              </GridContainer>
            </div>
          )}
        </div>
      </div>
    );
  else return <div>Lista não encontrada</div>;
};

export default ListPage;
