<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class activity extends Model {
    protected $table = 'activity';

    public function activity() {
        return $this->hasOne('App\ActivityType', 'id', 'activity_id');
    }

    public static function activityLog($userID, $page) {
        $query = self::select(array('activity.id', 'activity_date', 'metres',
                                    'seconds', 'parent_activity_type.activity_type'))->
                       where('user_id', $userID)->
                       join('activity_type',
                            'activity.activity_id', '=', 'activity_type.id')->
                       join('activity_type as parent_activity_type',
                            'activity_type.parent_id', '=', 'parent_activity_type.id')->
                       orderBy('activity_date', 'desc')->
                       orderBy('activity.id', 'desc');

        return $query->paginate(15);

    }

    public static function activities($userID, $year, $month, $activityID) {
        $activities = [];
        $summary = [];

        $query = self::select(array('activity.id', 'activity_date', 'metres',
                                    'seconds', 'activity_type.activity_type'))->
                       where('user_id', $userID)->
                       join('activity_type',
                            'activity.activity_id', '=', 'activity_type.id')->
                       where(function($query) use ($activityID) {
                            if($activityID) {
                                $query->whereIn('activity_id', explode(',', $activityID))->
                                        orWhereIn('parent_id', explode(',', $activityID));
                            }
                       });

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

        $query->orderBy('activity_date', 'asc')->
                orderBy('activity.id', 'desc');

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
                           'activity' => $activity->activity_type,
                           'seconds' => $activity->seconds,
                           'km' => $km,
                           'display_average_km' => $km,
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
            $summary['total_km'] = number_format($summary['total_km'], 3);

        }

        return ['activities' => $activities,
                'summary' => $summary];

    }

    public static function groupedActivities($userID, $year, $activityID) {
        $activities = [];
        $summary = ['total_activity_count' => 0,
                    'total_seconds' => 0,
                    'total_km' => 0];
        $lookup = [];

        $query = ActivityType::select(array(
                           'activity_type.id',
                           \DB::raw('COUNT(activity.id) AS activity_count'),
                           \DB::raw("TO_CHAR(CAST(SUM(activity.metres) AS FLOAT) / 1000, ".
                                    "'FM999999999.000') AS km"),
                           \DB::raw('SUM(activity.seconds) AS duration'),
                                    'activity_type.activity_type'))->
                    leftjoin('activity',
                             'activity.activity_id', '=', 'activity_type.id')->
                    where('activity.user_id', $userID)->
                    where(function($query) use ($activityID) {
                        if($activityID) {
                            $query->whereIn('activity_id', explode(',', $activityID))->
                                    orWhereIn('parent_id', explode(',', $activityID));
                        }
                    });

        if($year && (int)$year > 2000) {
            $dateType = 'year';
            $query->addSelect(\DB::raw("EXTRACT(MONTH FROM activity.activity_date) AS dt"));
            $query->whereBetween('activity.activity_date',
                                 array(date('Y-m-d', strtotime($year.'-01-01')),
                                       date('Y-m-d', strtotime($year.'-12-31'))));
        } else {
            $dateType = 'all';
            $query->addSelect(\DB::raw("EXTRACT(YEAR FROM activity.activity_date) AS dt"));
        }

        $query->groupBy(array('activity_type.id',
                              'activity_type.activity_type',
                              'dt'))->
                orderBy('dt', 'ASC')->
                orderBy('activity_type.activity_type', 'ASC');

        $results = $query->get();

        if(count($results)) {
            foreach($results as $a) {
                if(!isset($lookup[$a->dt])) {
                    $lookup[$a->dt] = count($lookup);

                    if($dateType == 'all' || $dateType == 'month') {
                        $date = $a->dt;
                    } elseif($dateType == 'year') {
                        $date =$year.'-'.
                            str_pad($a->dt, 2, 0, STR_PAD_LEFT);
                    }

                    $activities[] = ['activities' => [],
                                     'date' => $date];
                    $totals[$a->dt] = ['seconds' => 0,
                                       'km' => 0,
                                       'activity_count' => 0];
                }

                $activities[$lookup[$a->dt]]['activities'][] =
                    ['activity' => $a->activity_type,
                     'activity_id' => $a->id,
                     'activity_count' => $a->activity_count,
                     'km' => $a->km,
                     'display_average_km' =>
                        number_format(($a->km / $a->activity_count), 3),
                     'display_average_pace_time' =>
                        self::averagePaceTime($a->duration, $a->km),
                     'display_average_pace_distance' =>
                        self::averagePaceDistance($a->duration, $a->km),
                     'display_seconds' =>
                        self::convertSecondsToDisplayTime($a->duration),
                     'seconds' => $a->duration];

                $totals[$a->dt]['seconds'] += $a->duration;
                $totals[$a->dt]['activity_count'] += $a->activity_count;
                $totals[$a->dt]['km'] += $a->km;

            }

            foreach($totals as $key => $total) {
                $activities[$lookup[$key]]['activities'][] =
                    ['activity' => 'All',
                     'activity_id' => '',
                     'activity_count' => $total['activity_count'],
                     'km' => number_format($total['km'], 3),
                     'display_average_km' =>
                        number_format(($total['km'] / $total['activity_count']), 3),
                     'display_average_pace_time' =>
                        self::averagePaceTime($total['seconds'], $total['km']),
                     'display_average_pace_distance' =>
                        self::averagePaceDistance($total['seconds'], $total['km']),
                     'display_seconds' =>
                        self::convertSecondsToDisplayTime($total['seconds']),
                     'seconds' => $total['seconds']];

                $summary['total_activity_count'] += $total['activity_count'];
                $summary['total_seconds'] += $total['seconds'];
                $summary['total_km'] += $total['km'];

            }

            $summary =  activity::calculateSummary($summary);
            $summary['total_km'] = number_format($summary['total_km'], 3);

        }

        return ['activities' => $activities,
                'summary' => $summary];

    }

    public static function personalBests($userID, $type, $activityID, $limit,
                                         $minDistance, $maxDistance, $minSpeed)
    {

        if (!is_array($activityID)) {
            $activityID = explode(',', $activityID);
        }

        $pb = self::select(array('activity.id', 'activity_date', 'metres',
            'seconds',
            'activity_type.activity_type'))->
        join('activity_type',
            'activity.activity_id', '=', 'activity_type.id')->
        join('activity_type as parent_activity_type',
            'activity_type.parent_id', '=', 'parent_activity_type.id')->
        where('user_id', $userID)->
        where(function ($query) use ($activityID) {
            if ($activityID) {
                $query->whereIn('activity_type.id', $activityID)->
                orWhereIn('parent_activity_type.id', $activityID);
            }
        })->
        when($minDistance, function ($query) use ($minDistance) {
            return $query->where('metres', '>=', $minDistance);
        })->
        when($maxDistance, function ($query) use ($maxDistance) {
            return $query->where('metres', '<=', $maxDistance);
        })->
        when($minSpeed, function ($query) use ($minSpeed) {
            return $query->where(\DB::raw('((1.0 * metres) / seconds) * 3600'), '>=', $minSpeed);
        })->
        when($type == 'longest', function($query) {
           return $query->orderBy('metres', 'desc')->
                          orderBy(\DB::raw('(1.0 * metres) / seconds'), 'desc');
        })->
        when($type == 'fastest', function($query) {
            return $query->orderBy(\DB::raw('(1.0 * metres) / seconds'), 'desc');
        })->
        limit($limit)->get();

        if($pb && $limit == 1) {
            return $pb->pop();
        } else {
            return $pb;
        }

    }

    public static function convertSecondsToDisplayTime($seconds) {
        $seconds = (int)$seconds;

        return str_pad(intdiv($seconds, 3600), 2, 0, STR_PAD_LEFT).':'.
               str_pad(intdiv(($seconds % 3600), 60), 2, 0, STR_PAD_LEFT).':'.
               str_pad((($seconds % 3600) % 60), 2, 0, STR_PAD_LEFT);

    }

    private static function calculateSummary($summary) {
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

    public static function averagePaceTime($seconds, $distance) {
        return self::convertSecondsToDisplayTime($seconds / $distance);
    }

    public static function averagePaceDistance($seconds, $distance) {
        return number_format(60 / (($seconds / $distance) / 60), 3);
    }

}
