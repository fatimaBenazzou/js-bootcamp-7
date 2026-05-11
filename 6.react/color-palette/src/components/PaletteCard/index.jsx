import "./style.css";

export default function PaletteCard({ from, to }) {
  return (
    <li className="palette">
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
