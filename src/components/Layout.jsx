import { Button, Layout as LayoutAntd, Row } from "antd";
import { useDispatch } from "react-redux";
import MenuSide from "./MenuSide";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "../features/authSlice";
import logo from "../MyNikah.png";

const { Content, Footer, Header, Sider } = LayoutAntd;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LogOut());
    navigate("/");
  };

  return (
    <LayoutAntd
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          alignItems: "center",
          background: "var(--secondary-color)",
          paddingInline: 20,
        }}
      >
        <Row justify="space-between" align="middle">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={logo} width="112" height="28" alt="logo" />
          </NavLink>
          <div>
            <Button type="default" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Row>
      </Header>
      <LayoutAntd>
        <Sider style={{ background: "var(--white-color)" }}>
          <MenuSide />
        </Sider>
        <LayoutAntd>
          <Content>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "var(--white-color)",
            }}
          >
            <span>
              ©{new Date().getFullYear().toString()}
              <strong>MyNikah</strong>. All Rights Reserved
            </span>
          </Footer>
        </LayoutAntd>
      </LayoutAntd>
    </LayoutAntd>
  );
}
