<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('', 'App\Http\Controllers\HomeController@home');
Route::get('login', 'App\Http\Controllers\LoginController@login');
Route::post('login', 'App\Http\Controllers\LoginController@do_login');
Route::get('signup', 'App\Http\Controllers\LoginController@signup');
Route::post('signup', 'App\Http\Controllers\LoginController@do_signup');
Route::get('signup/check/{field}', 'App\Http\Controllers\LoginController@check');
Route::get('logout', 'App\Http\Controllers\LoginController@logout');

Route::get('home', 'App\Http\Controllers\HomeController@home');
Route::get('loggedhome', 'App\Http\Controllers\HomeController@loggedhome');
Route::get('get_player', 'App\Http\Controllers\HomeController@get_player');

Route::get('players/{clan_player_tag?}', 'App\Http\Controllers\PlayersClansController@players');
Route::post('get_player', 'App\Http\Controllers\HomeController@get_player');
Route::get('get_card_info', 'App\Http\Controllers\HomeController@get_card_info');

Route::get('clans/{player_clan_tag?}', 'App\Http\Controllers\PlayersClansController@clans');
Route::post('get_clan', 'App\Http\Controllers\PlayersClansController@get_clan');



