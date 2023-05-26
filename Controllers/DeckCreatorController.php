<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Request;
use Session;
use App\Models\User;
use App\Models\Card;


class DeckCreatorController extends BaseController
{
    public function deck_creator(){
        return view('deck_creator');
    }




}