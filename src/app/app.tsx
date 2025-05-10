import { AppHeader } from "@/features/header";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div>
      <AppHeader />
      <h1>test</h1>
      {/* отрисовка вложенности (описана в компоненте router.tsx) */}
      <Outlet />
    </div>
  );
}
