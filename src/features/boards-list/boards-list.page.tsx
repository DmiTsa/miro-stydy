import { ROUTES } from "@/shared/model/routes";
import { Link, href } from "react-router-dom";

function BoardsListPage() {
  return (
    <div>
      Boards list
      <Link to={href(ROUTES.BOARD, { boardId: "1" })}>Board 1</Link>
    </div>
  );
}

export const Component = BoardsListPage;
