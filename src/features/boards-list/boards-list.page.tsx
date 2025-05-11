import { rqClient } from "@/shared/api/instance";
import { CONFIG } from "@/shared/model/config"; //фасад для env из модели
import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
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
    <div className="container mx-auto p-4">
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
      <div className="grid grid-cols-3 gap-4">
        {queryBoards.data?.map((board) => {
          return (
            <Card key={board.id}>
              <CardHeader>
                <Button asChild variant="link">
                  <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                    {board.name}
                  </Link>
                </Button>
              </CardHeader>

              <CardFooter>
                <Button
                  variant="destructive"
                  disabled={deleteBoardMutation.isPending}
                  onClick={() =>
                    deleteBoardMutation.mutate({
                      params: { path: { boardId: board.id } },
                    })
                  }
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
