import React from 'react';
import { StaticRouter, Switch, Route } from 'react-router'
import { render, Message, Text, ButtonTemplate, URLButton } from 'react-messenger-ui';

// routes
import MessageView from './MessageView';
import NotFoundView from './404';
import QuickreplyView from './QuickreplyView';

export default (path, props) => {

  // auto pass props to all route since it's static rendering
  const PropRoute = ({component:Component, ...others}) =>
    <Route {...others} render={componentProps => <Component {...componentProps} {...props} />} />


  return render(
    <StaticRouter location={{ pathname: path }}>
      <Switch>
        <PropRoute path="/message" component={MessageView} />
        <PropRoute path="/quickreply" component={QuickreplyView} />
        <PropRoute component={NotFoundView} />
      </Switch>
    </StaticRouter>
  );
}