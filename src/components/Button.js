const Button = ({ onClick, showBorder }) => {
  let styles = { borderTop: "1px solid black", borderRight: "1px solid black" };
  if (showBorder) {
    styles = { border: "1px solid white" };
  }
  return (
    <div className="grid-item button" onClick={onClick} style={styles}></div>
  );
};

export default Button;
