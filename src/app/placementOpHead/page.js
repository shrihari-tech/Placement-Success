"use client";

import React from "react";

export default function PlacementOpHeadPage() {
  return (
    <div>
      <h1>Placement Operation Head</h1>
      <p>This is the placement operation head page.</p>
    </div>
  );
}


// placementOpHead/page.js
"use client";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/placementOpHead/ophome');
}