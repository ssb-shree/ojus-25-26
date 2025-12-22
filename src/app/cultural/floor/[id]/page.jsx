"use client";

import Floor1Page from "@/myComponents/cultural/Floor1";
import Floor2Page from "@/myComponents/cultural/Floor2";
import Floor3Page from "@/myComponents/cultural/Floor3";
import Floor4Page from "@/myComponents/cultural/Floor4";
import { useEffect, useState } from "react";

const floorsPages = {
  1: <Floor1Page />,
  2: <Floor2Page />,
  3: <Floor3Page />,
  4: <Floor4Page />,
};

const Page = ({ params }) => {
  const [selectedFloor, setSelectedFloor] = useState(1);

  useEffect(() => {
    const getFloor = async () => {
      const { id } = await params;
      setSelectedFloor(Number(id));
    };
    getFloor();
  }, [params]);

  return floorsPages[selectedFloor] ?? <Floor1Page />;
};

export default Page;
