import type { AdeganStory } from "./logika-story";
import { KUPU, LEBAH, OWL, bayangan, gx, hasilLompat, judul, labelPenanda, lompatan, penanda, petunjukArah, sumbu, sumbuSatuan } from "./k2b7B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b7B-bantu";

const [PK_KIRI, PK_KANAN] = petunjukArah();

/* ------------------------------ 2. Garis bilangan: kanan lebih besar, kiri lebih kecil ------------------------------ */
const S_G = sumbuSatuan(55);
const SUARA_G1 = "Lihat garis bilangan di layar. Garis ini berisi bilangan dari lima puluh lima sampai enam puluh satu.";
const SUARA_G2 = "Bilangan di sebelah kanan lebih besar. Bilangan di sebelah kiri lebih kecil.";
const SUARA_G3 = "Kupu-kupu hinggap di antara lima puluh tujuh dan lima puluh sembilan.";
const SUARA_G4 = "Jadi kupu-kupu ada di bilangan lima puluh delapan.";

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis-bilangan",
  judul: "Garis bilangan",
  sumber: "Materi: garis bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Garis bilangan")), tambah(idx(SUARA_G1, "garis"), sumbu(S_G))),
    k(SUARA_G2, tambah(idx(SUARA_G2, "kanan"), PK_KANAN), tambah(idx(SUARA_G2, "kiri"), PK_KIRI)),
    k(SUARA_G3, tambah(idx(SUARA_G3, "Kupu-kupu"), penanda(S_G, 58, KUPU)), sorotkan(idx(SUARA_G3, "tujuh"), "gb-t57"), sorotkan(idx(SUARA_G3, "sembilan"), "gb-t59")),
    k(SUARA_G4, redamkan(0, "gb-t57", "gb-t59"), sorotkan(idx(SUARA_G4, "delapan"), "gb-t58"), tambah(idx(SUARA_G4, "delapan"), labelPenanda("Kupu-kupu di 58"))),
  ],
};

/* ------------------------------ 3. Maju: dua lebihnya ------------------------------ */
const SUARA_M1 = "Sekarang kupu-kupu mau terbang. Ia akan maju dua langkah ke kanan.";
const SUARA_M2 = "Satu langkah ke kanan, sampai di lima puluh sembilan.";
const SUARA_M3 = "Satu langkah lagi, sampai di enam puluh.";
const SUARA_M4 = "Kupu-kupu maju dua langkah. Dua lebihnya dari lima puluh delapan adalah enam puluh.";

export const ADEGAN_MAJU: AdeganStory = {
  id: "maju",
  judul: "Maju: lebihnya",
  sumber: "Materi: maju dan lebihnya",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Maju ke kanan")), tambah(0, sumbu(S_G)), tambah(idx(SUARA_M1, "kupu-kupu"), penanda(S_G, 58, KUPU), labelPenanda("Kupu-kupu di 58"))),
    k(SUARA_M2, tambah(0, bayangan(S_G, 58, KUPU)), ubah(idx(SUARA_M2, "sampai"), { id: "gb-m", x: gx(S_G, 59) }, { id: "gb-mt", isi: "Kupu-kupu di 59" }), tambah(idx(SUARA_M2, "sampai"), lompatan(S_G, 58, 59))),
    k(SUARA_M3, ubah(idx(SUARA_M3, "sampai"), { id: "gb-m", x: gx(S_G, 60) }, { id: "gb-mt", isi: "Kupu-kupu di 60" }), tambah(idx(SUARA_M3, "sampai"), lompatan(S_G, 58, 60))),
    k(SUARA_M4, sorotkan(idx(SUARA_M4, "maju"), "gb-op"), tambah(idx(SUARA_M4, "adalah"), hasilLompat(58, 60)), sorotkan(idx(SUARA_M4, "adalah"), "gb-t60")),
  ],
};

/* ------------------------------ 4. Mundur: kurangnya ------------------------------ */
const S_D = sumbuSatuan(70);
const SUARA_D1 = "Sekarang kita lihat lebah. Lebah hinggap di bilangan tujuh puluh lima.";
const SUARA_D2 = "Lebah akan mundur tiga langkah, ke arah kiri.";
const SUARA_D3 = "Satu langkah ke kiri, tujuh puluh empat. Dua langkah, tujuh puluh tiga. Tiga langkah, tujuh puluh dua.";
const SUARA_D4 = "Lebah mundur tiga langkah. Tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua.";

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "mundur",
  judul: "Mundur: kurangnya",
  sumber: "Materi: mundur dan kurangnya",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Mundur ke kiri")), tambah(0, sumbu(S_D)), tambah(idx(SUARA_D1, "Lebah"), penanda(S_D, 75, LEBAH)), tambah(idx(SUARA_D1, "lima"), labelPenanda("Lebah di 75"))),
    k(SUARA_D2, tambah(idx(SUARA_D2, "kiri"), PK_KIRI), sorotkan(idx(SUARA_D2, "mundur"), "gb-t75")),
    k(
      SUARA_D3,
      hapus(0, "gb-kiri"),
      tambah(0, bayangan(S_D, 75, LEBAH)),
      ubah(idx(SUARA_D3, "empat"), { id: "gb-m", x: gx(S_D, 74) }, { id: "gb-mt", isi: "Lebah di 74" }),
      ubah(idx(SUARA_D3, "tiga"), { id: "gb-m", x: gx(S_D, 73) }, { id: "gb-mt", isi: "Lebah di 73" }),
      ubah(idx(SUARA_D3, "dua", 2), { id: "gb-m", x: gx(S_D, 72) }, { id: "gb-mt", isi: "Lebah di 72" }),
      tambah(idx(SUARA_D3, "dua", 2), lompatan(S_D, 75, 72)),
    ),
    k(SUARA_D4, sorotkan(idx(SUARA_D4, "mundur"), "gb-op"), tambah(idx(SUARA_D4, "adalah"), hasilLompat(75, 72)), sorotkan(idx(SUARA_D4, "adalah"), "gb-t72")),
  ],
};

/* ------------------------------ 5. Teka-teki Igil: dua lebihnya dari tujuh puluh enam ------------------------------ */
const S_L = sumbuSatuan(74);
const SUARA_L1 = "Igil punya teka-teki. Igil berdiri di bilangan tujuh puluh enam.";
const SUARA_L2 = "Igil bilang, aku dua lebihnya dari tujuh puluh enam. Dua lebihnya berarti maju dua langkah.";
const SUARA_L3 = "Satu langkah ke kanan, tujuh puluh tujuh. Dua langkah, tujuh puluh delapan.";
const SUARA_L4 = "Jadi dua lebihnya dari tujuh puluh enam adalah tujuh puluh delapan.";

export const ADEGAN_LEBIH: AdeganStory = {
  id: "teka-teki-lebih",
  judul: "Teka-teki: dua lebihnya",
  sumber: "Materi: teka-teki lebihnya",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Teka-teki Igil")), tambah(0, sumbu(S_L)), tambah(idx(SUARA_L1, "Igil", 2), penanda(S_L, 76, OWL)), tambah(idx(SUARA_L1, "enam"), labelPenanda("Igil di 76"))),
    k(SUARA_L2, sorotkan(idx(SUARA_L2, "enam"), "gb-t76"), tambah(idx(SUARA_L2, "maju"), PK_KANAN)),
    k(
      SUARA_L3,
      hapus(0, "gb-kanan"),
      tambah(0, bayangan(S_L, 76, OWL)),
      ubah(idx(SUARA_L3, "tujuh", 2), { id: "gb-m", x: gx(S_L, 77) }, { id: "gb-mt", isi: "Igil di 77" }),
      ubah(idx(SUARA_L3, "delapan"), { id: "gb-m", x: gx(S_L, 78) }, { id: "gb-mt", isi: "Igil di 78" }),
      tambah(idx(SUARA_L3, "delapan"), lompatan(S_L, 76, 78)),
    ),
    k(SUARA_L4, tambah(idx(SUARA_L4, "adalah"), hasilLompat(76, 78)), sorotkan(idx(SUARA_L4, "adalah"), "gb-t78")),
  ],
};

/* ------------------------------ 6. Teka-teki Igil: satu kurangnya dari enam puluh tujuh ------------------------------ */
const S_K = sumbuSatuan(63);
const SUARA_R1 = "Sekarang teka-teki kedua. Igil berdiri di bilangan enam puluh tujuh.";
const SUARA_R2 = "Satu kurangnya berarti mundur satu langkah ke kiri.";
const SUARA_R3 = "Satu langkah ke kiri, sampai di enam puluh enam.";
const SUARA_R4 = "Jadi satu kurangnya dari enam puluh tujuh adalah enam puluh enam.";

export const ADEGAN_KURANG: AdeganStory = {
  id: "teka-teki-kurang",
  judul: "Teka-teki: satu kurangnya",
  sumber: "Materi: teka-teki kurangnya",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Teka-teki kedua")), tambah(0, sumbu(S_K)), tambah(idx(SUARA_R1, "Igil"), penanda(S_K, 67, OWL)), tambah(idx(SUARA_R1, "tujuh"), labelPenanda("Igil di 67"))),
    k(SUARA_R2, sorotkan(idx(SUARA_R2, "mundur"), "gb-t67"), tambah(idx(SUARA_R2, "kiri"), PK_KIRI)),
    k(SUARA_R3, hapus(0, "gb-kiri"), tambah(0, bayangan(S_K, 67, OWL)), ubah(idx(SUARA_R3, "sampai"), { id: "gb-m", x: gx(S_K, 66) }, { id: "gb-mt", isi: "Igil di 66" }), tambah(idx(SUARA_R3, "sampai"), lompatan(S_K, 67, 66))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "adalah"), hasilLompat(67, 66)), sorotkan(idx(SUARA_R4, "adalah"), "gb-t66")),
  ],
};
