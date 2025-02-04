import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />  {/* Aquí se renderizan las páginas específicas */}
      </main>
      <Footer />
    </div>
  );
};

// Asegúrate de exportar el componente
export default Layout;
