import { useCallback, useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import GridContainer from "../components/Layout/GridContainer";
import DataGroup from "../components/DataGroup";
import TitleInfo from "../components/Elements/TitleInfo";
import { useMovie } from "../context/MovieContext";
import { useData } from "../context/DataContext";

const ListPage = () => {
  const { getUserList } = useData();
  const { userTrackerList } = useMovie();

  const [userList, setUserList] = useState<DocumentData | null>(null);
  const [params, _] = useSearchParams();

  const getListById = useCallback(async () => {
    const response = await getUserList(params.get("id") + "");
    setUserList(response);
  }, [getUserList, params]);

  useEffect(() => {
    getListById();
    return () => {
      // Cleanup code, if any
    };
  }, [params, getListById]);

  if (userList)
    return (
      <div>
        <div className="center">
          <TitleInfo center as="h1" title={`Nome: ${userList.name}`} />
          <p className="center p-2">{userList.description}</p>
        </div>
        {/*  */}
        <div>
          {userList && userList.list.length > 0 && (
            <div>
              <GridContainer centered gap="gap-sm">
                <DataGroup
                  data={userList ? userList.list.reverse() : []}
                  userTrackerList={userTrackerList}
                />
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
