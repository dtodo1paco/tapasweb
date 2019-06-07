import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '../containers/HomePage';
import FilterPage from '../containers/NotFoundPage';
import NotFoundPage from '../containers/NotFoundPage';

export const pages = [
  {
    "path":"/",
    "icon": "home",
    "label":"Tapasweb",
    "component": HomePage,
    "isEditable":false,
    "header": {
      title: "Tapasweb",
      subtitle: ""
    }
  },
  {
    "path":"/filter",
    "icon":"star",
    "label":"Filter",
    "component": FilterPage,
    "isEditable":true,
    "form": {
      "title": "Filter",
      //"component": <LocationForm ref={(comp) => {window.forms['location'] = comp}} />
    },
    "header":{
      title: "Filter",
      subtitle: ""
    }
  },
]

export const routes = (
  <Switch>
      {
        pages.map( (page) => {
          return <Route key={page.path} exact path={page.path} component={page.component} />
        })
        }
    <Route component={NotFoundPage} />
  </Switch>
)

