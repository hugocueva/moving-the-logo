import { useState } from "react";
import useDimensions from "react-cool-dimensions";
import * as Constants from "./Constants";
import Logo from "./components/Logo";
import Button from "./components/Button";
import EmptyCell from "./components/EmptyCell";

import "./app.css";

function App() {
  const { ref, width, height } = useDimensions({
    onResize: ({ width, height }) => {
      resizeContainer(width, height);
    },
  });

  const [state, setState] = useState({
    logoWidth: Constants.LOGO_WIDTH,
    logoHeight: Constants.LOGO_HEIGHT,
    lastClickedButton: undefined,
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

  const moveLogo = (x, y, clickedButton) => {
    let { logoTop: top = 0, logoLeft: left = 0, logoWidth, logoHeight } = state;
    const maxLeft = width - logoWidth;
    const maxTop = height - logoHeight;

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
        onClick={() => moveLogo(0, Constants.MOVE_BY_Y * -1, "top")}
      ></Button>
      <EmptyCell />
      <Button
        showBorder={state.lastClickedButton === "left"}
        onClick={() => moveLogo(Constants.MOVE_BY_X * -1, 0, "left")}
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
        onClick={() => moveLogo(Constants.MOVE_BY_X, 0, "right")}
      />
      <EmptyCell />
      <Button
        showBorder={state.lastClickedButton === "bottom"}
        onClick={() => moveLogo(0, Constants.MOVE_BY_Y, "bottom")}
      />
      <EmptyCell />
    </div>
  );
}

export default App;
