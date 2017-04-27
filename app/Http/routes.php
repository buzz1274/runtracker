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

Route::get('/', 'ActivityController@index');
Route::get('/activities/', 'ActivityController@activities');
Route::get('/activities/personal_bests', 'ActivityController@personalBests');
Route::get('/activities/personal_best', 'ActivityController@personalBest');
Route::get('/activities/type', 'ActivityTypeController@type');
