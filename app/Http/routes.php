<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

if(version_compare(PHP_VERSION, '7.2.0', '>=')) {
    error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
}

Route::get('/', 'ActivityController@index');
Route::get('/activity/{id}', 'ActivityController@activity');
Route::get('/activities/', 'ActivityController@activities');
Route::get('/activities/personal_best/{id?}', 'ActivityController@personalBest');
Route::get('/activities/type', 'ActivityTypeController@type');
