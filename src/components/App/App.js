import React from "react";
import { Analytics } from "@vercel/analytics/react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Grid from "../Grid/Grid";

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <div className="App">
      <>
        <Component {...pageProps} />
        <Analytics />
      </>
      <Grid />
    </div>
  );
}

export default App;
