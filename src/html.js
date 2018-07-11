import React, { Component } from "react"
import * as PropTypes from "prop-types"
import Helmet from 'react-helmet'

class Html extends Component {
  render() {
    return (
      <html lang="ru" {...this.props.htmlAttributes}>
        <head>
          <meta name="referrer" content="origin" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <Helmet 
            defaultTitle="Orchestra Design"
            titleTemplate={`%s | Orchestra Design`}
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

Html.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

export default Html