<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNameOfMinimumSpeedColumnInPersonalBestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('personal_bests', function(Blueprint $table) {
            $table->renameColumn('minimum_speed', 'min_speed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('personal_bests', function(Blueprint $table) {
            $table->renameColumn('min_speed', 'minimum_speed');
        });
    }
}
