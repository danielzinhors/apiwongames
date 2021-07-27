/* eslint-disable */
import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { get, upperFirst } from "lodash";
import { auth, LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";
import { useModels } from "../../hooks";

import { ALink, Block, Container, P, Separator } from "./components";

import SocialLink from "./SocialLink";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    link: "https://github.com/danielzinhors/",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/danielzinhors",
  },
];

const HomePage = () => {
  // Temporary until we develop the menu API
  const { isLoading: isLoadingForModels } = useModels();

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const username = get(auth.getUserInfo(), "firstname", "");

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {(title) => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <Block>
              <h2 id="mainHeader">
                Olá {upperFirst(username)}, seja bem vindo ao painel de controle
                da Won Games
              </h2>
              <P>
                No menu ao lado se encontra as opções para os cadastros de
                jogos, categorias, desenvolvedores etc...
              </P>

              <Separator style={{ marginTop: 37, marginBottom: 36 }} />
            </Block>
          </div>

          <div className="col-md-12 col-lg-4">
            <Block style={{ paddingRight: 30, paddingBottom: 0 }}>
              <h2>Nossas redes para contato</h2>

              <ALink
                rel="noopener noreferrer"
                href="https://berinc.com.br"
                target="_blank"
              >
                Nosso site
              </ALink>

              <Separator style={{ marginTop: 18 }} />
              <div
                className="row social-wrapper"
                style={{
                  display: "flex",
                  margin: 0,
                  marginTop: 36,
                  marginLeft: -15,
                }}
              >
                {SOCIAL_LINKS.map((value, key) => (
                  <SocialLink key={key} {...value} />
                ))}
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
