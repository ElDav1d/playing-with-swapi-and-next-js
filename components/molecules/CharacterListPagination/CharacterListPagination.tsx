import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useCharactersContext } from "../../../context/Characters";

type PageIndex = {
  selected: number;
};

const CharacterListPagination = () => {
  const { charactersContextDispatch } = useCharactersContext();
  const { push } = useRouter();

  const paginationHandler = (page: PageIndex): void => {
    const selectedPath = (page.selected + 1).toString();

    charactersContextDispatch({
      type: "UPDATE_FILTER_KEYWORD",
      payload: "",
    });

    push({
      pathname: selectedPath,
    });

    return;
  };

  return (
    <ReactPaginate
      pageCount={9}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      previousLabel={"previous"}
      nextLabel={"next"}
      breakClassName={"break-me"}
      pageClassName={"page-li"}
      pageLinkClassName={"page-link"}
      breakLabel={"..."}
      activeClassName={"active"}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      onPageChange={paginationHandler}
    />
  );
};

export default CharacterListPagination;
