import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";

const { Provider, Consumer } = React.createContext();

import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import frTranslation from "../lang/fr.json";
import enTranslation from "../lang/en.json";

addLocaleData([...en, ...fr]);

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);


    this.switchToEnglish = () =>
      this.setState({ locale: "en", messages: enTranslation });

    this.switchToFrench = () =>
      this.setState({ locale: "fr", messages: frTranslation });

    // pass everything in state to avoid creating object inside render method (like explained in the documentation)
    this.state = {
      locale: "en",
      messages: enTranslation,
      switchToEnglish: this.switchToEnglish, 
      switchToFrench: this.switchToFrench 
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Provider value={this.state}>
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="fr"
        >
          {children}
        </IntlProvider>
      </Provider>
    );
  }
}

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };