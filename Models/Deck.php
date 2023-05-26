<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    public $timestamps = false;

    public function user() {
        return $this->belongsTo("User");
    }

    public function cards() {
        return $this->hasMany("Card", "Composizione", "deck", "card");
    }
}
