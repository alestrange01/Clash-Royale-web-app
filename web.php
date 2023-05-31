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

Route::get('deck_creator', 'App\Http\Controllers\DeckController@deck_creator');
Route::get('get_cards', 'App\Http\Controllers\DeckController@get_cards');
Route::post('save_deck', 'App\Http\Controllers\DeckController@save_deck');
Route::get('my_decks', 'App\Http\Controllers\DeckController@my_decks');
Route::get('get_user_decks', 'App\Http\Controllers\DeckController@get_user_decks');
Route::get('get_user_decks2', 'App\Http\Controllers\DeckController@get_user_decks2');
Route::get('edit_deck/{deck_id}/{deck_name}', 'App\Http\Controllers\DeckController@edit_deck');
Route::get('delete_deck/{deck_id}', 'App\Http\Controllers\DeckController@delete_deck');

