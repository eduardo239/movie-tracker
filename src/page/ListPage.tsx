import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IUserList, TListItemData } from "../abstract/interfaces";
import { useMovie } from "../context/MovieContext";
import { DocumentData } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import GridContainer from "../components/GridContainer";
import DataGroup from "../components/DataGroup";
import { Header } from "semantic-ui-react";
import { getUserListsFB } from "../fetch/firebase";
import TitleInfo from "../components/TitleInfo";

const ListPage = () => {
  const { user } = useAuth();
  // const { handleGetUserLists } = useMovie();

  const [userList, setUserList] = useState<DocumentData | null>(null);
  const [params, _] = useSearchParams();
  const [id, setId] = useState<string>(params.get("id") + "");

  useEffect(() => {
    if (id) {
      if (user) {
        const payload: IUserList = {
          userId: user.uid,
          id: id,
        };

        (async () => {
          const response = await getUserListsFB(payload);
          setUserList(response.userLists.filter((x) => x.id === id)[0]);
        })();
      }
    }
  }, [user, id]);
  console.log(userList);
  if (userList)
    return (
      <div>
        <Header textAlign="center" as="h1" inverted></Header>
        <div className="center">
          <TitleInfo as="h1" title={`Nome: ${userList.name}`} />
          <p className="center p-2">{userList.description}</p>
        </div>
        <div>
          {userList && userList.list.length > 0 && (
            <div>
              <GridContainer centered gap="gap-sm">
                <DataGroup data={userList ? userList.list.reverse() : []} />
                {/* TODO: alternar entre mediaType */}
              </GridContainer>
            </div>
          )}
        </div>
      </div>
    );
  else return <div>Lista não encontrada</div>;
};

export default ListPage;
