<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Card extends Model
{
    protected $autoIncrement = false;
    public $timestamps = false;

    public function decks() {
        return $this->belongsToMany(Deck::class);
    }
}
