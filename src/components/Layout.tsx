import { NavLink, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <header>
        <div className="brand">
          <div className="brand-icon">◇</div>
          <strong>
            Simulación <i>·</i> Generador de Variables
          </strong>
        </div>
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Generador
          </NavLink>
          <NavLink
            to="/metodos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Métodos
          </NavLink>
          {/*
          <button disabled>
            Pruebas Estadísticas <small>Pronto</small>
          </button>
          */}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <div className="site-footer">
        UNCAUS · Simulación - TP N°2 - Duran - Perez - Romero{" "}
      </div>
    </>
  );
}

export default Layout;
