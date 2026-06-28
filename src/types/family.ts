export type FamilySide = "self" | "paternal" | "maternal" | "partner" | "extended";

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  title?: string;
  image?: string;
  side: FamilySide;
  generation: number;
  metadata?: {
    location?: string;
    profession?: string;
    education?: string;
    note?: string;
    imageSlot?: string;
  };
  spouse?: FamilyMember;
  children?: FamilyMember[];
};

export type ProfileContent = {
  person: {
    name: string;
    title: string;
    intro: string;
    location: string;
    image: string;
  };
  about: string[];
  details: Array<{ label: string; value: string }>;
  hobbies: Array<{ title: string; description: string }>;
  values: Array<{ title: string; description: string }>;
  family: FamilyMember;
  contact: {
    phone: string;
    whatsappMessage: string;
    parents: {
      fatherPhone: string;
      motherPhone: string;
    };
  };
};

export type PositionedFamilyNode = {
  member: FamilyMember;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  subtreeWidth: number;
};

export type FamilyConnection = {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  side: FamilySide;
};

export type FamilyLayout = {
  nodes: PositionedFamilyNode[];
  connections: FamilyConnection[];
  width: number;
  height: number;
};

