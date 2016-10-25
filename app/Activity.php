<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class activity extends Model {
    protected $table = 'activity';

    public static function convertSecondsToDisplayTime($seconds) {
        $seconds = (int)$seconds;

        return str_pad(intdiv($seconds, 3600), 2, 0, STR_PAD_LEFT).':'.
               str_pad(intdiv(($seconds % 3600), 60), 2, 0, STR_PAD_LEFT).':'.
               str_pad((($seconds % 3600) % 60), 2, 0, STR_PAD_LEFT);

    }

    public static function averagePace($seconds, $distance) {
        return self::convertSecondsToDisplayTime($seconds / $distance);
    }


}