import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Panel from "../../ui/Panel";

const DarkModeToggle = () => {
  return (
    <Panel>
      <ButtonIcon>
        <HiOutlineSun />
      </ButtonIcon>
      <ButtonIcon>
        <HiOutlineMoon />
      </ButtonIcon>
    </Panel>
  );
};

export default DarkModeToggle;
