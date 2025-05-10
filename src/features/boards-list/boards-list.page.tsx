import { CONFIG } from "@/shared/model/config"; //фасад для env из модели
import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";

function BoardsListPage() {
  // console.log(CONFIG.API_BASE_URL);

  return (
    <div>
      Boards list {CONFIG.API_BASE_URL}
      <br />
      <Link to={href(ROUTES.BOARD, { boardId: "1" })}>Board 1</Link>
    </div>
  );
}

export const Component = BoardsListPage;
