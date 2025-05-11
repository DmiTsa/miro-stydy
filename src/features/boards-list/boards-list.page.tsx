import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config"; //фасад для env из модели
import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";

function BoardsListPage() {
  const queryBoards = rqClient.useQuery("get", "/boards");

  return (
    <div>
      Boards list url {CONFIG.API_BASE_URL}
      <br />
      {queryBoards.data?.map((board) => {
        return (
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
        );
      })}
    </div>
  );
}

export const Component = BoardsListPage;
