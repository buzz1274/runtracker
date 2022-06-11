<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\ActivityType;

class ActivityTypeController extends Controller {

    public function type(Request $request) {
        $activityTypes = [];
        $parentActivityTypes =
            ActivityType::where('parent_id', null)->
                          orderBy('activity_type')->
                          get(['id', 'activity_type', 'parent_id']);

        foreach($parentActivityTypes as $pt) {
            $childActivityTypes =
                ActivityType::where('parent_id', $pt->id)->
                              orderBy('activity_type')->
                              get(['id', 'activity_type', 'parent_id']);

            $activityTypes[] = array('id' => $pt->id,
                                     'activity_type' => $pt->activity_type,
                                     'parent_id' => $pt->parent_id);

            foreach($childActivityTypes as $ct) {
                $activityTypes[] = array('id' => $ct->id,
                                         'activity_type' => $ct->activity_type,
                                         'parent_id' => $ct->parent_id);
            }

        }


        return response()->json($activityTypes);

    }

}