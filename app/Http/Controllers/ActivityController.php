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

    public function personalBest($id = false) {
        $pb = false;
        $i = 0;
        $limit = $id ? 20 : 1;
        $personalBests =
            PersonalBests::where('user_id', USER_ID)->
                           when($id, function($query) use($id) {
                                return $query->where('id', '=', $id);
                           })->
                           orderBy('display_order')->get();

        foreach($personalBests as $personalBest) {
            $activity = activity::personalBests(USER_ID, $personalBest->type,
                                                $personalBest->activity_ids, $limit,
                                                $personalBest->min_distance,
                                                $personalBest->max_distance);

            if(!$id) {
                $pb[$i] = $activity;
            } else {
                foreach($activity as $a) {
                    $pb[$i]['data'] = $activity;
                }
            }

            $pb[$i]['title'] = $personalBest['title'];
            $pb[$i]['personal_best_id'] = $personalBest['id'];

            $i++;

        }

        return response()->json(['activities' => ['data' => $pb]]);

    }

}
