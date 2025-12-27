"use client";

import { useRef, useEffect, useState, useId, memo } from "react";
import { useEventStore } from "@/services/store";

const CurvedLoop = ({ data = [], speed = 2, curveAmount = 400, direction = "left", interactive = true }) => {
  const pathRef = useRef(null);
  const itemRefs = useRef([]);
  const offsetRef = useRef(0);
  const spacingRef = useRef(0);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const velRef = useRef(0);
  const dirRef = useRef(direction);

  const [pathLength, setPathLength] = useState(0);

  const uid = useId();
  const pathId = `curve-${uid}`;

  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  /* measure path once */
  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    setPathLength(len);
    spacingRef.current = len / data.length;
  }, [data.length]);

  /* animation loop */
  useEffect(() => {
    if (!pathLength) return;

    let raf;

    const animate = () => {
      if (!dragRef.current) {
        offsetRef.current += dirRef.current === "right" ? speed : -speed;
      }

      if (offsetRef.current < 0) offsetRef.current += pathLength;
      if (offsetRef.current > pathLength) offsetRef.current -= pathLength;

      const spacing = spacingRef.current;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const pos = (offsetRef.current + i * spacing) % pathLength;
        const { x, y } = pathRef.current.getPointAtLength(pos);

        el.setAttribute("transform", `translate(${x - 150}, ${y - 150})`);
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pathLength, speed]);

  /* pointer handlers */
  const onPointerDown = (e) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!interactive || !dragRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    offsetRef.current += dx;
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const { updateEventData, setDefaultEventData } = useEventStore();

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full overflow-hidden"
      style={{ cursor: interactive ? "grab" : "default" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg viewBox="0 0 1440 120" className="w-full h-[220px] overflow-visible" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" />
        </defs>

        {data.map((item, i) => (
          <g key={i} ref={(el) => (itemRefs.current[i] = el)}>
            <foreignObject width="300" height="300">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                onMouseEnter={() => updateEventData(item)}
                onMouseLeave={setDefaultEventData}
              >
                <Card {...item} />
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default CurvedLoop;

/* memoized card */
const Card = memo(function Card({ img = "https://placehold.co/200x200", name, descp }) {
  return (
    <div className="flex items-end justify-center p-4 mt-8">
      <div
        className="relative size-56 rounded-md overflow-hidden shadow-xl p-4 flex flex-col"
        style={{
          backgroundImage: `url('${img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 my-auto mx-auto text-white">
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
      </div>
    </div>
  );
});
