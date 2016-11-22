<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class activity extends Model {
    protected $table = 'activity';

    public function activity() {
        return $this->hasOne('App\ActivityType', 'id', 'activity_id');
    }

    public static function activities($userID, $year, $month, $activityID) {
        $query = self::where('user_id', $userID);
        $activities = [];
        $summary = [];

        if($activityID) {
            $query = $query->whereIn('activity_id', explode(',', $activityID));
        }

        if($year) {
            if($month) {
                $startDate = date('Y-m-d', strtotime($year.'-'.$month.'-01'));
                $endDate = date('Y-m-t', strtotime($startDate));
            } else {
                $startDate = date('Y-m-d', strtotime($year.'-01-01'));
                $endDate = date('Y-m-t', strtotime($year.'-12-31'));
            }

            $query = $query->whereBetween('activity_date',
                                          [$startDate, $endDate]);

        }

        $query = $query->get();

        if($query->count()) {
            $summary = ['total_activity_count' => 0,
                        'total_seconds' => 0,
                        'total_km' => 0];

            foreach ($query as $activity) {
                $km = number_format($activity->metres / 1000, 3);

                $activities[] =
                    ['date' => $activity->activity_date,
                     'activities' =>
                         [['activity_id' => $activity->id,
                           'activity_count' => 1,
                           'activity' => $activity->activity->activity_type,
                           'seconds' => $activity->seconds,
                           'km' => $km,
                           'display_average_pace_time' =>
                                self::averagePaceTime($activity->seconds,
                                                      $km),
                           'display_average_pace_distance' =>
                                self::averagePaceDistance($activity->seconds,
                                                          $km),
                           'display_seconds' =>
                                self::convertSecondsToDisplayTime($activity->seconds)]]];

                $summary['total_activity_count'] += 1;
                $summary['total_seconds'] += $activity->seconds;
                $summary['total_km'] += $km;

            }

            $summary = self::calculateSummary($summary);

        }

        return ['activities' => $activities,
                'summary' => $summary];

    }

    public static function calculateSummary($summary) {
        $summary['total_display_seconds'] =
            self::convertSecondsToDisplayTime($summary['total_seconds']);

        $summary['total_display_average_pace_time'] =
            self::averagePaceTime($summary['total_seconds'],
                                  $summary['total_km']);

        $summary['total_display_average_pace_distance'] =
            self::averagePaceDistance($summary['total_seconds'],
                                      $summary['total_km']);

        $summary['total_display_average_time_per_activity'] =
            self::convertSecondsToDisplayTime((int)($summary['total_seconds'] /
                                                    $summary['total_activity_count']));

        $summary['total_display_average_distance_per_activity'] =
            number_format(($summary['total_km'] /
                           $summary['total_activity_count']), 3);

        return $summary;

    }

    public static function convertSecondsToDisplayTime($seconds) {
        $seconds = (int)$seconds;

        return str_pad(intdiv($seconds, 3600), 2, 0, STR_PAD_LEFT).':'.
               str_pad(intdiv(($seconds % 3600), 60), 2, 0, STR_PAD_LEFT).':'.
               str_pad((($seconds % 3600) % 60), 2, 0, STR_PAD_LEFT);

    }

    public static function averagePaceTime($seconds, $distance) {
        return self::convertSecondsToDisplayTime($seconds / $distance);
    }

    public static function averagePaceDistance($seconds, $distance) {
        return number_format(60 / (($seconds / $distance) / 60), 3);
    }

}