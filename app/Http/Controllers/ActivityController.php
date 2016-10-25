<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Activity;

class ActivityController extends Controller {

    public function index(Request $request) {
        $sql = "SELECT    at.id, at.activity_type, ".
               "          COUNT(a.id) AS activity_count, ".
               "          TO_CHAR(CAST(SUM(metres) AS FLOAT) / 1000, ".
               "                  'FM999999999.000') AS km, ".
               "          SUM(seconds) AS duration, ".
               "          EXTRACT(YEAR FROM a.activity_date) AS dt ".
               "          FROM      activity_type at ".
               "LEFT JOIN activity a ON (a.activity_id = at.id) ".
               "WHERE     a.user_id = 1 ".
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
                         'activity_count' => $a->activity_count,
                         'km' => $a->km,
                         'display_average_pace' => activity::averagePace($a->duration, $a->km),
                         'display_seconds' => activity::convertSecondsToDisplayTime($a->duration),
                         'seconds' => $a->duration];

                $totals[$a->dt]['seconds'] += $a->duration;
                $totals[$a->dt]['activity_count'] += $a->activity_count;
                $totals[$a->dt]['km'] += $a->km;

            }

            foreach($totals as $key => $total) {
                $activities[$lookup[$key]]['activities'][] =
                    ['activity' => 'All',
                     'activity_count' => $total['activity_count'],
                     'km' => number_format($total['km'], 3),
                     'display_average_pace' => activity::averagePace($total['seconds'], $total['km']),
                     'display_seconds' => activity::convertSecondsToDisplayTime($total['seconds']),
                     'seconds' => $total['seconds']];
            }

        }

        return response()->json($activities);

    }

}