import {
  DetailedHTMLProps,
  HTMLAttributes,
  createContext,
  useContext,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled, { IStyledComponent } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  ref: React.RefObject<HTMLDivElement>;
}

const StyledList = styled.ul<StyledListProps>`
  position: absolute;
  z-index: 9999;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: 0px;
  top: calc(100% + 10px);
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  & span {
    text-wrap: nowrap;
  }
`;

interface MenusProps {
  children: React.ReactNode;
}

interface ToggleProps {
  id: string;
}

interface ListProps {
  id: string;
  children: React.ReactNode;
}

interface ButtonProps {
  children: React.ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
}

interface MenusComponent extends React.FC<MenusProps> {
  Menu: IStyledComponent<
    "web",
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >;
  Toggle: React.FC<ToggleProps>;
  List: React.FC<ListProps>;
  Button: React.FC<ButtonProps>;
}

interface MenusContext {
  openId: string;
  setOpenId: React.Dispatch<React.SetStateAction<string>>;
}

const MenusContext = createContext<MenusContext>({
  openId: "",
  setOpenId: () => {},
});

const Menus: MenusComponent = ({ children }) => {
  const [openId, setOpenId] = useState("");
  return (
    <MenusContext.Provider value={{ openId, setOpenId }}>
      {children}
    </MenusContext.Provider>
  );
};

const Toggle: React.FC<ToggleProps> = ({ id }) => {
  const { openId, setOpenId } = useContext(MenusContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenId(id !== openId || !openId ? id : "");
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List: React.FC<ListProps> = ({ id, children }) => {
  const { openId, setOpenId } = useContext(MenusContext);
  const ref = useOutsideClick(setOpenId, false);

  if (openId !== id) return null;

  return <StyledList ref={ref}>{children}</StyledList>;
};

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  const { setOpenId } = useContext(MenusContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClick?.();
    setOpenId("");
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
