import React from "react";
import TitleInfo from "../Elements/TitleInfo";
import { ERR_INFO_NOT_FOUND } from "../../abstract/constants";
import { Divider } from "semantic-ui-react";
import { IPerson } from "../../abstract/interfaces";

const PersonInfo = ({ data }: { data: IPerson }) => {
  return (
    <>
      <TitleInfo as="h1" title={data.name} />
      <p className="font-size-1-15">
        Data de nascimento: {data.birthday ? data.birthday : ERR_INFO_NOT_FOUND}
      </p>
      <p className="font-size-1-15">
        Local de Nascimento:{" "}
        {data.place_of_birth ? data.place_of_birth : ERR_INFO_NOT_FOUND}
      </p>
      <p className="font-size-1-15">
        Popularidade: {data.popularity ? data.popularity : ERR_INFO_NOT_FOUND}
      </p>
      <Divider />

      {data.biography && (
        <>
          <TitleInfo title="Biografia" />

          <p className="font-size-1-15">{data.biography}</p>
          <Divider />
        </>
      )}
    </>
  );
};

export default PersonInfo;
