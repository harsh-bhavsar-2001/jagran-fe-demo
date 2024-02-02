'use client';

import React from "react";

const SolrSlugLayout = ({ children }) => {

  return (
    <>
      <link id="font-popins" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap" />
      <link id="font-inconsolata" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&amp;display=swap" />
      <link id="font-mirza" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600;700&amp;display=swap" />
      <link id="font-merriweather" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&amp;display=swap" />
      {children}
      {/* <script src="https://www.gstatic.com/charts/loader.js"></script> */}
    </>
  )
}

export default SolrSlugLayout;
