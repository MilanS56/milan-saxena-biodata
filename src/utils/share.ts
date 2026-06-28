import jsPDF from "jspdf";
const meImage = "/assets/portraits/me.png";
import type { FamilyMember, ProfileContent } from "../types/family";

export const buildWhatsappUrl = (phone: string, message: string) => {
  const encodedMessage = encodeURIComponent(`${message}\n${window.location.href}`);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
};

export const copyCurrentLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
};

const page = {
  width: 210,
  height: 297,
  outerMargin: 8,
  innerMargin: 12,
  contentX: 20,
  contentWidth: 170,
};

const colors = {
  paper: [255, 249, 239] as [number, number, number],
  innerPaper: [255, 252, 246] as [number, number, number],
  line: [197, 159, 90] as [number, number, number],
  text: [59, 33, 24] as [number, number, number],
  accent: [31, 92, 74] as [number, number, number],
  soft: [246, 236, 217] as [number, number, number],
};

const displayName = (member: FamilyMember) =>
  member.spouse ? `${member.name} & ${member.spouse.name}` : member.name;

const findMember = (member: FamilyMember, id: string): FamilyMember | undefined => {
  if (member.id === id) return member;
  for (const child of member.children ?? []) {
    const found = findMember(child, id);
    if (found) return found;
  }
  return undefined;
};

const getDetail = (profile: ProfileContent, label: string) =>
  profile.details.find((detail) => detail.label === label)?.value ?? "";

const imageToDataUrl = async (src: string) => {
  const response = await fetch(src);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const drawPageBase = (pdf: jsPDF) => {
  pdf.setFillColor(...colors.paper);
  pdf.rect(0, 0, page.width, page.height, "F");

  pdf.setFillColor(...colors.innerPaper);
  pdf.rect(
    page.outerMargin,
    page.outerMargin,
    page.width - page.outerMargin * 2,
    page.height - page.outerMargin * 2,
    "F",
  );

  pdf.setDrawColor(...colors.line);
  pdf.setLineWidth(0.45);
  pdf.rect(
    page.outerMargin,
    page.outerMargin,
    page.width - page.outerMargin * 2,
    page.height - page.outerMargin * 2,
  );

  pdf.setLineWidth(0.18);
  pdf.rect(
    page.innerMargin,
    page.innerMargin,
    page.width - page.innerMargin * 2,
    page.height - page.innerMargin * 2,
  );
};

const drawHeader = (pdf: jsPDF, eyebrow: string, title: string) => {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8.2);
  pdf.setTextColor(...colors.accent);
  pdf.text(eyebrow.toUpperCase(), page.contentX, 24);

  pdf.setFont("times", "bold");
  pdf.setFontSize(28);
  pdf.setTextColor(...colors.text);
  pdf.text(title, page.contentX, 36);

  pdf.setDrawColor(...colors.line);
  pdf.setLineWidth(0.28);
  pdf.line(page.contentX, 42, page.width - page.contentX, 42);
};

const addWrapped = (pdf: jsPDF, text: string, x: number, y: number, width: number, lineHeight = 5.2) => {
  const lines = pdf.splitTextToSize(text, width);
  pdf.text(lines, x, y);
  return y + lines.length * lineHeight;
};

const drawPanel = (pdf: jsPDF, x: number, y: number, width: number, height: number) => {
  pdf.setDrawColor(...colors.line);
  pdf.setFillColor(255, 251, 243);
  pdf.roundedRect(x, y, width, height, 2.5, 2.5, "FD");
};

const addSectionHeading = (pdf: jsPDF, title: string, x: number, y: number, width = 46) => {
  pdf.setFont("times", "bold");
  pdf.setFontSize(14);
  pdf.setTextColor(...colors.text);
  pdf.text(title, x, y);
  pdf.setDrawColor(...colors.line);
  pdf.setLineWidth(0.22);
  pdf.line(x, y + 2.8, x + width, y + 2.8);
};

const addDetailRow = (pdf: jsPDF, label: string, value: string, x: number, y: number, width: number) => {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.4);
  pdf.setTextColor(...colors.accent);
  pdf.text(label.toUpperCase(), x, y);
  pdf.setFont("times", "normal");
  pdf.setFontSize(10.5);
  pdf.setTextColor(...colors.text);
  const endY = addWrapped(pdf, value, x, y + 5, width, 4.8);
  return endY + 3;
};

const addDetailGrid = (pdf: jsPDF, entries: Array<[string, string]>, startY: number) => {
  let y = startY;
  for (let index = 0; index < entries.length; index += 2) {
    const left = entries[index];
    const right = entries[index + 1];
    const leftEnd = addDetailRow(pdf, left[0], left[1], 22, y, 72);
    const rightEnd = right ? addDetailRow(pdf, right[0], right[1], 108, y, 72) : y;
    y = Math.max(leftEnd, rightEnd) + 1;
  }
  return y;
};

const addInfoCard = (pdf: jsPDF, title: string, body: string, x: number, y: number, width: number, height: number) => {
  drawPanel(pdf, x, y, width, height);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.4);
  pdf.setTextColor(...colors.accent);
  pdf.text(title.toUpperCase(), x + 4, y + 7);
  pdf.setFont("times", "normal");
  pdf.setFontSize(10.2);
  pdf.setTextColor(...colors.text);
  addWrapped(pdf, body, x + 4, y + 15, width - 8, 4.8);
};

const addValueCard = (pdf: jsPDF, title: string, body: string, x: number, y: number, width: number, height: number) => {
  drawPanel(pdf, x, y, width, height);
  pdf.setFont("times", "bold");
  pdf.setFontSize(11.4);
  pdf.setTextColor(...colors.text);
  pdf.text(title, x + 4, y + 8);
  pdf.setFont("times", "normal");
  pdf.setFontSize(9.6);
  pdf.setTextColor(...colors.text);
  addWrapped(pdf, body, x + 4, y + 15, width - 8, 4.6);
};

const addHobbyCard = (pdf: jsPDF, title: string, body: string, x: number, y: number, width: number, height: number) => {
  drawPanel(pdf, x, y, width, height);
  pdf.setFont("times", "bold");
  pdf.setFontSize(10.8);
  pdf.setTextColor(...colors.text);
  pdf.text(title, x + 4, y + 8);
  pdf.setFont("times", "normal");
  pdf.setFontSize(9.2);
  pdf.setTextColor(...colors.text);
  addWrapped(pdf, body, x + 4, y + 14, width - 8, 4.4);
};

const renderProfilePage = (pdf: jsPDF, profile: ProfileContent, portraitDataUrl: string) => {
  drawPageBase(pdf);
  drawHeader(pdf, "Personal Profile", profile.person.name);

  const portraitX = 132;
  const portraitY = 52;
  const portraitW = 50;
  const portraitH = 68;

  drawPanel(pdf, portraitX, portraitY, portraitW, portraitH);
  pdf.addImage(portraitDataUrl, "PNG", portraitX + 3, portraitY + 3, portraitW - 6, portraitH - 6, undefined, "FAST");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9.2);
  pdf.setTextColor(...colors.accent);
  pdf.text(profile.person.title.toUpperCase(), page.contentX, 53);

  pdf.setFont("times", "normal");
  pdf.setFontSize(10.8);
  pdf.setTextColor(...colors.text);
  addWrapped(pdf, profile.person.intro, page.contentX, 66, 92, 5.4);

  addSectionHeading(pdf, "Essential Details", page.contentX, 132, 54);
  const detailEntries = ([
    ["Date of Birth", getDetail(profile, "Date of Birth")],
    ["Age", getDetail(profile, "Age")],
    ["Height", getDetail(profile, "Height")],
    ["Education", getDetail(profile, "Education")],
    ["Profession", getDetail(profile, "Profession")],
    ["Current City", getDetail(profile, "Current City")],
    ["Native Place", getDetail(profile, "Native Place")],
    ["Community", `${getDetail(profile, "Community")} | Gotra: ${getDetail(profile, "Gotra")}`],
    ["Diet", getDetail(profile, "Diet")],
  ] as Array<[string, string]>).filter((entry): entry is [string, string] => Boolean(entry[1]));

  const detailsEndY = addDetailGrid(pdf, detailEntries, 143);

  addSectionHeading(pdf, "About", page.contentX, detailsEndY + 8, 22);
  pdf.setFont("times", "normal");
  pdf.setFontSize(10.3);
  pdf.setTextColor(...colors.text);
  let aboutY = detailsEndY + 18;
  profile.about.forEach((paragraph) => {
    aboutY = addWrapped(pdf, paragraph, page.contentX, aboutY, 170, 5.2) + 4;
  });
};

const renderFamilyPage = (pdf: jsPDF, profile: ProfileContent) => {
  drawPageBase(pdf);
  drawHeader(pdf, "Family", "Family Details");

  const parents = findMember(profile.family, "parents-family");
  const paternalGrandparents = findMember(profile.family, "paternal-grandparents");
  const maternalGrandparents = findMember(profile.family, "maternal-grandparents");
  const brother = findMember(profile.family, "ritik-saxena");

  let y = 56;
  if (parents) {
    addInfoCard(pdf, "Father & Mother", displayName(parents), 20, y, 170, 28);
    y += 36;
  }
  if (paternalGrandparents) {
    addInfoCard(pdf, "Paternal Grandparents", displayName(paternalGrandparents), 20, y, 81, 42);
  }
  if (maternalGrandparents) {
    addInfoCard(pdf, "Maternal Grandparents", displayName(maternalGrandparents), 109, y, 81, 42);
  }
  y += 52;
  if (brother) {
    addInfoCard(pdf, "Sibling", `${displayName(brother)}\n${brother.relation}`, 20, y, 170, 28);
    y += 40;
  }

  addSectionHeading(pdf, "Family Note", 20, y + 2, 30);
  pdf.setFont("times", "normal");
  pdf.setFontSize(10.4);
  pdf.setTextColor(...colors.text);
  addWrapped(
    pdf,
    "A close-knit family rooted in warmth, respect, and togetherness, with deep regard for relationships, values, and shared growth.",
    20,
    y + 14,
    170,
    5.3,
  );

  addSectionHeading(pdf, "Parents Contact", 20, y + 40, 34);
  const parentContactEntries: Array<[string, string]> = [
    ["Father's Phone", `+91 ${profile.contact.parents.fatherPhone.slice(2)}`],
    ["Mother's Phone", `+91 ${profile.contact.parents.motherPhone.slice(2)}`],
  ];
  addDetailGrid(pdf, parentContactEntries, y + 50);
};

const renderValuesPage = (pdf: jsPDF, profile: ProfileContent) => {
  drawPageBase(pdf);
  drawHeader(pdf, "Values & Interests", "Personal Values and Hobbies");

  addSectionHeading(pdf, "Values", 20, 56, 24);
  let valueY = 66;
  profile.values.forEach((value) => {
    addValueCard(pdf, value.title, value.description, 20, valueY, 170, 30);
    valueY += 38;
  });

  addSectionHeading(pdf, "Hobbies", 20, 188, 28);
  const hobbyY = 198;
  profile.hobbies.forEach((hobby, index) => {
    addHobbyCard(pdf, hobby.title, hobby.description, 20 + index * 57.5, hobbyY, 55, 42);
  });

  pdf.setFont("times", "italic");
  pdf.setFontSize(10.8);
  pdf.setTextColor(...colors.line);
  pdf.text("Presented with warmth, clarity, and respect.", 20, 272);
};

export const downloadStructuredProfilePdf = async (profile: ProfileContent, filename: string) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const portraitDataUrl = await imageToDataUrl(meImage);

  renderProfilePage(pdf, profile, portraitDataUrl);
  pdf.addPage();
  renderFamilyPage(pdf, profile);
  pdf.addPage();
  renderValuesPage(pdf, profile);

  pdf.save(filename);
};

