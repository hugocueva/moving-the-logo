import "./app.css";
import Logo from "./components/Logo";
import Button from "./components/Button";
import EmptyCell from "./components/EmptyCell";
import { useState } from "react";
import useDimensions from "react-cool-dimensions";

function App() {
  const moveByX = 50;
  const moveByY = 50;
  const logoWidth = 37;
  const logoHeight = 55;
  const { ref, width, height } = useDimensions({
    onResize: ({ width, height }) => {
      resizeContainer(width, height);
    },
  });

  const resizeContainer = (width, height) => {
    if (width !== 0 || height !== 0) {
      let logoTop = state.logoTop || (height - state.logoHeight) / 2;
      let logoLeft = state.logoLeft || (width - state.logoWidth) / 2;
      setState({
        ...state,
        containerWidth: width,
        containerHeight: height,
        logoTop,
        logoLeft,
      });
    }
  };

  const [state, setState] = useState({
    logoWidth,
    logoHeight,
    lastClickedButton: undefined,
  });

  const moveLogo = (x, y, clickedButton) => {
    const maxLeft = width - state.logoWidth;
    const maxTop = height - state.logoHeight;
    let top = state.logoTop || 0;
    let left = state.logoLeft || 0;
    top += y;
    left += x;
    if (top > maxTop) {
      top = maxTop;
    }
    if (top < 0) {
      top = 0;
    }
    if (left > maxLeft) {
      left = maxLeft;
    }
    if (left < 0) {
      left = 0;
    }

    setState({
      ...state,
      logoTop: top,
      logoLeft: left,
      lastClickedButton: clickedButton,
    });
  };

  return (
    <div id="container" className="grid">
      <EmptyCell />
      <Button
        showBorder={state.lastClickedButton === "top"}
        onClick={() => moveLogo(0, moveByY * -1, "top")}
      ></Button>
      <EmptyCell />
      <Button
        showBorder={state.lastClickedButton === "left"}
        onClick={() => moveLogo(moveByX * -1, 0, "left")}
      />
      <div ref={ref} className="grid-item empty" id="logoContainer">
        <Logo
          top={state.logoTop}
          left={state.logoLeft}
          width={state.logoWidth}
          height={state.logoHeight}
        />
      </div>
      <Button
        showBorder={state.lastClickedButton === "right"}
        onClick={() => moveLogo(moveByX, 0, "right")}
      />
      <EmptyCell />
      <Button
        showBorder={state.lastClickedButton === "bottom"}
        onClick={() => moveLogo(0, moveByY, "bottom")}
      />
      <EmptyCell />
    </div>
  );
}

export default App;
