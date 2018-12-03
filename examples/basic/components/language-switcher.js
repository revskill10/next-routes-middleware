import React from "react";
import { IntlConsumer } from "../lib/intl-context";

const LanguageSwitch = () => (
  <IntlConsumer>
    {({ switchToEnglish, switchToFrench }) => (
      <React.Fragment>
        <button onClick={switchToEnglish}>
          English
        </button>
        <button onClick={switchToFrench}>
          French
        </button>
      </React.Fragment>
    )}
  </IntlConsumer>
);

export default LanguageSwitch;
