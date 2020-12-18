import logoImg from "./logoDigital.png";
const Logo = ({ top, left, width, height }) => {
  let styles = { top: isNaN(top) ? 0 : top, left: isNaN(left) ? 0 : left };

  return (
    <img
      id="logo"
      src={logoImg}
      alt="Logo"
      width={width}
      height={height}
      style={styles}
    />
  );
};

export default Logo;
