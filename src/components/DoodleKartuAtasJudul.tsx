import GambarDoodle from "@/components/GambarDoodle";

export default function DoodleKartuAtasJudul({
  id,
  alt,
}: {
  id: string;
  alt: string;
}) {
  return (
    <div className="mb-4">
      <GambarDoodle src={`/doodle-pai/${id}.png`} alt={alt} ukuran="kecil" />
    </div>
  );
}
