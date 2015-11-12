import angular from 'angular';
import uirouter from 'angular-ui-router';

//Material
import 'angular-material/angular-material.css';
// Animation
import angularAnimate from 'angular-animate';
// Materail Design lib
import angularMaterial from 'angular-material';

import routing from './app.config';
import home from './features/home';

angular.module('app', [uirouter, home, angularMaterial])
  .config(routing);
