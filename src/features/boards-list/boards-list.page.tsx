import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config"; //фасад для env из модели
import { ROUTES } from "@/shared/model/routes";
import { useQueryClient } from "@tanstack/react-query";
import { Link, href } from "react-router-dom";

function BoardsListPage() {
  const queryClient = useQueryClient(); //будет использоваться для авто перезапросов всех бордов после useMutation

  const queryBoards = rqClient.useQuery("get", "/boards");

  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  return (
    <div>
      Boards list url {CONFIG.API_BASE_URL}
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          console.log(formData);

          createBoardMutation.mutate({
            body: { name: formData.get("name") as string },
          });
        }}
      >
        <input name="name" />
        <button type="submit" disabled={deleteBoardMutation.isPending}>
          Create board
        </button>
      </form>
      <br />
      {queryBoards.data?.map((board) => {
        return (
          <>
            <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
              {board.name}
            </Link>

            <button
              disabled={deleteBoardMutation.isPending}
              onClick={() =>
                deleteBoardMutation.mutate({
                  params: { path: { boardId: board.id } },
                })
              }
            >
              Delete
            </button>
            <br />
          </>
        );
      })}
    </div>
  );
}

export const Component = BoardsListPage;
