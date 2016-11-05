<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\ActivityType;

class ActivityTypeController extends Controller {

    public function type(Request $request) {
        $activityTypes =
            ActivityType::orderBy('activity_type')->get(['id', 'activity_type']);


        return response()->json($activityTypes);

    }

}