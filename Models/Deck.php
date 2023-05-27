<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deck extends Model
{
    public $timestamps = false;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function cards() {
        return $this->belongsToMany(Card::class);
    }
}
