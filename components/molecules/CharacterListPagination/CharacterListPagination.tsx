import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useCharactersContext } from "../../../context/Characters";

type PageIndex = {
  selected: number;
};

const CharacterListPagination = () => {
  const { dispatch } = useCharactersContext();
  const router = useRouter();
  const paginationHandler = (page: PageIndex) => {
    const selectedPath = (page.selected + 1).toString();

    dispatch({
      type: "UPDATE_FILTER_KEYWORD",
      payload: "",
    });

    router.push({
      pathname: selectedPath,
    });
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
