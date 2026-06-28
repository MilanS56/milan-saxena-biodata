import { motion } from "framer-motion";
import type { FamilyConnection } from "../types/family";

type ConnectionLinesProps = {
  connections: FamilyConnection[];
  revealed: boolean;
  width: number;
  height: number;
};

const strokeBySide: Record<FamilyConnection["side"], string> = {
  self: "#c59f5a",
  paternal: "#7f2635",
  maternal: "#1f5c4a",
  partner: "#c59f5a",
  extended: "#8e6a36",
};

export function ConnectionLines({ connections, revealed, width, height }: ConnectionLinesProps) {
  return (
    <svg className="absolute inset-0 z-[2] pointer-events-none" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {revealed
        ? connections.map((connection, index) => {
            const midY = connection.from.y + (connection.to.y - connection.from.y) * 0.55;
            const path = `M ${connection.from.x} ${connection.from.y} C ${connection.from.x} ${midY}, ${connection.to.x} ${midY}, ${connection.to.x} ${connection.to.y}`;
            return (
              <motion.g key={connection.id}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#fff7e8"
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 0.9, delay: 0.12 + index * 0.04, ease: "easeOut" }}
                />
                <motion.path
                  d={path}
                  fill="none"
                  stroke={strokeBySide[connection.side]}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#lineGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 0.9, delay: 0.18 + index * 0.04, ease: "easeOut" }}
                />
                <motion.circle
                  cx={connection.to.x}
                  cy={connection.to.y}
                  r="4"
                  fill={strokeBySide[connection.side]}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 0.28, delay: 0.8 + index * 0.04 }}
                />
              </motion.g>
            );
          })
        : null}
    </svg>
  );
}
