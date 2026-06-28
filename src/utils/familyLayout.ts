import type {
  FamilyConnection,
  FamilyLayout,
  FamilyMember,
  PositionedFamilyNode,
} from "../types/family";

const NODE_WIDTH = 232;
const NODE_HEIGHT = 318;
const LEVEL_GAP = 132;
const SIBLING_GAP = 78;
const PADDING = 120;

const sideOrder: Record<FamilyMember["side"], number> = {
  paternal: 0,
  extended: 1,
  self: 2,
  partner: 3,
  maternal: 4,
};

type Measurement = {
  member: FamilyMember;
  width: number;
  children: Measurement[];
};

const orderedChildren = (member: FamilyMember, collapsed: Set<string>) => {
  if (collapsed.has(member.id)) return [];
  return [...(member.children ?? [])].sort((a, b) => {
    const generationDelta = a.generation - b.generation;
    if (generationDelta !== 0) return generationDelta;
    return sideOrder[a.side] - sideOrder[b.side];
  });
};

const measure = (member: FamilyMember, collapsed: Set<string>): Measurement => {
  const children = orderedChildren(member, collapsed).map((child) => measure(child, collapsed));
  if (!children.length) {
    return { member, width: NODE_WIDTH, children };
  }

  const childrenWidth =
    children.reduce((sum, child) => sum + child.width, 0) + SIBLING_GAP * (children.length - 1);

  return {
    member,
    width: Math.max(NODE_WIDTH, childrenWidth),
    children,
  };
};

const place = (
  item: Measurement,
  x: number,
  depth: number,
  nodes: PositionedFamilyNode[],
  connections: FamilyConnection[],
) => {
  const nodeX = x + item.width / 2 - NODE_WIDTH / 2;
  const nodeY = PADDING + depth * (NODE_HEIGHT + LEVEL_GAP);
  const node: PositionedFamilyNode = {
    member: item.member,
    x: nodeX,
    y: nodeY,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    depth,
    subtreeWidth: item.width,
  };

  nodes.push(node);

  let childX = x;
  item.children.forEach((child) => {
    const childNode = place(child, childX, depth + 1, nodes, connections);
    connections.push({
      id: `${item.member.id}-${child.member.id}`,
      from: { x: nodeX + NODE_WIDTH / 2, y: nodeY + NODE_HEIGHT - 34 },
      to: { x: childNode.x + NODE_WIDTH / 2, y: childNode.y + 28 },
      side: child.member.side,
    });
    childX += child.width + SIBLING_GAP;
  });

  return node;
};

const addMaternalParentBridge = (nodes: PositionedFamilyNode[], connections: FamilyConnection[]) => {
  const maternalGrandparents = nodes.find((node) => node.member.id === "maternal-grandparents");
  const parents = nodes.find((node) => node.member.id === "parents-family");

  if (!maternalGrandparents || !parents) return;

  connections.push({
    id: "maternal-grandparents-parents-family-bridge",
    from: {
      x: maternalGrandparents.x + 28,
      y: maternalGrandparents.y + NODE_HEIGHT - 42,
    },
    to: {
      x: parents.x + NODE_WIDTH - 22,
      y: parents.y + 42,
    },
    side: "maternal",
  });
};

export const createFamilyForestLayout = (
  roots: FamilyMember[],
  collapsedIds: string[] = [],
): FamilyLayout => {
  const collapsed = new Set(collapsedIds);
  const trees = roots.map((root) => measure(root, collapsed));
  const nodes: PositionedFamilyNode[] = [];
  const connections: FamilyConnection[] = [];

  let currentX = PADDING;
  trees.forEach((tree) => {
    place(tree, currentX, 0, nodes, connections);
    currentX += tree.width + SIBLING_GAP * 1.6;
  });

  addMaternalParentBridge(nodes, connections);

  const totalTreeWidth = trees.reduce((sum, tree) => sum + tree.width, 0) + Math.max(0, trees.length - 1) * SIBLING_GAP * 1.6;
  const maxY = nodes.reduce((max, node) => Math.max(max, node.y + node.height), 0);

  return {
    nodes,
    connections,
    width: Math.max(NODE_WIDTH + PADDING * 2, totalTreeWidth + PADDING * 2),
    height: maxY + PADDING,
  };
};

export const createFamilyLayout = (
  root: FamilyMember,
  collapsedIds: string[] = [],
): FamilyLayout => createFamilyForestLayout([root], collapsedIds);
