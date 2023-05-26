<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $autoIncrement = false;
    public $timestamps = false;

    public function decks() {
        return $this->belongsToMany("Deck", 'Composizione', 'deck', 'card'); 
    }
}
