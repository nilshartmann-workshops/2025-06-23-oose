import React, { memo, useState } from "react";

type Block = {
  id: number;
  ts: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number; // 0 oder 180
};

const NUM_BLOCKS = 200;
const BLOCK_SIZE = 32;
const COLORS = ["#84DCC6", "#D0A98F", "#266DD3", "#81F499", "#C47AC0"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getRandomBlocks(count: number): Block[] {
  const w = window.innerWidth,
    h = window.innerHeight;
  const blocks: Block[] = [];
  for (let i = 0; i < count; i++) {
    blocks.push({
      id: i,
      ts: Date.now() + i,
      x: Math.random() * (w - BLOCK_SIZE),
      y: Math.random() * (h - BLOCK_SIZE),
      size: BLOCK_SIZE,
      color: getRandomColor(),
      rotation: 0,
    });
  }
  return blocks;
}

function isColliding(a: Block, b: Block) {
  return !(
    a.x + a.size < b.x ||
    a.x > b.x + b.size ||
    a.y + a.size < b.y ||
    a.y > b.y + b.size
  );
}

interface BlockProps {
  block: Block;
  isDragging: boolean;
  isColliding: boolean;
  onDragStart?: (id: number, offsetX: number, offsetY: number) => void;
  onMouseMove?: (e: any) => void;
}

// mit memo geht's, d.h. onDragStart wird vom
//  compiler korrekt "stabilisiert"
//  (der übergebene Block ändert sich eh nur, wenn
//  der Block verschoben werden, und dann MUSS
//  hier ja neu gerendert werden)

const DraggableBlock = memo(function DraggableBlock({
  block,
  isDragging,
  isColliding,
  onDragStart,
  onMouseMove,
}: BlockProps) {
  console.log("Draggable Block", block.id, onMouseMove?.name);

  return (
    <div
      onMouseDown={function (e) {
        e.stopPropagation();
        if (onDragStart) {
          onDragStart(block.id, e.clientX - block.x, e.clientY - block.y);
        }
      }}
      style={{
        position: "absolute",
        left: block.x,
        top: block.y,
        width: block.size,
        height: block.size,
        background: isColliding
          ? "#e53935"
          : isDragging
            ? "#64b5f6"
            : block.color,
        border: isDragging ? "2px solid #fff" : "2px solid #3337",
        borderRadius: 10,
        boxShadow: isDragging
          ? "0 0 16px #0008"
          : isColliding
            ? "0 0 8px #c62828"
            : "0 1px 4px #2226",
        transition: "box-shadow 0.1s, background 0.14s, transform 0.32s",
        cursor: "grab",
        zIndex: isDragging ? 10 : 1,
        userSelect: "none",
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        color: "#fff",
        fontSize: 18,
        transform: `rotateY(${block.rotation}deg)`,
      }}
    >
      {block.id}
    </div>
  );
});

function BlockPlayground() {
  const [counter, setCounter] = useState(1);
  // Der einfachheithalber den State nur beim ersten Rendern
  //  merken
  const [dimensions] = useState<{ w: number; h: number }>({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  const [blocks, setBlocks] = useState<Block[]>(() => {
    console.log("Create ", NUM_BLOCKS, "Blocks");
    return getRandomBlocks(NUM_BLOCKS);
  });

  const [dragging, setDragging] = useState<{
    id: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // const handleMouseMove = useCallback(
  const handleMouseMove = (e: any) => {
    // console.log("handleMouseMove", dimensions.w, dimensions.h, dragging);
    if (!dragging) {
      return;
    }

    setBlocks((blocks) => {
      const newBlocks = blocks.map(function (block, ix) {
        if (block.id === dragging.id) {
          return {
            ...block,
            ts: Date.now(),
            x: Math.max(
              0,
              Math.min(dimensions.w - block.size, e.clientX - dragging.offsetX),
            ),
            y: Math.max(
              0,
              Math.min(dimensions.h - block.size, e.clientY - dragging.offsetY),
            ),
          };
        } else {
          return block;
        }
      });
      return newBlocks;
    });
  };
  //   ,
  //   [dimensions.h, dimensions.w, dragging],
  // );

  function handleDragStart(id: number, offsetX: number, offsetY: number) {
    console.log("Handle Drag Start", id, offsetX, offsetY);
    setDragging({ id, offsetX, offsetY });
  }

  function handleDragStop() {
    setDragging(null);
  }

  let collisions: { [id: number]: boolean } = {};
  blocks.forEach(function (a) {
    collisions[a.id] = false;
    blocks.forEach(function (b) {
      if (a.id !== b.id && isColliding(a, b)) {
        collisions[a.id] = true;
      }
    });
  });

  return (
    <div
      onMouseMove={dragging ? handleMouseMove : undefined}
      onMouseUp={handleDragStop}
      style={{
        width: dimensions.w,
        height: dimensions.h,
        position: "fixed",
        inset: 0,
        background: "linear-gradient(110deg, #24243e 0%, #302b63 100%)",
        overflow: "hidden",
        touchAction: "none",
        zIndex: 0,
      }}
      tabIndex={-1}
    >
      {blocks.map(function (block) {
        return (
          <DraggableBlock
            key={block.id}
            block={block}
            isDragging={dragging?.id === block.id}
            isColliding={collisions[block.id] || false}
            onDragStart={handleDragStart}
            // nur zum Testen
            // sobald man onMouseMove (ohne useCallback) übergibt, gehts auch mit memo
            // nicht mehr, JEDER DraggableBlock wird IMMER neu gerendert
            onMouseMove={handleMouseMove}
          />
        );
      })}
      <div
        style={{
          position: "fixed",
          top: 14,
          right: 18,
          color: "#fff9",
          fontSize: 16,
          fontFamily: "sans-serif",
          textAlign: "right",
          textShadow: "0 2px 4px #0009",
          userSelect: "none",
          // pointerEvents: "none",
        }}
      >
        <button
          style={{ zIndex: -109 }}
          type="button"
          onClick={() => {
            // Hier drauf klicken
            //   OHNE Compiler: BlockPlayground UND Children werden gerendet ✅
            //   Mit Compiler: BlockPlayground OHNE Children werden gerendet ✅
            setCounter((c) => c + 1);
          }}
        >
          INCREASE{counter}
        </button>
        <b> {NUM_BLOCKS} Blöcke</b>
        <br />
        <span style={{ fontSize: 14, fontWeight: 400 }}>
          Blöcke drehen/färben sich zufällig. <br />
          Zieh &amp; schieb mit der Maus! <br />
          Bei Kontakt werden Blöcke{" "}
          <span style={{ color: "#ff5252" }}>rot</span>.
        </span>
      </div>
    </div>
  );
}

export default BlockPlayground;

/*

Draggable Block 0 false false undefined undefined undefined
Object { id: 0, x: 197.67493980002385, y: 198.33267998554078, size: 32, color: "#84DCC6", rotation: 0 }

Draggable Block 0 false false undefined undefined undefined
Object { id: 0, x: 197.67493980002385, y: 198.33267998554078, size: 32, color: "#84DCC6", rotation: 0 }
DndApp.tsx:61:2

 */
