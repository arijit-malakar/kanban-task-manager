import {
  DetailedHTMLProps,
  HTMLAttributes,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled, { IStyledComponent } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface Position {
  x: number;
  y: number;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  position: Position;
  ref: React.RefObject<HTMLDivElement>;
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
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
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}

const defaultPosition: Position = {
  x: 0,
  y: 0,
};

const MenusContext = createContext<MenusContext>({
  openId: "",
  setOpenId: () => {},
  position: defaultPosition,
  setPosition: () => {},
});

const Menus: MenusComponent = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position>(defaultPosition);
  return (
    <MenusContext.Provider value={{ openId, setOpenId, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
};

const Toggle: React.FC<ToggleProps> = ({ id }) => {
  const { openId, setOpenId, setPosition } = useContext(MenusContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();
    if (rect) {
      const { x, y, width, height } = rect;
      setPosition({
        x: window.innerWidth - width - x,
        y: y + height + 8,
      });
    }
    setOpenId(id !== openId || !openId ? id : "");
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List: React.FC<ListProps> = ({ id, children }) => {
  const { openId, setOpenId, position } = useContext(MenusContext);
  const ref = useOutsideClick(setOpenId, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  const { setOpenId } = useContext(MenusContext);
  const handleClick = () => {
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
