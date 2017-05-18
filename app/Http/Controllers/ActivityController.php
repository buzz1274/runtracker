<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Activity;
use App\PersonalBests;

class ActivityController extends Controller {

    public function index(Request $request) {
        if($request->query('year') && $request->query('month')) {
            $activities = activity::activities(USER_ID,
                                               $request->query('year'),
                                               $request->query('month'),
                                               $request->query('activity_id'));
        } else {
            $activities = activity::groupedActivities(USER_ID,
                                                      $request->query('year'),
                                                      $request->query('activity_id'));
        }

        return response()->json($activities);

    }

    public function activity(Request $request, $id) {
        $query = activity::select(array('activity.id', 'activity_date', 'metres',
                                        'seconds', 'route.route',
                                        'parent_activity_type.activity_type AS parent_activity_type',
                                        'activity_type.activity_type'))->
                            where('user_id', USER_ID)->
                            where('activity.id', $id)->
                             join('route',
                                  'route.id', '=', 'activity.route_id')->
                             join('activity_type',
                                  'activity.activity_id', '=', 'activity_type.id')->
                             join('activity_type as parent_activity_type',
                                  'activity_type.parent_id', '=', 'parent_activity_type.id');

        $activity = $query->get();

        if(!$activity->count()) {
            return response()->json(['message' => 'Activity not found'], 404);
        } else {
            return response()->json(['activity' => $activity[0]]);
        }

    }

    public function activities(Request $request) {
        $activities = activity::activityLog(USER_ID,
                                            $request->query('page', 1));

        return response()->json(['activities' => $activities,
                                 'has_more_activities' => $activities->hasMorePages()]);

    }

    /*
    public function personalBest(Request $request) {
        $response = array();
        $personalBest = PersonalBests::where('user_id', USER_ID)->
                                       where('id', $request->query('personal_best_id'))->
                                       orderBy('display_order')->get();

        if(!$personalBest) {
            return response()->json($response);
        }

        $personalBest = $personalBest->pop();
        $activities = activity::personalBests(USER_ID, $personalBest->type,
                                              $personalBest->activity_ids, 20,
                                              $personalBest->min_distance,
                                              $personalBest->max_distance);

        if(!is_object($activities)) {
            return response()->json($response);
        }

        $response['title'] = $personalBest->title;

        foreach($activities as $activity) {
            $km = $activity->metres / 1000;

            $response['activities'][] = array(
                'date' => date('jS M, Y', strtotime($activity->activity_date)),
                'activity_type' => $activity->activity_type,
                'km' => number_format($km, 3),
                'display_seconds' =>
                    activity::convertSecondsToDisplayTime($activity->seconds),
                'display_average_pace_time' =>
                    activity::averagePaceTime($activity->seconds, $km),
                'display_average_pace_distance' =>
                    activity::averagePaceDistance($activity->seconds, $km),
            );
        }

        return response()->json($response);

    }
    */

    public function personalBest() {
        $pb = false;
        $i = 0;
        $personalBests = PersonalBests::where('user_id', USER_ID)->
                                        orderBy('display_order')->get();

        foreach($personalBests as $personalBest) {
            $pb[$i] = activity::personalBests(USER_ID, $personalBest->type,
                                              $personalBest->activity_ids, 1,
                                              $personalBest->min_distance,
                                              $personalBest->max_distance);

            $pb[$i]['title'] = $personalBest['title'];

            $i++;

        }

        return response()->json(['activities' => ['data' => $pb]]);

    }

}
