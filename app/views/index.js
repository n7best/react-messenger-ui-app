import React from 'react';
import { StaticRouter, Switch, Route } from 'react-router'
import { render, Message, Text, ButtonTemplate, URLButton } from 'react-messenger-ui';
import MessageView from './MessageView';

export default (path, props) => {

  // auto pass props to all route since it's static rendering
  const PropRoute = ({component:Component, ...others}) =>
    <Route {...others} render={componentProps => <Component {...componentProps} {...props} />} />


  return render(
    <StaticRouter location={{ pathname: path }}>
      <Switch>
        <PropRoute path="/message" component={MessageView} />
      </Switch>
    </StaticRouter>
  );
}