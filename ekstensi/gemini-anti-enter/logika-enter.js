(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module && module.exports) {
    module.exports = api;
  }
  root.GeminiAntiEnter = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var POLA_LABEL = /prompt|perintah|gemini|tanyakan|\bpesan\b|\bmessage\b/i;

  function sebagaiElemen(node) {
    if (!node || typeof node !== "object") return null;
    if (node.nodeType === 3) return node.parentElement || null;
    if (node.tagName) return node;
    return null;
  }

  function tag(el) {
    return String(el && el.tagName ? el.tagName : "").toUpperCase();
  }

  function labelKomposer(el) {
    return [
      el.getAttribute && el.getAttribute("aria-label"),
      el.getAttribute && el.getAttribute("aria-placeholder"),
      el.getAttribute && el.getAttribute("data-placeholder"),
      el.getAttribute && el.getAttribute("placeholder"),
    ]
      .filter(Boolean)
      .join(" ");
  }

  function cocokKomposer(el) {
    if (!el || !el.tagName) return false;
    var nama = tag(el);
    if (nama === "INPUT" || nama === "BUTTON" || nama === "SELECT" || nama === "A") {
      return false;
    }
    var peran = String((el.getAttribute && el.getAttribute("role")) || "").toLowerCase();
    if (peran === "search" || peran === "searchbox") return false;
    if (nama === "RICH-TEXTAREA") return true;
    if (typeof el.closest === "function") {
      var indukRich = el.closest("rich-textarea");
      if (indukRich && indukRich !== el) return true;
    }
    if (el.classList && typeof el.classList.contains === "function" && el.classList.contains("ql-editor")) {
      return true;
    }
    var bisaTeks =
      nama === "TEXTAREA" ||
      (el.getAttribute && el.getAttribute("contenteditable") === "true") ||
      el.isContentEditable === true;
    return bisaTeks && POLA_LABEL.test(labelKomposer(el));
  }

  function adalahKomposerPrompt(node) {
    var el = sebagaiElemen(node);
    if (!el) return false;
    if (cocokKomposer(el)) return true;
    if (typeof el.closest !== "function") return false;
    var induk = el.closest('[contenteditable="true"], textarea, rich-textarea, .ql-editor');
    return Boolean(induk && induk !== el && cocokKomposer(induk));
  }

  function cariEditor(node) {
    var el = sebagaiElemen(node);
    if (!el) return null;
    var nama = tag(el);
    if (nama === "TEXTAREA") return el;
    if (
      el.isContentEditable === true ||
      (el.getAttribute && el.getAttribute("contenteditable") === "true") ||
      (el.classList && el.classList.contains && el.classList.contains("ql-editor"))
    ) {
      return el;
    }
    var bayangan = el.shadowRoot;
    if (bayangan && typeof bayangan.querySelector === "function") {
      var dalam = bayangan.querySelector('[contenteditable="true"], textarea, .ql-editor');
      if (dalam) return dalam;
    }
    if (typeof el.querySelector === "function") {
      var turunan = el.querySelector('[contenteditable="true"], textarea, .ql-editor');
      if (turunan) return turunan;
    }
    return null;
  }

  function editorTerdekat(node) {
    if (!adalahKomposerPrompt(node)) return null;
    var langsung = cariEditor(node);
    if (langsung) return langsung;
    var el = sebagaiElemen(node);
    if (!el || typeof el.closest !== "function") return null;
    var induk = el.closest('[contenteditable="true"], textarea, rich-textarea, .ql-editor');
    return induk ? cariEditor(induk) : null;
  }

  function editorDariPeristiwa(event) {
    if (!event) return null;
    var jejak = typeof event.composedPath === "function" ? event.composedPath() : null;
    var urutan = jejak && jejak.length ? jejak : [event.target];
    var i;
    for (i = 0; i < urutan.length; i += 1) {
      var editor = editorTerdekat(urutan[i]);
      if (editor) return editor;
    }
    return null;
  }

  function sedangMenyusunIme(event) {
    return Boolean(event.isComposing || event.keyCode === 229 || event.which === 229);
  }

  function keputusanEnter(event, editor) {
    if (!event || !editor || sedangMenyusunIme(event) || event.key !== "Enter") {
      return { cegah: false, sisipBaris: false };
    }
    var denganPengubah = Boolean(event.ctrlKey || event.metaKey || event.altKey);
    return { cegah: true, sisipBaris: !denganPengubah };
  }

  function sisipDiTextarea(area) {
    var nilai = String(area.value || "");
    var awal = Number.isInteger(area.selectionStart) ? area.selectionStart : nilai.length;
    var akhir = Number.isInteger(area.selectionEnd) ? area.selectionEnd : awal;
    area.value = nilai.slice(0, awal) + "\n" + nilai.slice(akhir);
    area.selectionStart = awal + 1;
    area.selectionEnd = awal + 1;
    if (typeof area.dispatchEvent === "function") {
      area.dispatchEvent({ type: "input", bubbles: true, inputType: "insertLineBreak" });
    }
    return true;
  }

  function cobaPerintahSisip(dokumen) {
    if (!dokumen || typeof dokumen.execCommand !== "function") return false;
    try {
      if (dokumen.execCommand("insertLineBreak", false, null) === true) return true;
    } catch (error) {
      /* Lanjut ke cara berikutnya. */
    }
    try {
      if (dokumen.execCommand("insertText", false, "\n") === true) return true;
    } catch (error) {
      /* Lanjut ke sisipan manual. */
    }
    return false;
  }

  function sisipManual(editor, dokumen) {
    var seleksi = dokumen && typeof dokumen.getSelection === "function" ? dokumen.getSelection() : null;
    if (seleksi && seleksi.rangeCount > 0 && typeof seleksi.getRangeAt === "function") {
      var rentang = seleksi.getRangeAt(0);
      if (rentang && typeof rentang.deleteContents === "function") rentang.deleteContents();
      var simpul = dokumen.createTextNode ? dokumen.createTextNode("\n") : { data: "\n" };
      if (rentang && typeof rentang.insertNode === "function") rentang.insertNode(simpul);
      if (rentang && typeof rentang.setStartAfter === "function") rentang.setStartAfter(simpul);
      if (rentang && typeof rentang.collapse === "function") rentang.collapse(true);
      if (typeof seleksi.removeAllRanges === "function") seleksi.removeAllRanges();
      if (typeof seleksi.addRange === "function") seleksi.addRange(rentang);
      return true;
    }
    return false;
  }

  function beriTahuInput(editor) {
    if (!editor || typeof editor.dispatchEvent !== "function") return;
    var peristiwa;
    if (typeof InputEvent === "function") {
      peristiwa = new InputEvent("input", { bubbles: true, inputType: "insertLineBreak" });
    } else {
      peristiwa = { type: "input", bubbles: true, inputType: "insertLineBreak" };
    }
    editor.dispatchEvent(peristiwa);
  }

  function sisipkanBarisBaru(editor) {
    if (!editor) return false;
    if (tag(editor) === "TEXTAREA") return sisipDiTextarea(editor);
    if (typeof editor.focus === "function") {
      try {
        editor.focus();
      } catch (error) {
        /* Fokus gagal bukan alasan untuk mengirim pesan. */
      }
    }
    var dokumen = editor.ownerDocument || (typeof document !== "undefined" ? document : null);
    if (cobaPerintahSisip(dokumen)) return true;
    if (sisipManual(editor, dokumen)) {
      beriTahuInput(editor);
      return true;
    }
    return false;
  }

  function cegah(event) {
    if (typeof event.preventDefault === "function") event.preventDefault();
    if (typeof event.stopPropagation === "function") event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
  }

  function pasangPencegahEnter(akar) {
    var tujuan = akar;
    var abaikanParagraf = false;
    var pengaturWaktu = null;

    function tahanParagrafSingkat() {
      abaikanParagraf = true;
      if (pengaturWaktu) clearTimeout(pengaturWaktu);
      pengaturWaktu = setTimeout(function () {
        abaikanParagraf = false;
        pengaturWaktu = null;
      }, 0);
      if (pengaturWaktu && typeof pengaturWaktu.unref === "function") pengaturWaktu.unref();
    }

    function padaKeydown(event) {
      var editor = editorDariPeristiwa(event);
      var keputusan = keputusanEnter(event, editor);
      if (!keputusan.cegah) return;
      cegah(event);
      tahanParagrafSingkat();
      if (keputusan.sisipBaris) sisipkanBarisBaru(editor);
    }

    function padaKeynaik(event) {
      if (!event || event.key !== "Enter" || sedangMenyusunIme(event)) return;
      if (!editorDariPeristiwa(event)) return;
      cegah(event);
    }

    function padaBeforeInput(event) {
      if (!event || event.inputType !== "insertParagraph") return;
      var editor = editorDariPeristiwa(event);
      if (!editor) return;
      cegah(event);
      if (abaikanParagraf) return;
      tahanParagrafSingkat();
      sisipkanBarisBaru(editor);
    }

    tujuan.addEventListener("keydown", padaKeydown, true);
    tujuan.addEventListener("keyup", padaKeynaik, true);
    tujuan.addEventListener("keypress", padaKeynaik, true);
    tujuan.addEventListener("beforeinput", padaBeforeInput, true);

    return function lepas() {
      tujuan.removeEventListener("keydown", padaKeydown, true);
      tujuan.removeEventListener("keyup", padaKeynaik, true);
      tujuan.removeEventListener("keypress", padaKeynaik, true);
      tujuan.removeEventListener("beforeinput", padaBeforeInput, true);
      if (pengaturWaktu) clearTimeout(pengaturWaktu);
    };
  }

  return {
    adalahKomposerPrompt: adalahKomposerPrompt,
    editorDariPeristiwa: editorDariPeristiwa,
    keputusanEnter: keputusanEnter,
    sisipkanBarisBaru: sisipkanBarisBaru,
    pasangPencegahEnter: pasangPencegahEnter,
  };
});
