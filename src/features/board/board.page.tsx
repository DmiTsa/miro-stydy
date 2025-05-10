import type { PathParams, ROUTES } from "@/shared/model/routes";
import { useParams } from "react-router-dom";

function BoardPage() {
  //получить все параметры из строки URL
  const param = useParams<PathParams[typeof ROUTES.BOARD]>();

  return <div>Board page number {param.boardId}</div>;
}

export const Component = BoardPage;
