<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public $timestamps = false;

    public function decks() {
        return $this->hasMany("Deck", "user");
    }
}
