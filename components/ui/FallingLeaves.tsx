"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#1B4332", "#2D6A4F", "#40916C", "#52B788", "#74C69D"];

interface LeafProps {
  color: string;
}

const SimpleLeaf = ({ color }: LeafProps) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 12 10 2 12C2 12 10 12 12 22C12 22 12 14 22 12C22 12 14 12 12 2Z" fill={color} fillOpacity="0.4" />
  </svg>
);

const OvalLeaf = ({ color }: LeafProps) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill={color} fillOpacity="0.3" />
    <path d="M12 3V21" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
  </svg>
);

const PointyLeaf = ({ color }: LeafProps) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C2 12 7 2 12 2C17 2 22 12 22 12C22 12 17 22 12 22C7 22 2 12 2 12Z" fill={color} fillOpacity="0.35" />
    <path d="M2 12H22" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
  </svg>
);

const LeafShapes = [SimpleLeaf, OvalLeaf, PointyLeaf];

export const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<{ 
    id: number; 
    x: number; 
    delay: number; 
    duration: number; 
    size: number; 
    rotation: number;
    shapeIndex: number;
    color: string;
    swingAmount: number;
  }[]>([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 12 + Math.random() * 15,
      size: 8 + Math.random() * 40,
      rotation: Math.random() * 360,
      shapeIndex: Math.floor(Math.random() * LeafShapes.length),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      swingAmount: 20 + Math.random() * 40
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => {
        const ShapeComponent = LeafShapes[leaf.shapeIndex] || SimpleLeaf;
        return (
          <motion.div
            key={leaf.id}
            initial={{ 
              y: "-15%", 
              x: `${leaf.x}%`, 
              rotate: leaf.rotation, 
              opacity: 0,
              scale: 0.6
            }}
            animate={{ 
              y: "115%",
              x: [
                  `${leaf.x}%`, 
                  `${leaf.x + (leaf.swingAmount / 10)}%`, 
                  `${leaf.x - (leaf.swingAmount / 10)}%`, 
                  `${leaf.x}%`
              ],
              rotate: leaf.rotation + 360 * (Math.random() > 0.5 ? 2 : -2),
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.6, 1, 1, 0.6]
            }}
            transition={{ 
              duration: leaf.duration, 
              repeat: Infinity, 
              delay: leaf.delay,
              ease: "linear"
            }}
            style={{ 
              position: "absolute", 
              width: leaf.size, 
              height: leaf.size,
              filter: `blur(${leaf.size < 20 ? '1px' : '0px'})`
            }}
          >
            <ShapeComponent color={leaf.color} />
          </motion.div>
        );
      })}
    </div>
  );
};
