<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Activity;
use App\ActivityType;
use App\Route;

class DBConvert extends Command {

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:convert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Convert old runtracker data to new schema';

    /**
     * Create a new command instance.
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle() {
        $runs = \DB::select('SELECT * FROM run ORDER BY date ASC');

        foreach($runs as $run) {
            $activity = new Activity;

            $activity->user_id = $this->getUserID($run->who);
            $activity->route_id = $this->getRouteID($run->route);
            $activity->seconds = $run->seconds;
            $activity->metres = $run->metres;
            $activity->activity_date = $run->date;
            $activity->activity_id = $this->getActivityTypeID($run->type,
                                                              $run->treadmill,
                                                              $run->run);

            $activity->save();

        }


    }

    private function getUserID($who) {
        $user = User::where('name', ucfirst($who))->first();

        if(!$user || !$user->count()) {
            $user = new User;

            $user->name = ucfirst($who);
            $user->email = $who;
            $user->password = '';
            $user->save();

        }

        return $user->id;

    }

    private function getActivityTypeID($type, $treadmill, $run) {
        if($type == 'couch25k' && !$treadmill) {
            $activityType = 'Street running';
            $parentActivityType = 'Running';
        } elseif($type == 'hike') {
            $activityType = 'Hiking';
            $parentActivityType = 'Walking';
        } elseif($type == 'walk') {
            $activityType = 'Casual walking';
            $parentActivityType = 'Walking';
        } elseif($type == 'trail') {
            $activityType = 'Trail running';
            $parentActivityType = 'Running';
        } elseif($type == 'couch25k' && $treadmill && $run) {
            $activityType = 'Treadmill running';
            $parentActivityType = 'Running';
        } else {
            $activityType = 'Treadmill walking';
            $parentActivityType = 'Walking';
        }

        return $this->activityID($activityType, $parentActivityType);

    }

    private function activityID($activityType, $parentActivityType) {
        $at = ActivityType::where('activity_type',
                                  $activityType)->first();

        if(!$at || !$at->count()) {
            if($parentActivityType) {
                $parentID = $this->activityID($parentActivityType, false);
            } else {
                $parentID = null;
            }

            $at = new activityType;

            $at->activity_type = $activityType;
            $at->parent_id = $parentID;

            $at->save();

        }

        return $at->id;

    }

    private function getRouteID($route) {
        $rt = Route::where('route', $route)->first();

        if(!$rt || !$rt->count()) {
            $rt = new Route;

            $rt->route = $route;
            $rt->save();

        }

        return $rt->id;

    }

}
