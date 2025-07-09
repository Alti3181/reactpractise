import { createContext, useState } from "react";

export const santoshcontext = createContext();

export const santoshcontextprovider = ({ children }) => {
  const [parameter, relatedfunction] = useState(0);

  function myfucntion() {
    ssasassasaasssaassa;
  }

  return (
    <santoshcontextprovider.provider value={{ parameter, relatedfunction }}>
      {children}
    </santoshcontextprovider.provider>
  );
};
