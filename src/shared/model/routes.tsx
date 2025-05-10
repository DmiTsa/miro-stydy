import "react-router-dom";

//описание роутов приложения
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  BOARDS: "/boards",
  BOARD: "/boards/:boardId",
} as const;

//типизация параметра в URL
export type PathParams = {
  [ROUTES.BOARD]: {
    boardId: string;
  };
};

//переопределение встроенного интерфейса react-router-dom для типизации параметра в URL (:boardId)
declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
