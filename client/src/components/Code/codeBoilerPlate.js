import React from "react";
import ReactDOMServer from "react-dom/server";
let beautify_html = require("js-beautify").html;

const CodeBoilerPlate = (props) => {
  return (
  <code>
    <div className="code-box">
      {beautify_html(ReactDOMServer.renderToStaticMarkup(
        <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>HTML Boilerplate</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Alexi Taylor" />
          <meta name="description" content="Boilerplate" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css" />
          <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
        </head>
        <body>
          <h1>Enjoy your HTML Webpage</h1>
          {props.code}
        </body>
        </html>
      ), {"wrap-attributes": "force"})}
      </div>
  </code>
  );
};

export default CodeBoilerPlate;


