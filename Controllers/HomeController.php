<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use App\Models\User;
use App\Models\Card;
use App\Http\Controllers\PlayersClansController;


class HomeController extends BaseController
{
    public function home()
    {
        $playersClansController = new PlayersClansController();
        $links = $playersClansController->get_navbar();
        if(Session::has('user_id')){
            return redirect('loggedhome')->with('links', $links)
                                         ->with('u', 'home');
        }
        return view('home')->with('links', $links)
                           ->with('u', 'home');

    }

    public function loggedhome()
    {
        $playersClansController = new PlayersClansController();
        $links = $playersClansController->get_navbar();
        if(!Session::has('user_id')){
            return redirect('login');
        }
        $user = User::find(Session::get('user_id'));
        return view('loggedhome')->with('user', $user)
                                 ->with('links', $links)
                                 ->with('u', 'home');
    }


    public function get_player(){
        
        if (request()->has('player_tag')) {
            //Se è settato il tag del player, vuol dire che siamo nella ricerca player
            $user_tag = Request::post('player_tag');
        }else if(request()->has('clan_player_tag')){
            //Se è settato il clan_player_tag, vuol dire che siamo nella ricerca player da ricerca clan
            $user_tag = Request::get('clan_player_tag');
        }
        else {
            //Se non è settato il tag del player, vuol dire che siamo nella home personale
            if(!Session::has('user_id')){
                return redirect('login');
            }
            $user_tag = User::find(Session::get('user_id'))->player_tag;
        }
        /* Se il controllo è passato, vuol dire che:
            -l'utente è loggato e dobbiamo mostrare le info nella sua home
            -siamo nella ricerca player e dobbiamo mostrare le info del player richiesto*/
    
        //Allora devo prendere le informazioni tramite le API di Clash Royale
        
        $url = "https://api.clashroyale.com/v1/players/". urlencode($user_tag);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Authorization: Bearer ' . config('token')
        ));
        $res = curl_exec($ch);
        curl_close($ch);
        $data1 = json_decode($res, true);
        if (isset($data1["reason"])) {
            $response = array("player_info" => array("exists" => false));
            return json_encode($response);
            exit;
        }
        $data1["exists"] = true;

    
    
        //Prendo le info delle upcoming chests tramite le API di Clash Royale
        $url = "https://api.clashroyale.com/v1/players/". urlencode($user_tag) . "/upcomingchests";
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Authorization: Bearer ' . config('token')
        ));
        $res = curl_exec($ch);
        curl_close($ch);
        $data2 = json_decode($res, true);
        if (isset($data2["reason"])) {
            $response = array("exists" => false);
            return json_encode($response);
            exit;
        }
        $data2["exists"] = true;
    
        $data = ["player_info" => $data1, "upcoming_chests" => $data2];
    
        if (request()->has('player_tag')) {request()->offsetUnset('player_tag');}
        if (request()->has('clan_player_tag')) {request()->offsetUnset('clan_player_tag');}
        

    
        return json_encode($data);
    }


    public function get_card_info(){
        $card_id = Request::get('card_id');
        $card = Card::find($card_id);
        return json_encode(array('id' => $card->id,
                                'name' => $card->Name,
                                'cost' => $card->Cost,
                                'health_shield' => $card->Health_Shield,
                                'damage' => $card->Damage,
                                'hit_speed' => $card->Hit_Speed,
                                'dps' => $card->Dps,
                                'spawn_death_damage' => $card->Spawn_Death_Damage, 
                                'attack_range' => $card->Attack_Range,
                                'spawn_count' => $card->Spawn_Count));
    }

}