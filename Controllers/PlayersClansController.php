<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use App\Models\User;
use App\Models\Card;


class PlayersClansController extends BaseController
{
    public function get_navbar(){
        if(Session::has('user_id')){
            $link1 = "/my_decks";
            $text1 = "My decks";
            $img1 = "/assets/my_decks.svg";
            $link2 = "/logout";
            $text2 = "Log out";
            $img2 = "/assets/logout.svg";
        }
        else {
            $link1 = "/login";
            $text1 = "Log in";
            $img1 = "/assets/login.svg";
            $link2 = "/signup";
            $text2 = "Sign Up";
            $img2 = "/assets/signup.svg";
        }
        return ['link1' => $link1,
                'text1' => $text1,
                'img1' => $img1,
                'link2' => $link2,
                'text2' => $text2,
                'img2' => $img2];
        
    }
    public function players($clan_player_tag=""){
        $links = $this->get_navbar();
        return view('players')->with('links', $links)
                              ->with('u', 'players')
                              ->with('clan_player_tag', $clan_player_tag);
    }

    public function clans($player_clan_tag=""){
        $links = $this->get_navbar();
        return view('clans')->with('links', $links)
                            ->with('u', 'clans')
                            ->with('player_clan_tag', $player_clan_tag);
    }


    public function get_clan(){
        if (request()->has('clan_tag')) {
            //Se è settato il clan_tag, vuol dire che siamo nella ricerca clan
            $clan_tag = Request::post('clan_tag');
        } else if(request()->has('player_clan_tag')){
            //Se è settato il player_clan_tag, vuol dire che siamo nella ricerca clan da ricerca player
            $clan_tag = Request::get('player_clan_tag');
        }    
        
        $url = "https://api.clashroyale.com/v1/clans/".urlencode($clan_tag);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Accept: application/json',
            'Authorization: Bearer ' . config('token')
        ));
        $res = curl_exec($ch);
        curl_close($ch);
        $clan_info = json_decode($res, true);
        if (isset($clan_info["reason"])) {
            $response = array("exists" => false);
            return json_encode($response);
            exit;
        }
        $clan_info["exists"] = true;
    
    
        $url = 'https://royaleapi.github.io/cr-api-data/json/alliance_badges.json';
        $badges = file_get_contents($url);
        if ($badges === false) {
            // Si è verificato un errore durante il recupero del JSON
            $response = array("exists" => false);
            return json_encode($response);
            exit;
        } else {
            // Il JSON è stato recuperato con successo
            $data = json_decode($badges, true);
            $clanBadgeId = $clan_info["badgeId"];
            foreach ($data as $badge) {
                if ($badge["id"] == $clanBadgeId) {
                    $badgeName = $badge["name"];
                    $clan_info["clanLogo"] = $badgeName;
                    break;
                }
            }
        }
    
        return json_encode($clan_info);
    
    }


}