import dva, { Router, Switch, Route } from 'dva';
import { Layouts } from './layouts';
import { Home } from './pages/Home';
import { Setting } from './pages/Setting';

/**
 * 研究下不用dva-cli 引入dva
 * @param {*} param0 
 */
function RouterConfig({ history }) {
  <Router history={history} >
    <Switch >
      <Route path="/" component={Setting}  />
      <Route path="/home" component={Home} />
      <Route path="/layout" component={Layouts} />
    </Switch>
  </Router>
};