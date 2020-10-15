<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class IEX extends Model
{
    protected $collection = 'iex_test';
    protected $dates = ['date'];
}