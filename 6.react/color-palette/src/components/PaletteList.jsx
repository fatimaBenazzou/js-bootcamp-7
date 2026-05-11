import PaletteCard from "./PaletteCard";

export default function PaletteList({ palettes }) {
  return (
    <ul className="palettes-grid">
      {palettes.map((palette) => (
        <PaletteCard from={palette.from} to={palette.to} />
      ))}
    </ul>
  );
}
