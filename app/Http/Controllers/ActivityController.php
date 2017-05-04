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
                                        'seconds', 'parent_activity_type.activity_type'))->
                            where('user_id', USER_ID)->
                            where('activity.id', $id)->
                             join('activity_type',
                                  'activity.activity_id', '=', 'activity_type.id')->
                             join('activity_type as parent_activity_type',
                                  'activity_type.parent_id', '=', 'parent_activity_type.id');

        return response()->json(['activity' => $query->get()]);
    }

    public function activities(Request $request) {
        $response = [];
        $activities = activity::activityLog(USER_ID,
                                            $request->query('page', 1));

        if($activities->count()) {
            foreach($activities as $activity) {
                $response['activities'][] =
                    ['id' => $activity->id,
                     'activity_date' => date('jS M, Y', strtotime($activity->activity_date)),
                     'activity_type' => $activity->activity_type,
                     'time' => activity::convertSecondsToDisplayTime($activity->seconds),
                     'distance' => number_format(($activity->metres / 1000), 3)];

            }
            $response['has_more_activities'] = $activities->hasMorePages();
        }

        return response()->json($response);

    }

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

    public function personalBests() {
        $response = array();
        $personalBests = PersonalBests::where('user_id', USER_ID)->
                                        orderBy('display_order')->get();

        foreach($personalBests as $personalBest) {
            $value = '-';
            $pb = activity::personalBests(USER_ID, $personalBest->type,
                                          $personalBest->activity_ids, 1,
                                          $personalBest->min_distance,
                                          $personalBest->max_distance);

            if($pb) {
                $value = number_format(($pb->metres  / 1000), 3).'Km '.
                    'in '.activity::convertSecondsToDisplayTime($pb->seconds).' '.
                    'on '.date('jS M, Y', strtotime($pb->activity_date));
            }

            $response[] = array('id' => $personalBest->id,
                                'title' => $personalBest->title,
                                'type' => $personalBest->type,
                                'activity_ids' => $personalBest->activity_ids,
                                'min_distance' => $personalBest->min_distance,
                                'max_distance' => $personalBest->max_distance,
                                'value' => $value);

        }

        return response()->json($response);

    }

}
