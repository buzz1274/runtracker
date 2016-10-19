<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;
use App\Activity;

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
            $activityTypeID = $this->getActivityTypeID($run->type,
                                                       $run->treadmill);
            $routeID = $this->getRouteID($run->route);

            $activity = new Activity;

            $activity->user_id = $this->getUserID($run->who);


            die();

        }


    }

    private function getUserID($who) {
        $user = User::where('name', ucfirst($who))->first();

        if(!$user || !$user->count()) {
            $user = new User;

            $user->name = ucfirst($who);
            $user->email = '';
            $user->password = '';
            $user->save();

        }

        return $user->id;

    }

    private function getActivityTypeID($type, $treadmill) {
        return 1;
    }

    private function getRouteID() {
        return 1;
    }

}
