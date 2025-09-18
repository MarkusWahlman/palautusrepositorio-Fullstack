import {
  useState,
  useImperativeHandle,
  forwardRef,
  type ReactNode,
} from "react";

export interface TogglableRef {
  toggleVisibility: () => void;
}

interface TogglableProps {
  buttonLabel: string;
  children: ReactNode;
}

const Togglable = forwardRef<TogglableRef, TogglableProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});
export default Togglable;
