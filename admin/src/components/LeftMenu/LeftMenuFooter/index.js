import React from "react";
import Wrapper, { A } from "./Wrapper";

function LeftMenuFooter() {
  return (
    <Wrapper>
      <div className="poweredBy">
        <A
          href="https://berinc.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mantido por Berinc
        </A>
      </div>
    </Wrapper>
  );
}

export default LeftMenuFooter;
