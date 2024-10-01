import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import {
  ArrowLeftCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 98.5dvh;
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #d9d9d9;
  height: 98.5dvh;
  width: 150px;
  margin-right: 50px;
  border-radius: 20px;
  align-items: center;
`;

const HomeButton = styled.div`
  width: 100px;
  margin-top: 10px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ProfileButton = styled.div`
  width: 100px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const LogoutButton = styled.div`
  width: 100px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <Wrapper>
      <MenuBar>
        <XMarkIcon />
        <HomeButton onClick={() => navigate("/")}>
          <HomeIcon />
          Home
        </HomeButton>
        <ProfileButton onClick={() => navigate("/profile")}>
          <UserIcon />
          Profile
        </ProfileButton>
        <LogoutButton onClick={onLogOut}>
          <ArrowLeftStartOnRectangleIcon />
          Log Out
        </LogoutButton>
      </MenuBar>
      <Outlet />
    </Wrapper>
  );
}
