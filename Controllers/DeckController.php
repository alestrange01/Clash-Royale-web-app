<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use App\Models\User;
use App\Models\Card;
use App\Models\Deck;
use App\Http\Controllers\PlayersClansController;


class DeckController extends BaseController
{
    public function deck_creator(){
        $playersClansController = new PlayersClansController();
        $links = $playersClansController->get_navbar();
        return view('deck_creator')->with('links', $links)
                                      ->with('u', 'deck_creator');
    }

    public function get_cards(){
        $url = "https://api.clashroyale.com/v1/cards";
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Authorization: Bearer ' . config('token')
        ));
        $res = curl_exec($ch);
        curl_close($ch);
        $data = json_decode($res, true);
        if (isset($data["reason"])) {
            $response = array("exists" => false);
            return json_encode($response);
        }
        return json_encode($data);
    }


    public function save_deck(){
        if(!Session::has('user_id')){
            return json_encode(array('status' => 'error', 'redirect' => '/login'));
        }

        $userid = Session::get('user_id');
        //controllo che l'utente non abbia gia salvato un deck con lo stesso titolo
        if(Deck::where('title', Request::post('title'))->where('user', $userid )->exists()){
            return json_encode(array('status' => 'error', 'error' => 'title'));
        }

        $deck_cards = Request::post('cards');
        $deck_cards = json_decode($deck_cards, true); 
        
        
        //controllo che l'utente non abbia gia salvato un deck con le stesse carte
        $user = User::find($userid);
        $user_decks = $user->decks;
        foreach($user_decks as $deck){
            $cardIDs = $deck->cards->pluck('id')->toArray();
            if(count(array_diff($cardIDs, $deck_cards)) === 0 && count(array_diff($deck_cards, $cardIDs)) === 0){
                return json_encode(array('status' => 'error', 'error' => 'cards'));
            }
        }

        $deck_name = Request::post('title');
        $deck = new Deck();
        $deck->title = $deck_name;
        $deck->user = Session::get('user_id');
        $deck->save();
        foreach($deck_cards as $cardID){
            $card = Card::find($cardID);
            $deck->cards()->attach($card);
        }
        return json_encode(array("status" => "success", "redirect" => "/my_decks"));

    }


    public function my_decks(){
        if(!Session::has('user_id')){
            return redirect('login');
        }
        $user = User::find(Session::get('user_id'));
        $playersClansController = new PlayersClansController();
        $links = $playersClansController->get_navbar();
        return view('my_decks')->with('links', $links)
                               ->with('u', 'my_decks')
                               ->with('user', $user);
    }

    public function get_user_decks(){
        if(!Session::has('user_id')){
            return redirect('login');
        }
        $userid = Session::get('user_id');
        $user = User::find($userid);
        $decks = $user->decks;
        if(count($decks) === 0){
            return json_encode(array('status' => 'empty'));
        }
        $decks_array = array('status' => 'ok', 'decks' => array());
        foreach($decks as $deck){
            $cardIDs = $deck->cards->pluck('id')->toArray();
            $deck_array = array('id' => $deck->id, 'title' => $deck->title, 'cards' => $cardIDs);
            $decks_array['decks'][] = $deck_array;
        }
        return json_encode($decks_array);
    }

    public function edit_deck($deck_id, $deck_name){
        if(!Session::has('user_id')){
            return redirect('login');
        }
        $userid = Session::get('user_id');        
        //controllo che l'utente non abbia gia salvato un deck con lo stesso titolo
        if(Deck::where('title', $deck_name)->where('user', $userid )->exists()){
            return json_encode(array('status' => 'error', 'error' => 'title'));
        }
        $deck = Deck::find($deck_id);
        $deck->title = $deck_name;
        $status = $deck->save();
        if($status){
            return json_encode(array('status' => 'ok'));
        }
        return json_encode(array('status' => 'error', 'error' => 'query'));
    }

    public function delete_deck($deck_id){
        if(!Session::has('user_id')){
            return redirect('login');
        }
        $deck = Deck::find($deck_id);
        $deck->cards()->detach();
        $status = $deck->delete();
        if($status){
            return json_encode(array('status' => 'ok'));
        }
        return json_encode(array('status' => 'error'));
    }

}