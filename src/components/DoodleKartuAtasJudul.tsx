import GambarDoodle from "@/components/GambarDoodle";

export default function DoodleKartuAtasJudul({
  id,
  alt,
  folder = "doodle-pai",
}: {
  id: string;
  alt: string;
  folder?: string;
}) {
  return (
    <div className="mb-4">
      <GambarDoodle src={`/${folder}/${id}.png`} alt={alt} ukuran="kecil" />
    </div>
  );
}
