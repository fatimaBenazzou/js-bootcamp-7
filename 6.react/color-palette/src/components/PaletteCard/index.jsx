import "./style.css";

export default function PaletteCard({ from, to, onClick }) {
  const handleClick = () => {
    onClick({ from: from, to: to });
  };

  return (
    <li className="palette" onClick={handleClick}>
      {/* gradient */}
      <div
        className="palette-gradient"
        style={{
          background: `linear-gradient(135deg, ${from}, ${to})`,
        }}
      ></div>
      {/* infos */}
      <p className="palette-caption">
        {from} - {to}
      </p>
    </li>
  );
}
