const env = require('./env-config.js')

module.exports = {
  "presets": [
    ["next/babel",{
      "styled-jsx": {
        "plugins": [
          "styled-jsx-plugin-postcss"
        ]
      }
    }]
  ],
  "plugins": [
    [
      "babel-plugin-styled-components", 
      {
        "ssr": true, 
        "displayName": true, 
        "preprocess": false 
      }
    ]
  ],
  "env": {
    "development": {
      "plugins": [
        "react-intl",
        ["babel-plugin-styled-components", 
        {
          "ssr": true, 
          "displayName": true, 
          "preprocess": false 
        }],
        ['transform-define', env]
      ]
    },
    "production": {
      "plugins": [
        ["react-intl", {
          "messagesDir": "lang/.messages/"
        }],
        ["babel-plugin-styled-components", 
        {
          "ssr": true, 
          "displayName": true, 
          "preprocess": false 
        }]
      ]
    }
  }
}