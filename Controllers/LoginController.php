<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use App\Models\User;

class LoginController extends BaseController
{
    public function login()
    {
        return view('login');
    }

    public function do_login(){
        if(Session::has('user_id')){
            return redirect('loggedhome');
        }
        $email_tag = Request::post('email_tag');
        $password = Request::post('password');

        if(!empty($email_tag) && !empty($password)){
            $user = User::where('email', $email_tag)->orwhere('player_tag', $email_tag)->first();
            if($user){
                if(password_verify($password, $user->password)){
                    Session::put('user_id', $user->id);
                    Session::put('user_tag', $user->player_tag);
                    Session::put('username', $user->username);
                    return redirect('loggedhome')->with('user', $user);
                    
                }
                else {
                    $$error= 'Password sbagliata';
                }
            } else {
                $error['email_tag'] = 'Email/player_tag non trovato'; 
            }
        } else {
            $error['email_tag'] = "Inserisci email/player tag e password";
        }
        if(count($error) == 0){
            
        } else {
            return redirect('login')->withInput()->withErrors($error);
        }


    }

    public function do_login2(){
        if(Session::has('user_id')){
            return redirect('loggedhome');
        }
        $email_tag = Request::post('email_tag');
        $password = Request::post('password');

        if(!empty($email_tag) && !empty($password)){
            $user = User::where('email', $email_tag)->orwhere('player_tag', $email_tag)->first();
            if(!$user){
                $error['email_tag'] = 'Email/player_tag non trovato'; 
            } else {
                if(!password_verify($password, $user->password)){
                    $error= 'Password sbagliata';
                }
            }
        } else {
            $error['email_tag'] = "Inserisci email/player tag e password";
        }
        if(count($error) == 0){
            Session::put('user_id', $user->id);
            Session::put('user_tag', $user->player_tag);
            Session::put('username', $user->username);
            return redirect('loggedhome')->with('user', $user);
        } else {
            return redirect('login')->withInput()->withErrors($error);
        }


    }

    public function signup()
    {
        return view('signup');
    }

    public function check($field)
    {
        if(empty(Request::get('q'))) {
            return ['exists' => false];
        }
        $user = User::where($field, Request::get('q'))->exists();
        if($field == 'player_tag'){
            if(!$user){
                // Controllo che il player_tag sia valido solo se non è già in uso
                $url = "https://api.clashroyale.com/v1/players/" . urlencode(Request::get('q'));
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Accept: application/json', 
                    'Authorization: Bearer ' . config('token')));
                $result = curl_exec($ch);
                curl_close($ch);
                $result = json_decode($result, true);
                $valid = isset($result['reason']) ? false : true;

                return ['exists' => $user, 'valid' => $valid];
            }
        }
        return ['exists' => $user];
    }

    public function do_signup(){
        if(Session::has('user_id')){
            return redirect('home');
        }

        $error = array();
        $name = Request::post('name');
        $surname = Request::post('surname');
        $player_tag = Request::post('player_tag');
        $email = Request::post('email');
        $password = Request::post('password');
        $confirm_password = Request::post('confirm_password');


        // Verifico l'esistenza di dati POST
        if (!empty($name) && !empty($surname) && !empty($player_tag) && !empty($email) && !empty($password) && !empty($confirm_password)) 
        {

            $error = array();

            // CONTROLLO NOME
            if (!preg_match('/^[a-zA-Z]{2,25}+$/', $name)) {
                $error[] = "Nome non valido";
            }
            // CONTROLLO COGNOME
            if (!preg_match('/^[a-zA-Z]+$/', $surname)) {
                $error[] = "Cognome non valido";
            }

            // CONTROLLO PASSWORD: deve contenere almeno una minuscola, una maiuscola e un carattere speciale
            if (!preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!#\$%&@()*\+,.\-:;=\?\[\]_{|}])[A-Za-z\d!#\$%&@()*\+,.\-:;=\?\[\]_{|}]{8,}$/', $password)) {
                $error[] = "Password con almeno una: minuscola, maiuscola e carattere speciale";
            }
            // CONTROLLO CONFERMA PASSWORD
            if (strcmp($password, $confirm_password) != 0) {
                $error[] = "Le password non coincidono";
            }

            // CONTROLLO EMAIL
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                //filter_var è una funzione che filtra una variabile con un filtro specificato, in questo caso FILTER_VALIDATE_EMAIL
                //che serve a validare un indirizzo email secondo la RFC 822 (https://www.php.net/manual/en/filter.filters.validate.php)
                $error[] = "Email non valida";
            }else{
                //controllo che l'email non sia già in uso
                if (User::where('email', $email)->exists()) { 
                    $error[] = "Email già in uso";
                }
            }

            // CONTROLLO PLAYER TAG: deve iniziare con un carattere '#'
            if (!preg_match('/^#/', $player_tag)) { 
                $error[] = "Il player tag deve iniziare con un carattere '#'.";
            }else{
                //controllo che il player tag non sia già in uso
                if (User::where('player_tag', $player_tag)->exists()) {
                    $error[] = "Player tag già in uso";
                }else
                {
                    //controllo che il tag sia valido: uso l'API di Clash Royale
                    $url = "https://api.clashroyale.com/v1/players/". urlencode($player_tag);
                    $ch = curl_init($url);
                    // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                        'Accept: application/json',
                        'Authorization: Bearer ' . config('token')
                    ));
                    $res = curl_exec($ch);
                    curl_close($ch);
                    $res = json_decode($res, true);
                    if(isset($res['reason'])){
                        //se il tag non è valido, la chiave 'reason' è settata
                        $error[] = "Player tag non valido";
                    }else{
                        //prelevo l'username dell'utente
                        $username = $res['name'];
                    }
                    
                }
            }
            
            // Se non ci sono errori procedo con l'inserimento nel database
            if (count($error) == 0) {
                $password = password_hash($password, PASSWORD_BCRYPT);
                //password_hash è una funzione che permette di criptare la password, in questo caso con l'algoritmo bcrypt
                //https://www.php.net/manual/en/function.password-hash.php
                $user = new User;
                $user->player_tag = $player_tag;
                $user->name = $name;
                $user->surname = $surname;
                $user->username = $username;
                $user->email = $email;
                $user->password = $password;
                $user->save();

                Session::put('user_id', $user->id);
                Session::put('user_tag', $user->player_tag);
                Session::put('username', $user->username);

                return redirect('loggedhome')->with('user', $user);
            }
        }
        else if (isset($name) || isset($surname) || isset($player_tag) || 
                isset($email) || isset($password) || isset($confirm_password))
                {
                    $error[] = "Compila tutti i campi";
                }

        return redirect('signup')->withInput()->withErrors($error);
    }



    public function logout(){
        Session::flush();
        return redirect('login');
    }



}


