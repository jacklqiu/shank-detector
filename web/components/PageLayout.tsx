import React from "react";
import Head from "next/head";

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>SHANK PROOF PRO</title>
      <meta name="description" content="The shank proof experience." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{ minHeight: "calc(100vh - 90px)"}}>
      {children}
    </div>
  </>
);

export default PageLayout;
