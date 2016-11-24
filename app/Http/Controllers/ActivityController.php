<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Activity;

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

}