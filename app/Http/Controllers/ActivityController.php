<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Activity;

class ActivityController extends Controller {

    public function index(Request $request) {

        if($request->query('activity_id') && (int)$request->query('activity_id') > 0) {
            $activityQuery =
                "AND a.activity_id = ".$request->query('activity_id')." ";
        } else {
            $activityQuery = '';
        }

        error_log($request->query('year'));

        if($request->query('year') && (int)$request->query('year') > 2000) {
            $dateQuery =
                "AND a.activity_date BETWEEN '".$request->query('year')."-01-01' ".
                "                        AND '".$request->query('year')."-12-31' ";
        } else {
            $dateQuery = '';
        }

        error_log($dateQuery);

        $sql = "SELECT    at.id, at.activity_type, ".
               "          COUNT(a.id) AS activity_count, ".
               "          TO_CHAR(CAST(SUM(metres) AS FLOAT) / 1000, ".
               "                  'FM999999999.000') AS km, ".
               "          SUM(seconds) AS duration, ".
               "          EXTRACT(YEAR FROM a.activity_date) AS dt ".
               "          FROM      activity_type at ".
               "LEFT JOIN activity a ON (a.activity_id = at.id) ".
               "WHERE     a.user_id = 1 ".
               $dateQuery.
               $activityQuery.
               "GROUP BY  at.id, at.activity_type, dt ".
               "ORDER BY  dt ASC, at.activity_type ASC";

        $as = \DB::select($sql);
        $activities = [];
        $lookup = [];

        if($as) {
            foreach($as as $a) {
                if(!isset($lookup[$a->dt])) {
                    $lookup[$a->dt] = count($lookup);
                    $activities[] = ['activities' => [],
                                     'date' => $a->dt];
                    $totals[$a->dt] = ['seconds' => 0,
                                       'km' => 0,
                                       'activity_count' => 0];
                }

                $activities[$lookup[$a->dt]]['activities'][] =
                        ['activity' => $a->activity_type,
                         'activity_id' => $a->id,
                         'activity_count' => $a->activity_count,
                         'km' => $a->km,
                         'display_average_pace_time' =>
                             activity::averagePaceTime($a->duration, $a->km),
                         'display_average_pace_distance' =>
                             activity::averagePaceDistance($a->duration, $a->km),
                         'display_seconds' =>
                             activity::convertSecondsToDisplayTime($a->duration),
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
                     'display_average_pace_time' =>
                         activity::averagePaceTime($total['seconds'], $total['km']),
                     'display_average_pace_distance' =>
                         activity::averagePaceDistance($total['seconds'], $total['km']),
                     'display_seconds' =>
                         activity::convertSecondsToDisplayTime($total['seconds']),
                     'seconds' => $total['seconds']];
            }

        }

        return response()->json($activities);

    }

}