import React from "react";

interface HeaderProps {
  title: string;
}
// para ter controle das propriedades passadas ao componente, o ts me permite criar uma interface
// que padroniza os tipos e obrigatoriedade das propriedades passadas
// obs: title? : string => OPICIONAL!

// segue a sintaxe abaixo, Hearde recebera o um componente funcional com as propriedades estabelecidas na interface.

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header;
