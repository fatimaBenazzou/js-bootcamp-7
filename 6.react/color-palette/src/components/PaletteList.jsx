import PaletteCard from "./PaletteCard";

export default function PaletteList({ palettes, onClick }) {
  return (
    <ul className="palettes-grid">
      {palettes.map((palette) => (
        <PaletteCard from={palette.from} to={palette.to} onClick={onClick} />
      ))}
    </ul>
  );
}
