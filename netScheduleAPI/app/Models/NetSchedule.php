<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class NetSchedule extends Model
{
    protected $collection = 'net_schedule';
    protected $dates = ['date'];
}
