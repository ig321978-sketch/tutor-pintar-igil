import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  adalahKomposerPrompt,
  keputusanEnter,
  pasangPencegahEnter,
  sisipkanBarisBaru,
} = require("./logika-enter.js");

function kelas(namaKelas) {
  const daftar = new Set(namaKelas ? namaKelas.split(/\s+/) : []);
  return { contains(nama) { return daftar.has(nama); } };
}

function komposerQuill(dokumen) {
  return {
    tagName: "DIV",
    isContentEditable: true,
    classList: kelas("ql-editor textarea"),
    ownerDocument: dokumen,
    focused: false,
    events: [],
    getAttribute(nama) {
      if (nama === "contenteditable") return "true";
      if (nama === "aria-label") return "Masukkan perintah untuk Gemini";
      if (nama === "role") return "textbox";
      return null;
    },
    closest(selektor) {
      if (selektor === "rich-textarea") return null;
      if (selektor.includes("ql-editor") || selektor.includes("contenteditable")) return this;
      return null;
    },
    focus() { this.focused = true; },
    dispatchEvent(peristiwa) { this.events.push(peristiwa); },
  };
}

function textareaPrompt(nilai, awal, akhir) {
  return {
    tagName: "TEXTAREA",
    value: nilai,
    selectionStart: awal,
    selectionEnd: akhir == null ? awal : akhir,
    classList: kelas(""),
    events: [],
    getAttribute(nama) {
      if (nama === "aria-label") return "Masukkan perintah untuk Gemini";
      return null;
    },
    closest() { return null; },
    dispatchEvent(peristiwa) { this.events.push(peristiwa); },
  };
}

function tombolKirim() {
  return {
    tagName: "BUTTON",
    klik: 0,
    getAttribute(nama) {
      if (nama === "aria-label") return "Kirim pesan";
      return null;
    },
    closest() { return null; },
    click() { this.klik += 1; },
  };
}

function peristiwa(target, tambahan) {
  const data = tambahan || {};
  const jejak = data.jejak || [target];
  return {
    type: data.type || "keydown",
    key: data.key == null ? "Enter" : data.key,
    keyCode: data.keyCode == null ? 13 : data.keyCode,
    which: data.which,
    shiftKey: Boolean(data.shiftKey),
    ctrlKey: Boolean(data.ctrlKey),
    metaKey: Boolean(data.metaKey),
    altKey: Boolean(data.altKey),
    isComposing: Boolean(data.isComposing),
    inputType: data.inputType,
    target,
    defaultDicegah: false,
    propagasiBerhenti: false,
    composedPath() { return jejak; },
    preventDefault() { this.defaultDicegah = true; },
    stopPropagation() { this.propagasiBerhenti = true; },
    stopImmediatePropagation() { this.propagasiBerhenti = true; },
  };
}

function akarPalsu() {
  const pendengar = [];
  return {
    pendengar,
    addEventListener(jenis, fn, tangkap) {
      pendengar.push({ jenis, fn, tangkap });
    },
    removeEventListener(jenis, fn, tangkap) {
      const index = pendengar.findIndex((item) => item.jenis === jenis && item.fn === fn && item.tangkap === tangkap);
      if (index >= 0) pendengar.splice(index, 1);
    },
    tembak(jenis, event) {
      pendengar.filter((item) => item.jenis === jenis).forEach((item) => item.fn(event));
    },
  };
}

test("manifest hanya memuat gemini.google.com", () => {
  const manifest = JSON.parse(readFileSync(new URL("./manifest.json", import.meta.url), "utf8"));
  const skrip = manifest.content_scripts[0];
  assert.equal(manifest.manifest_version, 3);
  assert.deepEqual(skrip.matches, ["https://gemini.google.com/*"]);
  assert.deepEqual(skrip.js, ["logika-enter.js", "content.js"]);
  assert.equal(skrip.run_at, "document_start");
  const teks = JSON.stringify(manifest);
  assert.equal(teks.includes("igiligil"), false);
  assert.equal(teks.includes("host_permissions"), false);
  readFileSync(new URL("./content.js", import.meta.url), "utf8");
  readFileSync(new URL("./logika-enter.js", import.meta.url), "utf8");
});

test("Enter di komposer mencegah kirim dan menyisipkan satu baris baru", () => {
  const dokumen = { perintah: [], execCommand() { return false; } };
  const editor = komposerQuill(dokumen);
  const rentang = {
    deleted: false,
    simpul: null,
    deleteContents() { this.deleted = true; },
    insertNode(simpul) { this.simpul = simpul; },
    setStartAfter() {},
    collapse() {},
  };
  dokumen.getSelection = () => ({
    rangeCount: 1,
    getRangeAt: () => rentang,
    removeAllRanges() {},
    addRange() {},
  });
  dokumen.createTextNode = (teks) => ({ data: teks });
  const kirim = tombolKirim();
  const akar = akarPalsu();
  const lepas = pasangPencegahEnter(akar);
  const event = peristiwa(editor);

  akar.tembak("keydown", event);

  assert.equal(event.defaultDicegah, true);
  assert.equal(event.propagasiBerhenti, true);
  assert.equal(rentang.simpul.data, "\n");
  assert.equal(editor.focused, true);
  assert.equal(kirim.klik, 0);
  assert.equal(dokumen.perintah.length, 0);
  kirim.click();
  assert.equal(kirim.klik, 1);
  lepas();
});

test("execCommand insertLineBreak dipakai lebih dulu dan tombol Kirim tidak diklik", () => {
  const dokumen = {
    perintah: [],
    execCommand(nama, tampilUi, nilai) {
      this.perintah.push([nama, tampilUi, nilai]);
      return nama === "insertLineBreak";
    },
  };
  const editor = komposerQuill(dokumen);
  const kirim = tombolKirim();
  assert.equal(sisipkanBarisBaru(editor), true);
  assert.deepEqual(dokumen.perintah, [["insertLineBreak", false, null]]);
  assert.equal(editor.events.length, 0);
  assert.equal(kirim.klik, 0);
});

test("Enter dan Shift+Enter di textarea prompt menambah tepat satu baris", () => {
  const akar = akarPalsu();
  const lepas = pasangPencegahEnter(akar);
  const kirim = tombolKirim();
  const biasa = textareaPrompt("halo", 4);
  const geser = textareaPrompt("ab", 1);
  const eventBiasa = peristiwa(biasa);
  const eventGeser = peristiwa(geser, { shiftKey: true });

  akar.tembak("keydown", eventBiasa);
  akar.tembak("keyup", peristiwa(biasa, { type: "keyup" }));
  akar.tembak("keydown", eventGeser);

  assert.equal(biasa.value, "halo\n");
  assert.equal(biasa.selectionStart, 5);
  assert.equal(eventBiasa.defaultDicegah, true);
  assert.equal(geser.value, "a\nb");
  assert.equal(geser.selectionStart, 2);
  assert.equal(eventGeser.defaultDicegah, true);
  assert.equal(kirim.klik, 0);
  lepas();
  const setelahLepas = textareaPrompt("tetap", 5);
  akar.tembak("keydown", peristiwa(setelahLepas));
  assert.equal(setelahLepas.value, "tetap");
});

test("Ctrl+Enter tidak mengirim dan tidak menambah baris", () => {
  const akar = akarPalsu();
  pasangPencegahEnter(akar);
  const area = textareaPrompt("draf", 4);
  const kirim = tombolKirim();
  const event = peristiwa(area, { ctrlKey: true });
  akar.tembak("keydown", event);
  assert.equal(event.defaultDicegah, true);
  assert.equal(area.value, "draf");
  assert.equal(kirim.klik, 0);
});

test("beforeinput insertParagraph menjadi satu baris, tanpa baris ganda setelah Enter", () => {
  let panggilan = 0;
  const dokumen = {
    execCommand(nama) {
      panggilan += 1;
      if (nama === "insertLineBreak") {
        dokumen.saatPerintah();
        return true;
      }
      return false;
    },
    saatPerintah() {},
  };
  const editor = komposerQuill(dokumen);
  const akar = akarPalsu();
  pasangPencegahEnter(akar);
  dokumen.saatPerintah = () => {
    akar.tembak("beforeinput", peristiwa(editor, { type: "beforeinput", inputType: "insertParagraph" }));
  };
  const event = peristiwa(editor);
  akar.tembak("keydown", event);
  assert.equal(event.defaultDicegah, true);
  assert.equal(panggilan, 1);
  assert.equal(editor.events.length, 0);
});

test("kotak cari, tombol Kirim, dan isian lain mengabaikan pencegah", () => {
  const cari = {
    tagName: "INPUT",
    value: "luas",
    getAttribute(nama) { return nama === "type" ? "search" : null; },
    closest() { return null; },
  };
  const catatan = {
    tagName: "TEXTAREA",
    value: "catatan",
    selectionStart: 7,
    selectionEnd: 7,
    classList: kelas(""),
    getAttribute(nama) {
      if (nama === "aria-label") return "Cari percakapan";
      return null;
    },
    closest() { return null; },
  };
  const kirim = tombolKirim();
  const akar = akarPalsu();
  pasangPencegahEnter(akar);

  assert.equal(adalahKomposerPrompt(cari), false);
  assert.equal(adalahKomposerPrompt(catatan), false);
  assert.equal(adalahKomposerPrompt(kirim), false);
  assert.deepEqual(keputusanEnter(peristiwa(catatan), null), { cegah: false, sisipBaris: false });

  for (const target of [cari, catatan, kirim]) {
    const event = peristiwa(target);
    akar.tembak("keydown", event);
    assert.equal(event.defaultDicegah, false);
  }
  assert.equal(cari.value, "luas");
  assert.equal(catatan.value, "catatan");
  assert.equal(kirim.klik, 0);
});

test("IME, huruf biasa, dan anak di dalam editor Quill", () => {
  const dokumen = { execCommand() { return false; }, createTextNode: (teks) => ({ data: teks }) };
  const editor = komposerQuill(dokumen);
  const rentang = {
    simpul: null,
    deleteContents() {},
    insertNode(simpul) { this.simpul = simpul; },
    setStartAfter() {},
    collapse() {},
  };
  dokumen.getSelection = () => ({ rangeCount: 1, getRangeAt: () => rentang, removeAllRanges() {}, addRange() {} });
  const anak = {
    tagName: "SPAN",
    getAttribute() { return null; },
    classList: kelas(""),
    closest(selektor) {
      if (selektor.includes("ql-editor") || selektor.includes("contenteditable")) return editor;
      return null;
    },
  };
  const akar = akarPalsu();
  pasangPencegahEnter(akar);

  const ime = peristiwa(editor, { isComposing: true });
  const huruf = peristiwa(editor, { key: "a", keyCode: 65 });
  akar.tembak("keydown", ime);
  akar.tembak("keydown", huruf);
  assert.equal(ime.defaultDicegah, false);
  assert.equal(huruf.defaultDicegah, false);

  const masuk = peristiwa(anak, { jejak: [anak, editor] });
  akar.tembak("keydown", masuk);
  assert.equal(masuk.defaultDicegah, true);
  assert.equal(rentang.simpul.data, "\n");
});

test("rich-textarea memakai editor di shadow root", () => {
  const dokumen = { execCommand: () => false };
  const dalam = komposerQuill(dokumen);
  const rentang = {
    simpul: null,
    deleteContents() {},
    insertNode(simpul) { this.simpul = simpul; },
    setStartAfter() {},
    collapse() {},
  };
  dokumen.getSelection = () => ({ rangeCount: 1, getRangeAt: () => rentang, removeAllRanges() {}, addRange() {} });
  dokumen.createTextNode = (teks) => ({ data: teks });
  const host = {
    tagName: "RICH-TEXTAREA",
    classList: kelas(""),
    shadowRoot: { querySelector: () => dalam },
    getAttribute() { return null; },
    closest() { return null; },
  };
  assert.equal(adalahKomposerPrompt(host), true);
  const akar = akarPalsu();
  pasangPencegahEnter(akar);
  const event = peristiwa(host);
  akar.tembak("keydown", event);
  assert.equal(event.defaultDicegah, true);
  assert.equal(rentang.simpul.data, "\n");
  assert.equal(dalam.focused, true);
});

test("content.js hanya memasang pencegah pada window", () => {
  const kode = readFileSync(new URL("./content.js", import.meta.url), "utf8");
  const semula = globalThis.GeminiAntiEnter;
  const windowPalsu = { nama: "window-gemini" };
  let dipasangPada = null;
  globalThis.GeminiAntiEnter = {
    pasangPencegahEnter(akar) {
      dipasangPada = akar;
    },
  };
  try {
    const jalankan = new Function("window", "globalThis", kode);
    jalankan(windowPalsu, globalThis);
  } finally {
    globalThis.GeminiAntiEnter = semula;
  }
  assert.equal(dipasangPada, windowPalsu);
  assert.equal(kode.includes("igiligil"), false);
  assert.equal(kode.includes(".click"), false);
});
