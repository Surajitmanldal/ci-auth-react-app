<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('api/register', 'AuthController::register');
$routes->post('api/login', 'AuthController::login');
$routes->get('api/profile', 'AuthController::profile', ['filter' => 'auth']);
$routes->get('api/users', 'UserController::users', ['filter' => 'auth']);
$routes->get('api/teachers', 'UserController::teachers', ['filter' => 'auth']);
$routes->get('api/combined', 'UserController::combined', ['filter' => 'auth']);