import 'lodash'

import angular from 'angular';
import angularCookies from 'angular-cookies';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import CalculatorController from './calculator/calculator.controller';
import LoginController from './login/login.controller';


export default angular.module('app.home', [uirouter, angularCookies])
  .config(routing)
  .controller('CalculatorController', CalculatorController)
  .controller('LoginController', LoginController)
  .name;
