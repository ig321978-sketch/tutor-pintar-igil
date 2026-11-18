declare module "qrcode" {
  interface OpsiGambar {
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
    margin?: number;
    width?: number;
    color?: { dark?: string; light?: string };
  }
  interface ApiQr {
    toDataURL(teks: string, opsi?: OpsiGambar): Promise<string>;
  }
  const QRCode: ApiQr;
  export default QRCode;
}
