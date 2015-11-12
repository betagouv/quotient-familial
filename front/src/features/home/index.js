import 'lodash'

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularCookies from 'angular-cookies';

import svairService from './calculator/svair.service';

import routing from './home.routes';
import CalculatorController from './calculator/calculator.controller';
import LoginController from './login/login.controller';


export default angular.module('app.home', [uirouter, svairService, angularCookies])
  .config(routing)
  .controller('CalculatorController', CalculatorController)
  .controller('LoginController', LoginController)
  .name;
