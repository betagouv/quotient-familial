import 'lodash'

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularCookies from 'angular-cookies';

import angularMaterial from 'angular-material';


import svairService from './services/svair.service';

import routing from './home.routes';
import CalculatorController from './calculator/calculator.controller';
import AdressController from './adress/adress.controller';
import LoginController from './login/login.controller';

import './main.css'

export default angular.module('app.home', [uirouter, svairService, angularCookies, angularMaterial])
  .config(routing)
  .controller('CalculatorController', CalculatorController)
  .controller('AdressController', AdressController)
  .controller('LoginController', LoginController)
  .name;
