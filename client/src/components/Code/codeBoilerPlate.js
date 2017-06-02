import React from 'react';
import ReactDOMServer from 'react-dom/server';

const CodeBoilerPlate = (props) => {

  return (
    <div>
      {ReactDOMServer.renderToStaticMarkup(

        <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>HTML Boilerplate</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="author" content="Alexi Taylor" />
          <meta name="description" content="Boilerplate" />

        </head>
        <body>
        <pre>
        <h1>My HTML Boilerplate</h1>
        <h2>Hello World</h2>
        {props.code}
        </pre>
        </body>
        </html>

      )}
      </div>
  );
};

export default CodeBoilerPlate;